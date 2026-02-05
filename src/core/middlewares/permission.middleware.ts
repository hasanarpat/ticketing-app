/**
 * Permission middleware – reads from JWT only (no DB query).
 * requirePermission("USER_READ") after requireAuth.
 */

import { AppError } from "@core/errors/AppError";
import type { JwtPayload } from "@core/middlewares/auth.middleware";
import type { Permission } from "@core/config/auth";

export function requirePermission(payload: JwtPayload, permission: Permission): void {
  if (!payload.permissions?.includes(permission)) {
    throw new AppError({ statusCode: 403, message: "Forbidden", code: "FORBIDDEN" });
  }
}
