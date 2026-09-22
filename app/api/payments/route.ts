import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, requireAuth } from "@/lib/auth";
import { CreateOrderSchema } from "@/lib/schemas/payment.schema";
import {
  initiateCoursePurchase,
  getUserPaymentHistory,
} from "@/services/payment.service";

/**
 * GET /api/payments
 * Get current user's order and payment history
 */
export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await getUserPaymentHistory(currentUser.id);
    return NextResponse.json({ orders });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/payments
 * Initiate a course purchase & create Razorpay order
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await requireAuth();
    const body = await req.json();

    const payload = {
      ...body,
      userId: body.userId || currentUser.id,
    };

    const validation = CreateOrderSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const result = await initiateCoursePurchase(
      validation.data.userId,
      validation.data.courseId
    );
    return NextResponse.json(result, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("Unauthorized") ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
