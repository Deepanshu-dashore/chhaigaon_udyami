import "dotenv/config";
import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding Chhaigaon Udyami database with 12 enterprise courses with full details...");

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
      description: "Collateral-free loans up to Rs. 10 Lakhs for small business units.",
      eligibility: "Non-corporate, non-farm small/micro enterprises.",
      benefits: "Shishu (up to 50k), Kishore (50k to 5L), Tarun (5L to 10L).",
      officialUrl: "https://www.mudra.org.in",
      status: true,
    },
    {
      title: "PM Formalisation of Micro food processing Enterprises (PMFME)",
      slug: "pmfme",
      department: "Ministry of Food Processing Industries",
      description: "Financial, technical and business support for micro food processing units.",
      eligibility: "Existing micro food processing entrepreneurs, FPOs, SHGs.",
      benefits: "Credit-linked capital subsidy @35% of eligible project cost with max ceiling of Rs. 10 lakh.",
      officialUrl: "https://pmfme.mofpi.gov.in",
      status: true,
    },
    {
      title: "Prime Minister's Employment Generation Programme (PMEGP)",
      slug: "pmegp",
      department: "Ministry of MSME",
      description: "Credit-linked subsidy programme to generate self-employment in rural and urban areas.",
      eligibility: "Individuals aged 18+, SHGs, Co-operative societies.",
      benefits: "Subsidy up to 35% in rural areas for projects up to Rs. 50 Lakhs (Manufacturing) and Rs. 20 Lakhs (Service).",
      officialUrl: "https://kviconline.gov.in/pmegpeportal",
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

  // 3. Courses Array with Full Details (All PAID)
  const coursesToSeed = [
    {
      title: "आधुनिक डेयरी फार्मिंग एवं दुग्ध उत्पाद प्रसंस्करण (Dairy Masterclass 2026)",
      slug: "dairy-farming-entrepreneurship",
      description: "15 दुधारू पशुओं के डेयरी फार्म की वैज्ञानिक स्थापना, BMC मिल्क चिलिंग, अमूल/सांची दुग्ध संघ लिंकेज एवं PMEGP ₹25 लाख लोन तथा 35% सरकारी सब्सिडी गाइड।",
      language: "hi",
      price: 1299.0,
      isPaid: true,
      level: "BEGINNER",
      duration: 390,
      thumbnail: "/images/dairy-course.jpg",
      status: "PUBLISHED",
      modules: [
        {
          title: "मॉड्यूल 1: व्यावसायिक डेयरी फार्मिंग की नींव व स्थान चयन",
          order: 1,
          description: "उन्नत नस्ल चयन, शेड निर्माण लेआउट, हवा व जल निकासी व्यवस्था।",
          lessons: [
            { title: "भारत में डेयरी उद्योग का भविष्य, मांग एवं आय क्षमता", order: 1, type: "VIDEO", duration: 900, isPreview: true },
            { title: "उन्नत नस्लों (गिर, साहिवाल, मुर्राह) का वैज्ञानिक चयन", order: 2, type: "VIDEO", duration: 1500, isPreview: true },
            { title: "वैज्ञानिक पशु शेड का ब्लूप्रिंट डिज़ाइन एवं लागत अनुमान", order: 3, type: "VIDEO", duration: 2100, isPreview: false },
            { title: "10 दुधारू पशु शेड ब्लूप्रिंट गाइड (DPR Tool)", order: 4, type: "RESOURCE", duration: 300, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: डेयरी स्थापना मूल्यांकन परीक्षा", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: वैज्ञानिक पोषण आहार, मक्का साइलेज व टीएमआर प्रबंधन",
          order: 2,
          description: "हरा चारा चक्र, साइलेज (आचार) गड्ढा निर्माण, टीएमआर आहार फार्मूलेशन।",
          lessons: [
            { title: "मक्का साइलेज (Silage) बनाने की वैज्ञानिक विधि व गड्ढा निर्माण", order: 1, type: "VIDEO", duration: 1800, isPreview: false },
            { title: "TMR (टोटल मिक्स्ड राशन) से दूध उत्पादन 25% बढ़ाना", order: 2, type: "VIDEO", duration: 1200, isPreview: false },
            { title: "पशु पोषण एवं संतुलित आहार तालिका कैलकुलेटर", order: 3, type: "RESOURCE", duration: 300, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: पशु पोषण एवं आहार परीक्षा", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: ऑटोमैटिक बल्क मिल्क कूलर (BMC), फैट टेस्टिंग व FSSAI",
          order: 3,
          description: "दूध का चिलिंग प्लांट, फैट-SNF टेस्टिंग, पनीर-घी वैल्यू एडिशन व FSSAI लाइसेंस।",
          lessons: [
            { title: "BMC चिलिंग प्लांट इंस्टालेशन, फैट टेस्टिंग व कोल्ड चेन", order: 1, type: "VIDEO", duration: 1600, isPreview: false },
            { title: "पनीर, खोया एवं देशी बिलोना घी वैल्यू एडिशन यूनिट", order: 2, type: "VIDEO", duration: 1400, isPreview: false },
            { title: "FSSAI खाद्य सुरक्षा डेयरिंग रजिस्ट्रेशन गाइडलाइन", order: 3, type: "RESOURCE", duration: 300, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 3: प्रसंस्करण एवं गुणवत्ता नियंत्रण परीक्षा", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 4: PMEGP ₹25 लाख बैंक लोन व 35% सब्सिडी मास्टरक्लास",
          order: 4,
          description: "बैंक-स्वीकृत प्रोजेक्ट रिपोर्ट (DPR), ऑनलाइन फाइलिंग, बैंक इंटरव्यू व सब्सिडी क्लेम।",
          lessons: [
            { title: "PMEGP एवं MP उद्यम क्रांति पोर्टल पर 35% सब्सिडी ऑनलाइन आवेदन", order: 1, type: "VIDEO", duration: 2000, isPreview: false },
            { title: "बैंक मैनेजर इंटरव्यू के आवश्यक 15 सवाल व समाधान", order: 2, type: "VIDEO", duration: 1500, isPreview: false },
            { title: "₹25 लाख बैंक-स्वीकृत डेयरी प्रोजेक्ट रिपोर्ट (DPR Excel/PDF)", order: 3, type: "RESOURCE", duration: 300, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: डेयरी उद्यम मास्टरक्लास", passingPercentage: 80 },
        },
      ],
    },
    {
      title: "मिनी दाल मिल एवं मसाला उद्योग: सेटअप, FSSAI और पैकेजिंग",
      slug: "food-processing-enterprise",
      description: "अनाज एवं मसालों की क्लीनिंग, ग्रेडिंग, पल्वराइजर मशीनरी चयन, पाउच पैकेजिंग, FSSAI लाइसेंसिंग एवं 35% PMFME सरकारी सब्सिडी।",
      language: "hi",
      price: 999.0,
      isPaid: true,
      level: "INTERMEDIATE",
      duration: 300,
      thumbnail: "/images/food-processing.jpg",
      status: "PUBLISHED",
      modules: [
        {
          title: "मॉड्यूल 1: मिनी दाल मिल व मसाला प्लांट प्लानिंग व मशीनरी चयन",
          order: 1,
          description: "प्लांट लेआउट, पल्वराइजर, क्लीनर, ग्रेडर एवं बिजली लोड आवश्यकता।",
          lessons: [
            { title: "दाल व मसाला उद्योग में बाजार की मांग व लाभ का गणित", order: 1, type: "VIDEO", duration: 1200, isPreview: true },
            { title: "मिनी दाल मिल एवं स्पाइस ग्राइंडिंग मशीनरी चयन गाइड", order: 2, type: "VIDEO", duration: 1500, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: मशीनरी व प्लांट प्लानिंग टेस्ट", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: FSSAI खाद्य सुरक्षा अनुज्ञप्ति, पैकेजिंग व बारकोडिंग",
          order: 2,
          description: "FSSAI रजिस्ट्रेशन, नाइट्रोजन फ्लश पैकेजिंग, न्यूट्रिशन फैक्ट्स व एक्सपायरी कोडिंग।",
          lessons: [
            { title: "FSSAI स्टेट व सेंट्रल लाइसेंस ऑनलाइन आवेदन विधि", order: 1, type: "VIDEO", duration: 1800, isPreview: false },
            { title: "आकर्षक पाउच प्रिंटिंग, बारकोड एवं पोषण मूल्य लेबलिंग", order: 2, type: "VIDEO", duration: 1400, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: FSSAI एवं पैकेजिंग अनुपालन टेस्ट", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: PMFME 35% सब्सिडी योजना व मार्केट लिंकेज",
          order: 3,
          description: "₹10 लाख तक क्रेडिट-लिंक्ड सब्सिडी, होलसेल सप्लायर नेटवर्क एवं रिटेल काउंटर।",
          lessons: [
            { title: "PMFME पोर्टल पर 35% सब्सिडी आवेदन एवं बैंक DPR", order: 1, type: "VIDEO", duration: 2100, isPreview: false },
            { title: "स्थानीय किराना स्टोर, सुपरमार्केट एवं ऑनलाइन बिक्री नेटवर्क", order: 2, type: "VIDEO", duration: 1600, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: खाद्य प्रसंस्करण उद्योग", passingPercentage: 80 },
        },
      ],
    },
    {
      title: "PMEGP एवं मुख्यमंत्री उद्यम क्रांति: ₹50 लाख बैंक DPR एवं 35% सब्सिडी",
      slug: "pmegp-subsidy-dpr-masterclass",
      description: "प्रोजेक्ट रिपोर्ट (DPR), बैलेंस शीट प्रोजेक्शन, ऑनलाइन आवेदन एवं बैंक इंटरव्यू पास करने की संपूर्ण चरणबद्ध गाइड।",
      language: "hi",
      price: 799.0,
      isPaid: true,
      level: "ALL_LEVELS",
      duration: 270,
      thumbnail: "/images/coursera-hero-banner.jpg",
      status: "PUBLISHED",
      modules: [
        {
          title: "मॉड्यूल 1: PMEGP एवं MP उद्यम क्रांति योजना नियम व पात्रता",
          order: 1,
          description: "सब्सिडी प्रतिशत, कोटा, शैक्षणिक योग्यता, प्रोजेक्ट लागत सीमा।",
          lessons: [
            { title: "योजना नियम, ग्रामीण व शहरी सब्सिडी अंतर (15% से 35%)", order: 1, type: "VIDEO", duration: 1200, isPreview: true },
            { title: "आवश्यक सरकारी दस्तावेज व पात्रता चेकलिस्ट", order: 2, type: "VIDEO", duration: 900, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: योजना पात्रता परीक्षा", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: बैंक-स्वीकृत प्रोजेक्ट रिपोर्ट (DPR) तैयार करना",
          order: 2,
          description: "Excel DPR कैलकुलेटर, DSCR अनुपात, 5 वर्षीय लाभ-हानि प्रोजेक्शन।",
          lessons: [
            { title: "DPR के 8 प्रमुख स्तंभ: मशीनरी, कच्चा माल, कार्यशील पूंजी", order: 1, type: "VIDEO", duration: 1800, isPreview: false },
            { title: "DSCR एवं ब्रेक-ईवन पॉइंट कैलकुलेशन मास्टरक्लास", order: 2, type: "VIDEO", duration: 1500, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: DPR एवं वित्तीय विश्लेषण परीक्षा", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: ऑनलाइन आवेदन, DIC स्क्रूटनी एवं बैंक मैनेजर इंटरव्यू",
          order: 3,
          description: "पोर्टल फाइलिंग, टास्क फोर्स कमिटी, सैंक्शन लेटर व सब्सिडी डिस्बर्सल।",
          lessons: [
            { title: "KVIC PMEGP पोर्टल पर लाइव ऑनलाइन फॉर्म भरना", order: 1, type: "VIDEO", duration: 2400, isPreview: false },
            { title: "बैंक मैनेजर इंटरव्यू में सफल होने के व्यावहारिक तरीके", order: 2, type: "VIDEO", duration: 1500, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: सरकारी सब्सिडी व DPR", passingPercentage: 80 },
        },
      ],
    },
    {
      title: "प्राकृतिक एवं जैविक खेती: जीवामृत, वर्मीकम्पोस्ट और सीधे उपभोक्ता विपणन",
      slug: "organic-farming-enterprise",
      description: "प्राकृतिक खेती, जैविक खाद निर्माण, वर्मीकम्पोस्ट यूनिट, NPOP जैविक प्रमाणीकरण और सीधे उपभोक्ता विपणन से लाभदायक उद्यम।",
      language: "hi",
      price: 899.0,
      isPaid: true,
      level: "BEGINNER",
      duration: 228,
      thumbnail: "/images/organic-farming.jpg",
      status: "PUBLISHED",
      modules: [
        {
          title: "मॉड्यूल 1: प्राकृतिक एवं जैविक खेती के मूलभूत सिद्धांत",
          order: 1,
          description: "बीजामृत, जीवामृत, घनजीवामृत निर्माण विधि एवं भूमि की उर्वरता संवर्धन।",
          lessons: [
            { title: "प्राकृतिक खेती का अर्थशास्त्र एवं रासायनिक खाद से मुक्ति", order: 1, type: "VIDEO", duration: 1100, isPreview: true },
            { title: "देशी गाय के गोबर-गोमूत्र से जीवामृत व घनजीवामृत निर्माण", order: 2, type: "VIDEO", duration: 1400, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: प्राकृतिक कृषि सिद्धांत परीक्षा", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: व्यावसायिक वर्मीकम्पोस्ट (केंचुआ खाद) यूनिट स्थापना",
          order: 2,
          description: "आइसीनिया फेटिडा केंचुआ, वर्मीबेड, वर्मीवाश निष्कर्षण एवं खाद पैकिंग।",
          lessons: [
            { title: "वर्मीकम्पोस्ट बेड निर्माण, नमी प्रबंधन एवं केंचुआ आहार", order: 1, type: "VIDEO", duration: 1600, isPreview: false },
            { title: "वर्मीवाश टॉनिक निष्कर्षण, पोषक तत्व व बोतल पैकेजिंग", order: 2, type: "VIDEO", duration: 1200, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: वर्मीकम्पोस्ट उत्पादन परीक्षा", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: जैविक प्रमाणीकरण (NPOP/PGS) एवं डायरेक्ट सेलिंग",
          order: 3,
          description: "PGS जैविक सर्टिफिकेशन, प्रीमियम पैकेजिंग, फार्मर्स मार्केट व ऑनलाइन डिलीवरी।",
          lessons: [
            { title: "PGS इंडिया एवं NPOP जैविक प्रमाणीकरण प्रक्रिया", order: 1, type: "VIDEO", duration: 1500, isPreview: false },
            { title: "शहरी ग्राहकों को 50% अधिक कीमत पर जैविक उत्पाद बेचना", order: 2, type: "VIDEO", duration: 1800, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: प्राकृतिक एवं जैविक उद्यम", passingPercentage: 80 },
        },
      ],
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
      modules: [
        {
          title: "मॉड्यूल 1: ग्रामीण ई-कॉमर्स व डिजिटल दुकान स्थापना",
          order: 1,
          description: "स्मार्टफोन से प्रोडक्ट फोटोग्राफी, कैटलॉगिंग, ONDC सेलर नेटवर्क।",
          lessons: [
            { title: "ग्रामीण डिजिटल व्यापार का अवसर व स्मार्टफोन से प्रोडक्ट फोटो", order: 1, type: "VIDEO", duration: 1200, isPreview: true },
            { title: "ONDC नेटवर्क पर अपना स्टोर फ्री में लाइव करना", order: 2, type: "VIDEO", duration: 1800, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: डिजिटल स्टोर स्थापना टेस्ट", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: व्हाट्सएप बिजनेस ऑटोमेशन व सोशल मीडिया मार्केटिंग",
          order: 2,
          description: "कैटलॉग शेयरिंग, ऑटो-रिप्लाई, इंस्टाग्राम रील्स, लोकल ऑडियंस टारगेटिंग।",
          lessons: [
            { title: "WhatsApp Business कैटलॉग, त्वरित उत्तर एवं लेबल मैनेजमेंट", order: 1, type: "VIDEO", duration: 1400, isPreview: false },
            { title: "Instagram एवं Facebook से रोज़ाना नए ग्राहकों के ऑर्डर पाना", order: 2, type: "VIDEO", duration: 1600, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: सोशल मीडिया सेलिंग टेस्ट", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: डिजिटल पेमेंट (QR, Razorpay) एवं डाकघर/कूरियर शिपिंग",
          order: 3,
          description: "सुरक्षित ऑनलाइन भुगतान, स्पीड पोस्ट पार्सल व रिटर्न मैनेजमेंट।",
          lessons: [
            { title: "ऑनलाइन पेमेंट गेटवे सेटअप व UPI फ्रॉड सुरक्षा", order: 1, type: "VIDEO", duration: 1500, isPreview: false },
            { title: "इंडिया पोस्ट स्पीड पोस्ट एवं प्राइवेट कूरियर टाई-अप विधि", order: 2, type: "VIDEO", duration: 1300, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: डिजिटल ई-कॉमर्स उद्यम", passingPercentage: 80 },
        },
      ],
    },
    {
      title: "सोलर पंप एवं रूफटॉप सोलर उद्यम: इंस्टालेशन, मेंटेनेंस और सरकारी सब्सिडी",
      slug: "solar-energy-enterprise",
      description: "पीएम कुसुम योजना सोलर पंप इंस्टालेशन, डिस्कॉम नेट-मीटरिंग, रूफटॉप सोलर एवं ग्रामीण सर्विस सेंटर का लाभदायक मॉडल सीखें।",
      language: "hi",
      price: 1499.0,
      isPaid: true,
      level: "ADVANCED",
      duration: 420,
      thumbnail: "/images/solar-enterprise.jpg",
      status: "PUBLISHED",
      modules: [
        {
          title: "मॉड्यूल 1: सोलर रूफटॉप व सोलर पंप तकनीकी आधार",
          order: 1,
          description: "मोनो PERC पैनल, इन्वर्टर चयन, वायरिंग, वीएफडी ड्राइव व अर्थिंग।",
          lessons: [
            { title: "सोलर फोटोवोल्टाइक सिद्धांत, सोलर सेल एफिशिएंसी एवं कंपोनेंट्स", order: 1, type: "VIDEO", duration: 1500, isPreview: true },
            { title: "3HP/5HP/7.5HP सोलर वॉटर पंपिंग सिस्टम का डिज़ाइन एवं वायरिंग", order: 2, type: "VIDEO", duration: 2100, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: सोलर तकनीकी ज्ञान परीक्षा", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: पीएम कुसुम योजना एवं रूफटॉप सोलर सब्सिडी प्रक्रिया",
          order: 2,
          description: "पीएम कुसुम योजना 60% सब्सिडी, डिस्कॉम नेट-मीटरिंग पोर्टल ऑनलाइन आवेदन।",
          lessons: [
            { title: "PM KUSUM योजना ऑनलाइन पोर्टल एवं किसान सब्सिडी नियम", order: 1, type: "VIDEO", duration: 2400, isPreview: false },
            { title: "रूफटॉप सोलर राष्ट्रीय पोर्टल (National Portal) आवेदन विधि", order: 2, type: "VIDEO", duration: 1800, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: सोलर सब्सिडी एवं नेट मीटरिंग टेस्ट", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: ग्रामीण सोलर सर्विस सेंटर स्थापना व मेंटेनेंस उद्यम",
          order: 3,
          description: "फाल्ट फाइंडिंग, एएमसी अनुबंध, सोलर डीलरशिप व नियमित कमाई मॉडल।",
          lessons: [
            { title: "सोलर पैनल इनवर्टर फाल्ट डायग्नोसिस व वार्षिक रखरखाव (AMC)", order: 1, type: "VIDEO", duration: 1800, isPreview: false },
            { title: "सोलर उपकरण डीलरशिप लेना व ₹1 लाख/माह का सर्विस मॉडल", order: 2, type: "VIDEO", duration: 1900, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: सोलर एनर्जी एंटरप्राइज", passingPercentage: 80 },
        },
      ],
    },
    {
      title: "कमर्शियल गोट फार्मिंग (बकरी पालन) एवं वैज्ञानिक नस्ल सुधार",
      slug: "goat-farming-livestock-enterprise",
      description: "सिरोही, जमनापारी व बोअर नस्ल चयन, एलिवेटेड शेड निर्माण, हरा चारा एवं बकरा ईद/लोकल मार्केट डायरेक्ट सेलिंग से ₹80,000/माह कमाई।",
      language: "hi",
      price: 799.0,
      isPaid: true,
      level: "BEGINNER",
      duration: 312,
      thumbnail: "/images/goat-farming.jpg",
      status: "PUBLISHED",
      modules: [
        {
          title: "मॉड्यूल 1: उन्नत बकरी नस्लें व वैज्ञानिक आवास व्यवस्था",
          order: 1,
          description: "सिरोही, बरबरी, जमनापारी, एलिवेटेड स्लैटेड फ्लोर शेड निर्माण।",
          lessons: [
            { title: "व्यावसायिक बकरी पालन की लाभप्रदता एवं नस्ल तुलना", order: 1, type: "VIDEO", duration: 1200, isPreview: true },
            { title: "स्टॉल-फेड (Stall-fed) स्लैटेड शेड निर्माण एवं जल निकास", order: 2, type: "VIDEO", duration: 1600, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: नस्ल व शेड प्रबंधन टेस्ट", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: बकरी आहार, चारा प्रबंधन व टीकाकरण सुरक्षा",
          order: 2,
          description: "TMR आहार, हाइड्रोपोनिक हरा चारा, पीपीआर व ईटीवी वैक्सीन शेड्यूल।",
          lessons: [
            { title: "कम लागत में बकरियों के वजन वृद्धि का संतुलित आहार चार्ट", order: 1, type: "VIDEO", duration: 1500, isPreview: false },
            { title: "संक्रामक रोगों (PPR, ET, FMD) से बचाव व टीकाकरण कैलेंडर", order: 2, type: "VIDEO", duration: 1400, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: बकरी स्वास्थ्य एवं पोषण टेस्ट", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: वजन वृद्धि, प्रजनन प्रबंधन एवं बकरा मंडी व्यापार",
          order: 3,
          description: "लाइव वेट सेलिंग, ईद मार्केट टाइमिंग, बैंक लोन व नाबार्ड सब्सिडी।",
          lessons: [
            { title: "ईद एवं स्थानीय हाट बाजारों में लाइव वजन के अनुसार बिक्री", order: 1, type: "VIDEO", duration: 1800, isPreview: false },
            { title: "नाबार्ड गोट फार्मिंग सब्सिडी एवं ₹10 लाख बैंक प्रोजेक्ट रिपोर्ट", order: 2, type: "VIDEO", duration: 1600, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: कमर्शियल बकरी पालन", passingPercentage: 80 },
        },
      ],
    },
    {
      title: "पॉलीहाउस खेती व ड्रिप ऑटोमेशन: शिमला मिर्च व खीरा उत्पादन मास्टरक्लास",
      slug: "polyhouse-hightech-agriculture",
      description: "नेचुरली वेंटिलेटेड पॉलीहाउस में बेमौसम उच्च गुणवत्ता सब्जियों की संरक्षित खेती। NHB 50% राष्ट्रीय बागवानी मिशन सब्सिडी एवं बैंक DPR।",
      language: "hi",
      price: 1199.0,
      isPaid: true,
      level: "ADVANCED",
      duration: 360,
      thumbnail: "/images/polyhouse-farming.jpg",
      status: "PUBLISHED",
      modules: [
        {
          title: "मॉड्यूल 1: नेचुरली वेंटिलेटेड पॉलीहाउस संरचना व लागत",
          order: 1,
          description: "GI पाइप स्ट्रक्चर, UV स्टेबलाइज्ड फिल्म, ड्रिप व फॉगर सिस्टम लेआउट।",
          lessons: [
            { title: "1000 वर्गमीटर पॉलीहाउस संरचना, लागत एवं सब्सिडी अनुमान", order: 1, type: "VIDEO", duration: 1500, isPreview: true },
            { title: "ड्रिप इरिगेशन, ऑटोमेशन वाल्व एवं मिस्टिंग सिस्टम असेंबली", order: 2, type: "VIDEO", duration: 1800, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: पॉलीहाउस स्ट्रक्चर परीक्षा", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: शिमला मिर्च एवं डच खीरा की संरक्षित खेती",
          order: 2,
          description: "कोकोपीट प्रो-ट्रे नर्सरी, फर्टिगेशन शिड्यूल, कीट-रोग जैविक नियंत्रण।",
          lessons: [
            { title: "कलर कैप्सिकम एवं डच खीरा की बेड तैयारी व रोपाई विधि", order: 1, type: "VIDEO", duration: 1700, isPreview: false },
            { title: "पानी में घुलनशील उर्वरकों का फर्टिगेशन (Fertigation) शेड्यूल", order: 2, type: "VIDEO", duration: 1900, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: फसल पोषण एवं कीट प्रबंधन परीक्षा", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: NHB 50% राष्ट्रीय बागवानी मिशन सब्सिडी एवं बैंक DPR",
          order: 3,
          description: "प्रोजेक्ट फाइनेंस, कोल्ड चेन व महानगर मंडी प्रीमियम सप्लाई।",
          lessons: [
            { title: "NHB (राष्ट्रीय बागवानी बोर्ड) 50% सब्सिडी ऑनलाइन आवेदन गाइड", order: 1, type: "VIDEO", duration: 2200, isPreview: false },
            { title: "मेट्रो शहरों एवं बिगबास्केट/रिलायंस फ्रेश से डायरेक्ट कॉन्ट्रैक्ट", order: 2, type: "VIDEO", duration: 1600, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: हाई-टेक पॉलीहाउस कृषि", passingPercentage: 80 },
        },
      ],
    },
    {
      title: "बटन व ऑयस्टर मशरूम उत्पादन, सुखाकर पैकेजिंग व ब्रांडिंग",
      slug: "mushroom-farming-processing",
      description: "कम स्थान व न्यूनतम पूंजी में मशरूम फार्मिंग। कंपोस्ट मेकिंग, स्पॉन मेकिंग, ड्राई मशरूम पाउडर पैकेजिंग व FSSAI मार्केटिंग।",
      language: "hi",
      price: 699.0,
      isPaid: true,
      level: "BEGINNER",
      duration: 240,
      thumbnail: "/images/mushroom-farming.jpg",
      status: "PUBLISHED",
      modules: [
        {
          title: "मॉड्यूल 1: बटन एवं ऑयस्टर (ढींगरी) मशरूम की वैज्ञानिक खेती",
          order: 1,
          description: "गेहूं के भूसे का उपचार, स्पॉनिंग, केसिंग सॉइल प्रबंधन।",
          lessons: [
            { title: "मशरूम फार्मिंग की आधारशिला, कमरे की व्यवस्था व बीज चयन", order: 1, type: "VIDEO", duration: 1300, isPreview: true },
            { title: "भूसा पाश्चुरीकरण (Sterilization) एवं स्पॉनिंग करने की सही विधि", order: 2, type: "VIDEO", duration: 1500, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: मशरूम उत्पादन आधार टेस्ट", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: तापमान, आर्द्रता व कमरों का वातावरण नियंत्रण",
          order: 2,
          description: "फसल चक्र, माइसेलियम रन, तुड़ाई, ग्रेडिंग व फ्रेश पैकेजिंग।",
          lessons: [
            { title: "कमरे में नमी व CO2 नियंत्रण, पिनहेड फॉर्मेशन व तुड़ाई", order: 1, type: "VIDEO", duration: 1400, isPreview: false },
            { title: "फ्रेश मशरूम की ग्रेडिंग, वजन एवं छिद्रित पैकेट्स में पैकिंग", order: 2, type: "VIDEO", duration: 1200, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: वातावरण नियंत्रण व तुड़ाई टेस्ट", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: मशरूम प्रोसेसिंग: ड्राई पाउडर, पापड़ व FSSAI ब्रांडिंग",
          order: 3,
          description: "वैल्यू एडिशन, FSSAI रजिस्ट्रेशन, सुपरमार्केट व ऑनलाइन बिक्री।",
          lessons: [
            { title: "सोलर ड्रायर से मशरूम सुखाना व न्यूट्रिशन पाउडर तैयार करना", order: 1, type: "VIDEO", duration: 1600, isPreview: false },
            { title: "मशरूम उत्पाद ब्रांडिंग, FSSAI लाइसेंस व अमेज़न/फ्लिपकार्ट सेलिंग", order: 2, type: "VIDEO", duration: 1500, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: मशरूम उद्यम मास्टरक्लास", passingPercentage: 80 },
        },
      ],
    },
    {
      title: "बायोफ्लॉक मछली पालन एवं प्रधानमंत्री मत्स्य संपदा योजना (PMMSY)",
      slug: "biofloc-fish-farming-aquaculture",
      description: "10,000 लीटर बायोफ्लॉक टैंक में पंगासियस व तिलपिया पालन। जल गुणवत्ता, C/N रेश्यो, प्रोबायोटिक एवं 60% मत्स्य संपदा सब्सिडी।",
      language: "hi",
      price: 1399.0,
      isPaid: true,
      level: "INTERMEDIATE",
      duration: 408,
      thumbnail: "/images/biofloc-fish.jpg",
      status: "PUBLISHED",
      modules: [
        {
          title: "मॉड्यूल 1: बायोफ्लॉक तकनीक (BFT) के मूलभूत सिद्धांत व टैंक निर्माण",
          order: 1,
          description: "तारपोलिन टैंक, एयरेशन ब्लोअर, बैकअप जनरेटर, ड्रेनेज लेआउट।",
          lessons: [
            { title: "बायोफ्लॉक तकनीक क्या है और यह पारंपरिक तालाब से 10x बेहतर क्यों है?", order: 1, type: "VIDEO", duration: 1400, isPreview: true },
            { title: "10,000 लीटर तिरपाल टैंक का निर्माण, एयरेशन पंप एवं पाइपिंग", order: 2, type: "VIDEO", duration: 1900, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: बायोफ्लॉक संरचना परीक्षा", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: जल गुणवत्ता, C/N रेश्यो एवं प्रोबायोटिक फ्लॉक प्रबंधन",
          order: 2,
          description: "अमोनिया नियंत्रण, गुड़-मोलासेस कैलकुलेशन, DO (घुलित ऑक्सीजन) लेवल।",
          lessons: [
            { title: "प्रोबायोटिक से जीवाणु फ्लॉक तैयार करना व कार्बन-नाइट्रोजन रेश्यो", order: 1, type: "VIDEO", duration: 1800, isPreview: false },
            { title: "pH, अमोनिया, TDS एवं घुलनशील ऑक्सीजन (DO) की दैनिक टेस्टिंग", order: 2, type: "VIDEO", duration: 1600, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: जल रसायन एवं फ्लॉक प्रबंधन टेस्ट", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: पंगासियस व तिलापिया पालन एवं PMMSY 60% सब्सिडी",
          order: 3,
          description: "फीडिंग कन्वर्जन रेशियो FCR, हार्वेस्टिंग, PMMSY सब्सिडी व फिश मार्केट लिंकेज।",
          lessons: [
            { title: "पंगासियस व तिलापिया फिंगरलिंग स्टॉकिंग, फीडिंग व FCR नियंत्रण", order: 1, type: "VIDEO", duration: 2000, isPreview: false },
            { title: "PMMSY योजना 60% सरकारी अनुदान एवं मत्स्य विभाग प्रोजेक्ट रिपोर्ट", order: 2, type: "VIDEO", duration: 2200, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: बायोफ्लॉक मत्स्य पालन", passingPercentage: 80 },
        },
      ],
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
      modules: [
        {
          title: "मॉड्यूल 1: देसी व कड़कनाथ मुर्गी पालन का परिचय व शेड सेटअप",
          order: 1,
          description: "डीप लिटर सिस्टम, फ्री रेंज फार्मिंग, ब्रूडिंग टेम्परेचर।",
          lessons: [
            { title: "कड़कनाथ एवं उन्नत देसी नस्लों (असील, ग्रामप्रिया) की विशेषताएं", order: 1, type: "VIDEO", duration: 1200, isPreview: true },
            { title: "कम लागत में शेड निर्माण, डीप लिटर एवं ब्रूडर रूम मैनेजमेंट", order: 2, type: "VIDEO", duration: 1600, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: पोल्ट्री शेड व नस्ल परीक्षा", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: कम लागत दाना (फीड फॉर्मूलेशन) एवं टीकाकरण शिड्यूल",
          order: 2,
          description: "अजोला फीडिंग, रानीखेत व गम्बोरो वैक्सीन, बायो-सिक्योरिटी।",
          lessons: [
            { title: "घर पर तैयार करें सस्ता पौष्टिक दाना + अजोला (Azolla) सप्लीमेंट", order: 1, type: "VIDEO", duration: 1500, isPreview: false },
            { title: "रानीखेत (RDV), गम्बोरो एवं चेचक का संपूर्ण टीकाकरण चार्ट", order: 2, type: "VIDEO", duration: 1400, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: स्वास्थ्य एवं पोषण प्रबंधन टेस्ट", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: कड़कनाथ मांस व ओरिजिनल अंडों का डायरेक्ट मार्केटिंग",
          order: 3,
          description: "FSSAI, जीआई टैग सर्टिफिकेशन, हाई-प्राइस प्रीमियम सेलिंग।",
          lessons: [
            { title: "कड़कनाथ ओरिजिनल अंडे एवं लाइव बर्ड्स का प्रीमियम मूल्य पर विक्रय", order: 1, type: "VIDEO", duration: 1600, isPreview: false },
            { title: "पोल्ट्री फार्मिंग बैंक लोन एवं नाबार्ड 25-33% सब्सिडी गाइड", order: 2, type: "VIDEO", duration: 1500, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: पोल्ट्री उद्यम मास्टरक्लास", passingPercentage: 80 },
        },
      ],
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
      modules: [
        {
          title: "मॉड्यूल 1: कृषि यंत्र बैंक की संकल्पना व उपयुक्त मशीनरी चयन",
          order: 1,
          description: "ट्रैक्टर, रोटावेटर, जीरो टिल ड्रिल, स्ट्रॉ रीपर, सोलर ड्रायर।",
          lessons: [
            { title: "कस्टम हायरिंग सेंटर (CHC) का व्यवसाय मॉडल एवं लाभ का दायरा", order: 1, type: "VIDEO", duration: 1300, isPreview: true },
            { title: "क्षेत्र की मिट्टी व फसलों के अनुसार सर्वश्रेष्ठ कृषि यंत्रों की सूची", order: 2, type: "VIDEO", duration: 1700, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 1: मशीनरी चयन व व्यवसाय मॉडल टेस्ट", passingPercentage: 70 },
        },
        {
          title: "मॉड्यूल 2: मशीनरी मेंटेनेंस, ऑपरेटर मैनेजमेंट एवं प्रति घंटा भाड़ा",
          order: 2,
          description: "डीजल खपत, मेंटेनेंस शेड्यूल, कस्टमर बुकिंग ऐप व हिसाब-किताब।",
          lessons: [
            { title: "यंत्रों का नियमित रखरखाव, ग्रीसिंग, ब्रेकडाउन से बचाव एवं डीजल बचत", order: 1, type: "VIDEO", duration: 1500, isPreview: false },
            { title: "प्रति एकड़ / प्रति घंटा किराया दर निर्धारण एवं कस्टमर मैनेजमेंट", order: 2, type: "VIDEO", duration: 1600, isPreview: false },
          ],
          quiz: { title: "मॉड्यूल 2: संचालन व लाभप्रदता परीक्षा", passingPercentage: 75 },
        },
        {
          title: "मॉड्यूल 3: MP कृषि अभियांत्रिकी विभाग 40-50% अनुदान एवं बैंक DPR",
          order: 3,
          description: "अनुदान पोर्टल आवेदन, सैंक्शन, बिजनेस रेवेन्यू मॉडल।",
          lessons: [
            { title: "कृषि यंत्र अनुदान पोर्टल (MP e-Krishi) पर ऑनलाइन लॉटरी व आवेदन", order: 1, type: "VIDEO", duration: 2100, isPreview: false },
            { title: "₹25 लाख कृषि यंत्र बैंक प्रोजेक्ट रिपोर्ट (DPR) एवं बैंक लोन प्रक्रिया", order: 2, type: "VIDEO", duration: 1800, isPreview: false },
          ],
          quiz: { title: "अंतिम सर्टिफिकेशन परीक्षा: कस्टम हायरिंग सेंटर उद्यम", passingPercentage: 80 },
        },
      ],
    },
  ];

  for (const cData of coursesToSeed) {
    // 1. Upsert course record
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
        duration: cData.duration,
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
      },
    });

    // 2. Remove existing modules to cleanly seed detailed curriculum
    await prisma.courseModule.deleteMany({
      where: { courseId: course.id },
    });

    // 3. Create full modules with lessons and quizzes
    for (const mData of cData.modules) {
      const createdModule = await prisma.courseModule.create({
        data: {
          courseId: course.id,
          title: mData.title,
          description: mData.description,
          order: mData.order,
          lessons: {
            create: mData.lessons.map((l) => ({
              title: l.title,
              order: l.order,
              type: l.type as any,
              duration: l.duration,
              isPreview: l.isPreview,
              isPublished: true,
            })),
          },
        },
      });

      // Add module-level quiz if specified
      if (mData.quiz) {
        await prisma.quiz.create({
          data: {
            title: mData.quiz.title,
            moduleId: createdModule.id,
            passingPercentage: mData.quiz.passingPercentage,
            timeLimit: 900,
            attemptLimit: 3,
            questions: {
              create: [
                {
                  question: `${mData.title} के अंतर्गत मुख्य व्यावसायिक सिद्धांत क्या है?`,
                  order: 1,
                  type: "SINGLE_CHOICE",
                  points: 10,
                  options: {
                    create: [
                      { optionText: "वैज्ञानिक योजना एवं समयबद्ध प्रबंधन", isCorrect: true },
                      { optionText: "बिना योजना पूंजी लगाना", isCorrect: false },
                      { optionText: "केवल पारंपरिक तरीकों पर निर्भर रहना", isCorrect: false },
                      { optionText: "इनमें से कोई नहीं", isCorrect: false },
                    ],
                  },
                },
                {
                  question: "सरकारी अनुदान एवं बैंक ऋण में सबसे महत्वपूर्ण दस्तावेज क्या है?",
                  order: 2,
                  type: "SINGLE_CHOICE",
                  points: 10,
                  options: {
                    create: [
                      { optionText: "बैंक-स्वीकृत प्रोजेक्ट रिपोर्ट (DPR)", isCorrect: true },
                      { optionText: "केवल मौखिक बातचीत", isCorrect: false },
                      { optionText: "हस्तलिखित कच्चा पर्चा", isCorrect: false },
                      { optionText: "कोई दस्तावेज नहीं", isCorrect: false },
                    ],
                  },
                },
              ],
            },
          },
        });
      }
    }

    console.log(`✅ Seeded/Updated course with full modules: ${course.title} (₹${cData.price})`);
  }

  console.log("✅ All 12 courses successfully seeded with full details and verified paid status!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
