import { z } from "zod";

// ==========================================
// CERTIFICATE SCHEMAS & DTOS
// ==========================================

export const IssueCertificateSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  certificateNumber: z.string().optional(), // Auto-generated if not provided
  verificationCode: z.string().optional(), // Auto-generated if not provided
  certificateUrl: z.string().url().optional().nullable(),
  qrCodeUrl: z.string().url().optional().nullable(),
  status: z.string().default("ACTIVE"),
});
export type IssueCertificateDTO = z.infer<typeof IssueCertificateSchema>;

export const VerifyCertificateSchema = z.object({
  code: z.string().min(1, "Verification code or certificate number is required"),
});
export type VerifyCertificateDTO = z.infer<typeof VerifyCertificateSchema>;

export const CertificateFilterQuerySchema = z.object({
  userId: z.string().optional(),
  courseId: z.string().optional(),
  status: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
export type CertificateFilterQueryDTO = z.infer<typeof CertificateFilterQuerySchema>;
