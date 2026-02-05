/**
 * Auth config – roles and permission definitions.
 * Permissions are explicit; role is static.
 */

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  UNVERIFIED: "unverified",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const PERMISSIONS = {
  USER_READ: "USER_READ",
  USER_WRITE: "USER_WRITE",
  TICKET_READ: "TICKET_READ",
  TICKET_WRITE: "TICKET_WRITE",
  TICKET_DELETE: "TICKET_DELETE",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

/** Role → permissions (read from config, not DB per request). */
export const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.USER]: [PERMISSIONS.USER_READ, PERMISSIONS.TICKET_READ, PERMISSIONS.TICKET_WRITE],
  [ROLES.ADMIN]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_WRITE,
    PERMISSIONS.TICKET_READ,
    PERMISSIONS.TICKET_WRITE,
    PERMISSIONS.TICKET_DELETE,
  ],
  [ROLES.UNVERIFIED]: [PERMISSIONS.USER_READ],
} as const;
