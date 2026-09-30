import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/schemes - Fetch all government schemes
export async function GET(req: NextRequest) {
  try {
    const schemes = await prisma.governmentScheme.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, schemes });
  } catch (error: any) {
    console.error("Error fetching schemes:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch government schemes" },
      { status: 500 }
    );
  }
}

// POST /api/admin/schemes - Create a new government scheme
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      department,
      description,
      benefits,
      eligibility,
      requiredDocuments,
      applicationProcess,
      officialUrl,
      status,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    const scheme = await prisma.governmentScheme.create({
      data: {
        title,
        slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        department: department || "DIC Khandwa",
        description,
        benefits,
        eligibility,
        requiredDocuments,
        applicationProcess,
        officialUrl,
        status: status !== undefined ? status : true,
      },
    });

    return NextResponse.json({ success: true, scheme }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating scheme:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create scheme" },
      { status: 500 }
    );
  }
}
