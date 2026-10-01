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
        { name: { contains: search, mode: "insensitive" } },
        { businessType: { contains: search, mode: "insensitive" } },
        { location: { contains: search, mode: "insensitive" } },
      ];
    }

    const partners = await prisma.marketPartner.findMany({
      where: whereClause,
      include: {
        _count: {
          select: { leads: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, data: partners });
  } catch (error: any) {
    console.error("GET /api/admin/partners error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch partners" },
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
    const { name, businessType, description, location, contact, website, status = true } = body;

    if (!name) {
      return NextResponse.json({ error: "Partner name is required" }, { status: 400 });
    }

    const partner = await prisma.marketPartner.create({
      data: {
        name,
        businessType,
        description,
        location,
        contact,
        website,
        status,
      },
    });

    return NextResponse.json({ success: true, data: partner });
  } catch (error: any) {
    console.error("POST /api/admin/partners error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create partner" },
      { status: 500 }
    );
  }
}
