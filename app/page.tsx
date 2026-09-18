import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourseCard } from "@/components/course/course-card";
import { HeroVideoPreview } from "@/components/home/hero-video-preview";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Award,
  BookOpen,
  BadgePercent,
  Landmark,
  ChevronRight,
  Sparkles,
  Check,
  Building2,
  Briefcase,
  Star,
} from "lucide-react";

export const metadata = {
  title: "Chhaigaon Udyami | ग्रामीण उद्यमिता एवं कौशल विकास मंच",
  description:
    "ग्रामीण एवं कस्बाई भारत के युवाओं और महिलाओं को सफल उद्यमी बनाने की डिजिटल पहल। सीखें डेयरी, फूड प्रोसेसिंग, जैविक खेती और सरकारी सब्सिडी योजनाएं।",
};

interface CourseItem {
  id: string;
  title: string;
  slug: string;
  shortDesc?: string | null;
  thumbnail?: string | null;
  price: number;
  discountedPrice?: number | null;
  level: string;
  lessonsCount?: number;
  category?: string;
}

const defaultCourses: CourseItem[] = [
  {
    id: "c-1",
    title: "आधुनिक डेयरी फार्मिंग एवं मिल्क प्रोसेसिंग मास्टरक्लास",
    slug: "modern-dairy-farming",
    shortDesc: "नस्ल सुधार, पोषण प्रबंधन, दूध उत्पाद निर्माण और PM मुद्रा लोन गाइडेंस।",
    thumbnail: "/images/dairy-course.jpg",
    price: 999,
    discountedPrice: 499,
    level: "शुरुआती (Beginner)",
    lessonsCount: 16,
    category: "डेयरी एवं पशुपालन",
  },
  {
    id: "c-2",
    title: "मसाला एवं खाद्य प्रसंस्करण लघु उद्योग (Food Processing Unit)",
    slug: "food-processing-micro-business",
    shortDesc: "लघु उद्योग की स्थापना, FSSAI लाइसेंसिंग, पैकेजिंग एवं मार्केटिंग।",
    thumbnail: "/images/food-processing.jpg",
    price: 1499,
    discountedPrice: 799,
    level: "मध्यम (Intermediate)",
    lessonsCount: 18,
    category: "खाद्य प्रसंस्करण",
  },
  {
    id: "c-3",
    title: "जैविक खेती एवं वर्मीकम्पोस्ट (केंचुआ खाद) व्यवसाय",
    slug: "organic-farming-vermicompost",
    shortDesc: "कम लागत में वर्मीकम्पोस्ट यूनिट, जैविक खाद निर्माण एवं बिक्री नेटवर्क।",
    thumbnail: "/images/organic-farming.jpg",
    price: 799,
    discountedPrice: 399,
    level: "शुरुआती (Beginner)",
    lessonsCount: 12,
    category: "जैविक कृषि",
  },
  {
    id: "c-4",
    title: "ग्रामीण डिजिटल व्यापार एवं सोशल मीडिया मार्केटिंग",
    slug: "rural-digital-commerce-marketing",
    shortDesc: "WhatsApp Business, Instagram और ONDC पर गाँव के उत्पाद ऑनलाइन बेचना सीखें।",
    thumbnail: "/images/digital-business.jpg",
    price: 0,
    discountedPrice: 0,
    level: "सभी के लिए (All Levels)",
    lessonsCount: 10,
    category: "डिजिटल व्यवसाय",
  },
];

const enterpriseRoles = [
  {
    title: "डेयरी फार्म एवं मिल्क प्रोसेसिंग प्लांट",
    desc: "10 से 50 दुधारू पशुओं की आधुनिक इकाई, स्वच्छ दुग्ध उत्पादन, FSSAI मानक एवं ₹10 लाख PM मुद्रा/PMEGP ऋण की संपूर्ण प्रक्रिया।",
    monthlyEarning: "₹65,000 - ₹1,40,000 / माह",
    tag: "उच्च मांग",
    slug: "modern-dairy-farming",
    authority: "NABARD & DIC",
  },
  {
    title: "मसाला एवं लघु खाद्य प्रसंस्करण उद्योग",
    desc: "स्थानीय मिर्च, धनिया, हल्दी व आटा-दलिया पिसाई उद्योग, आधुनिक मशीनरी, FSSAI मानक, पैकेजिंग व 35% PM FME सब्सिडी।",
    monthlyEarning: "₹45,000 - ₹95,000 / माह",
    tag: "35% PM FME सब्सिडी",
    slug: "food-processing-micro-business",
    authority: "MOFPI & FSSAI",
  },
  {
    title: "जैविक खाद एवं वर्मीकम्पोस्ट उत्पादन",
    desc: "कम पूंजी में केंचुआ खाद यूनिट, जैविक एनपीके निर्माण, नर्सरी व किसानों को थोक आपूर्ति नेटवर्क व ऑर्गेनिक सर्टिफिकेशन।",
    monthlyEarning: "₹35,000 - ₹75,000 / माह",
    tag: "कम लागत",
    slug: "organic-farming-vermicompost",
    authority: "कृषि विभाग म.प्र.",
  },
  {
    title: "ग्रामीण ई-कॉमर्स एवं ONDC डिजिटल विक्रेता",
    desc: "गाँव के हस्तशिल्प व कृषि उत्पादों को WhatsApp Business एवं ONDC पर लिस्ट करें और अखिल भारतीय डिलीवरी से जोड़ें।",
    monthlyEarning: "₹30,000 - ₹80,000 / माह",
    tag: "डिजिटल भारत",
    slug: "rural-digital-commerce-marketing",
    authority: "ONDC & Digital India",
  },
];

const plansList = [
  {
    title: "निःशुल्क ज्ञान मंच (Free Starter)",
    subtitle: "बुनियादी जानकारी एवं सरकारी योजनाओं की गाइड",
    price: "₹0",
    period: "जीवन भर निःशुल्क",
    buttonText: "निःशुल्क शुरू करें",
    buttonVariant: "outline" as const,
    isPopular: false,
    features: [
      "सभी सरकारी योजनाओं की सम्पूर्ण पात्रता गाइड",
      "मूल वीडियो लेक्चर्स का निःशुल्क पूर्वावलोकन",
      "डीपीआर एवं फॉर्म्स की चेकलिस्ट",
      "कम्युनिटी फोरम सपोर्ट",
    ],
  },
  {
    title: "उद्यमी प्लस प्रो (All-Access Pass)",
    subtitle: "सम्पूर्ण प्रैक्टिकल मास्टरक्लास एवं लोन सहायता",
    price: "₹499",
    period: "लाइफटाइम एक्सेस",
    buttonText: "अभी एनरोल करें",
    buttonVariant: "primary" as const,
    isPopular: true,
    features: [
      "सभी कोर्सेज का अनलिमिटेड लाइफटाइम एक्सेस",
      "डाउनलोड योग्य बैंक DPR व वित्तीय टेम्पलेट्स",
      "क्विज असेसमेंट एवं QR डिजिटल सर्टिफिकेट",
      "बैंक लोन व FSSAI लाइसेंसिंग स्टेप गाइड",
      "35% सरकारी सब्सिडी आवेदन सहायता",
    ],
  },
  {
    title: "1-on-1 मेंटरशिप व कंसल्टेंसी",
    subtitle: "विशेषज्ञ मेंटर्स के साथ व्यक्तिगत प्रोजेक्ट मार्गदर्शन",
    price: "₹1,499",
    period: "प्रति प्रोजेक्ट सत्र",
    buttonText: "मेंटर से जुड़ें",
    buttonVariant: "outline" as const,
    isPopular: false,
    features: [
      "उद्यमी प्लस प्रो के सभी फीचर्स शामिल",
      "व्यक्तिगत बैंक लोन डीपीआर की कस्टम ड्राफ्टिंग",
      "उद्योग विशेषज्ञों के साथ 1-on-1 वीडियो कॉल",
      "मार्केट लिंकेज एवं B2B खरीदारों से परिचय",
    ],
  },
];

interface DbCourseWithModules {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnail: string | null;
  price: unknown;
  isPaid: boolean;
  level: string | null;
  modules: {
    lessons: { id: string }[];
  }[];
}

export default async function HomePage() {
  let coursesToDisplay: CourseItem[] = defaultCourses;

  try {
    const dbCourses = (await prisma.course.findMany({
      where: {
        status: "PUBLISHED",
      },
      include: {
        modules: {
          include: {
            lessons: true,
          },
        },
      },
      take: 6,
    })) as unknown as DbCourseWithModules[];

    if (dbCourses && dbCourses.length > 0) {
      coursesToDisplay = dbCourses.map((c) => {
        const totalLessons = (c.modules || []).reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
        return {
          id: c.id,
          title: c.title,
          slug: c.slug,
          shortDesc: c.description,
          thumbnail: c.thumbnail || "/images/dairy-course.jpg",
          price: Number(c.price),
          discountedPrice: c.isPaid ? Number(c.price) : 0,
          level: c.level || "Beginner",
          lessonsCount: totalLessons || 12,
          category: "उद्यम कौशल",
        };
      });
    }
  } catch {
    // Database fallback
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO BANNER ================= */}
        <section className="bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-115 lg:min-h-125 flex items-center">
            
            {/* Left Column: Clean & Focused */}
            <div className="w-full lg:w-[54%] py-10 sm:py-14 lg:py-16 space-y-4 text-left z-10">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0056d2] border border-blue-200 shadow-2xs">
                <Sparkles className="h-3.5 w-3.5 text-[#0056d2]" />
                <span>कौशल विकास एवं ग्रामीण स्वावलंबन</span>
              </div>

              {/* Main Title (H1) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.18] font-headline">
                ग्रामीण उद्यमिता में,<br />
                सफलता कौशल से बनती है।
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg font-body">
                व्यावहारिक वीडियो प्रशिक्षण, बैंक-मान्य DPR प्रोजेक्ट रिपोर्ट्स और सरकारी सब्सिडी योजनाओं (PMEGP, मुख्यमंत्री उद्यम क्रांति) के साथ अपने गाँव में ही सफल व्यवसाय शुरू करें।
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link href="/courses">
                  <Button
                    size="lg"
                    className="px-5 py-3 h-11 text-xs sm:text-sm font-semibold rounded-[4px] bg-[#0056d2] hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-2 cursor-pointer font-label"
                  >
                    <span>कोर्सेज एक्सप्लोर करें</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/auth/register">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="px-5 py-3 h-11 text-xs sm:text-sm font-semibold rounded-[4px] border border-[#0056d2] text-[#0056d2] bg-white hover:bg-blue-50/60 transition-colors flex items-center gap-2 cursor-pointer font-label"
                  >
                    <span>निःशुल्क जुड़ें</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Full-Bleed Image flush with right screen edge */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] xl:w-[50%] h-80 sm:h-100 lg:h-full relative overflow-hidden">
            <img
              src="/images/coursera-hero-banner.jpg"
              alt="Indian Entrepreneurs collaborating on business project"
              className="w-full h-full object-cover object-center"
            />
            {/* Smooth Left Horizontal Fade Gradient into White Canvas */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none" />
            <div className="block lg:hidden absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ================= PARTNER / GOVERNMENT AUTHORITY LOGO CLOUD (COURSERA IMG 1) ================= */}
        <section className="border-b border-slate-200 bg-slate-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 font-label">
              प्रमुख शासन एवं वित्तीय संस्थाओं द्वारा समर्थित व मान्यता प्राप्त
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                <Landmark className="h-3.5 w-3.5 text-blue-600" /> MSME मंत्रालय (Govt of India)
              </span>
              <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-emerald-600" /> NABARD (नाबार्ड)
              </span>
              <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5 text-purple-600" /> MPSRLM (म.प्र. राज्य आजीविका मिशन)
              </span>
              <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                <BadgePercent className="h-3.5 w-3.5 text-amber-600" /> PM FME (खाद्य प्रसंस्करण मिशन)
              </span>
              <span className="px-4 py-2 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-2xs flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-700" /> जिला उद्योग केंद्र (DIC खंडवा)
              </span>
            </div>
          </div>
        </section>

        {/* ================= STATISTICAL IMPACT BAR ================= */}
        <section className="py-7 sm:py-9 bg-linear-to-r from-blue-950 via-[#0056d2] to-blue-950 text-white relative overflow-hidden border-y border-blue-800/80 shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
              
              {/* Stat 1 */}
              <div className="pt-2 sm:pt-0 sm:pr-6 lg:pr-8 space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-headline">
                  76%+
                </span>
                <p className="text-xs sm:text-sm text-blue-100 font-medium leading-snug">
                  व्यवसाय शुरू करने का आत्मविश्वास
                </p>
              </div>

              {/* Stat 2 */}
              <div className="pt-4 sm:pt-0 sm:px-6 lg:px-8 space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-headline">
                  88%+
                </span>
                <p className="text-xs sm:text-sm text-blue-100 font-medium leading-snug">
                  PMEGP व मुद्रा लोन स्वीकृति में सहायक
                </p>
              </div>

              {/* Stat 3 */}
              <div className="pt-4 sm:pt-0 sm:px-6 lg:px-8 space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-headline">
                  90%+
                </span>
                <p className="text-xs sm:text-sm text-blue-100 font-medium leading-snug">
                  सफल प्रैक्टिकल सर्टिफिकेशन दर
                </p>
              </div>

              {/* Stat 4 */}
              <div className="pt-4 sm:pt-0 sm:pl-6 lg:pl-8 space-y-1">
                <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-headline">
                  35%
                </span>
                <p className="text-xs sm:text-sm text-blue-100 font-medium leading-snug">
                  अधिकतम सरकारी सब्सिडी मार्गदर्शन
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ================= EXPLORE ROLES & ENTERPRISE TRACKS ================= */}
        <section className="py-10 lg:py-12 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight font-headline">
                  अपने गाँव में शुरू करने योग्य प्रमुख व्यवसाय
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-body">
                  प्रमाणित प्रोजेक्ट्स, अनुमानित मासिक आय एवं बैंक लोन पात्रता के आधार पर उपयुक्त उद्यम चुनें।
                </p>
              </div>

              <Link href="/courses" className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0056d2] hover:underline">
                <span>सभी उद्यम देखें</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Role Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {enterpriseRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 hover:border-[#0056d2]/50 bg-white p-4.5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#0056d2] border border-blue-100">
                        {role.tag}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {role.authority}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-950 group-hover:text-[#0056d2] transition-colors leading-snug font-headline">
                      {role.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-body">
                      {role.desc}
                    </p>

                    <div className="bg-emerald-50/90 border border-emerald-100 rounded-xl p-2.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 block tracking-wider">
                        अनुमानित मासिक आय क्षमता
                      </span>
                      <span className="text-sm font-black text-emerald-700 font-headline">
                        {role.monthlyEarning}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500">
                      प्रमाणित पाठ्यक्रम
                    </span>
                    <Link
                      href={`/courses/${role.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0056d2] group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>विवरण देखें</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= FEATURED COURSES CATALOG ================= */}
        <section id="courses" className="py-10 lg:py-12 border-b border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight font-headline">
                  लोकप्रिय उद्यमिता मास्टरक्लासेस
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-body">
                  सरल हिंदी भाषा में उद्योग विशेषज्ञों द्वारा तैयार किए गए व्यावहारिक कोर्सेज, जिसमें प्रोजेक्ट रिपोर्ट व सब्सिडी फॉर्म शामिल हैं।
                </p>
              </div>

              <Link href="/courses" className="inline-flex items-center gap-1 text-sm font-bold text-[#0056d2] hover:underline">
                <span>सभी कोर्सेज देखें</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {coursesToDisplay.map((course, idx) => (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  title={course.title}
                  slug={course.slug}
                  shortDesc={course.shortDesc}
                  thumbnail={course.thumbnail}
                  price={course.price}
                  discountedPrice={course.discountedPrice}
                  level={course.level}
                  lessonsCount={course.lessonsCount}
                  category={course.category}
                  isLastInRow={idx % 4 >= 2}
                />
              ))}
            </div>

          </div>
        </section>

        {/* ================= TURN LEARNING INTO PROOF & PROGRESS SECTIONS ================= */}
        <section id="credentials" className="py-10 lg:py-14 border-b border-slate-200 bg-white overflow-hidden space-y-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* ROW 1: Turn your learning into proof */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Text */}
              <div className="lg:col-span-6 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-[#0056d2] border border-blue-200 shadow-2xs tracking-wide">
                  <Award className="h-4 w-4 text-[#0056d2] shrink-0" />
                  <span>सत्यापित प्रमाणन</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight font-headline">
                  सीखने को आधिकारिक प्रमाण में बदलें
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-body">
                  सफलतापूर्वक कोर्स पूरा करने पर आपको आधिकारिक QR-सत्यापित सर्टिफिकेट एवं बैंक-मान्य DPR प्राप्त होता है, जिसे आप PMEGP, PM मुद्रा लोन और अपने व्यावसायिक पोर्टफोलियो में उपयोग कर सकते हैं।
                </p>

                <div className="space-y-2 pt-1 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>24x7 ऑनलाइन तत्काल QR सत्यापन कोड व डिजिटल रिकॉर्ड</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>PM मुद्रा एवं PMEGP बैंक ऋण हेतु आधिकारिक रूप से मान्य</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>जिला उद्योग केंद्र (DIC) व NABARD मार्गदर्शिका से संरेखित</span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link href="/courses">
                    <Button className="bg-[#0056d2] hover:bg-blue-800 text-white font-bold rounded-lg px-5 py-2.5 text-xs shadow-xs inline-flex items-center gap-1.5 cursor-pointer">
                      <span>सर्टिफाइड कोर्स चुनें</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: Graphic Mockup */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <img
                  src="/images/certificate-fan-proof.jpg"
                  alt="सत्यापित डिजिटल सर्टिफिकेट्स - छैगांव उद्यमी"
                  className="max-w-md w-full h-auto object-contain drop-shadow-md hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* ROW 2: Daily Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Graphic Mockup */}
              <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-start">
                <img
                  src="/images/learning-progress-proof.jpg"
                  alt="दैनिक शिक्षण प्रगति एवं लर्निंग पाथ - छैगांव उद्यमी"
                  className="max-w-md w-full h-auto object-contain drop-shadow-md hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Right: Text */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs tracking-wide">
                  <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>दैनिक प्रगति</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight font-headline">
                  प्रतिदिन कुछ ही मिनटों में करें प्रगति
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-body">
                  स्पष्ट स्टेप्स और 10-15 मिनट के संक्षिप्त वीडियो अध्यायों के साथ बिना किसी बाधा के निरंतर आगे बढ़ें और व्यावहारिक ज्ञान प्राप्त करें।
                </p>

                <div className="space-y-2 pt-1 text-xs font-medium text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>मोबाइल एवं धीमे इंटरनेट पर भी सहज चलने वाले HD वीडियो</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>प्रत्येक मॉड्यूल के बाद लघु स्व-मूल्यांकन क्विज</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>डाउनलोड योग्य व्यावहारिक कार्यपुस्तिकाएं (Workbooks)</span>
                  </div>
                </div>

                <div className="pt-1">
                  <Link href="/auth/register">
                    <Button className="bg-slate-900 hover:bg-black text-white font-bold rounded-lg px-5 py-2.5 text-xs shadow-xs inline-flex items-center gap-1.5 cursor-pointer">
                      <span>निःशुल्क शुरुआत करें</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= PLANS & PRICING TIERS ================= */}
        <section className="py-10 lg:py-14 border-b border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-4xl font-bold text-slate-950 tracking-tight font-headline">
                अपने लक्ष्य के अनुसार सही योजना चुनें
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-body">
                पारदर्शी योजनाएं — बिना किसी छुपे शुल्क के। आजीवन ज्ञान एवं बैंक लोन सहायता।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {plansList.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white border p-6 sm:p-7 flex flex-col justify-between transition-all relative ${
                    plan.isPopular
                      ? "border-[#0056d2] shadow-xl ring-2 ring-[#0056d2]/20"
                      : "border-slate-200 shadow-xs hover:shadow-md"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 rounded-full bg-linear-to-r from-blue-700 via-[#0056d2] to-indigo-700 text-white text-[10px] font-bold tracking-wide uppercase shadow-sm border border-white/30 inline-flex items-center gap-1 whitespace-nowrap">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300 shrink-0" />
                      <span>सर्वोत्तम विकल्प</span>
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 font-headline">{plan.title}</h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-body">{plan.subtitle}</p>
                    </div>

                    <div>
                      <span className="text-3xl font-extrabold text-slate-950 font-headline">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-500 ml-1.5 font-medium">/ {plan.period}</span>
                    </div>

                    <Link href="/auth/register" className="block">
                      <Button
                        className={`w-full py-2.5 h-10 text-xs font-bold rounded-lg cursor-pointer ${
                          plan.buttonVariant === "primary"
                            ? "bg-[#0056d2] hover:bg-blue-800 text-white shadow-xs"
                            : "border border-[#0056d2] text-[#0056d2] bg-white hover:bg-blue-50"
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>

                    {/* Features List */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
                        मुख्य विशेषताएं:
                      </span>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= FULL-WIDTH MILESTONE CTA BANNER ================= */}
        <section className="py-6 sm:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#0056d2] text-white overflow-hidden shadow-xl relative flex flex-col lg:flex-row items-center justify-between border border-blue-600">
              
              {/* Left Column Text */}
              <div className="p-6 sm:p-7 lg:p-8 max-w-2xl space-y-3 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/15 backdrop-blur-md border border-white/25 text-white">
                  <span className="text-[10px] font-black tracking-wider uppercase">छैगांव उद्यमी</span>
                  <span className="px-1 py-0.2 rounded bg-blue-500 text-[9px] font-black tracking-widest uppercase">PLUS</span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight font-headline">
                    मात्र 7 दिनों में अपने उद्यम का सपना साकार करें
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-body">
                  हजारों ग्रामीणों एवं युवाओं से जुड़ें जो अपने गाँव में ही सफल लघु उद्योग शुरू कर रहे हैं। छोटे-छोटे अध्यायों से वास्तविक व्यावसायिक कौशल अर्जित करें।
                </p>

                <div className="pt-1">
                  <Link href="/auth/register" className="inline-block">
                    <Button
                      size="sm"
                      className="px-5 py-2.5 h-10 text-xs sm:text-sm font-bold rounded-lg bg-white hover:bg-slate-100 text-[#0056d2] shadow-md transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>निःशुल्क शुरुआत करें</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="relative w-full lg:w-90 h-48 sm:h-52 lg:h-56 shrink-0 flex items-end justify-center lg:justify-end overflow-hidden">
                <img
                  src="/images/banner-entrepreneur.jpg"
                  alt="सफल ग्रामीण उद्यमी - छैगांव उद्यमी प्लस"
                  className="relative z-10 h-full w-auto object-contain object-bottom"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS ACCORDION ================= */}
        <section className="py-10 lg:py-14 border-t border-slate-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 font-headline">
                अक्सर पूछे जाने वाले प्रश्न (FAQs)
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-body">
                कोर्सेज, सब्सिडी योजनाओं एवं सर्टिफिकेट से संबंधित महत्वपूर्ण जानकारियां।
              </p>
            </div>

            <FaqAccordion />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
