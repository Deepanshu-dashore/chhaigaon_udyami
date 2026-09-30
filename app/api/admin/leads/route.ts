import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/leads - Fetch all market partner leads and inquiries
export async function GET(req: NextRequest) {
  try {
    const leads = await prisma.marketLead.findMany({
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
    });

    return NextResponse.json({ success: true, leads });
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
