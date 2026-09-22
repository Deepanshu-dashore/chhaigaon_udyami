import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { VerifyPaymentSchema } from "@/lib/schemas/payment.schema";
import { verifyAndCompletePayment } from "@/services/payment.service";

/**
 * POST /api/payments/verify
 * Verify Razorpay payment signature & activate enrollment
 */
export async function POST(req: NextRequest) {
  try {
    await requireAuth();
    const body = await req.json();

    const validation = VerifyPaymentSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const payment = await verifyAndCompletePayment(
      validation.data.razorpayOrderId,
      validation.data.razorpayPaymentId,
      validation.data.razorpaySignature
    );

    return NextResponse.json({ success: true, payment });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("Unauthorized") ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
