import { z } from "zod";
import { UserRoleSchema, UserStatusSchema } from "./common.schema";

// ==========================================
// USER SCHEMAS & DTOS
// ==========================================

export const CreateUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address").optional().nullable(),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid 10-digit Indian mobile number")
    .optional()
    .nullable(),
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  supabaseUserId: z.string().optional().nullable(),
  role: UserRoleSchema.default("STUDENT"),
  status: UserStatusSchema.default("ACTIVE"),
  isVerified: z.boolean().default(false),
});
export type CreateUserDTO = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = CreateUserSchema.partial();
export type UpdateUserDTO = z.infer<typeof UpdateUserSchema>;

export const UserLoginSchema = z.object({
  emailOrMobile: z.string().min(3, "Email or mobile is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type UserLoginDTO = z.infer<typeof UserLoginSchema>;

export const SendOtpSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit Indian mobile number"),
});
export type SendOtpDTO = z.infer<typeof SendOtpSchema>;

export const VerifyOtpSchema = z.object({
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Invalid 10-digit Indian mobile number"),
  otp: z.string().length(6, "OTP must be 6 digits"),
});
export type VerifyOtpDTO = z.infer<typeof VerifyOtpSchema>;

// ==========================================
// USER PROFILE SCHEMAS & DTOS
// ==========================================

export const CreateUserProfileSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  profilePhoto: z.string().url().optional().nullable(),
  address: z.string().max(255).optional().nullable(),
  district: z.string().max(100).optional().nullable(),
  state: z.string().max(100).default("Madhya Pradesh"),
  pincode: z.string().regex(/^\d{6}$/, "Invalid 6-digit PIN code").optional().nullable(),
  businessName: z.string().max(150).optional().nullable(),
  businessType: z.string().max(100).optional().nullable(),
  occupation: z.string().max(100).optional().nullable(),
  bio: z.string().max(1000).optional().nullable(),
});
export type CreateUserProfileDTO = z.infer<typeof CreateUserProfileSchema>;

export const UpdateUserProfileSchema = CreateUserProfileSchema.omit({ userId: true }).partial();
export type UpdateUserProfileDTO = z.infer<typeof UpdateUserProfileSchema>;

export const UserFilterQuerySchema = z.object({
  role: UserRoleSchema.optional(),
  status: UserStatusSchema.optional(),
  search: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
export type UserFilterQueryDTO = z.infer<typeof UserFilterQuerySchema>;
