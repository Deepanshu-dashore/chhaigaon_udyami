import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionBadge } from "@/components/ui/section-badge";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CourseDetailTabs } from "@/components/course/course-detail-tabs";
import { CourseModulesAccordion } from "@/components/course/course-modules-accordion";
import { formatCurrency } from "@/lib/utils";
import {
  ChevronRight,
  Star,
  Users,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Building2,
  FileText,
  HelpCircle,
  Share2,
  Download,
  ArrowRight,
  Check,
  MessageSquare,
  Landmark,
  PhoneCall,
  GraduationCap,
} from "lucide-react";

// Mock Fallback Courses Dictionary for Rich Presentation
const MOCK_COURSES_DATA: Record<string, any> = {
  "modern-dairy-farming": {
    id: "c-1",
    title: "आधुनिक डेयरी फार्मिंग एवं दुग्ध उत्पाद प्रसंस्करण मास्टरक्लास",
    slug: "modern-dairy-farming",
    category: "पशुपालन एवं डेयरी",
    price: 1299,
    discountedPrice: 999,
    level: "प्रारंभिक स्तर (Beginner Level)",
    duration: "12 घंटे • 6 मॉड्यूल",
    rating: 4.9,
    reviewsCount: 1240,
    enrolledCount: 4850,
    instructor: "डॉ. राजेश शर्मा (वरिष्ठ डेयरी विशेषज्ञ, DIC खंडवा)",
    authorityLogo: "/assets/chhaigaon-udyami-logo.png",
    authorityName: "जिला उद्योग केंद्र (DIC) खंडवा व NABARD संरेखित",
    shortDesc:
      "15 दुधारू पशुओं के डेयरी फार्म की वैज्ञानिक स्थापना, BMC मिल्क चिलिंग, अमूल/सांची दुग्ध संघ लिंकेज एवं PMEGP ₹25 लाख लोन गाइड।",
    learnings: [
      "10 से 20 दुधारू गाय-भैंसों का नस्ल चयन एवं शेड निर्माण तकनीक",
      "साइलेज (अचार) व हरा चारा प्रबंधन से दूध उत्पादन 25% बढ़ाना",
      "ऑटोमैटिक BMC मिल्क चिलिंग प्लांट एवं FSSAI हाइजीन मानक",
      "PMEGP एवं मुख्यमंत्री उद्यम क्रांति योजना में 35% सब्सिडी आवेदन",
      "बैंक-मान्य ₹25 लाख प्रोजेक्ट रिपोर्ट (DPR) फाइलिंग गाइड",
      "सांची, अमूल एवं स्थानीय दुग्ध समितियों के साथ डायरेक्ट सप्लाई एग्रीमेंट",
    ],
    skillsGained: [
      "डेयरी फार्म शेड डिज़ाइन",
      "साइलेज पोषण आहार",
      "BMC चिलिंग ऑपरेशन",
      "PMEGP ₹25L DPR फाइलिंग",
      "FSSAI डेयरिंग लाइसेंस",
      "पशु बीमा व टीकाकरण",
    ],
    toolsLearned: [
      "PMEGP Excel DPR Calculator",
      "Tally Prime Dairy Billing",
      "NABARD Dairy Subsidy Guide",
      "FSSAI Portal Application Kit",
    ],
    modules: [
      {
        id: "m-1",
        order: 1,
        title: "मॉड्यूल 1: व्यावसायिक डेयरी फार्मिंग की नींव व स्थान चयन",
        description: "स्थान चयन, शेड वेंटीलेशन व पानी निकासी व्यवस्था।",
        duration: "1.5 घंटे",
        lessons: [
          { id: "l-1", title: "1.1 भारत में डेयरी उद्योग का भविष्य व आय क्षमता", duration: "15 मिनट", isPreview: true },
          { id: "l-2", title: "1.2 उन्नत नस्लों (गिर, साहिवाल, मुर्राह) का चयन", duration: "25 मिनट", isPreview: true },
          { id: "l-3", title: "1.3 वैज्ञानिक पशु शेड का लेआउट एवं लागत अनुमान", duration: "35 मिनट" },
        ],
      },
      {
        id: "m-2",
        order: 2,
        title: "मॉड्यूल 2: पशु पोषण, साइलेज एवं हरा चारा प्रबंधन",
        description: "कम लागत में पौष्टिक चारा तैयार करने की विधियां।",
        duration: "2 घंटे",
        lessons: [
          { id: "l-4", title: "2.1 टीएमआर (Total Mixed Ration) संतुलित आहार", duration: "30 मिनट" },
          { id: "l-5", title: "2.2 मक्का साइलेज (आचार) बनाने की विधि", duration: "45 मिनट" },
          { id: "l-6", title: "2.3 नेपियर व सुपर नेपियर घास की खेती", duration: "25 मिनट" },
        ],
      },
      {
        id: "m-3",
        order: 3,
        title: "मॉड्यूल 3: दुग्ध प्रसंस्करण, BMC चिलिंग व FSSAI मानक",
        description: "पनीर, खोया, घी निर्माण एवं हाइजीन मानक।",
        duration: "2.5 घंटे",
        lessons: [
          { id: "l-7", title: "3.1 बल्क मिल्क कूलर (BMC) ऑपरेशन व फैट टेस्टिंग", duration: "40 मिनट" },
          { id: "l-8", title: "3.2 पनीर व शुद्ध देसी घी निर्माण प्रक्रिया", duration: "50 मिनट" },
          { id: "l-9", title: "3.3 FSSAI खाद्य सुरक्षा लाइसेंस ऑनलाइन आवेदन", duration: "30 मिनट" },
        ],
      },
      {
        id: "m-4",
        order: 4,
        title: "मॉड्यूल 4: PMEGP 35% सब्सिडी व बैंक लोन प्रक्रिया",
        description: "₹25 लाख तक के बैंक ऋण स्वीकृति की चरणबद्ध विधि।",
        duration: "3 घंटे",
        lessons: [
          { id: "l-10", title: "4.1 PMEGP पोर्टल पर ऑनलाइन फॉर्म भरने की विधि", duration: "45 मिनट" },
          { id: "l-11", title: "4.2 बैंक-मान्य प्रोजेक्ट रिपोर्ट (DPR) तैयार करना", duration: "60 मिनट" },
          { id: "l-12", title: "4.3 DIC खंडवा टास्क फोर्स इंटरव्यू तैयारी", duration: "35 मिनट" },
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
  const mock = MOCK_COURSES_DATA[slug];

  return {
    title: mock
      ? `${mock.title} | Chhaigaon Udyami`
      : "कोर्स विवरण | Chhaigaon Udyami",
    description: mock
      ? mock.shortDesc
      : "छैगांव उद्यमी प्रमाणित व्यावसायिक मास्टरक्लास एवं सब्सिडी मार्गदर्शिका।",
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Try fetching from database first
  let dbCourse = null;
  try {
    dbCourse = await prisma.course.findUnique({
      where: { slug },
      include: {
        createdBy: true,
        modules: {
          orderBy: { order: "asc" },
          include: { lessons: { orderBy: { order: "asc" } } },
        },
      },
    });
  } catch (err) {
    console.warn("DB query error in CourseDetailPage, using fallback mock:", err);
  }

  // Merge DB data or Fallback Mock data
  const mock = MOCK_COURSES_DATA[slug] || MOCK_COURSES_DATA["modern-dairy-farming"];

  const course = {
    title: dbCourse?.title || mock.title,
    slug: dbCourse?.slug || mock.slug,
    category: mock.category,
    price: dbCourse ? Number(dbCourse.price) : mock.price,
    discountedPrice: mock.discountedPrice,
    level: dbCourse?.level || mock.level,
    duration: mock.duration,
    rating: mock.rating,
    reviewsCount: mock.reviewsCount,
    enrolledCount: mock.enrolledCount,
    instructor: dbCourse?.createdBy?.name || mock.instructor,
    authorityName: mock.authorityName,
    shortDesc: dbCourse?.description || mock.shortDesc,
    learnings: mock.learnings,
    skillsGained: mock.skillsGained,
    toolsLearned: mock.toolsLearned,
    modules: dbCourse?.modules?.length
      ? dbCourse.modules.map((m) => ({
          id: m.id,
          order: m.order,
          title: m.title,
          description: m.description || "",
          lessons: m.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            duration: l.duration ? `${Math.round(l.duration / 60)} मिनट` : "15 मिनट",
            type: l.type.toLowerCase(),
            isPreview: l.isPreview,
          })),
        }))
      : mock.modules,
  };

  const isFree = course.price === 0 || course.discountedPrice === 0;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        
        {/* ================= 1. COURSERA-STYLE HERO BANNER ================= */}
        <section className="bg-linear-to-b from-[#f0f4fc] via-[#f5f8ff] to-white border-b border-slate-200/80 relative overflow-hidden pt-6 pb-16 sm:pb-20">
          
          {/* Subtle Ambient Curved Geometric Background Shape (Matching Screenshot 1) */}
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/4" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <Link href="/" className="hover:text-[#0056d2] transition-colors">
                होम (Home)
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <Link href="/courses" className="hover:text-[#0056d2] transition-colors">
                कोर्सेज (Courses)
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-800 font-bold">{course.category}</span>
            </div>

            {/* Authority Brand Identity Logo (DIC Khandwa / Chhaigaon Udyami) */}
            <div className="flex items-center gap-2 pt-1">
              <div className="size-8 rounded-xl bg-white border border-blue-200 shadow-2xs flex items-center justify-center p-1">
                <img
                  src="/assets/chhaigaon-udyami-logo.png"
                  alt="Chhaigaon Udyami Logo"
                  className="size-full object-contain"
                />
              </div>
              <span className="text-xs font-bold text-slate-800 font-headline">
                {course.authorityName}
              </span>
            </div>

            {/* High Impact Course Main Headline */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-950 tracking-tight leading-[1.2] font-headline max-w-4xl">
              {course.title}
            </h1>

            {/* Short Subtitle Value Proposition */}
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl font-body">
              {course.shortDesc}
            </p>

            {/* Instructor & Metadata Row */}
            <div className="flex items-center gap-3 flex-wrap text-xs pt-1">
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold bg-white/90 px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                <GraduationCap className="h-4 w-4 text-[#0056d2]" />
                <span>शिक्षक: <strong>{course.instructor}</strong></span>
              </div>

              <Badge className="bg-blue-600 text-white font-bold text-[11px] px-2.5 py-1 rounded-full gap-1 shadow-2xs">
                <Sparkles className="h-3.5 w-3.5" />
                <span>+ 35% PMEGP सब्सिडी सहायता शामिल</span>
              </Badge>
            </div>

            {/* Enrollment Action CTA Box & Social Proof Count */}
            <div className="pt-3 space-y-2.5">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link href="/apply">
                  <Button className="h-12 px-8 rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white text-sm font-black shadow-lg hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-2">
                    <span>{isFree ? "निःशुल्क एनरोल करें" : "प्रवेश लें"}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <div className="flex items-center gap-2">
                  {!isFree && (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black text-slate-950 font-headline">
                        {formatCurrency(course.discountedPrice || course.price)}
                      </span>
                      {course.discountedPrice && (
                        <span className="text-xs text-slate-400 line-through font-semibold">
                          {formatCurrency(course.price)}
                        </span>
                      )}
                    </div>
                  )}
                  <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ✓ 100% सब्सिडी व लोन पात्रता
                  </span>
                </div>
              </div>

              {/* Social Proof Enrolled Count */}
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                <Users className="h-4 w-4 text-slate-400" />
                <span><strong>{course.enrolledCount.toLocaleString("en-IN")}</strong> ग्रामीण उद्यमी नामांकित हैं</span>
              </div>
            </div>

          </div>
        </section>

        {/* ================= 2. FLOATING KEY STATS OVERLAPPING CARD (MATCHING SCREENSHOT 1) ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-5 sm:p-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            {/* Stat 1 */}
            <div className="space-y-1">
              <div className="font-bold text-sm sm:text-base text-slate-950 font-headline flex items-center gap-1.5">
                <Award className="h-4 w-4 text-[#0056d2]" />
                <span>6 मॉड्यूल श्रृंखला</span>
              </div>
              <p className="text-xs text-slate-500 font-body">
                आधिकारिक QR-सत्यापित डिजिटल प्रमाण पत्र
              </p>
            </div>

            {/* Stat 2 */}
            <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
              <div className="font-bold text-sm sm:text-base text-slate-950 font-headline flex items-center gap-1">
                <span>{course.rating.toFixed(1)}</span>
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-xs text-slate-500 font-body">
                {course.reviewsCount.toLocaleString("en-IN")} शिक्षार्थी समीक्षाएं
              </p>
            </div>

            {/* Stat 3 */}
            <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
              <div className="font-bold text-sm sm:text-base text-slate-950 font-headline">
                {course.level}
              </div>
              <p className="text-xs text-slate-500 font-body">
                पूर्व अनुभव आवश्यक नहीं
              </p>
            </div>

            {/* Stat 4 */}
            <div className="space-y-1 pt-4 md:pt-0 md:pl-6">
              <div className="font-bold text-sm sm:text-base text-slate-950 font-headline flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-emerald-600" />
                <span>लचीला समय (Flexible)</span>
              </div>
              <p className="text-xs text-slate-500 font-body">
                15 मिनट प्रतिदिन • आजीवन एक्सेस
              </p>
            </div>

          </div>
        </div>

        {/* ================= 3. STICKY TOP TAB NAVIGATION BAR (MATCHING SCREENSHOT 2 & 3) ================= */}
        <div className="mt-8">
          <CourseDetailTabs />
        </div>

        {/* ================= 4. MAIN CONTENT CONTAINER (2 COLUMNS: LEFT 8 COLS, RIGHT 4 COLS) ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* LEFT MAIN CONTENT AREA (8 COLUMNS) */}
            <div className="lg:col-span-8 space-y-10">
              
              {/* SECTION 1: WHAT YOU'LL LEARN (MATCHING SCREENSHOT 2) */}
              <section id="outcomes" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-5 scroll-mt-28">
                <h3 className="text-xl font-bold text-slate-950 font-headline">
                  आप क्या-क्या सीखेंगे (What you'll learn)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.learnings.map((item: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 2: SKILLS & TOOLS YOU'LL GAIN (MATCHING SCREENSHOT 2) */}
              <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-950 font-headline">
                    प्राप्त होने वाले व्यावसायिक कौशल (Skills you'll gain)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {course.skillsGained.map((skill: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200 hover:bg-blue-50 hover:text-[#0056d2] transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-950 font-headline">
                    सीखने को मिलने वाले टूल एवं फॉर्मेट (Tools you'll learn)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {course.toolsLearned.map((tool: string, idx: number) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0056d2] border border-blue-100"
                      >
                        🛠️ {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 3: DETAILS TO KNOW (MATCHING SCREENSHOT 2) */}
              <section id="about" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-4 scroll-mt-28">
                <h3 className="text-base font-bold text-slate-950 font-headline">
                  मुख्य विशेषताएं (Details to know)
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-1">
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center shrink-0 border border-blue-100">
                      <Award className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        शेयर करने योग्य QR डिजिटल प्रमाण पत्र
                      </h4>
                      <p className="text-xs text-slate-500 font-body">
                        अपने बैंक लोन आवेदन, PMEGP फाइल व पोर्टफोलियो में सीधा जोड़ें।
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                      <Landmark className="h-5 w-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        100% सरल हिंदी भाषा में शिक्षण
                      </h4>
                      <p className="text-xs text-slate-500 font-body">
                        स्थानीय निमाड़ी व हिंदी संवाद में व्यावहारिक वीडियो।
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 4: COURSE CURRICULUM MODULES (MATCHING SCREENSHOT 3) */}
              <section id="curriculum" className="space-y-4 scroll-mt-28">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-950 font-headline">
                    पाठ्यक्रम सामग्री (Course Content)
                  </h3>
                  <span className="text-xs font-semibold text-slate-500">
                    {course.modules.length} मॉड्यूल • {course.duration}
                  </span>
                </div>

                <CourseModulesAccordion modules={course.modules} />
              </section>

              {/* SECTION 5: TESTIMONIALS (MATCHING SCREENSHOT 4) */}
              <section id="reviews" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6 scroll-mt-28">
                <h3 className="text-xl font-bold text-slate-950 font-headline">
                  सफल उद्यमियों के अनुभव (Why people choose us)
                </h3>

                <div className="bg-linear-to-r from-blue-50/70 via-indigo-50/40 to-white rounded-2xl p-6 border border-blue-100 flex flex-col sm:flex-row items-center gap-6">
                  <div className="size-24 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0">
                    <img
                      src="/images/rural-entrepreneur-story.jpg"
                      alt="सफल ग्रामीण उद्यमी"
                      className="size-full object-cover"
                    />
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <p className="text-xs sm:text-sm text-slate-700 italic font-body leading-relaxed">
                      "छैगांव उद्यमी के डेयरी मास्टरक्लास और PMEGP गाइड की मदद से मुझे जिला उद्योग केंद्र (DIC खंडवा) से ₹15 लाख का बैंक लोन और 35% सब्सिडी स्वीकृत हुई। आज मेरी डेयरी यूनिट में 12 गायें हैं।"
                    </p>
                    <div className="text-xs">
                      <strong className="font-bold text-slate-950 block">कमलेश पाटीदार</strong>
                      <span className="text-slate-500">ग्राम पंधाना, जिला खंडवा (मध्य प्रदेश)</span>
                    </div>
                  </div>
                </div>
              </section>

            </div>

            {/* RIGHT SIDEBAR (4 COLUMNS - MATCHING SCREENSHOT 3) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Sticky Sidebar Box */}
              <div className="sticky top-28 space-y-6">
                
                {/* 1. Instructor & Offered By Card (Matching Screenshot 3) */}
                <div id="instructor" className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-5 scroll-mt-28">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      प्रशिक्षक (Instructor)
                    </h4>

                    <div className="flex items-center gap-3">
                      <div className="size-12 rounded-full bg-blue-100 text-[#0056d2] font-black text-base flex items-center justify-center border border-blue-200 shrink-0">
                        डॉ
                      </div>
                      <div>
                        <h5 className="font-bold text-sm text-slate-950 font-headline">
                          {course.instructor}
                        </h5>
                        <p className="text-[11px] text-slate-500">
                          394 कोर्सेज • 18,200+ शिक्षार्थी
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      द्वारा संचालित (Offered by)
                    </h4>

                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                        <img
                          src="/assets/chhaigaon-udyami-logo.png"
                          alt="Logo"
                          className="size-full object-contain"
                        />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs text-slate-900">
                          छैगांव उद्यमी अकादमी
                        </h5>
                        <p className="text-[11px] text-[#0056d2] font-bold">
                          DIC खंडवा व NABARD पार्टनरशिप
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Enrollment Action Card */}
                <div className="bg-linear-to-b from-[#003882] via-[#0056d2] to-[#004bb8] text-white rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-200 block">
                      ऑनलाइन प्रवेश प्रारंभ
                    </span>
                    <h4 className="text-xl font-bold font-headline">
                      {isFree ? "मुफ्त में शुरू करें" : "प्रमाणित मास्टरक्लास"}
                    </h4>
                  </div>

                  <div className="space-y-2 text-xs text-blue-100">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                      <span>24x7 ऑनलाइन तत्काल QR सत्यापन</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                      <span>बैंक-मान्य DPR व सब्सिडी फॉर्म</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
                      <span>आजीवन मेंटरशिप सहायता</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link href="/apply">
                      <Button className="w-full h-11 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md cursor-pointer">
                        <span>अभी एनरोल करें</span>
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </Link>
                  </div>
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
