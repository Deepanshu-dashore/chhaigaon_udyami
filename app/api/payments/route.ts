import { NextRequest, NextResponse } from "next/server";
import { initiateCoursePurchase, verifyAndCompletePayment } from "@/services/payment.service";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, userId, courseId, orderId, paymentId, signature } = body;

    if (action === "create_order") {
      if (!userId || !courseId) {
        return NextResponse.json(
          { error: "userId and courseId are required" },
          { status: 400 }
        );
      }
      const result = await initiateCoursePurchase(userId, courseId);
      return NextResponse.json(result);
    }

    if (action === "verify_payment") {
      if (!orderId || !paymentId || !signature) {
        return NextResponse.json(
          { error: "orderId, paymentId, and signature are required" },
          { status: 400 }
        );
      }
      const payment = await verifyAndCompletePayment(orderId, paymentId, signature);
      return NextResponse.json({ success: true, payment });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
