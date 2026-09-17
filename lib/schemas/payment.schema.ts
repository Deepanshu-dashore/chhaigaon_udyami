import { z } from "zod";
import { PaymentStatusSchema } from "./common.schema";

// ==========================================
// ORDER SCHEMAS & DTOS (Razorpay)
// ==========================================

export const CreateOrderSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  courseId: z.string().min(1, "Course ID is required"),
  amount: z.coerce.number().positive("Amount must be greater than 0"),
  currency: z.string().default("INR"),
});
export type CreateOrderDTO = z.infer<typeof CreateOrderSchema>;

export const UpdateOrderStatusSchema = z.object({
  status: PaymentStatusSchema,
});
export type UpdateOrderStatusDTO = z.infer<typeof UpdateOrderStatusSchema>;

// ==========================================
// PAYMENT VERIFICATION SCHEMAS & DTOS
// ==========================================

export const VerifyPaymentSchema = z.object({
  orderId: z.string().min(1, "Internal order ID is required"),
  razorpayOrderId: z.string().min(1, "Razorpay order ID is required"),
  razorpayPaymentId: z.string().min(1, "Razorpay payment ID is required"),
  razorpaySignature: z.string().min(1, "Razorpay signature is required"),
});
export type VerifyPaymentDTO = z.infer<typeof VerifyPaymentSchema>;

export const CreatePaymentRecordSchema = z.object({
  orderId: z.string().min(1, "Order ID is required"),
  userId: z.string().min(1, "User ID is required"),
  amount: z.coerce.number().positive(),
  currency: z.string().default("INR"),
  razorpayPaymentId: z.string().optional().nullable(),
  razorpaySignature: z.string().optional().nullable(),
  status: PaymentStatusSchema.default("PENDING"),
  paidAt: z.coerce.date().optional().nullable(),
});
export type CreatePaymentRecordDTO = z.infer<typeof CreatePaymentRecordSchema>;
