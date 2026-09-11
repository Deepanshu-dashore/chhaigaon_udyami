import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding Chhaigaon Udyami database...");

  // 1. Super Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@chhaigaonudyami.in" },
    update: {},
    create: {
      email: "admin@chhaigaonudyami.in",
      name: "Chhaigaon Udyami Admin",
      mobile: "+919876543210",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      isVerified: true,
      profile: {
        create: {
          bio: "Lead administrator for rural entrepreneurship incubation.",
          district: "Khandwa",
          state: "Madhya Pradesh",
        },
      },
    },
  });

  // 2. Government Schemes
  const schemes = [
    {
      title: "Pradhan Mantri Mudra Yojana (PMMY)",
      slug: "pmmy",
      department: "Ministry of Finance",
      description:
        "Collateral-free loans up to Rs. 10 Lakhs for small business units.",
      eligibility: "Non-corporate, non-farm small/micro enterprises.",
      benefits:
        "Shishu (up to 50k), Kishore (50k to 5L), Tarun (5L to 10L).",
      officialUrl: "https://www.mudra.org.in",
      status: true,
    },
    {
      title: "PM Formalisation of Micro food processing Enterprises (PMFME)",
      slug: "pmfme",
      department: "Ministry of Food Processing Industries",
      description:
        "Financial, technical and business support for micro food processing units.",
      eligibility:
        "Existing micro food processing entrepreneurs, FPOs, SHGs.",
      benefits:
        "Credit-linked capital subsidy @35% of eligible project cost with max ceiling of Rs. 10 lakh.",
      officialUrl: "https://pmfme.mofpi.gov.in",
      status: true,
    },
  ];

  for (const scheme of schemes) {
    await prisma.governmentScheme.upsert({
      where: { slug: scheme.slug },
      update: scheme,
      create: scheme,
    });
  }

  // 3. Startup Resources
  const resources = [
    {
      title: "Starting a Dal Mill Unit in Rural MP",
      category: "Food Processing",
      description:
        "Step-by-step guide to setting up a mini dal mill with machinery selection and licensing.",
      content:
        "Detailed feasibility report, capital requirement, electricity load, and FSSAI registration.",
      order: 1,
      status: true,
    },
    {
      title: "Solar-Powered Cold Storage Setup",
      category: "Agritech",
      description:
        "Preserve perishable harvest and sell at premium prices during offseason.",
      content:
        "Solar capacity sizing, subsidy under NABARD scheme, and ROI calculation.",
      order: 2,
      status: true,
    },
  ];

  for (const res of resources) {
    const existing = await prisma.startupResource.findFirst({
      where: { title: res.title },
    });
    if (!existing) {
      await prisma.startupResource.create({ data: res });
    }
  }

  // 4. Sample Course with Modules and Lessons
  const sampleCourse = await prisma.course.upsert({
    where: { slug: "organic-farming-enterprise" },
    update: {},
    create: {
      title: "जैविक खेती एवं ग्रामीण कृषि उद्यम (Organic Farming Enterprise)",
      slug: "organic-farming-enterprise",
      description:
        "प्राकृतिक खेती, जैविक खाद निर्माण, और फसल के सीधे विपणन से लाभदायक उद्यम शुरू करने का संपूर्ण मार्गदर्शक कोर्स।",
      language: "hi",
      price: 499.0,
      isPaid: true,
      level: "BEGINNER",
      duration: 180,
      status: "PUBLISHED",
      createdById: adminUser.id,
      publishedAt: new Date(),
      modules: {
        create: [
          {
            title: "मॉड्यूल 1: जैविक खेती का आधार और मिट्टी की तैयारी",
            order: 1,
            lessons: {
              create: [
                {
                  title: "पाठ 1: जैविक खेती क्यों और कैसे?",
                  order: 1,
                  type: "VIDEO",
                  duration: 600,
                  isPreview: true,
                  isPublished: true,
                },
                {
                  title: "पाठ 2: जीवामृत और बीजामृत निर्माण विधि",
                  order: 2,
                  type: "VIDEO",
                  duration: 900,
                  isPreview: false,
                  isPublished: true,
                },
              ],
            },
          },
        ],
      },
    },
  });

  console.log(`✅ Seeded sample course: ${sampleCourse.title}`);
  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
