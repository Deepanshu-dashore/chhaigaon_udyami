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
    const status = searchParams.get("status") || "ALL";

    const whereClause: any = {};
    if (status !== "ALL") {
      whereClause.status = status;
    }

    if (search) {
      whereClause.OR = [
        { razorpayOrderId: { contains: search, mode: "insensitive" } },
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { course: { title: { contains: search, mode: "insensitive" } } },
      ];
    }

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    const [orders, total, totalRevenueAggregate, paidCount, pendingCount] = await Promise.all([
      prisma.order.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              mobile: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
              price: true,
            },
          },
          payment: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.order.count({ where: whereClause }),
      prisma.order.aggregate({
        _sum: { amount: true },
        where: { status: "PAID" },
      }),
      prisma.order.count({ where: { status: "PAID" } }),
      prisma.order.count({ where: { status: "CREATED" } }),
    ]);

    return NextResponse.json({
      success: true,
      data: orders,
      stats: {
        totalRevenue: totalRevenueAggregate._sum.amount ? Number(totalRevenueAggregate._sum.amount) : 0,
        paidCount,
        pendingCount,
        totalOrders: total,
      },
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("GET /api/admin/payments error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch payments data" },
      { status: 500 }
    );
  }
}
