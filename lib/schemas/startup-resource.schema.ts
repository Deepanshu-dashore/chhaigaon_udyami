import { z } from "zod";

// ==========================================
// STARTUP RESOURCE SCHEMAS & DTOS
// ==========================================

export const CreateStartupResourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  category: z.string().min(2, "Category is required").max(100),
  description: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  thumbnail: z.string().url("Invalid thumbnail URL").optional().nullable(),
  resourceUrl: z.string().url("Invalid resource URL").optional().nullable(),
  order: z.coerce.number().int().nonnegative().default(0),
  status: z.boolean().default(true),
});
export type CreateStartupResourceDTO = z.infer<typeof CreateStartupResourceSchema>;

export const UpdateStartupResourceSchema = CreateStartupResourceSchema.partial();
export type UpdateStartupResourceDTO = z.infer<typeof UpdateStartupResourceSchema>;

export const StartupResourceFilterQuerySchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  status: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((val: unknown) => (typeof val === "boolean" ? val : val === "true"))
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
export type StartupResourceFilterQueryDTO = z.infer<typeof StartupResourceFilterQuerySchema>;
