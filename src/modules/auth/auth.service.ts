/**
 * Auth service – login (email/password), token creation; no route logic.
 */

import { AppError } from "@core/errors/AppError";
import { verifyPassword } from "@core/utils/crypto";
import {
  createToken,
  buildPermissions,
  cookieHeader,
  type JwtPayload,
} from "@core/middlewares/auth.middleware";
import { ROLES, type Role } from "@core/config/auth";
import { findUserByEmail } from "./auth.repository";
import type { AuthResult } from "./auth.types";

const ACCESS_TOKEN_MAX_AGE_SEC = 15 * 60; // 15 min

export async function loginWithPassword(
  email: string,
  password: string
): Promise<AuthResult> {
  const user = await findUserByEmail(email);
  if (!user || !user.password) {
    throw new AppError({ statusCode: 401, message: "Invalid credentials", code: "AUTH_401" });
  }
  const match = await verifyPassword(password, user.password);
  if (!match) {
    throw new AppError({ statusCode: 401, message: "Invalid credentials", code: "AUTH_401" });
  }
  const role = (user.role as Role) ?? ROLES.USER;
  const permissions = buildPermissions(role);
  const payload: Omit<JwtPayload, "iat" | "exp"> = {
    userId: user._id.toString(),
    role,
    permissions,
    sessionVersion: 1,
  };
  const accessToken = await createToken(payload);
  const cookie = cookieHeader(accessToken, ACCESS_TOKEN_MAX_AGE_SEC);
  return {
    userId: user._id.toString(),
    role,
    permissions,
    accessToken,
    cookieHeader: cookie,
  };
}
