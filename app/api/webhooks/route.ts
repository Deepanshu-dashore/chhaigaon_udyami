import { NextRequest, NextResponse } from "next/server";
import { verifyWebhookSignature } from "@/lib/razorpay";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get("x-razorpay-signature");
    const rawBody = await req.text();
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (webhookSecret && signature) {
      const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid webhook signature" },
          { status: 400 }
        );
      }
    }

    const event = JSON.parse(rawBody);

    if (event.event === "payment.captured") {
      const paymentEntity = event.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;

      const order = await prisma.order.findUnique({
        where: { razorpayOrderId },
        include: { payment: true },
      });

      if (order) {
        await prisma.order.update({
          where: { id: order.id },
          data: { status: "PAID" },
        });

        if (order.payment) {
          await prisma.payment.update({
            where: { id: order.payment.id },
            data: {
              razorpayPaymentId,
              status: "PAID",
              paidAt: new Date(),
            },
          });
        }

        await prisma.enrollment.upsert({
          where: {
            userId_courseId: {
              userId: order.userId,
              courseId: order.courseId,
            },
          },
          update: { status: "ACTIVE" },
          create: {
            userId: order.userId,
            courseId: order.courseId,
            status: "ACTIVE",
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Webhook handler error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
