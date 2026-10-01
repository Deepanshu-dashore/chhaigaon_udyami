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
        { title: { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const resources = await prisma.startupResource.findMany({
      where: whereClause,
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ success: true, data: resources });
  } catch (error: any) {
    console.error("GET /api/admin/resources error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch resources" },
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
    const { title, category, description, content, resourceUrl, status = true } = body;

    if (!title || !category) {
      return NextResponse.json(
        { error: "Title and category are required" },
        { status: 400 }
      );
    }

    const resource = await prisma.startupResource.create({
      data: {
        title,
        category,
        description,
        content,
        resourceUrl,
        status,
      },
    });

    return NextResponse.json({ success: true, data: resource });
  } catch (error: any) {
    console.error("POST /api/admin/resources error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create resource" },
      { status: 500 }
    );
  }
}
