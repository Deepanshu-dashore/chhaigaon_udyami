import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code") || searchParams.get("q");

    if (!code) {
      return NextResponse.json(
        { error: "Verification code or certificate number is required" },
        { status: 400 }
      );
    }

    const cleanCode = code.trim();

    const certificate = await prisma.certificate.findFirst({
      where: {
        OR: [
          { verificationCode: { equals: cleanCode, mode: "insensitive" } },
          { certificateNumber: { equals: cleanCode, mode: "insensitive" } },
          { id: cleanCode },
        ],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profile: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            level: true,
            duration: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json(
        { verified: false, message: "Certificate not found or invalid code" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      verified: true,
      certificate: {
        id: certificate.id,
        certificateNumber: certificate.certificateNumber,
        verificationCode: certificate.verificationCode,
        issueDate: certificate.issueDate,
        status: certificate.status,
        studentName: certificate.user.name,
        studentEmail: certificate.user.email,
        studentDistrict: certificate.user.profile?.district || "खंडवा (म.प्र.)",
        studentState: certificate.user.profile?.state || "मध्य प्रदेश",
        courseTitle: certificate.course.title,
        courseSlug: certificate.course.slug,
        courseDuration: certificate.course.duration,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
