import React from "react";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourseCard } from "@/components/course/course-card";
import { HeroVideoPreview } from "@/components/home/hero-video-preview";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/section-badge";
import { Separator } from "@/components/ui/separator";
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
  HelpCircle,
  Compass,
  TrendingUp,
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
  {
    id: "c-5",
    title: "उन्नत बकरी पालन एवं व्यावसायिक पशुधन प्रबंधन",
    slug: "goat-farming-livestock-business",
    shortDesc: "नस्ल चयन, शेड निर्माण, आहार प्रबंधन व NABARD सब्सिडी मार्गदर्शन।",
    thumbnail: "/images/hero-entrepreneurs.jpg",
    price: 899,
    discountedPrice: 449,
    level: "शुरुआती (Beginner)",
    lessonsCount: 14,
    category: "पशुपालन एवं डेयरी",
  },
  {
    id: "c-6",
    title: "सोलर रूफटॉप एवं सूर्य घर मुफ्त बिजली योजना स्वरोज़गार",
    slug: "solar-rooftop-pm-surya-ghar",
    shortDesc: "सोलर पैनल इंस्टालेशन, सरकारी सब्सिडी आवेदन व वेंडर नेटवर्किंग।",
    thumbnail: "/images/solar-enterprise.jpg",
    price: 1199,
    discountedPrice: 599,
    level: "मध्यम (Intermediate)",
    lessonsCount: 15,
    category: "अक्षय ऊर्जा",
  },
  {
    id: "c-7",
    title: "महिला स्वयं सहायता समूह (SHG) कुटीर उद्योग एवं ब्रांडिंग",
    slug: "women-shg-handicrafts-branding",
    shortDesc: "समूह ऋण प्रक्रिया, उत्पाद पैकेजिंग, सिलाई-कढ़ाई व स्थानीय बाज़ार लिंकेज।",
    thumbnail: "/images/rural-entrepreneur-story.jpg",
    price: 0,
    discountedPrice: 0,
    level: "सभी के लिए (All Levels)",
    lessonsCount: 11,
    category: "महिला सशक्तीकरण",
  },
  {
    id: "c-8",
    title: "PMEGP व मुद्रा लोन DPR (प्रोजेक्ट रिपोर्ट) निर्माण गाइड",
    slug: "pmegp-mudra-loan-dpr-masterclass",
    shortDesc: "बैंक-मान्य DPR फाइलिंग, प्रोजेक्ट कॉस्टिंग व 35% सब्सिडी क्लेम गाइड।",
    thumbnail: "/images/cert-msme-collage.jpg",
    price: 499,
    discountedPrice: 249,
    level: "सभी के लिए (All Levels)",
    lessonsCount: 9,
    category: "ऋण एवं सब्सिडी",
  },
];

const enterpriseRoles = [
  {
    title: "डेयरी फार्म एवं मिल्क प्रोसेसिंग प्लांट",
    desc: "दुधारू पशु प्रबंधन, स्वच्छ दुग्ध उत्पादन एवं ₹10 लाख लोन प्रक्रिया।",
    monthlyEarning: "₹65,000 - ₹1,40,000 / माह",
    tag: "उच्च मांग",
    slug: "modern-dairy-farming",
    authority: "NABARD & DIC",
  },
  {
    title: "मसाला एवं लघु खाद्य प्रसंस्करण उद्योग",
    desc: "मसाला पिसाई, पैकेजिंग व 35% PM FME सब्सिडी सहायता।",
    monthlyEarning: "₹45,000 - ₹95,000 / माह",
    tag: "35% PM FME सब्सिडी",
    slug: "food-processing-micro-business",
    authority: "MOFPI & FSSAI",
  },
  {
    title: "जैविक खाद एवं वर्मीकम्पोस्ट उत्पादन",
    desc: "कम लागत केंचुआ खाद यूनिट एवं जैविक बिक्री नेटवर्क।",
    monthlyEarning: "₹35,000 - ₹75,000 / माह",
    tag: "कम लागत",
    slug: "organic-farming-vermicompost",
    authority: "कृषि विभाग म.प्र.",
  },
  {
    title: "ग्रामीण ई-कॉमर्स एवं ONDC डिजिटल विक्रेता",
    desc: "WhatsApp व ONDC पर गाँव के उत्पाद ऑनलाइन बेचना सीखें।",
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
      take: 8,
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
              <SectionBadge icon={Sparkles} variant="primary">
                कौशल विकास एवं ग्रामीण स्वावलंबन
              </SectionBadge>

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

        {/* ================= PARTNER / GOVERNMENT AUTHORITY LOGO CLOUD ================= */}
        <section className="border-b border-slate-200 bg-slate-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <SectionBadge icon={Building2} variant="outline" className="mb-1">
              स्वीकृति व संबद्धता
            </SectionBadge>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 font-label">
              प्रमुख शासन एवं वित्तीय संस्थाओं द्वारा समर्थित व मान्यता प्राप्त
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-1">
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

        {/* ================= ABOUT CHHAIGAON UDYAMI ================= */}
        <section className="bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
          {/* Concentric Circles SVG Background Pattern Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-10 text-blue-600"
            style={{
              backgroundImage: "url('/images/bg-concentric-circles.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "160px 160px",
            }}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-115 lg:min-h-125 flex items-center">
            
            {/* Left Column: Clean Text & Bullet Points */}
            <div className="w-full lg:w-[54%] py-10 sm:py-14 lg:py-16 space-y-4 text-left z-10">
              
              <SectionBadge icon={Sparkles} variant="primary">
                परिचय व उद्देश्य
              </SectionBadge>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-snug font-headline">
                ग्रामीण स्वावलंबन से,<br />
                सशक्त भारत का निर्माण।
              </h2>

              <p className="text-sm sm:text-base text-slate-700 leading-[1.75] max-w-lg font-body">
                <strong className="font-bold text-slate-950">छैगांव उद्यमी</strong> ग्रामीण एवं कस्बाई भारत के युवाओं, महिलाओं और किसानों को स्वावलंबी बनाने के लिए समर्पित एक <strong className="font-bold text-slate-950">व्यावहारिक कौशल व उद्यमिता विकास मंच</strong> है। हम किताबी ज्ञान की बजाय ज़मीनी <strong className="font-bold text-slate-950">व्यावसायिक तकनीक</strong>, उत्पाद निर्माण, <strong className="font-bold text-slate-950">FSSAI व MSME मानक</strong> और वित्तीय विशेषज्ञों द्वारा तैयार <strong className="font-bold text-slate-950">बैंक-मान्य DPR रिपोर्ट्स</strong> प्रदान करते हैं।
              </p>

              <p className="text-sm sm:text-base text-slate-700 leading-[1.75] max-w-lg font-body">
                साथ ही <strong className="font-bold text-slate-950">PMEGP व मुद्रा योजना</strong> में <strong className="font-bold text-slate-950">35% तक सरकारी सब्सिडी</strong> का मार्गदर्शन देकर 100% आत्मविश्वास के साथ सफल उद्यमी बनाते हैं। इसके अलावा <strong className="font-bold text-slate-950">WhatsApp Business</strong>, <strong className="font-bold text-slate-950">ONDC डिजिटल बिक्री</strong> और स्थानीय खरीदारों से जोड़कर आपकी पहली बिक्री सुनिश्चित करते हैं।
              </p>

              {/* Clean Bullet Points (Without Cards) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm sm:text-[15px] font-semibold text-slate-900 font-body">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>100% व्यावहारिक हिंदी शिक्षण</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>PMEGP व मुद्रा लोन DPR सहायता</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>35% तक सरकारी सब्सिडी मार्गदर्शन</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>24x7 QR-सत्यापित प्रमाण पत्र</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>महिला स्वयं सहायता (SHG) प्राथमिकता</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                  <span>ONDC व डिजिटल बाज़ार लिंकेज</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link href="/about">
                  <Button
                    size="lg"
                    className="px-5 py-3 h-11 text-xs sm:text-sm font-semibold rounded-[4px] bg-[#0056d2] hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-2 cursor-pointer font-label"
                  >
                    <span>हमारे बारे में जानें</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/courses">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="px-5 py-3 h-11 text-xs sm:text-sm font-semibold rounded-[4px] border border-[#0056d2] text-[#0056d2] bg-white hover:bg-blue-50/60 transition-colors flex items-center gap-2 cursor-pointer font-label"
                  >
                    <span>कोर्सेज एक्सप्लोर करें</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Full-Bleed Image flush with right screen edge */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] xl:w-[50%] h-80 sm:h-100 lg:h-full relative overflow-hidden">
            <img
              src="/images/home-about-entrepreneurs.jpg"
              alt="छैगांव उद्यमी - ग्रामीण कौशल एवं स्वावलंबन"
              className="w-full h-full object-cover object-center"
            />
            {/* Smooth Left Horizontal Fade Gradient into White Canvas */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none" />
            <div className="block lg:hidden absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white to-transparent pointer-events-none" />
            
            {/* Floating ISO Badge Overlay */}
            <div className="absolute bottom-6 right-6 z-10 hidden sm:block">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200/80 shadow-lg">
                <img
                  src="/logo.png"
                  alt="छैगांव उद्यमी लोगो"
                  className="w-9 h-9 object-contain shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-extrabold text-slate-950 font-headline">
                      छैगांव उद्यमी
                    </h4>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200 uppercase tracking-wider">
                      ISO 9001:2015
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-medium font-label">
                    ग्रामीण कौशल एवं स्वावलंबन मंच
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= EXPLORE ROLES & ENTERPRISE TRACKS ================= */}
        <section className="py-10 lg:py-12 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <SectionBadge icon={Compass} variant="primary">
                  स्वरोज़गार क्षेत्र
                </SectionBadge>
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
                  <div className="space-y-2.5">
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

                    <div className="bg-emerald-50/90 border border-emerald-100 rounded-xl p-2">
                      <span className="text-[10px] uppercase font-bold text-emerald-800 block tracking-wider">
                        अनुमानित मासिक आय क्षमता
                      </span>
                      <span className="text-sm font-black text-emerald-700 font-headline">
                        {role.monthlyEarning}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between">
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
        <section
          id="courses"
          className="py-14 lg:py-18 relative overflow-hidden border-b border-blue-900 text-white"
          style={{
            background: "url('/images/ourstd-bckgrnd.webp') no-repeat center center / cover",
          }}
        >
          {/* Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-900 via-[#0056d2]/90 to-blue-900 pointer-events-none" />

          {/* Overlapping Concentric Circles SVG Pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: "url('/images/bg-concentric-circles.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "140px 140px",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1.5">
                <SectionBadge icon={Sparkles} variant="outline">
                  प्रमाणित मास्टरक्लासेस
                </SectionBadge>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-headline">
                  लोकप्रिय उद्यमिता मास्टरक्लासेस
                </h2>
                <p className="text-xs sm:text-sm text-blue-100/90 font-body max-w-md">
                  व्यावहारिक उद्योग शिक्षण, प्रोजेक्ट रिपोर्ट व 35% सब्सिडी फॉर्म मार्गदर्शन।
                </p>
              </div>

              <Link href="/courses" className="inline-flex items-center gap-1 text-sm font-bold text-amber-300 hover:text-white transition-colors">
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
            <div className="grid text-justify grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              {/* Left: Text */}
              <div className="lg:col-span-7 space-y-3.5">
                <SectionBadge icon={Award} variant="primary">
                  सत्यापित प्रमाणन
                </SectionBadge>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight font-headline">
                  सीखने को आधिकारिक प्रमाण में बदलें
                </h2>

                <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
                  सफलतापूर्वक कोर्स पूरा करने पर आपको <strong className="font-bold text-slate-950">आधिकारिक QR-सत्यापित सर्टिफिकेट</strong> एवं <strong className="font-bold text-slate-950">बैंक-मान्य DPR (प्रोजेक्ट रिपोर्ट)</strong> प्राप्त होती है, जिसे आप <strong className="font-bold text-slate-950">PMEGP</strong>, <strong className="font-bold text-slate-950">PM मुद्रा लोन</strong> और अपने व्यावसायिक पोर्टफोलियो में सीधा उपयोग कर सकते हैं।
                </p>

                <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
                  यह प्रमाण पत्र आपकी व्यावसायिक दक्षता को प्रमाणित करता है और <strong className="font-bold text-slate-950">जिला उद्योग केंद्र (DIC खंडवा)</strong> व <strong className="font-bold text-slate-950">NABARD मार्गदर्शिका</strong> के अनुसार वित्तीय स्वीकृतियों हेतु 100% मान्य है।
                </p>

                <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
                  इसके अलावा, हमारा प्लेटफ़ॉर्म आपको <strong className="font-bold text-slate-950">24x7 ऑनलाइन वैरिफिकेशन</strong> की सुविधा देता है, ताकि बैंक अधिकारी या वित्तीय संस्थान किसी भी समय आपके रिकॉर्ड की प्रामाणिकता जाँच सकें।
                </p>

                <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-medium text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong className="font-bold text-slate-950">24x7 ऑनलाइन तत्काल QR सत्यापन</strong> कोड व डिजिटल रिकॉर्ड</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong className="font-bold text-slate-950">PM मुद्रा एवं PMEGP बैंक ऋण</strong> हेतु आधिकारिक रूप से मान्य</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong className="font-bold text-slate-950">जिला उद्योग केंद्र (DIC) व NABARD</strong> मार्गदर्शिका से संरेखित</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/courses">
                    <Button className="bg-[#0056d2] hover:bg-blue-800 text-white font-bold rounded-lg px-5 py-2.5 text-xs shadow-xs inline-flex items-center gap-1.5 cursor-pointer">
                      <span>सर्टिफाइड कोर्स चुनें</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: Graphic Mockup */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <img
                  src="/images/certificate-fan-proof.jpg"
                  alt="सत्यापित डिजिटल सर्टिफिकेट्स - छैगांव उद्यमी"
                  className="max-w-lg scale-110 w-full h-auto object-cover hover:scale-[1.015] transition-transform duration-500"
                />
              </div>
            </div>

            <Separator className="bg-slate-200/80" />

            {/* ROW 2: Daily Progress */}
            <div className="grid text-justify grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
              {/* Left: Graphic Mockup */}
              <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
                <img
                  src="/images/learning-progress-proof.jpg"
                  alt="दैनिक शिक्षण प्रगति एवं लर्निंग पाथ - छैगांव उद्यमी"
                  className="max-w-lg rotate-y-180 scale-110 w-full h-auto object-cover hover:scale-[1.015] transition-transform duration-500"
                />
              </div>

              {/* Right: Text */}
              <div className="lg:col-span-7 order-1 lg:order-2 space-y-3.5">
                <SectionBadge icon={Sparkles} variant="emerald">
                  दैनिक प्रगति
                </SectionBadge>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight font-headline">
                  प्रतिदिन कुछ ही मिनटों में करें प्रगति
                </h2>

                <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
                  स्पष्ट स्टेप्स और <strong className="font-bold text-slate-950">10-15 मिनट के संक्षिप्त वीडियो अध्यायों</strong> के साथ बिना किसी बाधा के निरंतर आगे बढ़ें और अपने मोबाइल पर व्यावहारिक ज्ञान प्राप्त करें।
                </p>

                <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
                  प्रत्येक मॉड्यूल के साथ <strong className="font-bold text-slate-950">डाउनलोड योग्य व्यावहारिक कार्यपुस्तिकाएं (Workbooks)</strong> और <strong className="font-bold text-slate-950">स्व-मूल्यांकन क्विज</strong> प्रदान किए जाते हैं, जिससे आप अपनी समझ और प्रगति का सटीक आकलन कर सकें।
                </p>

                <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
                  कोर्स पूर्ण करने के बाद भी आप अकेले नहीं हैं — हमारी समर्पित विशेषज्ञ टीम द्वारा आपको निरंतर <strong className="font-bold text-slate-950">आजीवन मेंटरशिप सहायता</strong> एवं कम्युनिटी सपोर्ट प्रदान किया जाता है।
                </p>

                <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-medium text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span><strong className="font-bold text-slate-950">मोबाइल एवं धीमे इंटरनेट</strong> पर भी सहज चलने वाले HD वीडियो</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>प्रत्येक मॉड्यूल के बाद <strong className="font-bold text-slate-950">लघु स्व-मूल्यांकन क्विज</strong></span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>डाउनलोड योग्य <strong className="font-bold text-slate-950">व्यावहारिक कार्यपुस्तिकाएं (Workbooks)</strong></span>
                  </div>
                </div>

                <div className="pt-2">
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

        {/* ================= FULL-WIDTH MILESTONE CTA BANNER (CLEAN & COMPACT) ================= */}
        <section className="py-6 sm:py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#023574] text-white overflow-hidden shadow-xl relative flex flex-col lg:flex-row items-center justify-between border border-[#0d3f7a] min-h-[220px] lg:min-h-[240px]">
              
              {/* Left Column Text */}
              <div className="p-6 sm:p-7 lg:p-8 max-w-xl space-y-3 relative z-10 lg:w-[58%]">
                {/* Brand Logo & PLUS Tag */}
                <div className="inline-flex items-center gap-1.5 text-white">
                  <span className="text-lg sm:text-xl font-black tracking-tight">छैगांव उद्यमी</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-black tracking-wider uppercase border border-white/70 bg-white/10 backdrop-blur-xs">
                    PLUS
                  </span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug font-headline text-white">
                    मात्र 7 दिनों में अपने उद्यम का सपना साकार करें
                  </h3>
                </div>

                <p className="text-xs sm:text-[13px] text-blue-100/90 leading-relaxed font-body max-w-md">
                  हजारों ग्रामीणों एवं युवाओं से जुड़ें जो अपने गाँव में ही सफल लघु उद्योग शुरू कर रहे हैं। छोटे-छोटे अध्यायों से वास्तविक व्यावसायिक कौशल अर्जित करें।
                </p>

                <div className="pt-1">
                  <Link href="/auth/register" className="inline-block">
                    <Button
                      size="sm"
                      className="px-5 py-2 h-9 text-xs sm:text-sm font-bold rounded-lg bg-white hover:bg-slate-100 text-[#023574] shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      <span>निःशुल्क शुरुआत करें</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#023574]" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Image */}
              <div className="relative w-full lg:w-[42%] lg:absolute lg:right-0 lg:top-0 lg:bottom-0 h-56 sm:h-60 lg:h-full flex items-center justify-end overflow-hidden">
                <img
                  src="/images/plus-banner-entrepreneur.jpg"
                  alt="सफल उद्यमी - छैगांव उद्यमी PLUS"
                  className="w-full h-full object-cover object-center lg:object-left"
                />
                {/* Seamless Left Fade Gradient matching exact #023574 color */}
                <div className="hidden lg:block absolute inset-y-0 left-0 w-28 bg-linear-to-r from-[#023574] via-[#023574]/80 to-transparent pointer-events-none" />
                <div className="block lg:hidden absolute inset-x-0 top-0 h-14 bg-linear-to-b from-[#023574] to-transparent pointer-events-none" />
              </div>

            </div>
          </div>
        </section>

        {/* ================= FREQUENTLY ASKED QUESTIONS ACCORDION ================= */}
        <section className="py-10 lg:py-14 border-t border-slate-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="text-center space-y-2">
              <SectionBadge icon={HelpCircle} variant="primary">
                प्रश्न एवं समाधान
              </SectionBadge>
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

      <Footer showValueBanner={true} />
    </div>
  );
}
