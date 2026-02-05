/**
 * Auth middleware – reads JWT from HttpOnly cookie or Authorization header.
 * Returns decoded payload or null; does not query DB per request.
 */

import { SignJWT, jwtVerify } from "jose";
import { env } from "@core/config/env";
import { ROLES, ROLE_PERMISSIONS, type Role, type Permission } from "@core/config/auth";
import { AppError } from "@core/errors/AppError";

export type JwtPayload = {
  userId: string;
  role: Role;
  permissions: Permission[];
  sessionVersion: number;
  iat?: number;
  exp?: number;
};

const secret = new TextEncoder().encode(env.jwt.secret);

export async function createToken(payload: Omit<JwtPayload, "iat" | "exp">): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(env.jwt.accessTokenExpiry)
    .setIssuedAt()
    .sign(secret);
}

export async function verifyToken(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret);
  return payload as unknown as JwtPayload;
}

export function getTokenFromRequest(request: Request): string | null {
  const cookie = request.headers.get("cookie");
  const name = env.jwt.cookieName;
  const match = cookie?.match(new RegExp(`${name}=([^;]+)`));
  if (match) return match[1].trim();
  const auth = request.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return auth.slice(7);
  return null;
}

/** Returns JWT payload or throws AppError. Use when route requires auth. */
export async function requireAuth(request: Request): Promise<JwtPayload> {
  const token = getTokenFromRequest(request);
  if (!token) {
    throw new AppError({ statusCode: 401, message: "Unauthorized", code: "AUTH_401" });
  }
  try {
    return await verifyToken(token);
  } catch {
    throw new AppError({ statusCode: 401, message: "Invalid or expired token", code: "AUTH_401" });
  }
}

/** Returns JWT payload or null. Use for optional auth. */
export async function optionalAuth(request: Request): Promise<JwtPayload | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

export function buildPermissions(role: Role): Permission[] {
  return [...(ROLE_PERMISSIONS[role] ?? [])];
}

export function cookieHeader(token: string, maxAgeSeconds: number): string {
  const name = env.jwt.cookieName;
  return `${name}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`;
}
