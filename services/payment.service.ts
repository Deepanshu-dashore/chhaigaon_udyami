import prisma from "@/lib/prisma";
import { createRazorpayOrder, verifyRazorpaySignature } from "@/lib/razorpay";

export async function initiateCoursePurchase(userId: string, courseId: string) {
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  const amountNumber = Number(course.price);
  const receipt = `rcpt_${Date.now()}_${userId.slice(0, 4)}`;

  const razorpayOrder = await createRazorpayOrder({
    amount: amountNumber,
    receipt,
    notes: {
      userId,
      courseId,
    },
  });

  // Create Order record in DB
  const order = await prisma.order.create({
    data: {
      userId,
      courseId,
      amount: course.price,
      currency: "INR",
      status: "CREATED",
      razorpayOrderId: razorpayOrder.id,
      payment: {
        create: {
          userId,
          amount: course.price,
          currency: "INR",
          status: "PENDING",
        },
      },
    },
    include: {
      payment: true,
    },
  });

  return { order: razorpayOrder, dbOrder: order };
}

export async function verifyAndCompletePayment(
  razorpayOrderId: string,
  razorpayPaymentId: string,
  signature: string
) {
  const isValid = verifyRazorpaySignature(
    razorpayOrderId,
    razorpayPaymentId,
    signature
  );
  if (!isValid) {
    throw new Error("Invalid payment signature");
  }

  const order = await prisma.order.findUnique({
    where: { razorpayOrderId },
    include: { payment: true },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // Update Order and Payment status
  await prisma.order.update({
    where: { id: order.id },
    data: { status: "PAID" },
  });

  const payment = await prisma.payment.update({
    where: { orderId: order.id },
    data: {
      razorpayPaymentId,
      razorpaySignature: signature,
      status: "PAID",
      paidAt: new Date(),
    },
  });

  // Automatically enroll the user in the course
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

  return payment;
}
