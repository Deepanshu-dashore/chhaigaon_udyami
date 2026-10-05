import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding Chhaigaon Udyami database with 12 enterprise courses...");

  // 1. Super Admin User
  const adminUser = await prisma.user.upsert({
    where: { email: "dipanshu.dashore.dev@gmail.com" },
    update: {
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      isVerified: true,
    },
    create: {
      email: "dipanshu.dashore.dev@gmail.com",
      name: "Deepanshu Dashore",
      mobile: "+919876543210",
      role: "SUPER_ADMIN",
      status: "ACTIVE",
      isVerified: true,
      profile: {
        create: {
          bio: "Super Administrator for Chhaigaon Udyami platform.",
          district: "Khandwa",
          state: "Madhya Pradesh",
        },
      },
    },
  });

  await prisma.user.upsert({
    where: { email: "admin@chhaigaonudyami.in" },
    update: {
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
    create: {
      email: "admin@chhaigaonudyami.in",
      name: "Chhaigaon Udyami Admin",
      mobile: "+919876543211",
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

  // 3. Courses Array
  const coursesToSeed = [
    {
      title: "आधुनिक डेयरी फार्मिंग एवं दुग्ध उत्पाद प्रसंस्करण (Dairy Masterclass 2026)",
      slug: "dairy-farming-entrepreneurship",
      description: "नस्ल सुधार, साइलेज मेकिंग, ऑटोमेटेड मिल्किंग और पनीर/घी प्रसंस्करण से ₹1 लाख/माह का शुद्ध मुनाफा कमाएं।",
      language: "hi",
      price: 1299.0,
      isPaid: true,
      level: "BEGINNER",
      duration: 390,
      thumbnail: "/images/dairy-course.jpg",
      status: "PUBLISHED",
    },
    {
      title: "मिनी दाल मिल एवं मसाला उद्योग: सेटअप, FSSAI और पैकेजिंग",
      slug: "food-processing-enterprise",
      description: "अनाज एवं मसालों की क्लीनिंग, ग्रेडिंग, पल्वराइजर मशीनरी चयन, ब्रांडिंग एवं FSSAI लाइसेंसिंग की पूरी विधि।",
      language: "hi",
      price: 999.0,
      isPaid: true,
      level: "INTERMEDIATE",
      duration: 300,
      thumbnail: "/images/food-processing.jpg",
      status: "PUBLISHED",
    },
    {
      title: "PMEGP एवं मुख्यमंत्री उद्यम क्रांति: ₹50 लाख बैंक DPR एवं 35% सब्सिडी मास्टरक्लास",
      slug: "pmegp-subsidy-dpr-masterclass",
      description: "प्रोजेक्ट रिपोर्ट (DPR), बैलेंस शीट प्रोजेक्शन, ऑनलाइन आवेदन एवं बैंक इंटरव्यू पास करने की संपूर्ण चरणबद्ध गाइड।",
      language: "hi",
      price: 799.0,
      isPaid: true,
      level: "ALL_LEVELS",
      duration: 270,
      thumbnail: "/images/coursera-hero-banner.jpg",
      status: "PUBLISHED",
    },
    {
      title: "प्राकृतिक एवं जैविक खेती: जीवामृत, वर्मीकम्पोस्ट और सीधे उपभोक्ता विपणन",
      slug: "organic-farming-enterprise",
      description: "प्राकृतिक खेती, जैविक खाद निर्माण, और फसल के सीधे विपणन से लाभदायक उद्यम शुरू करने का संपूर्ण मार्गदर्शक कोर्स।",
      language: "hi",
      price: 0,
      isPaid: false,
      level: "BEGINNER",
      duration: 228,
      thumbnail: "/images/organic-farming.jpg",
      status: "PUBLISHED",
    },
    {
      title: "ग्रामीण ई-कॉमर्स व डिजिटल दुकान: ONDC, व्हाट्सएप बिजनेस एवं सोशल मीडिया सेलिंग",
      slug: "digital-business-ondc-mastery",
      description: "बिना किसी बिचौलिए के अपने उत्पाद सीधे पूरे भारत में बेचें। ONDC कैटलॉगिंग, पेमेंट गेटवे और शिपिंग सेटअप।",
      language: "hi",
      price: 899.0,
      isPaid: true,
      level: "INTERMEDIATE",
      duration: 252,
      thumbnail: "/images/digital-business.jpg",
      status: "PUBLISHED",
    },
    {
      title: "सोलर पंप एवं रूफटॉप सोलर उद्यम: इंस्टालेशन, मेंटेनेंस और सरकारी सब्सिडी",
      slug: "solar-energy-enterprise",
      description: "पीएम कुसुम योजना सोलर पंप इंस्टालेशन, नेट मीटरिंग और ग्रामीण सर्विस सेंटर का लाभदायक मॉडल सीखें।",
      language: "hi",
      price: 1499.0,
      isPaid: true,
      level: "ADVANCED",
      duration: 420,
      thumbnail: "/images/solar-enterprise.jpg",
      status: "PUBLISHED",
    },
    {
      title: "कमर्शियल गोट फार्मिंग (बकरी पालन) एवं वैज्ञानिक नस्ल सुधार",
      slug: "goat-farming-livestock-enterprise",
      description: "सिरोही, जमनापारी व बोअर नस्ल चयन, शेड निर्माण, हरा चारा एवं बकरा ईद/लोकल मार्केट डायरेक्ट सेलिंग से ₹80,000/माह कमाई।",
      language: "hi",
      price: 799.0,
      isPaid: true,
      level: "BEGINNER",
      duration: 312,
      thumbnail: "/images/goat-farming.jpg",
      status: "PUBLISHED",
    },
    {
      title: "पॉलीहाउस खेती व ड्रिप ऑटोमेशन: शिमला मिर्च व खीरा उत्पादन मास्टरक्लास",
      slug: "polyhouse-hightech-agriculture",
      description: "पॉलीहाउस में बेमौसम उच्च गुणवत्ता सब्जियों की खेती। NHB 50% राष्ट्रीय बागवानी मिशन सब्सिडी एवं बैंक DPR।",
      language: "hi",
      price: 1199.0,
      isPaid: true,
      level: "ADVANCED",
      duration: 360,
      thumbnail: "/images/polyhouse-farming.jpg",
      status: "PUBLISHED",
    },
    {
      title: "बटन व ऑयस्टर मशरूम उत्पादन, सुखाकर पैकेजिंग व ब्रांडिंग",
      slug: "mushroom-farming-processing",
      description: "कम स्थान व न्यूनतम पूंजी में मशरूम फार्मिंग। कंपोस्ट मेकिंग, स्पॉन मेकिंग, ड्राई मशरूम पाउडर पैकेजिंग व FSSAI मार्केटिंग।",
      language: "hi",
      price: 0,
      isPaid: false,
      level: "BEGINNER",
      duration: 240,
      thumbnail: "/images/mushroom-farming.jpg",
      status: "PUBLISHED",
    },
    {
      title: "बायोफ्लॉक मछली पालन एवं प्रधानमंत्री मत्स्य संपदा योजना (PMMSY)",
      slug: "biofloc-fish-farming-aquaculture",
      description: "10,000 लीटर बायोफ्लॉक टैंक में पंगासियस व तिलपिया पालन। जल गुणवत्ता, C/N रेश्यो, प्रोबायोटिक एवं 60% मत्स्य सब्सिडी।",
      language: "hi",
      price: 1399.0,
      isPaid: true,
      level: "INTERMEDIATE",
      duration: 408,
      thumbnail: "/images/biofloc-fish.jpg",
      status: "PUBLISHED",
    },
    {
      title: "कड़कनाथ एवं देसी मुर्गी पालन (Poultry Enterprise Masterclass)",
      slug: "poultry-kadaknath-farming",
      description: "झाबुआ कड़कनाथ व बैकयार्ड देसी पोल्ट्री। ऑटोमैटिक ब्रूडिंग, टीकाकरण, कम लागत फीड एवं अंडों/चूजों की डायरेक्ट सेलिंग।",
      language: "hi",
      price: 699.0,
      isPaid: true,
      level: "BEGINNER",
      duration: 288,
      thumbnail: "/images/poultry-farming.jpg",
      status: "PUBLISHED",
    },
    {
      title: "कस्टम हायरिंग सेंटर: कृषि यंत्र बैंक, रोटावेटर व सोलर ड्रायर भाड़ा व्यवसाय",
      slug: "custom-hiring-center-agro-machinery",
      description: "ट्रैक्टर, हार्वेस्टर एवं सोलर ड्रायर का कस्टम हायरिंग सेवा केंद्र। MP कृषि अभियांत्रिकी 50% अनुदान योजना एवं DPR।",
      language: "hi",
      price: 1099.0,
      isPaid: true,
      level: "ALL_LEVELS",
      duration: 330,
      thumbnail: "/images/custom-hiring.jpg",
      status: "PUBLISHED",
    },
  ];

  for (const cData of coursesToSeed) {
    const course = await prisma.course.upsert({
      where: { slug: cData.slug },
      update: {
        title: cData.title,
        description: cData.description,
        price: cData.price,
        isPaid: cData.isPaid,
        thumbnail: cData.thumbnail,
        status: cData.status as any,
        level: cData.level as any,
      },
      create: {
        title: cData.title,
        slug: cData.slug,
        description: cData.description,
        language: cData.language,
        price: cData.price,
        isPaid: cData.isPaid,
        level: cData.level as any,
        duration: cData.duration,
        thumbnail: cData.thumbnail,
        status: cData.status as any,
        createdById: adminUser.id,
        publishedAt: new Date(),
        modules: {
          create: [
            {
              title: "मॉड्यूल 1: व्यावसायिक आधार एवं प्रारंभिक तैयारी",
              order: 1,
              lessons: {
                create: [
                  {
                    title: "पाठ 1: परिचय व सम्भावनाएं",
                    order: 1,
                    type: "VIDEO",
                    duration: 900,
                    isPreview: true,
                    isPublished: true,
                  },
                  {
                    title: "पाठ 2: वैज्ञानिक स्थापना व शेड निर्माण",
                    order: 2,
                    type: "VIDEO",
                    duration: 1200,
                    isPreview: false,
                    isPublished: true,
                  },
                ],
              },
            },
            {
              title: "मॉड्यूल 2: बैंक लोन (DPR) एवं 35% सब्सिडी प्रक्रिया",
              order: 2,
              lessons: {
                create: [
                  {
                    title: "पाठ 1: PMEGP / सब्सिडी ऑनलाइन आवेदन गाइड",
                    order: 1,
                    type: "VIDEO",
                    duration: 1500,
                    isPreview: false,
                    isPublished: true,
                  },
                  {
                    title: "प्रश्नोत्तरी: ज्ञान एवं सब्सिडी मूल्यांकन परीक्षा",
                    order: 2,
                    type: "QUIZ",
                    duration: 600,
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
    console.log(`✅ Seeded/Updated course: ${course.title}`);
  }

  console.log("✅ Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
