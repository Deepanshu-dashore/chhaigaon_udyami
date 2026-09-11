import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const level = searchParams.get("level");
    const status = searchParams.get("status") || "PUBLISHED";

    const courses = await prisma.course.findMany({
      where: {
        status: status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
        ...(level ? { level } : {}),
      },
      include: {
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                duration: true,
                isPreview: true,
                order: true,
                type: true,
              },
              orderBy: { order: "asc" },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ courses });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      slug,
      description,
      price,
      isPaid,
      level,
      language,
      createdById,
    } = body;

    if (!createdById) {
      return NextResponse.json(
        { error: "createdById is required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        description,
        price: price ? Number(price) : 0,
        isPaid: Boolean(isPaid),
        level: level || "BEGINNER",
        language: language || "hi",
        createdById,
      },
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
