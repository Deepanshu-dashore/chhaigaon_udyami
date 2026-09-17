import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { getServiceSupabase } from "@/lib/supabase";
import { CreateUserSchema } from "@/lib/schemas/user.schema";

export const dynamic = "force-dynamic";

// GET /api/admin/users - List users with search & filters
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.trim();
    const role = searchParams.get("role")?.trim();
    const status = searchParams.get("status")?.trim();
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    if (role && role !== "ALL") {
      where.role = role;
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { mobile: { contains: search, mode: "insensitive" } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          profile: true,
          _count: {
            select: {
              enrollments: true,
              certificates: true,
              activityLogs: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Admin Users GET API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Create a new user (PostgreSQL + Supabase Auth)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validated = CreateUserSchema.parse(body);

    // 1. Check for existing user by email or mobile
    if (validated.email) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: validated.email },
      });
      if (existingEmail) {
        return NextResponse.json(
          { success: false, error: "इस ईमेल से उपयोगकर्ता पहले से मौजूद है।" },
          { status: 409 }
        );
      }
    }

    if (validated.mobile) {
      const existingMobile = await prisma.user.findUnique({
        where: { mobile: validated.mobile },
      });
      if (existingMobile) {
        return NextResponse.json(
          { success: false, error: "इस मोबाइल नंबर से उपयोगकर्ता पहले से मौजूद है।" },
          { status: 409 }
        );
      }
    }

    let supabaseUserId = validated.supabaseUserId || null;

    // 2. If email and password provided, create Supabase Auth User
    if (validated.email && validated.password) {
      try {
        const serviceSupabase = getServiceSupabase();
        const { data: authData, error: authError } =
          await serviceSupabase.auth.admin.createUser({
            email: validated.email,
            password: validated.password,
            email_confirm: true,
            user_metadata: {
              name: validated.name,
              role: validated.role,
              mobile: validated.mobile,
            },
          });

        if (authError) {
          console.warn("Supabase Auth user creation skipped/failed:", authError);
        } else if (authData?.user) {
          supabaseUserId = authData.user.id;
        }
      } catch (authErr) {
        console.warn("Service role auth creation warning:", authErr);
      }
    }

    // 3. Create user in Prisma PostgreSQL
    const newUser = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email || null,
        mobile: validated.mobile || null,
        role: validated.role,
        status: validated.status,
        isVerified: validated.isVerified,
        supabaseUserId,
        profile: {
          create: {
            state: "Madhya Pradesh",
          },
        },
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "उपयोगकर्ता सफलतापूर्वक बनाया गया!",
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Admin Users POST API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "उपयोगकर्ता बनाने में त्रुटि हुई" },
      { status: 400 }
    );
  }
}
