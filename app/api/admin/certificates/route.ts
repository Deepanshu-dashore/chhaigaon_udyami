import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const whereClause: any = {};
    if (search) {
      whereClause.OR = [
        { certificateNumber: { contains: search, mode: "insensitive" } },
        { verificationCode: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { course: { title: { contains: search, mode: "insensitive" } } },
      ];
    }

    const certificates = await prisma.certificate.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            mobile: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      orderBy: { issueDate: "desc" },
    });

    return NextResponse.json({ success: true, data: certificates });
  } catch (error: any) {
    console.error("GET /api/admin/certificates error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId, courseId } = body;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "User ID and Course ID are required" },
        { status: 400 }
      );
    }

    // Check if certificate already exists
    const existing = await prisma.certificate.findUnique({
      where: {
        userId_courseId: { userId, courseId },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Certificate already issued for this user & course" },
        { status: 400 }
      );
    }

    const certNo = `CU-CERT-${Date.now().toString().slice(-6)}-${Math.floor(
      1000 + Math.random() * 9000
    )}`;
    const vCode = `VERIFY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    const certificate = await prisma.certificate.create({
      data: {
        userId,
        courseId,
        certificateNumber: certNo,
        verificationCode: vCode,
        issueDate: new Date(),
        status: "ACTIVE",
      },
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    });

    return NextResponse.json({ success: true, data: certificate });
  } catch (error: any) {
    console.error("POST /api/admin/certificates error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to issue certificate" },
      { status: 500 }
    );
  }
}
