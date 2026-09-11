import { UserRole } from "@prisma/client";

export type Role = UserRole;

export const PERMISSIONS = {
  // Course Permissions
  COURSE_CREATE: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TRAINER, UserRole.CONTENT_MANAGER],
  COURSE_EDIT: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.TRAINER, UserRole.CONTENT_MANAGER],
  COURSE_DELETE: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  COURSE_VIEW: [
    UserRole.SUPER_ADMIN,
    UserRole.ADMIN,
    UserRole.CONTENT_MANAGER,
    UserRole.TRAINER,
    UserRole.STUDENT,
    UserRole.MENTOR,
    UserRole.MARKET_PARTNER,
  ],

  // Admin Panel
  ADMIN_ACCESS: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER],
  USER_MANAGEMENT: [UserRole.SUPER_ADMIN, UserRole.ADMIN],
  SCHEMES_MANAGE: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.CONTENT_MANAGER],
  PAYMENTS_MANAGE: [UserRole.SUPER_ADMIN, UserRole.ADMIN],

  // Mentorship & Marketplace
  MENTOR_ACCESS: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MENTOR],
  MARKET_ACCESS: [UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.MARKET_PARTNER],
} as const;

export function hasPermission(
  userRole: UserRole | undefined | null,
  requiredRoles: readonly UserRole[]
): boolean {
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
}

export function isAdmin(userRole?: UserRole | null): boolean {
  return userRole === UserRole.SUPER_ADMIN || userRole === UserRole.ADMIN;
}

export function isInstructor(userRole?: UserRole | null): boolean {
  return (
    userRole === UserRole.TRAINER ||
    userRole === UserRole.CONTENT_MANAGER ||
    userRole === UserRole.ADMIN ||
    userRole === UserRole.SUPER_ADMIN
  );
}
