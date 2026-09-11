import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, mobile, role } = body;

    if (!email && !mobile) {
      return NextResponse.json(
        { error: "Email or mobile number is required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: email ? { email } : { mobile },
      update: {
        name,
        mobile,
        ...(role ? { role } : {}),
      },
      create: {
        email,
        name,
        mobile,
        role: role || "STUDENT",
      },
    });

    return NextResponse.json({ user });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
