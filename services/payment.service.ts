import prisma from "@/lib/prisma";
import { createRazorpayOrder, verifyRazorpaySignature } from "@/lib/razorpay";
import { resolvePrismaUserId } from "./user-profile.service";

/**
 * Initiate Course Purchase (Create Razorpay order & database Order record)
 */
export async function initiateCoursePurchase(
  userIdOrSupabaseId: string,
  courseId: string
) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) {
    throw new Error("User not found");
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  if (course.status !== "PUBLISHED") {
    throw new Error("Cannot purchase an unpublished course");
  }

  // Check if user already has an active enrollment
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: prismaUserId,
        courseId,
      },
    },
  });

  if (existingEnrollment && existingEnrollment.status === "ACTIVE") {
    throw new Error("You are already enrolled in this course");
  }

  const amountNumber = Number(course.price);
  const receipt = `rcpt_${Date.now()}_${prismaUserId.slice(0, 4)}`;

  const razorpayOrder = await createRazorpayOrder({
    amount: amountNumber,
    receipt,
    notes: {
      userId: prismaUserId,
      courseId,
    },
  });

  // Create Order & Payment records in DB
  const order = await prisma.order.create({
    data: {
      userId: prismaUserId,
      courseId,
      amount: course.price,
      currency: "INR",
      status: "CREATED",
      razorpayOrderId: razorpayOrder.id,
      payment: {
        create: {
          userId: prismaUserId,
          amount: course.price,
          currency: "INR",
          status: "PENDING",
        },
      },
    },
    include: {
      payment: true,
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });

  return { razorpayOrder, order };
}

/**
 * Verify Razorpay payment signature & complete payment/enrollment
 */
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

/**
 * Get user payment and order history
 */
export async function getUserPaymentHistory(userIdOrSupabaseId: string) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) return [];

  return prisma.order.findMany({
    where: { userId: prismaUserId },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnail: true,
        },
      },
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get single Order details by Order ID or Razorpay Order ID
 */
export async function getOrderById(orderId: string) {
  return prisma.order.findFirst({
    where: {
      OR: [{ id: orderId }, { razorpayOrderId: orderId }],
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
      payment: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}
