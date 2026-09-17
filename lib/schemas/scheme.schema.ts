import { z } from "zod";

// ==========================================
// GOVERNMENT SCHEME SCHEMAS & DTOS
// ==========================================

export const CreateGovernmentSchemeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(255),
  slug: z
    .string()
    .min(3)
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens")
    .optional(),
  department: z.string().max(150).optional().nullable(),
  description: z.string().optional().nullable(),
  benefits: z.string().optional().nullable(),
  eligibility: z.string().optional().nullable(),
  requiredDocuments: z.string().optional().nullable(),
  applicationProcess: z.string().optional().nullable(),
  officialUrl: z.string().url("Invalid official URL").optional().nullable(),
  lastUpdated: z.coerce.date().optional().nullable(),
  status: z.boolean().default(true),
});
export type CreateGovernmentSchemeDTO = z.infer<typeof CreateGovernmentSchemeSchema>;

export const UpdateGovernmentSchemeSchema = CreateGovernmentSchemeSchema.partial();
export type UpdateGovernmentSchemeDTO = z.infer<typeof UpdateGovernmentSchemeSchema>;

export const SchemeFilterQuerySchema = z.object({
  search: z.string().optional(),
  department: z.string().optional(),
  status: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((val: unknown) => (typeof val === "boolean" ? val : val === "true"))
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
export type SchemeFilterQueryDTO = z.infer<typeof SchemeFilterQuerySchema>;
