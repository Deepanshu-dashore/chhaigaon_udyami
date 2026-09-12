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
} from "lucide-react";

export const metadata = {
  title: "Chhaigaon Udyami | ग्रामीण उद्यमिता एवं कौशल विकास मंच (Coursera & IBM Skills Edition)",
  description:
    "ग्रामीण एवं कस्बाई भारत के युवाओं और महिलाओं को सफल उद्यमी बनाने की आधुनिक डिजिटल पहल। सीखें डेयरी, फूड प्रोसेसिंग, जैविक खेती और सरकारी सब्सिडी योजनाएं।",
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
    shortDesc: "नस्ल सुधार, पोषण प्रबंधन, दूध के उत्पाद (पनीर, घी) निर्माण और PM मुद्रा लोन गाइडेंस।",
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
    shortDesc: "घर व गाँव से लघु उद्योग की स्थापना, FSSAI लाइसेंसिंग, पैकेजिंग एवं मार्केटिंग।",
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
    shortDesc: "कम लागत में वर्मीकम्पोस्ट यूनिट, जैविक खाद निर्माण, सर्टिफिकेशन एवं बिक्री नेटवर्क।",
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
    shortDesc: "WhatsApp Business, Instagram और ONDC पर अपने गाँव के उत्पाद ऑनलाइन बेचना सीखें।",
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
    title: "डेयरी फार्म एवं मिल्क प्रोसेसिंग प्लांट संचालक",
    desc: "10 से 50 दुधारू पशुओं की इकाई, स्वच्छ दुग्ध उत्पादन, पनीर-घी निर्माण और ₹10 लाख मुद्रा लोन।",
    monthlyEarning: "₹65,000 - ₹1,40,000 / माह",
    level: "Beginner Friendly",
    tag: "उच्च मांग",
    slug: "modern-dairy-farming",
    authority: "NABARD & DIC Approved",
  },
  {
    title: "मसाला एवं लघु खाद्य प्रसंस्करण उद्यमी",
    desc: "स्थानीय मिर्च, धनिया, हल्दी व आटा-दलिया पिसाई उद्योग, FSSAI लाइसेंसिंग एवं आकर्षक पैकेजिंग।",
    monthlyEarning: "₹45,000 - ₹95,000 / माह",
    level: "Intermediate",
    tag: "35% PM FME सब्सिडी",
    slug: "food-processing-micro-business",
    authority: "MOFPI & FSSAI Aligned",
  },
  {
    title: "जैविक खाद एवं वर्मीकम्पोस्ट उत्पादक",
    desc: "कम पूंजी में केंचुआ खाद यूनिट, जैविक एनपीके निर्माण, नर्सरी व किसानों को थोक बिक्री नेटवर्क।",
    monthlyEarning: "₹35,000 - ₹75,000 / माह",
    level: "Foundational",
    tag: "कम लागत",
    slug: "organic-farming-vermicompost",
    authority: "कृषि विभाग म.प्र.",
  },
  {
    title: "ग्रामीण ई-कॉमर्स एवं ONDC डिजिटल विक्रेता",
    desc: "गाँव के हस्तशिल्प व कृषि उत्पादों को WhatsApp, Amazon व ONDC पर ऑनलाइन सीधे ग्राहकों तक पहुंचाएं।",
    monthlyEarning: "₹30,000 - ₹80,000 / माह",
    level: "All Levels",
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
      "डीपीआर एवं फॉर्म्स की बुनियादी चेकलिस्ट",
      "कम्युनिटी फोरम सपोर्ट",
    ],
  },
  {
    title: "उद्यमी प्लस प्रो (All-Access Pass)",
    subtitle: "सम्पूर्ण प्रैक्टिकल मास्टरक्लास एवं लोन सहायता",
    price: "₹499",
    period: "एक बार का भुगतान (Lifetime)",
    buttonText: "अभी एनरोल करें",
    buttonVariant: "primary" as const,
    isPopular: true,
    features: [
      "सभी कोर्सेज का सम्पूर्ण अनलिमिटेड लाइफटाइम एक्सेस",
      "डाउनलोड योग्य एक्सेल व वर्ड बैंक DPR टेम्पलेट्स",
      "क्विज असेसमेंट एवं QR डिजिटल सर्टिफिकेट",
      "बैंक लोन व FSSAI लाइसेंसिंग स्टेप-बाय-स्टेप गाइड",
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
        {/* ================= ROYAL BLUE HERO BANNER (COURSERA IMG 1) ================= */}
        <section className="bg-gradient-to-r from-blue-900 via-[#0056d2] to-indigo-900 text-white py-10 sm:py-14 border-b border-blue-800/80 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_60%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Column: Coursera Headline & CTAs */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-center lg:text-left">
                
                {/* Brand Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white border border-white/25 shadow-xs">
                  <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                  <span>छैगांव उद्यमी PLUS • विशेष ग्रामीण उद्यम पहल 2026</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] font-headline">
                  कुछ ही मिनटों में शुरुआत करें।<br />
                  <span className="text-amber-300">इसी सप्ताह</span> अपना उद्योग बनाएं।
                </h1>

                {/* Subtitle */}
                <p className="text-blue-100 text-base sm:text-lg leading-relaxed max-w-2xl font-body">
                  डेयरी फार्मिंग, फूड प्रोसेसिंग, जैविक खेती और सरकारी सब्सिडी योजनाओं के साथ सीखें सफल ग्रामीण उद्योग की स्थापना। प्रमाणित वीडियो लेक्चर्स व बैंक DPR सहायता।
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                  <Link href="/auth/register">
                    <Button
                      size="lg"
                      className="px-6 sm:px-7 py-3.5 h-12 text-sm sm:text-[15px] font-semibold rounded-lg bg-white hover:bg-slate-50 text-[#0056d2] shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer font-label group"
                    >
                      <span>निःशुल्क सीखना शुरू करें</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="#schemes">
                    <Button
                      size="lg"
                      variant="ghost"
                      className="px-6 sm:px-7 py-3.5 h-12 text-sm sm:text-[15px] font-semibold rounded-lg border-2 border-white/90 hover:border-white bg-transparent hover:bg-white text-white hover:text-[#0056d2] shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center gap-2 cursor-pointer font-label group"
                    >
                      <BadgePercent className="h-4 w-4 text-amber-300 group-hover:text-[#0056d2] transition-colors" />
                      <span>सब्सिडी योजनाएं देखें</span>
                    </Button>
                  </Link>
                </div>

                {/* Guarantee Microcopy */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-blue-100 font-medium">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-300" /> 100% निःशुल्क योजनाएं
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-300" /> बैंक DPR टेम्पलेट्स शामिल
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-amber-300" /> आधिकारिक QR सर्टिफिकेट
                  </span>
                </div>
              </div>

              {/* Right Column: Video Showcase Card */}
              <div className="lg:col-span-5">
                <HeroVideoPreview />
              </div>

            </div>
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

        {/* ================= SOCIAL PROOF STATISTICAL IMPACT BAR (COURSERA SPEC) ================= */}
        <section className="py-6 sm:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#090d16] text-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-slate-800/80 relative overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-slate-800/70">
                
                {/* Stat 1 */}
                <div className="flex items-center gap-4 lg:gap-5 pt-4 md:pt-0 md:pr-6 lg:pr-8 relative">
                  <div className="text-4xl lg:text-5xl font-black text-white tracking-tight shrink-0 font-headline">
                    76%
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs sm:text-[13px] text-slate-200 font-medium leading-relaxed">
                      शिक्षार्थी मानते हैं कि व्यावहारिक कौशल व प्रोजेक्ट रिपोर्ट्स से नया उद्यम शुरू करने का आत्मविश्वास दोगुना हुआ
                    </p>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-mono font-bold">[1]</span>
                    </div>
                  </div>
                </div>

                {/* Stat 2 */}
                <div className="flex items-center gap-4 lg:gap-5 pt-6 md:pt-0 md:px-6 lg:px-8 relative">
                  <div className="text-4xl lg:text-5xl font-black text-white tracking-tight shrink-0 font-headline">
                    88%
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs sm:text-[13px] text-slate-200 font-medium leading-relaxed">
                      बैंकर्स एवं जिला उद्योग केंद्र (DIC) मानते हैं कि डिजिटल सर्टिफिकेट्स से PMEGP व मुद्रा लोन स्वीकृति आसान होती है
                    </p>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-mono font-bold">[2]</span>
                    </div>
                  </div>
                </div>

                {/* Stat 3 */}
                <div className="flex items-center gap-4 lg:gap-5 pt-6 md:pt-0 md:pl-6 lg:pl-8 relative">
                  <div className="text-4xl lg:text-5xl font-black text-white tracking-tight shrink-0 font-headline">
                    90%
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-xs sm:text-[13px] text-slate-200 font-medium leading-relaxed">
                      प्रमाणित उद्यमियों ने प्रशिक्षण पूर्ण होने के 30 दिनों के भीतर अपने पहले उत्पाद की बिक्री या सेवा शुरू की
                    </p>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 font-mono font-bold">[3]</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ================= EXPLORE ROLES & ENTERPRISE TRACKS (COURSERA IMG 5) ================= */}
        <section className="py-10 lg:py-12 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0056d2]">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>उद्यमिता करियर ट्रैक्स (Explore Enterprise Roles)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight font-headline">
                  अपने गाँव में शुरू करने योग्य प्रमुख व्यवसाय
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl font-body">
                  प्रमाणित प्रोजेक्ट्स, अनुमानित मासिक आय एवं बैंक लोन पात्रता के आधार पर उपयुक्त उद्यम चुनें।
                </p>
              </div>

              {/* Filter Pills (Coursera Style) */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                <span className="px-3 py-1.5 rounded-full bg-slate-900 text-white cursor-pointer">
                  सभी मुख्य व्यवसाय
                </span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">
                  डेयरी फार्मिंग
                </span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">
                  फूड प्रोसेसिंग
                </span>
                <span className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer">
                  जैविक कृषि
                </span>
              </div>
            </div>

            {/* Role Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {enterpriseRoles.map((role, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 hover:border-[#0056d2]/50 bg-white p-5 shadow-[0_2px_12px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-blue-50 text-[#0056d2] border border-blue-100">
                        {role.tag}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {role.authority}
                      </span>
                    </div>

                    <h3 className="font-semibold text-base sm:text-lg text-slate-900 group-hover:text-[#0056d2] transition-colors leading-snug font-headline">
                      {role.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-body line-clamp-2">
                      {role.desc}
                    </p>

                    {/* Median Earning Badge */}
                    <div className="bg-emerald-50/80 border border-emerald-100/90 rounded-xl p-2.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-800/80 block tracking-wider">
                        अनुमानित मासिक आय क्षमता
                      </span>
                      <span className="text-sm sm:text-base font-black text-emerald-700 font-headline">
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

        {/* ================= FEATURED COURSES CATALOG (IBM / COURSERA HYBRID) ================= */}
        <section id="courses" className="py-10 lg:py-12 border-b border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0056d2]">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>प्रमाणित कौशल पाठ्यक्रम (Featured Courses)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight font-headline">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8">
              {coursesToDisplay.map((course) => (
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
                />
              ))}
            </div>

          </div>
        </section>

        {/* ================= TURN LEARNING INTO PROOF & PROGRESS SECTIONS (COURSERA SPEC) ================= */}
        <section id="credentials" className="py-10 lg:py-14 border-b border-slate-200 bg-white overflow-hidden space-y-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* ROW 1: Turn your learning into proof */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Text */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-[#0056d2] border border-blue-200">
                  <Award className="h-4 w-4 text-[#0056d2]" />
                  <span>सत्यापित प्रमाणन (Turn learning into proof)</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight leading-tight font-headline">
                  अपने सीखने को आधिकारिक प्रमाण में बदलें
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-body">
                  सफलतापूर्वक कोर्स पूरा करने और क्विज पास करने पर आपको आधिकारिक QR-सत्यापित सर्टिफिकेट एवं बैंक-मान्य DPR प्राप्त होता है, जिसे आप PMEGP, PM मुद्रा लोन और अपने व्यावसायिक पोर्टफोलियो में प्रस्तुत कर सकते हैं।
                </p>

                <div className="space-y-2.5 pt-1 text-xs font-medium text-slate-700">
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
                    <Button className="bg-[#0056d2] hover:bg-blue-800 text-white font-bold rounded-lg px-5 py-2.5 text-xs shadow-md">
                      सर्टिफाइड कोर्स चुनें →
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: Graphic Mockup (Frameless Natural Presentation) */}
              <div className="lg:col-span-6 flex justify-center lg:justify-end">
                <img
                  src="/images/certificate-fan-proof.jpg"
                  alt="सत्यापित डिजिटल सर्टिफिकेट्स - छैगांव उद्यमी"
                  className="max-w-lg w-full h-auto object-contain drop-shadow-md hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>

            {/* ROW 2: Know where to start — make progress in minutes a day */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left: Graphic Mockup (Frameless Natural Presentation) */}
              <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center lg:justify-start">
                <img
                  src="/images/learning-progress-proof.jpg"
                  alt="दैनिक शिक्षण प्रगति एवं लर्निंग पाथ - छैगांव उद्यमी"
                  className="max-w-lg w-full h-auto object-contain drop-shadow-md hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Right: Text */}
              <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <Sparkles className="h-4 w-4 text-emerald-600" />
                  <span>दैनिक प्रगति (Make progress in minutes a day)</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 tracking-tight leading-tight font-headline">
                  जानें कहाँ से शुरू करें — प्रतिदिन कुछ ही मिनटों में करें प्रगति
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-body">
                  चाहे आप पहली बार उद्यमिता में कदम रख रहे हों या मौजूदा व्यापार का आधुनिकीकरण कर रहे हों, स्पष्ट स्टेप्स और 10-15 मिनट के संक्षिप्त वीडियो अध्यायों के साथ बिना किसी बाधा के निरंतर आगे बढ़ें।
                </p>

                <div className="space-y-2.5 pt-1 text-xs font-medium text-slate-700">
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
                    <Button className="bg-slate-900 hover:bg-black text-white font-bold rounded-lg px-5 py-2.5 text-xs shadow-md">
                      निःशुल्क शुरुआत करें →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ================= TRANSPARENT PLANS & PRICING TIERS (COURSERA IMG 3) ================= */}
        <section className="py-10 lg:py-14 border-b border-slate-200 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <h2 className="text-2xl sm:text-4xl font-semibold text-slate-950 tracking-tight font-headline">
                अपने लक्ष्य के अनुसार सही योजना चुनें
              </h2>
              <p className="text-sm text-slate-600 font-body">
                पारदर्शी योजनाएं — बिना किसी छुपे शुल्क के। आजीवन ज्ञान एवं बैंक लोन सहायता।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
              {plansList.map((plan, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl bg-white border p-8 flex flex-col justify-between transition-all relative ${
                    plan.isPopular
                      ? "border-[#0056d2] shadow-xl ring-2 ring-[#0056d2]/20"
                      : "border-slate-200 shadow-xs hover:shadow-md"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#0056d2] text-white text-[11px] font-bold tracking-wider uppercase shadow-md">
                      ⭐ सर्वाधिक लोकप्रिय (Best Value)
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-headline">{plan.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 font-body">{plan.subtitle}</p>
                    </div>

                    <div>
                      <span className="text-3xl sm:text-4xl font-extrabold text-slate-950 font-headline">
                        {plan.price}
                      </span>
                      <span className="text-xs text-slate-500 ml-1.5 font-medium">/ {plan.period}</span>
                    </div>

                    <Link href="/auth/register" className="block">
                      <Button
                        className={`w-full py-3 h-11 text-xs font-bold rounded-lg ${
                          plan.buttonVariant === "primary"
                            ? "bg-[#0056d2] hover:bg-blue-800 text-white shadow-md"
                            : "border border-[#0056d2] text-[#0056d2] bg-white hover:bg-blue-50"
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>

                    {/* Features List */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <span className="text-[11px] font-bold uppercase text-slate-400 block tracking-wider">
                        मुख्य विशेषताएं:
                      </span>
                      {plan.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
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

        {/* ================= FULL-WIDTH MILESTONE CTA BANNER (COURSERA PLUS COMPACT FIT) ================= */}
        <section className="py-6 sm:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl bg-[#0056d2] text-white overflow-hidden shadow-2xl relative flex flex-col lg:flex-row items-center justify-between border border-blue-600">
              
              {/* Decorative backdrop gradients */}
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-transparent rounded-full blur-2xl pointer-events-none" />
              <div className="absolute left-0 bottom-0 w-80 h-80 bg-blue-700/50 rounded-full blur-3xl pointer-events-none" />

              {/* Left Column Text */}
              <div className="p-5 sm:p-7 lg:p-8 max-w-2xl space-y-3 relative z-10">
                
                {/* Coursera Plus style badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-white/15 backdrop-blur-md border border-white/25 text-white">
                  <span className="text-[11px] font-black tracking-wider uppercase">छैगांव उद्यमी</span>
                  <span className="px-1.5 py-0.2 rounded bg-blue-500 text-[10px] font-black tracking-widest uppercase">PLUS</span>
                </div>

                {/* Heading */}
                <div className="space-y-0.5">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight font-headline">
                    समय आपके पक्ष में है (Turn Minutes into Milestones)
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-amber-300">
                    मात्र 7 दिनों में अपने उद्यम का सपना साकार करें
                  </p>
                </div>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-blue-100/95 leading-relaxed font-body">
                  हजारों ग्रामीणों एवं युवाओं से जुड़ें जो अपने गाँव में ही सफल लघु उद्योग शुरू कर रहे हैं। इन 7 दिनों में छोटे-छोटे अध्यायों से वास्तविक कौशल अर्जित करें।
                </p>

                {/* CTA Button */}
                <div className="pt-1">
                  <Link href="/auth/register" className="inline-block">
                    <Button
                      size="sm"
                      className="px-5 py-2.5 h-10 text-xs sm:text-sm font-bold rounded-lg bg-white hover:bg-slate-100 text-[#0056d2] shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>निःशुल्क शुरुआत करें (Start Free Trial)</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Hero Person Image with compact fit */}
              <div className="relative w-full lg:w-[360px] h-52 sm:h-56 lg:h-[240px] shrink-0 flex items-end justify-center lg:justify-end overflow-hidden">
                {/* Magenta curved abstract accent */}
                <div className="absolute right-6 top-4 w-36 h-36 bg-gradient-to-tr from-pink-500 to-rose-400 rounded-3xl transform rotate-12 opacity-80 blur-xs hidden sm:block pointer-events-none" />
                
                <img
                  src="/images/banner-entrepreneur.jpg"
                  alt="सफल ग्रामीण उद्यमी - छैगांव उद्यमी प्लस"
                  className="relative z-10 h-full w-auto object-contain object-bottom"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS ACCORDION (COURSERA IMG 4/5) ================= */}
        <section className="py-10 lg:py-14 border-t border-slate-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-950 font-headline">
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
