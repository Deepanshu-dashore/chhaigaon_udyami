import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { resolvePrismaUserId } from "@/services/user-profile.service";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CourseDetailTabs } from "@/components/course/course-detail-tabs";
import { LearningPathTimeline } from "@/components/course/learning-path-timeline";
import { SkillsToolsGrid } from "@/components/course/skills-tools-grid";
import { ImmersiveLearningExperience } from "@/components/course/immersive-learning-experience";
import { CourseResourcesSection } from "@/components/course/course-resources-section";
import { StickyCourseHeader } from "@/components/course/sticky-course-header";
import { formatCurrency } from "@/lib/utils";
import {
  ChevronRight,
  Star,
  Users,
  Clock,
  BookOpen,
  Award,
  Check,
  FileText,
  Download,
  Play,
  PlayCircle,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";

// Fallback Catalog Data
const MOCK_COURSES_DATA: Record<string, any> = {
  "dairy-farming-entrepreneurship": {
    id: "c-1",
    title: "आधुनिक डेयरी फार्मिंग एवं दुग्ध उत्पाद प्रसंस्करण मास्टरक्लास",
    slug: "dairy-farming-entrepreneurship",
    category: "डेयरी एवं पशुपालन",
    price: 3089,
    discountedPrice: 1299,
    level: "Beginner",
    duration: "6.5 Hours",
    rating: 4.9,
    reviewsCount: 2450,
    enrolledCount: 4850,
    instructor: "डॉ. आर. के. शर्मा",
    instructorRole: "वरिष्ठ पशु वैज्ञानिक व तकनीकी सलाहकार",
    authorityName: "जिला उद्योग केंद्र (DIC) खंडवा व NABARD संरेखित",
    shortDesc:
      "15 दुधारू पशुओं के डेयरी फार्म की वैज्ञानिक स्थापना, BMC मिल्क चिलिंग, अमूल/सांची दुग्ध संघ लिंकेज एवं PMEGP ₹25 लाख लोन तथा 35% सरकारी सब्सिडी गाइड।",
    learnings: [
      "10 से 20 दुधारू गाय-भैंसों (गिर, साहिवाल, मुर्राह) का वैज्ञानिक चयन व शेड निर्माण तकनीक",
      "मक्का साइलेज (आचार) व टीएमआर आहार प्रबंधन से दूध उत्पादन 25% बढ़ाना",
      "ऑटोमैटिक बल्क मिल्क कूलर (BMC) चिलिंग, फैट टेस्टिंग व FSSAI स्वच्छता मानक",
      "PMEGP एवं मुख्यमंत्री उद्यम क्रांति योजना में 35% सब्सिडी हेतु ऑनलाइन आवेदन विधि",
      "बैंक-मान्य ₹25 लाख प्रोजेक्ट रिपोर्ट (DPR) एवं बैलेंस शीट ऑनलाइन फाइलिंग",
      "सांची, अमूल एवं स्थानीय दुग्ध समितियों के साथ डायरेक्ट सप्लाई एग्रीमेंट",
    ],
    skillsGained: [
      "डेयरी शेड इंजीनियरिंग",
      "साइलेज पोषण आहार",
      "BMC चिलिंग प्लांट",
      "PMEGP ₹25L DPR",
      "FSSAI डेयरिंग लाइसेंस",
      "पशु स्वास्थ्य व टीकाकरण",
    ],
    toolsLearned: [
      "PMEGP Excel DPR Calculator",
      "Dairy Tally Billing Template",
      "NABARD Dairy Subsidy Guide",
      "FSSAI Online Portal Kit",
    ],
    downloadableResources: [
      { name: "25 लाख डेयरी फार्म प्रोजेक्ट रिपोर्ट (Bank Approved DPR)", type: "PDF & Excel", size: "3.4 MB", url: "#" },
      { name: "मक्का साइलेज एवं टीएमआर आहार तालिका कैलकुलेटर", type: "Excel Tool", size: "1.2 MB", url: "#" },
      { name: "FSSAI खाद्य सुरक्षा डेयरिंग रजिस्ट्रेशन गाइडलाइन", type: "PDF Document", size: "2.1 MB", url: "#" },
    ],
    modules: [
      {
        id: "m-1",
        order: 1,
        title: "व्यावसायिक डेयरी फार्मिंग की नींव व स्थान चयन",
        description: "शेड निर्माण, हवा व जल निकासी व्यवस्था और नस्ल चयन।",
        duration: "1.5 घंटे",
        lessons: [
          { id: "l-1", title: "भारत में डेयरी उद्योग का भविष्य व आय क्षमता", duration: "15 मिनट", isPreview: true, type: "video" },
          { id: "l-2", title: "उन्नत नस्लों (गिर, साहिवाल, मुर्राह) का वैज्ञानिक चयन", duration: "25 मिनट", isPreview: true, type: "video" },
          { id: "l-3", title: "वैज्ञानिक पशु शेड का लेआउट एवं लागत अनुमान", duration: "35 मिनट", type: "video" },
          { id: "l-4", title: "10 दुधारू पशु शेड डिज़ाइन ब्लूप्रिंट PDF", resourceType: "Resource PDF", resourceSize: "2.8 MB", type: "resource" },
          { id: "l-5", title: "मॉड्यूल 1 ज्ञान मूल्यांकन परीक्षा", questionsCount: 10, type: "quiz" },
        ],
      },
      {
        id: "m-2",
        order: 2,
        title: "पशु पोषण, साइलेज एवं हरा चारा प्रबंधन",
        description: "कम लागत में पौष्टिक चारा तैयार करने की वैज्ञानिक विधियां।",
        duration: "2 घंटे",
        lessons: [
          { id: "l-6", title: "टीएमआर (Total Mixed Ration) संतुलित आहार", duration: "30 मिनट", type: "video" },
          { id: "l-7", title: "मक्का साइलेज (आचार) बनाने की चरणबद्ध विधि", duration: "45 मिनट", type: "video" },
          { id: "l-8", title: "नेपियर व सुपर नेपियर घास की व्यावसायिक खेती", duration: "25 मिनट", type: "video" },
          { id: "l-9", title: "साइलेज पिट निर्माण व आहार कैलकुलेटर", resourceType: "Excel Tool", resourceSize: "1.5 MB", type: "resource" },
          { id: "l-10", title: "मॉड्यूल 2 पशु आहार मूल्यांकन परीक्षा", questionsCount: 10, type: "quiz" },
        ],
      },
      {
        id: "m-3",
        order: 3,
        title: "दुग्ध प्रसंस्करण, BMC चिलिंग व FSSAI मानक",
        description: "पनीर, खोया, शुद्ध घी निर्माण एवं FSSAI हाइजीन।",
        duration: "1.5 घंटे",
        lessons: [
          { id: "l-11", title: "बल्क मिल्क कूलर (BMC) ऑपरेशन व फैट टेस्टिंग", duration: "30 मिनट", type: "video" },
          { id: "l-12", title: "पनीर, मावा एवं शुद्ध देसी घी निर्माण प्रक्रिया", duration: "40 मिनट", type: "video" },
          { id: "l-13", title: "FSSAI खाद्य सुरक्षा लाइसेंस ऑनलाइन आवेदन", duration: "25 मिनट", type: "video" },
          { id: "l-14", title: "मॉड्यूल 3 FSSAI व प्रोसेसिंग क्विज़", questionsCount: 10, type: "quiz" },
        ],
      },
      {
        id: "m-4",
        order: 4,
        title: "PMEGP 35% सब्सिडी व बैंक लोन स्वीकृति प्रक्रिया",
        description: "₹25 लाख तक के बैंक ऋण स्वीकृति की चरणबद्ध विधि।",
        duration: "1.5 घंटे",
        lessons: [
          { id: "l-15", title: "PMEGP पोर्टल पर ऑनलाइन फॉर्म भरने की विधि", duration: "35 मिनट", type: "video" },
          { id: "l-16", title: "बैंक-मान्य प्रोजेक्ट रिपोर्ट (DPR) तैयार करना", duration: "45 मिनट", type: "video" },
          { id: "l-17", title: "₹25 लाख डेयरी बैंक DPR टूलकिट", resourceType: "Bank DPR Kit", resourceSize: "4.2 MB", type: "resource" },
          { id: "l-18", title: "अंतिम कोर्स समापन परीक्षा एवं प्रमाण पत्र पात्रता", questionsCount: 15, type: "quiz" },
        ],
      },
    ],
  },
  "organic-farming-enterprise": {
    id: "c-4",
    title: "प्राकृतिक एवं जैविक खेती: जीवामृत, वर्मीकम्पोस्ट और सीधे उपभोक्ता विपणन",
    slug: "organic-farming-enterprise",
    category: "प्राकृतिक एवं जैविक कृषि",
    price: 0,
    discountedPrice: 0,
    level: "Beginner",
    duration: "4.5 Hours",
    rating: 4.8,
    reviewsCount: 1840,
    enrolledCount: 3920,
    instructor: "दीपांशु दशोरे",
    instructorRole: "जैविक कृषि विशेषज्ञ एवं ग्रामीण उद्यमिता सलाहकार",
    authorityName: "कृषि विज्ञान केंद्र (KVK) व PKVY योजना संरेखित",
    shortDesc:
      "प्राकृतिक खेती, जैविक खाद निर्माण, वर्मीकम्पोस्ट यूनिट और फसल के सीधे विपणन से बिना रासायनिक खाद के लाभदायक उद्यम शुरू करने का संपूर्ण मार्गदर्शक कोर्स।",
    learnings: [
      "जीवामृत, बीजामृत एवं दशपर्णी अर्क तैयार करने की व्यावहारिक विधि",
      "वर्मीकम्पोस्ट (केंचुआ खाद) बेड स्थापना, उत्पादन एवं पैकेजिंग तकनीक",
      "NPOP जैविक प्रमाणीकरण एवं PGS-India पोर्टल ऑनलाइन रजिस्ट्रेशन प्रक्रिया",
      "परंपरागत कृषि विकास योजना (PKVY) अंतर्गत 100% सरकारी सहायता व अनुदान",
      "मंडी बिचौलियों के बिना सीधे शहरी उपभोक्ताओं को जैविक प्रीमियम दरों पर बिक्री",
      "प्राकृतिक कीटनाशक निर्माण व जैविक फसल सुरक्षा प्रबंधन ब्लूप्रिंट",
    ],
    skillsGained: [
      "जीवामृत निर्माण",
      "वर्मीकम्पोस्ट यूनिट",
      "PGS-India सर्टिफिकेशन",
      "जैविक विपणन",
      "मृदा पोषण संवर्धन",
      "प्राकृतिक कीटनाशक",
    ],
    toolsLearned: [
      "PGS-India Portal Guide",
      "Vermicompost Cost Calculator",
      "PKVY Scheme Dossier",
      "Organic Direct Selling Kit",
    ],
    downloadableResources: [
      { name: "जैविक प्रमाणीकरण एवं PGS-India गाइड ब्लूप्रिंट", type: "PDF Document", size: "2.8 MB", url: "#" },
      { name: "वर्मीकम्पोस्ट यूनिट लागत व मुनाफा कैलकुलेटर", type: "Excel Tool", size: "1.4 MB", url: "#" },
      { name: "जीवामृत व प्राकृतिक कीटनाशक निर्माण फॉर्मूला PDF", type: "PDF Guide", size: "1.9 MB", url: "#" },
    ],
    modules: [
      {
        id: "m-1",
        order: 1,
        title: "प्राकृतिक खेती की मूल अवधारणा एवं जीवामृत निर्माण",
        description: "देसी गाय के गोबर व गोमूत्र से उच्च कोटि का तरल खाद बनाना।",
        duration: "1.5 घंटे",
        lessons: [
          { id: "l-1", title: "रासायनिक बनाम प्राकृतिक खेती: लाभ व आय तुलना", duration: "20 मिनट", isPreview: true, type: "video" },
          { id: "l-2", title: "जीवामृत एवं घनजीवामृत तैयार करने की सटीक विधि", duration: "35 मिनट", isPreview: true, type: "video" },
          { id: "l-3", title: "बीजामृत से बीज शोधन तकनीक", duration: "25 मिनट", type: "video" },
          { id: "l-4", title: "जीवामृत निर्माण फॉर्मूला शीट PDF", resourceType: "Resource PDF", resourceSize: "1.8 MB", type: "resource" },
          { id: "l-5", title: "मॉड्यूल 1 ज्ञान मूल्यांकन परीक्षा", questionsCount: 10, type: "quiz" },
        ],
      },
      {
        id: "m-2",
        order: 2,
        title: "व्यावसायिक वर्मीकम्पोस्ट (केंचुआ खाद) यूनिट स्थापना",
        description: "कम लागत में वर्मीबेड तैयार कर प्रति माह 5 से 10 टन खाद उत्पादन।",
        duration: "1.5 घंटे",
        lessons: [
          { id: "l-6", title: "आइसीनिया फेटिडा केंचुए का चयन व बेड प्रबंधन", duration: "30 मिनट", type: "video" },
          { id: "l-7", title: "वर्मीवाश निष्कर्षण एवं इसके अद्भुत परिणाम", duration: "25 मिनट", type: "video" },
          { id: "l-8", title: "पैकेजिंग, ब्रांडिंग एवं स्थानीय नर्सरी मार्केटिंग", duration: "35 मिनट", type: "video" },
          { id: "l-9", title: "वर्मीकम्पोस्ट प्रोजेक्ट रिपोर्ट व लागत कैलकुलेटर", resourceType: "Excel Tool", resourceSize: "1.2 MB", type: "resource" },
          { id: "l-10", title: "मॉड्यूल 2 मूल्यांकन परीक्षा", questionsCount: 10, type: "quiz" },
        ],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mock = MOCK_COURSES_DATA[slug] || MOCK_COURSES_DATA["dairy-farming-entrepreneurship"];

  return {
    title: `${mock.title} | Chhaigaon Udyami`,
    description: mock.shortDesc,
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let dbCourse = null;
  let isEnrolled = false;
  let prismaUserId: string | null = null;

  try {
    const user = await getCurrentUser();
    if (user) {
      prismaUserId = await resolvePrismaUserId(user.id);
    }

    dbCourse = await prisma.course.findUnique({
      where: { slug },
      include: {
        createdBy: true,
        modules: {
          orderBy: { order: "asc" },
          include: {
            quizzes: {
              select: {
                id: true,
                title: true,
                passingPercentage: true,
                timeLimit: true,
                attemptLimit: true,
                _count: { select: { questions: true } },
              },
            },
            ...(prismaUserId
              ? {
                  moduleProgress: {
                    where: { userId: prismaUserId },
                    select: {
                      isCompleted: true,
                      completedAt: true,
                    },
                  },
                }
              : {}),
            lessons: {
              orderBy: { order: "asc" },
              include: {
                video: true,
                material: true,
                ...(prismaUserId
                  ? {
                      progress: {
                        where: { userId: prismaUserId },
                      },
                    }
                  : {}),
              },
            },
          },
        },
      },
    });

    if (prismaUserId && dbCourse) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: prismaUserId,
            courseId: dbCourse.id,
          },
        },
      });
      isEnrolled = enrollment?.status === "ACTIVE" || enrollment?.status === "COMPLETED";
    }
  } catch (err) {
    console.warn("DB query error in CourseDetailPage, using fallback mock:", err);
  }

  const mock =
    MOCK_COURSES_DATA[slug] ||
    MOCK_COURSES_DATA["dairy-farming-entrepreneurship"];

  // Accurate non-inverted pricing logic
  const rawPrice = dbCourse !== null ? Number(dbCourse.price) : (mock.discountedPrice ?? mock.price);
  const isFree = (dbCourse && !dbCourse.isPaid) || rawPrice === 0 || mock.price === 0;

  const sellingPrice = isFree ? 0 : rawPrice;
  const originalPrice = isFree ? 0 : (mock.price && mock.price > sellingPrice ? mock.price : Math.round(sellingPrice * 2.38));
  const discountPercent = originalPrice > sellingPrice ? Math.round(((originalPrice - sellingPrice) / originalPrice) * 100) : 0;

  const course = {
    title: dbCourse?.title || mock.title,
    slug: dbCourse?.slug || mock.slug,
    category: mock.category || "कृषि एवं ग्रामीण उद्यम",
    price: originalPrice,
    discountedPrice: sellingPrice,
    isFree,
    discountPercent,
    level: dbCourse?.level || mock.level,
    duration: mock.duration,
    rating: mock.rating,
    reviewsCount: mock.reviewsCount,
    enrolledCount: mock.enrolledCount,
    instructor: dbCourse?.createdBy?.name || mock.instructor,
    instructorRole: mock.instructorRole,
    authorityName: mock.authorityName,
    shortDesc: dbCourse?.description || mock.shortDesc,
    learnings: mock.learnings,
    skillsGained: mock.skillsGained,
    toolsLearned: mock.toolsLearned,
    downloadableResources: mock.downloadableResources || [
      { name: "बैंक-स्वीकृत प्रोजेक्ट रिपोर्ट (Bank Approved DPR)", type: "PDF & Excel", size: "3.2 MB", url: "#" },
      { name: "लागत एवं मुनाफा विश्लेषण कैलकुलेटर", type: "Excel Tool", size: "1.4 MB", url: "#" },
      { name: "सरकारी सब्सिडी एवं अनुज्ञप्ति मार्गदर्शिका", type: "PDF Document", size: "2.1 MB", url: "#" },
    ],
    modules: dbCourse?.modules?.length
      ? dbCourse.modules.map((m) => ({
          id: m.id,
          order: m.order,
          title: m.title,
          description: m.description || "",
          duration: "1.5 घंटे",
          lessons: m.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            duration: l.duration ? `${Math.round(l.duration / 60)} मिनट` : "15 मिनट",
            type: (l.type.toLowerCase() as any) || "video",
            isPreview: l.isPreview,
            isCompleted: (l as any).progress?.[0]?.isCompleted || false,
          })),
          quizzes: m.quizzes || [],
          moduleProgress: (m as any).moduleProgress?.[0] || null,
        }))
      : mock.modules,
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827] font-sans antialiased">
      <Navbar />

      {/* Floating Sticky Header on Scroll */}
      <StickyCourseHeader
        title={course.title}
        rating={course.rating}
        reviewsCount={course.reviewsCount}
        price={course.price}
        discountedPrice={course.discountedPrice}
        isFree={isFree}
      />

      <main className="flex-1">
        
        {/* ================= 1. HERO SECTION WITH INTEGRATED RIGHT FLOATING PURCHASE CARD ================= */}
        <section className="relative bg-[#F8FAFC] border-b border-[#E5E7EB] pt-8 pb-8 sm:pt-10 sm:pb-10">
          
          {/* Subtle SVG Grid Pattern with 25+ Pixel Fill Accent Squares */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <svg
              className="absolute inset-0 size-full stroke-slate-200/80 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="hero-grid-pattern"
                  width="32"
                  height="32"
                  patternUnits="userSpaceOnUse"
                  x="100%"
                  y="-1"
                >
                  <path d="M.5 32V.5H32" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" strokeWidth="0" fill="url(#hero-grid-pattern)" />

              {/* Top Right Rich Pixel Grid Mosaic Squares */}
              <svg x="30%" y="0" className="overflow-visible fill-slate-50">
                <rect x="256" y="1" width="33" height="33" className="fill-[#1261D6]/25 stroke-none" />
                <rect x="288" y="33" width="33" height="33" className="fill-blue-500/30 stroke-none" />
                <rect x="352" y="1" width="33" height="65" className="fill-[#1261D6]/20 stroke-none" />
                <rect x="224" y="65" width="65" height="33" className="fill-indigo-500/25 stroke-none" />
                <rect x="320" y="97" width="33" height="33" className="fill-sky-400/30 stroke-none" />
                <rect x="384" y="65" width="33" height="33" className="fill-emerald-500/25 stroke-none" />
                <rect x="192" y="33" width="33" height="33" className="fill-blue-600/20 stroke-none" />
                <rect x="416" y="1" width="33" height="33" className="fill-indigo-600/20 stroke-none" />
                <rect x="448" y="33" width="65" height="33" className="fill-[#1261D6]/25 stroke-none" />
                <rect x="288" y="129" width="33" height="33" className="fill-blue-400/30 stroke-none" />
                <rect x="352" y="161" width="65" height="33" className="fill-sky-500/20 stroke-none" />
                <rect x="160" y="97" width="33" height="33" className="fill-emerald-600/20 stroke-none" />
                <rect x="480" y="97" width="33" height="33" className="fill-[#1261D6]/30 stroke-none" />
                <rect x="224" y="161" width="33" height="33" className="fill-indigo-400/25 stroke-none" />
                <rect x="512" y="33" width="33" height="65" className="fill-blue-500/20 stroke-none" />
                <rect x="128" y="33" width="33" height="33" className="fill-[#1261D6]/15 stroke-none" />
                <rect x="384" y="129" width="33" height="33" className="fill-emerald-400/25 stroke-none" />
                <rect x="544" y="1" width="33" height="33" className="fill-blue-600/25 stroke-none" />
                <rect x="576" y="65" width="65" height="33" className="fill-indigo-500/20 stroke-none" />
                <rect x="448" y="129" width="33" height="33" className="fill-sky-400/25 stroke-none" />
                <rect x="256" y="193" width="65" height="33" className="fill-[#1261D6]/20 stroke-none" />
                <rect x="320" y="225" width="33" height="33" className="fill-blue-500/20 stroke-none" />
              </svg>
            </svg>

            {/* Left Gradient Overlay for Enhanced Text Contrast */}
            <div className="absolute inset-y-0 left-0 w-full sm:w-[65%] bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/95 to-transparent pointer-events-none z-0" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent pointer-events-none z-0" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* HERO LEFT COLUMN (8 COLS - Content & Price Action) */}
              <div className="lg:col-span-8 space-y-4">
                
                {/* Breadcrumbs */}
                <div className="flex items-center gap-1.5 text-xs text-[#667085]">
                  <Link href="/" className="hover:text-[#1261D6] transition-colors">
                    होम (Home)
                  </Link>
                  <ChevronRight className="size-3.5 text-slate-400" />
                  <Link href="/courses" className="hover:text-[#1261D6] transition-colors">
                    कोर्सेज (Courses)
                  </Link>
                  <ChevronRight className="size-3.5 text-slate-400" />
                  <span className="text-[#111827] font-medium">{course.category}</span>
                </div>

                {/* Category Tag & Authority */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1261D6]">
                    {course.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs font-medium text-[#667085]">
                    {course.authorityName}
                  </span>
                </div>

                {/* Course Title H1 */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight leading-tight">
                  {course.title}
                </h1>

                {/* Short Description */}
                <p className="text-sm sm:text-base text-[#667085] leading-relaxed max-w-3xl">
                  {course.shortDesc}
                </p>

                {/* Instructor & Learner Info Metadata */}
                <div className="flex items-center gap-4 flex-wrap text-xs text-[#667085] pt-1">
                  <div className="flex items-center gap-1.5 font-medium text-[#111827]">
                    <GraduationCap className="size-4 text-[#1261D6]" />
                    <span>मार्गदर्शक: <strong>{course.instructor}</strong></span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Star className="size-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-[#111827]">{course.rating.toFixed(1)}</span>
                    <span>({course.reviewsCount.toLocaleString("en-IN")} समीक्षाएं)</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-slate-400" />
                    <span><strong>{course.enrolledCount.toLocaleString("en-IN")}</strong> ग्रामीण उद्यमी नामांकित</span>
                  </div>

                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-emerald-50 text-[#16845B] border border-emerald-200">
                    PMEGP 35% सब्सिडी पात्र
                  </span>
                </div>

                {/* Primary Action Button */}
                <div className="pt-3 flex items-center gap-4 flex-wrap">
                  <Link href="/apply">
                    <Button className="h-11 px-7 rounded-sm bg-[#1261D6] hover:bg-blue-700 text-white text-sm font-bold shadow-2xs cursor-pointer inline-flex items-center gap-2">
                      <span>{isFree ? "निःशुल्क प्रवेश लें (Free Enroll)" : "अभी प्रवेश लें (Enroll Now)"}</span>
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                </div>

              </div>

              {/* HERO RIGHT COLUMN (4 COLS - Floating Purchase Card with clean 50% overlap into stats bar) */}
              <div className="lg:col-span-4 w-full relative z-20">
                <div className="lg:-mb-24">
                  <Card className="bg-white border-[#E5E7EB] shadow-xl rounded-xl text-[#111827] overflow-hidden">
                    
                    {/* Video Preview Header */}
                    <div className="relative aspect-video bg-slate-900 overflow-hidden group cursor-pointer">
                      <img
                        src={mock.thumbnail || "/images/dairy-course.jpg"}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-slate-950/30 flex flex-col items-center justify-center gap-1.5">
                        <div className="size-13 rounded-lg  bg-[#0847a5]/70 shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Play className="size-6 fill-white text-white/20" />
                        </div>
                        <span className="text-white text-xs font-semibold drop-shadow">
                          Preview Course
                        </span>
                      </div>
                    </div>

                    <CardContent className="p-5 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-[#111827]">
                            {isFree ? "निःशुल्क (Free)" : formatCurrency(course.discountedPrice)}
                          </span>
                          {!isFree && course.price > course.discountedPrice && (
                            <span className="text-xs text-[#667085] line-through font-semibold">
                              {formatCurrency(course.price)}
                            </span>
                          )}
                          {!isFree && course.discountPercent > 0 && (
                            <span className="text-[11px] font-semibold text-[#16845B] bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-200">
                              {course.discountPercent}% off
                            </span>
                          )}
                          {isFree && (
                            <span className="text-[11px] font-semibold text-[#16845B] bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-200">
                              100% Free
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs text-[#667085]">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="size-4 text-[#16845B] shrink-0" />
                          <span>30-day money-back guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="size-4 text-slate-400 shrink-0" />
                          <span>Full lifetime access & verified certificate</span>
                        </div>
                      </div>

                      {/* Primary & Secondary Action CTAs */}
                      <div className="space-y-2 pt-1">
                        <Button asChild className="w-full h-11 bg-[#1261D6] hover:bg-blue-700 text-white font-bold text-sm rounded-sm shadow-2xs cursor-pointer">
                          <Link href="/apply">
                            <span>{isFree ? "निःशुल्क प्रवेश लें (Free Enroll)" : "कार्ट में जोड़ें (Add to Cart)"}</span>
                          </Link>
                        </Button>

                        {!isFree && (
                          <Button asChild variant="outline" className="w-full h-11 border-[#E5E7EB] text-[#111827] hover:bg-slate-50 font-bold text-sm rounded-sm cursor-pointer">
                            <Link href="/apply">
                              <span>अभी खरीदें (Buy Now)</span>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>

                  </Card>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= 2. SIMPLE HORIZONTAL STATS ROW ================= */}
        <div className="bg-white border-b border-[#E5E7EB]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              <div className="lg:col-span-8 py-5 sm:py-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
                  
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold text-[#111827]">{course.modules.length} Modules</span>
                    <p className="text-xs text-[#667085]">Comprehensive curriculum</p>
                  </div>

                  <div className="space-y-0.5 pt-3 sm:pt-0 sm:pl-6">
                    <span className="text-sm font-bold text-[#111827]">{course.duration}</span>
                    <p className="text-xs text-[#667085]">Self-paced learning</p>
                  </div>

                  <div className="space-y-0.5 pt-3 sm:pt-0 sm:pl-6">
                    <span className="text-sm font-bold text-[#111827]">{course.level} Level</span>
                    <p className="text-xs text-[#667085]">No prior experience needed</p>
                  </div>

                  <div className="space-y-0.5 pt-3 sm:pt-0 sm:pl-6">
                    <span className="text-sm font-bold text-[#111827]">Lifetime Access</span>
                    <p className="text-xs text-[#667085]">Verified digital certificate</p>
                  </div>

                </div>
              </div>

              {/* 4 Cols right reserved space for overlapping card */}
              <div className="hidden lg:block lg:col-span-4" />

            </div>
          </div>
        </div>

        {/* ================= 3. STICKY NAVIGATION TABS ================= */}
        <CourseDetailTabs />

        {/* ================= 4. MAIN TWO-COLUMN BODY CONTAINER ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT MAIN CONTENT AREA (8 COLS) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* SECTION 1: WHAT YOU'LL LEARN */}
              <section id="outcomes" className="space-y-4 scroll-mt-28">
                <h2 className="text-xl font-bold text-[#111827]">
                  What you'll learn (आप क्या सीखेंगे)
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.learnings.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="size-4 text-[#16845B] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#111827] leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <Separator className="bg-[#E5E7EB]" />

              {/* SECTION 2: LEARNING PATH & CURRICULUM */}
              <section id="curriculum" className="scroll-mt-28">
                <LearningPathTimeline modules={course.modules} isEnrolled={isEnrolled} />
              </section>

              <Separator className="bg-[#E5E7EB]" />

              {/* SECTION 3: SKILLS & TOOLS COVERED */}
              <section id="skills" className="scroll-mt-28">
                <SkillsToolsGrid skills={course.skillsGained} tools={course.toolsLearned} />
              </section>

              <Separator className="bg-[#E5E7EB]" />

              {/* SECTION 4: IMMERSIVE LEARNING EXPERIENCE */}
              <section className="scroll-mt-28">
                <ImmersiveLearningExperience />
              </section>

              <Separator className="bg-[#E5E7EB]" />

              {/* SECTION 5: DOWNLOADABLE MATERIALS WITH LOCK STATE */}
              <CourseResourcesSection resources={course.downloadableResources} isEnrolled={false} />

            </div>

            {/* RIGHT SIDEBAR (4 COLS - Institutional Accreditation & Helpline Suite) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-5">
                
                {/* Offered By Box */}
                <div id="instructor" className="bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] p-5 space-y-3 scroll-mt-28">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block">
                    प्रशिक्षण प्रदाता (Offered by)
                  </span>

                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-md bg-white border border-[#E5E7EB] p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src="/assets/chhaigaon-udyami-logo.png"
                        alt="Logo"
                        className="size-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-[#111827]">
                        छैगांव उद्यमी आजीविका अकादमी
                      </h4>
                      <p className="text-xs text-[#1261D6] font-medium">
                        DIC खंडवा व NABARD पार्टनरशिप
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#667085] leading-relaxed pt-1 border-t border-[#E5E7EB]">
                    ICAR, NABARD एवं जिला उद्योग केंद्र (DIC) खंडवा द्वारा मान्यता प्राप्त प्रमाणित प्रशिक्षण एवं 35% PMEGP सब्सिडी सहायता।
                  </p>
                </div>

                {/* Government Subsidy & Bank Loan Guide Card */}
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 space-y-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-[4px] border border-emerald-200 inline-block">
                    शासकीय योजना लिंकेज
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-[#111827]">
                    PMEGP एवं मुख्यमंत्री उद्यम क्रांति सहायता
                  </h4>
                  <ul className="text-xs text-[#667085] space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="size-4 text-[#16845B] shrink-0 mt-0.5" />
                      <span>ग्रामीण उद्यमियों हेतु 35% तक प्रत्यक्ष सब्सिडी अनुदान</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="size-4 text-[#16845B] shrink-0 mt-0.5" />
                      <span>₹25 लाख तक बैंक-मान्य प्रोजेक्ट रिपोर्ट (DPR) मार्गदर्शन</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="size-4 text-[#16845B] shrink-0 mt-0.5" />
                      <span>DIC व बैंक साक्षात्कार हेतु संपूर्ण दस्तावेज चेकलिस्ट</span>
                    </li>
                  </ul>
                </div>

                {/* Helpline & Guidance Card */}
                <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 space-y-3">
                  <h4 className="font-bold text-xs sm:text-sm text-[#111827] uppercase tracking-wider">
                    उद्यमी सहायता केंद्र (Entrepreneur Support)
                  </h4>
                  <p className="text-xs text-[#667085] leading-relaxed">
                    कोर्स एनरोलमेंट, बैंक DPR, लोन आवेदन या सब्सिडी सहायता हेतु सीधे हमारे मेंटर्स से संपर्क करें।
                  </p>
                  <Button asChild variant="outline" className="w-full h-9 text-xs font-semibold text-[#1261D6] border-[#1261D6]/40 hover:bg-blue-50 rounded-sm">
                    <Link href="/contact">
                      <span>सहायता केंद्र से जुड़ें</span>
                    </Link>
                  </Button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
