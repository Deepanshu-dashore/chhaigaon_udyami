import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/leads - Fetch market partner leads with pagination & search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10", 10));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { message: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { user: { mobile: { contains: search, mode: "insensitive" } } },
        { partner: { name: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [leads, total] = await Promise.all([
      prisma.marketLead.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              mobile: true,
              profile: {
                select: { district: true, state: true, businessName: true },
              },
            },
          },
          partner: {
            select: { id: true, name: true, businessType: true },
          },
        },
      }),
      prisma.marketLead.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      leads,
      data: leads,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch leads" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/leads - Update lead status
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Lead ID and status are required" },
        { status: 400 }
      );
    }

    const updatedLead = await prisma.marketLead.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ success: true, lead: updatedLead });
  } catch (error: any) {
    console.error("Error updating lead status:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update lead status" },
      { status: 500 }
    );
  }
}
