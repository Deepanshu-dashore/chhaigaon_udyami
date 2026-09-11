import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, lessonId, isCompleted, watchedSeconds, lastPosition, progressPercent } = body;

    if (!userId || !lessonId) {
      return NextResponse.json(
        { error: "userId and lessonId are required" },
        { status: 400 }
      );
    }

    const completed = Boolean(isCompleted);

    const progress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      update: {
        isCompleted: isCompleted !== undefined ? completed : undefined,
        completedAt: completed ? new Date() : undefined,
        watchedSeconds:
          watchedSeconds !== undefined ? Number(watchedSeconds) : undefined,
        lastPosition:
          lastPosition !== undefined ? Number(lastPosition) : undefined,
        progressPercent:
          progressPercent !== undefined ? Number(progressPercent) : undefined,
      },
      create: {
        userId,
        lessonId,
        isCompleted: completed,
        completedAt: completed ? new Date() : null,
        watchedSeconds: Number(watchedSeconds) || 0,
        lastPosition: Number(lastPosition) || 0,
        progressPercent: Number(progressPercent) || 0,
      },
    });

    return NextResponse.json({ progress });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
