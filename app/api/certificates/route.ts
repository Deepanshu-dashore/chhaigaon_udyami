import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const certificates = await prisma.certificate.findMany({
      where: { userId },
      include: { course: true },
      orderBy: { issueDate: "desc" },
    });

    return NextResponse.json({ certificates });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, courseId, certificateUrl, qrCodeUrl } = body;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "userId and courseId are required" },
        { status: 400 }
      );
    }

    const certNumber = `CHU-${Date.now().toString(36).toUpperCase()}-${userId.slice(0, 4).toUpperCase()}`;
    const verificationCode = `VRF-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const certificate = await prisma.certificate.upsert({
      where: {
        userId_courseId: { userId, courseId },
      },
      update: {
        certificateUrl,
        qrCodeUrl,
      },
      create: {
        userId,
        courseId,
        certificateNumber: certNumber,
        verificationCode,
        certificateUrl,
        qrCodeUrl,
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ certificate });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
