import { z } from "zod";

// ==========================================
// ENUMS (Mirrored from Prisma Schema)
// ==========================================

export const UserRoleSchema = z.enum([
  "SUPER_ADMIN",
  "ADMIN",
  "CONTENT_MANAGER",
  "TRAINER",
  "STUDENT",
  "MENTOR",
  "MARKET_PARTNER",
]);
export type UserRoleDTO = z.infer<typeof UserRoleSchema>;

export const UserStatusSchema = z.enum(["ACTIVE", "INACTIVE", "BLOCKED"]);
export type UserStatusDTO = z.infer<typeof UserStatusSchema>;

export const CourseStatusSchema = z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]);
export type CourseStatusDTO = z.infer<typeof CourseStatusSchema>;

export const LessonTypeSchema = z.enum([
  "VIDEO",
  "READING",
  "QUIZ",
  "ASSESSMENT",
]);
export type LessonTypeDTO = z.infer<typeof LessonTypeSchema>;

export const EnrollmentStatusSchema = z.enum([
  "PENDING",
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
]);
export type EnrollmentStatusDTO = z.infer<typeof EnrollmentStatusSchema>;

export const PaymentStatusSchema = z.enum([
  "CREATED",
  "PENDING",
  "PAID",
  "FAILED",
  "REFUNDED",
]);
export type PaymentStatusDTO = z.infer<typeof PaymentStatusSchema>;

export const VideoStatusSchema = z.enum([
  "PROCESSING",
  "READY",
  "FAILED",
  "ARCHIVED",
]);
export type VideoStatusDTO = z.infer<typeof VideoStatusSchema>;

// ==========================================
// COMMON PARAM & QUERY SCHEMAS / DTOS
// ==========================================

export const IdParamSchema = z.object({
  id: z.string().min(1, "ID is required"),
});
export type IdParamDTO = z.infer<typeof IdParamSchema>;

export const SlugParamSchema = z.object({
  slug: z.string().min(1, "Slug is required"),
});
export type SlugParamDTO = z.infer<typeof SlugParamSchema>;

export const PaginationQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});
export type PaginationQueryDTO = z.infer<typeof PaginationQuerySchema>;
