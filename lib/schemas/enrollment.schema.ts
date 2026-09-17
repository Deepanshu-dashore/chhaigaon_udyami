import { z } from "zod";
import { EnrollmentStatusSchema } from "./common.schema";

// ==========================================
// ENROLLMENT SCHEMAS & DTOS
// ==========================================

export const CreateEnrollmentSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  status: EnrollmentStatusSchema.default("ACTIVE"),
  expiresAt: z.coerce.date().optional().nullable(),
});
export type CreateEnrollmentDTO = z.infer<typeof CreateEnrollmentSchema>;

export const UpdateEnrollmentStatusSchema = z.object({
  status: EnrollmentStatusSchema,
  completedAt: z.coerce.date().optional().nullable(),
  expiresAt: z.coerce.date().optional().nullable(),
});
export type UpdateEnrollmentStatusDTO = z.infer<typeof UpdateEnrollmentStatusSchema>;

export const EnrollmentFilterQuerySchema = z.object({
  userId: z.string().optional(),
  courseId: z.string().optional(),
  status: EnrollmentStatusSchema.optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
export type EnrollmentFilterQueryDTO = z.infer<typeof EnrollmentFilterQuerySchema>;

// ==========================================
// LESSON PROGRESS SCHEMAS & DTOS
// ==========================================

export const UpdateLessonProgressSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  lessonId: z.string().min(1, "Lesson ID is required"),
  progressPercent: z.coerce.number().min(0).max(100).default(0),
  watchedSeconds: z.coerce.number().int().nonnegative().default(0),
  lastPosition: z.coerce.number().int().nonnegative().default(0),
  isCompleted: z.boolean().default(false),
  completedAt: z.coerce.date().optional().nullable(),
});
export type UpdateLessonProgressDTO = z.infer<typeof UpdateLessonProgressSchema>;
