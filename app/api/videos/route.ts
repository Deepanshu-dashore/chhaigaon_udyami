import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { generateVdoCipherOtp } from "@/lib/vdocipher";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { videoId, userWatermark } = body;

    if (!videoId) {
      return NextResponse.json({ error: "videoId is required" }, { status: 400 });
    }

    const otpData = await generateVdoCipherOtp(videoId, userWatermark);
    return NextResponse.json(otpData);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const videos = await prisma.video.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ videos });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
