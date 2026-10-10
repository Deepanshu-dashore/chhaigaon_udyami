import prisma from "@/lib/prisma";
import {
  defaultSchemes,
  SchemeData,
  CATEGORY_LABELS,
  SchemeFilterOptions,
} from "@/lib/data/default-schemes";

export interface SchemeQueryOptions {
  query?: string;
  category?: string;
  department?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

// Helper to determine category from text if null
function inferCategory(text: string): string {
  const lower = text.toLowerCase();
  if (
    lower.includes("subsidy") ||
    lower.includes("अनुदान") ||
    lower.includes("pmegp") ||
    lower.includes("pmfme") ||
    lower.includes("उद्यानिकी") ||
    lower.includes("गौ-संवर्धन") ||
    lower.includes("nrlm") ||
    lower.includes("aajeevika")
  ) {
    return "subsidy";
  }
  if (
    lower.includes("loan") ||
    lower.includes("ऋण") ||
    lower.includes("mudra") ||
    lower.includes("mmuky") ||
    lower.includes("क्रांति") ||
    lower.includes("pmmy")
  ) {
    return "loan";
  }
  if (
    lower.includes("stipend") ||
    lower.includes("स्टाइपेंड") ||
    lower.includes("mmsky") ||
    lower.includes("कमाओ")
  ) {
    return "stipend";
  }
  if (
    lower.includes("training") ||
    lower.includes("प्रशिक्षण") ||
    lower.includes("कौशल")
  ) {
    return "training";
  }
  return "other";
}

// Circuit-breaker state to prevent 20-second connection timeouts when remote DB is unreachable
let isDbUnreachable = false;
let lastDbCheckTimestamp = 0;
const DB_RETRY_COOLDOWN_MS = 60_000; // Wait 60s before retrying unreachable DB
const DB_QUERY_TIMEOUT_MS = 2000; // 2-second strict timeout on DB fetch

async function safeFetchDbSchemes() {
  const now = Date.now();
  if (isDbUnreachable && now - lastDbCheckTimestamp < DB_RETRY_COOLDOWN_MS) {
    return [];
  }

  try {
    const queryPromise = prisma.governmentScheme.findMany({
      where: { status: true },
      orderBy: { createdAt: "desc" },
    });

    const timeoutPromise = new Promise<never>((_, reject) => {
      const timer = setTimeout(() => {
        reject(new Error("DB_TIMEOUT"));
      }, DB_QUERY_TIMEOUT_MS);
      if (typeof timer === "object" && "unref" in timer) {
        (timer as unknown as { unref: () => void }).unref();
      }
    });

    const result = await Promise.race([queryPromise, timeoutPromise]);
    isDbUnreachable = false;
    return result;
  } catch (err: unknown) {
    isDbUnreachable = true;
    lastDbCheckTimestamp = Date.now();
    const errMsg = (err as { code?: string; message?: string })?.code || "UNREACHABLE";
    console.warn(`[SchemeService] DB lookup notice: ${errMsg}. Serving default schemes without latency.`);
    return [];
  }
}

export async function getSchemes(options: SchemeQueryOptions = {}): Promise<{
  schemes: SchemeData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filterOptions: SchemeFilterOptions;
}> {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Number(options.limit) || 6);

  let allSchemes: SchemeData[] = [...defaultSchemes];

  try {
    const dbSchemes = await safeFetchDbSchemes();

    if (dbSchemes && dbSchemes.length > 0) {
      // Merge dbSchemes with defaultSchemes to ensure complete rich data
      const mergedMap = new Map<string, SchemeData>();

      // Add default schemes first
      defaultSchemes.forEach((s) => mergedMap.set(s.slug, s));

      // Overlay DB schemes or add new ones
      dbSchemes.forEach((s) => {
        const existing = mergedMap.get(s.slug);
        const inferred = inferCategory(`${s.title} ${s.description ?? ""} ${s.benefits ?? ""}`);
        const categoryVal =
          (s as unknown as { category?: string }).category ||
          existing?.category ||
          inferred;

        mergedMap.set(s.slug, {
          id: s.id,
          title: existing?.title || s.title,
          slug: s.slug,
          department: existing?.department || s.department,
          category: categoryVal,
          description: existing?.description || s.description,
          benefits: existing?.benefits || s.benefits,
          eligibility: existing?.eligibility || s.eligibility,
          requiredDocuments: existing?.requiredDocuments || s.requiredDocuments,
          applicationProcess: existing?.applicationProcess || s.applicationProcess,
          officialUrl: s.officialUrl || existing?.officialUrl || null,
          lastUpdated: s.lastUpdated
            ? s.lastUpdated.toISOString().split("T")[0]
            : existing?.lastUpdated || null,
        });
      });

      allSchemes = Array.from(mergedMap.values());
    }
  } catch {
    allSchemes = [...defaultSchemes];
  }

  // Calculate filter options from full list
  const categoryCountMap = new Map<string, number>();
  const departmentCountMap = new Map<string, number>();

  allSchemes.forEach((s) => {
    const cat = s.category || "other";
    categoryCountMap.set(cat, (categoryCountMap.get(cat) || 0) + 1);

    if (s.department) {
      departmentCountMap.set(s.department, (departmentCountMap.get(s.department) || 0) + 1);
    }
  });

  const categories = Array.from(categoryCountMap.entries()).map(([value, count]) => ({
    value,
    label: CATEGORY_LABELS[value] ?? value,
    count,
  }));

  const departments = Array.from(departmentCountMap.entries()).map(([value, count]) => ({
    value,
    label: value,
    count,
  }));

  // Apply filters
  let filtered = allSchemes;

  if (options.category && options.category !== "all") {
    const cats = options.category.split(",").map((c) => c.trim().toLowerCase());
    filtered = filtered.filter((s) => cats.includes((s.category || "").toLowerCase()));
  }

  if (options.department && options.department !== "all") {
    const depts = options.department.split(",").map((d) => d.trim().toLowerCase());
    filtered = filtered.filter((s) => depts.includes((s.department || "").toLowerCase()));
  }

  if (options.query && options.query.trim()) {
    const q = options.query.trim().toLowerCase();
    filtered = filtered.filter((s) => {
      return (
        s.title.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q) ||
        (s.department || "").toLowerCase().includes(q) ||
        (s.benefits || "").toLowerCase().includes(q) ||
        (s.eligibility || "").toLowerCase().includes(q) ||
        (s.requiredDocuments || "").toLowerCase().includes(q)
      );
    });
  }

  // Apply sorting
  if (options.sort === "title_asc") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title, "hi"));
  } else if (options.sort === "updated_desc") {
    filtered = [...filtered].sort((a, b) =>
      (b.lastUpdated || "").localeCompare(a.lastUpdated || "")
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const safePage = Math.min(page, totalPages);
  const startIndex = (safePage - 1) * limit;
  const paginatedSchemes = filtered.slice(startIndex, startIndex + limit);

  return {
    schemes: paginatedSchemes,
    total,
    page: safePage,
    limit,
    totalPages,
    filterOptions: {
      categories,
      departments,
    },
  };
}

export async function getActiveSchemes(department?: string) {
  try {
    const res = await getSchemes({ department, limit: 100 });
    return res.schemes;
  } catch {
    return defaultSchemes;
  }
}

export async function getSchemeBySlug(slug: string) {
  try {
    const res = await getSchemes({ limit: 100 });
    return res.schemes.find((s) => s.slug === slug) ?? null;
  } catch {
    return defaultSchemes.find((s) => s.slug === slug) ?? null;
  }
}
