import prisma from "@/lib/prisma";

export async function getActiveSchemes(department?: string) {
  return prisma.governmentScheme.findMany({
    where: {
      status: true,
      ...(department ? { department } : {}),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getSchemeBySlug(slug: string) {
  return prisma.governmentScheme.findUnique({
    where: { slug },
  });
}
