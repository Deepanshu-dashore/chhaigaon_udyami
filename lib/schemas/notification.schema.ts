import { z } from "zod";

// ==========================================
// NOTIFICATION SCHEMAS & DTOS
// ==========================================

export const CreateNotificationSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  title: z.string().min(1, "Title is required").max(200),
  message: z.string().min(1, "Message is required"),
  type: z.string().default("GENERAL"), // e.g. "GENERAL", "COURSE", "PAYMENT", "SYSTEM"
  isRead: z.boolean().default(false),
});
export type CreateNotificationDTO = z.infer<typeof CreateNotificationSchema>;

export const MarkNotificationAsReadSchema = z.object({
  notificationId: z.string().min(1, "Notification ID is required"),
});
export type MarkNotificationAsReadDTO = z.infer<typeof MarkNotificationAsReadSchema>;

export const NotificationFilterQuerySchema = z.object({
  userId: z.string().optional(),
  isRead: z
    .union([z.boolean(), z.enum(["true", "false"])])
    .transform((val: unknown) => (typeof val === "boolean" ? val : val === "true"))
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
});
export type NotificationFilterQueryDTO = z.infer<typeof NotificationFilterQuerySchema>;
