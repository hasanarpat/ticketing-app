/**
 * User service – business logic only; no DB access implementation (uses repository).
 */

import { AppError } from "@core/errors/AppError";
import { hashPassword } from "@core/utils/crypto";
import { ROLES, ROLE_PERMISSIONS } from "@core/config/auth";
import type { Permission, Role } from "@core/config/auth";
import * as userRepo from "./user.repository";
import type { UserSafe } from "./user.types";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}): Promise<{ id: string; email: string; name: string; role: string }> {
  const existing = await userRepo.findUserByEmail(data.email);
  if (existing) {
    throw new AppError({ statusCode: 409, message: "Email already registered", code: "EMAIL_EXISTS" });
  }
  const hashed = await hashPassword(data.password);
  const user = await userRepo.createUser({
    name: data.name,
    email: data.email,
    password: hashed,
    role: ROLES.UNVERIFIED,
  });
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role ?? ROLES.UNVERIFIED,
  };
}

export async function getSafeUser(userId: string): Promise<UserSafe | null> {
  const user = await userRepo.findUserById(userId);
  if (!user) return null;
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role ?? "user",
    createdAt: user.createdAt?.toISOString(),
  };
}

export function permissionsForRole(role: string): Permission[] {
  return [...(ROLE_PERMISSIONS[(role as Role) ?? "user"] ?? [])];
}
