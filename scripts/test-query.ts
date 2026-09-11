import prisma from "../lib/prisma";

async function main() {
  console.log("Connecting to database with Prisma 7 + @prisma/adapter-pg...");

  const userCount = await prisma.user.count();
  console.log("Total users count:", userCount);

  const courses = await prisma.course.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      price: true,
      status: true,
      publishedAt: true,
      modules: {
        include: {
          lessons: true,
        },
      },
    },
    take: 5,
  });
  console.log("Courses preview:", courses);
}

main()
  .catch((e) => {
    console.error("Query Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
