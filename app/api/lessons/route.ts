import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const moduleId = searchParams.get("moduleId");

    if (!moduleId) {
      return NextResponse.json(
        { error: "moduleId is required" },
        { status: 400 }
      );
    }

    const lessons = await prisma.lesson.findMany({
      where: { moduleId },
      include: { video: true, quiz: true, material: true },
      orderBy: { order: "asc" },
    });

    return NextResponse.json({ lessons });
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
      moduleId,
      title,
      description,
      order,
      isPreview,
      isPublished,
      duration,
      type,
    } = body;

    if (!moduleId || !title) {
      return NextResponse.json(
        { error: "moduleId and title are required" },
        { status: 400 }
      );
    }

    const lesson = await prisma.lesson.create({
      data: {
        moduleId,
        title,
        description,
        order: Number(order) || 1,
        isPreview: Boolean(isPreview),
        isPublished: Boolean(isPublished),
        duration: Number(duration) || 0,
        type: type || "VIDEO",
      },
    });

    return NextResponse.json({ lesson }, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
