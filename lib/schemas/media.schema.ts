import { z } from "zod";
import { VideoStatusSchema } from "./common.schema";

// ==========================================
// VIDEO SCHEMAS & DTOS (VdoCipher)
// ==========================================

export const CreateVideoSchema = z.object({
  lessonId: z.string().min(1, "Lesson ID is required"),
  title: z.string().min(2, "Video title must be at least 2 characters").max(200),
  vdoVideoId: z.string().min(1, "VdoCipher Video ID is required"),
  duration: z.coerce.number().int().nonnegative().optional().nullable(), // seconds
  thumbnailUrl: z.string().url().optional().nullable(),
  status: VideoStatusSchema.default("PROCESSING"),
  processingStatus: z.string().optional().nullable(),
});
export type CreateVideoDTO = z.infer<typeof CreateVideoSchema>;

export const UpdateVideoSchema = CreateVideoSchema.omit({ lessonId: true }).partial();
export type UpdateVideoDTO = z.infer<typeof UpdateVideoSchema>;

export const GetVideoOtpSchema = z.object({
  videoId: z.string().min(1, "Video ID is required"),
});
export type GetVideoOtpDTO = z.infer<typeof GetVideoOtpSchema>;

// ==========================================
// MATERIAL SCHEMAS & DTOS
// ==========================================

export const CreateMaterialSchema = z.object({
  lessonId: z.string().min(1, "Lesson ID is required"),
  title: z.string().min(2, "Material title must be at least 2 characters").max(200),
  fileUrl: z.string().url("Invalid file URL"),
  fileType: z.string().min(1, "File type is required"),
  fileSize: z.coerce.number().int().nonnegative().optional().nullable(), // bytes
  isDownloadable: z.boolean().default(true),
});
export type CreateMaterialDTO = z.infer<typeof CreateMaterialSchema>;

export const UpdateMaterialSchema = CreateMaterialSchema.omit({ lessonId: true }).partial();
export type UpdateMaterialDTO = z.infer<typeof UpdateMaterialSchema>;
