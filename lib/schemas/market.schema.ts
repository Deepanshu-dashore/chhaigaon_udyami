import { z } from "zod";

// ==========================================
// MARKET PARTNER SCHEMAS & DTOS
// ==========================================

export const CreateMarketPartnerSchema = z.object({
  name: z.string().min(2, "Partner name must be at least 2 characters").max(200),
  businessType: z.string().max(100).optional().nullable(),
  description: z.string().optional().nullable(),
  location: z.string().max(150).optional().nullable(),
  contact: z.string().max(100).optional().nullable(),
  website: z.string().url("Invalid website URL").optional().nullable(),
  status: z.boolean().default(true),
});
export type CreateMarketPartnerDTO = z.infer<typeof CreateMarketPartnerSchema>;

export const UpdateMarketPartnerSchema = CreateMarketPartnerSchema.partial();
export type UpdateMarketPartnerDTO = z.infer<typeof UpdateMarketPartnerSchema>;

// ==========================================
// MARKET LEAD SCHEMAS & DTOS
// ==========================================

export const CreateMarketLeadSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  partnerId: z.string().min(1, "Partner ID is required"),
  message: z.string().min(5, "Message must be at least 5 characters").max(2000).optional().nullable(),
  status: z.string().default("NEW"),
});
export type CreateMarketLeadDTO = z.infer<typeof CreateMarketLeadSchema>;

export const UpdateMarketLeadStatusSchema = z.object({
  status: z.enum(["NEW", "CONTACTED", "IN_PROGRESS", "CLOSED", "REJECTED"]),
});
export type UpdateMarketLeadStatusDTO = z.infer<typeof UpdateMarketLeadStatusSchema>;

export const MarketLeadFilterQuerySchema = z.object({
  userId: z.string().optional(),
  partnerId: z.string().optional(),
  status: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
});
export type MarketLeadFilterQueryDTO = z.infer<typeof MarketLeadFilterQuerySchema>;
