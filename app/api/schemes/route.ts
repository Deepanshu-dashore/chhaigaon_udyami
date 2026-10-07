import { NextRequest, NextResponse } from "next/server";
import { getSchemes } from "@/services/scheme.service";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const query =
      searchParams.get("query") ||
      searchParams.get("search") ||
      searchParams.get("q") ||
      undefined;
    const category = searchParams.get("category") || undefined;
    const department = searchParams.get("department") || undefined;
    const sort = searchParams.get("sort") || undefined;
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 6;

    const result = await getSchemes({
      query,
      category,
      department,
      sort,
      page,
      limit,
    });

    return NextResponse.json(
      {
        success: true,
        data: result.schemes,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
        filterOptions: result.filterOptions,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("Error in /api/schemes:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch government schemes",
      },
      { status: 500 }
    );
  }
}
