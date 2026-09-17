import { z } from "zod";
import { CourseStatusSchema, LessonTypeSchema } from "./common.schema";

// ==========================================
// COURSE SCHEMAS & DTOS
// ==========================================

export const CreateCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200),
  slug: z
    .string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens")
    .optional(),
  description: z.string().optional().nullable(),
  thumbnail: z.string().url("Invalid thumbnail URL").optional().nullable(),
  language: z.string().default("hi"),
  price: z.coerce.number().min(0, "Price cannot be negative").default(0),
  isPaid: z.boolean().default(false),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).default("BEGINNER"),
  duration: z.coerce.number().int().nonnegative().optional().nullable(), // minutes
  status: CourseStatusSchema.default("DRAFT"),
  createdById: z.string().min(1, "Creator User ID is required"),
  publishedAt: z.coerce.date().optional().nullable(),
});
export type CreateCourseDTO = z.infer<typeof CreateCourseSchema>;

export const UpdateCourseSchema = CreateCourseSchema.omit({ createdById: true }).partial();
export type UpdateCourseDTO = z.infer<typeof UpdateCourseSchema>;

export const CourseFilterQuerySchema = z.object({
  search: z.string().optional(),
  status: CourseStatusSchema.optional(),
  isPaid: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((val: unknown) => (typeof val === "boolean" ? val : val === "true"))
    .optional(),
  language: z.string().optional(),
  level: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
export type CourseFilterQueryDTO = z.infer<typeof CourseFilterQuerySchema>;

// ==========================================
// COURSE MODULE SCHEMAS & DTOS
// ==========================================

export const CreateCourseModuleSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  title: z.string().min(2, "Module title must be at least 2 characters").max(200),
  description: z.string().optional().nullable(),
  order: z.coerce.number().int().nonnegative().default(0),
});
export type CreateCourseModuleDTO = z.infer<typeof CreateCourseModuleSchema>;

export const UpdateCourseModuleSchema = CreateCourseModuleSchema.omit({ courseId: true }).partial();
export type UpdateCourseModuleDTO = z.infer<typeof UpdateCourseModuleSchema>;

export const ReorderModulesSchema = z.object({
  courseId: z.string().min(1, "Course ID is required"),
  moduleOrders: z.array(
    z.object({
      id: z.string().min(1),
      order: z.number().int().nonnegative(),
    })
  ).min(1, "At least one module order must be specified"),
});
export type ReorderModulesDTO = z.infer<typeof ReorderModulesSchema>;

// ==========================================
// LESSON SCHEMAS & DTOS
// ==========================================

export const CreateLessonSchema = z.object({
  moduleId: z.string().min(1, "Module ID is required"),
  title: z.string().min(2, "Lesson title must be at least 2 characters").max(200),
  description: z.string().optional().nullable(),
  type: LessonTypeSchema.default("VIDEO"),
  order: z.coerce.number().int().nonnegative().default(0),
  duration: z.coerce.number().int().nonnegative().optional().nullable(), // seconds
  isPreview: z.boolean().default(false),
  isPublished: z.boolean().default(false),
});
export type CreateLessonDTO = z.infer<typeof CreateLessonSchema>;

export const UpdateLessonSchema = CreateLessonSchema.omit({ moduleId: true }).partial();
export type UpdateLessonDTO = z.infer<typeof UpdateLessonSchema>;

export const ReorderLessonsSchema = z.object({
  moduleId: z.string().min(1, "Module ID is required"),
  lessonOrders: z.array(
    z.object({
      id: z.string().min(1),
      order: z.number().int().nonnegative(),
    })
  ).min(1, "At least one lesson order must be specified"),
});
export type ReorderLessonsDTO = z.infer<typeof ReorderLessonsSchema>;
