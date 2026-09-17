import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourseCertificationBanner } from "@/components/courses/course-certification-banner";
import { CourseTestimonials } from "@/components/courses/course-testimonials";
import { CourseCatalogView } from "@/components/courses/course-catalog-view";
import { CourseItem } from "@/components/courses/course-card-grid";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { getPublishedCourses } from "@/services/course.service";
import {
  Sparkles,
  ShieldCheck,
  FileCheck2,
  Landmark,
  GraduationCap,
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "व्यावसायिक पाठ्यक्रम एवं प्रशिक्षण | Chhaigaon Udyami",
  description:
    "सीखें आधुनिक डेयरी फार्मिंग, फूड प्रोसेसिंग, जैविक खेती, PMEGP बैंक लोन DPR और FSSAI सर्टिफिकेशन। ग्रामीण भारत के उद्यमियों के लिए प्रमाणित डिजिटल कोर्स।",
};

// High-fidelity fallback catalog
const FALLBACK_COURSES: CourseItem[] = [
  {
    id: "course-1",
    title: "आधुनिक डेयरी फार्मिंग एवं दुग्ध उत्पाद प्रसंस्करण (Dairy Masterclass 2026)",
    slug: "dairy-farming-entrepreneurship",
    shortDesc: "नस्ल सुधार, साइलेज मेकिंग, ऑटोमेटेड मिल्किंग और पनीर/घी प्रोसेसिंग से ₹1 लाख/माह का शुद्ध मुनाफा कमाएं।",
    thumbnail: "/images/dairy-course.jpg",
    price: 3089,
    discountedPrice: 1299,
    level: "शुरुआती (Beginner)",
    lessonsCount: 16,
    category: "डेयरी एवं पशुपालन",
    instructor: "डॉ. आर. के. शर्मा (राष्ट्रीय डेयरी विशेषज्ञ)",
    instructorRole: "वरिष्ठ पशु वैज्ञानिक",
    rating: 4.9,
    reviewsCount: 2450,
    totalHours: "6.5 घंटे",
    updatedDate: "मार्च 2026",
    badgeType: "bestseller",
    isPaid: true,
  },
  {
    id: "course-2",
    title: "मिनी दाल मिल एवं मसाला उद्योग: सेटअप, FSSAI और पैकेजिंग",
    slug: "food-processing-enterprise",
    shortDesc: "अनाज एवं मसालों की क्लीनिंग, ग्रेडिंग, पल्वराइजर मशीनरी चयन, ब्रांडिंग एवं FSSAI लाइसेंसिंग की पूरी विधि।",
    thumbnail: "/images/food-processing.jpg",
    price: 2499,
    discountedPrice: 999,
    level: "मध्यम (Intermediate)",
    lessonsCount: 14,
    category: "खाद्य प्रसंस्करण व FSSAI",
    instructor: "इंजी. महेंद्र वर्मा (खाद्य प्रसंस्करण विशेषज्ञ)",
    instructorRole: "तकनीकी सलाहकार, MSME",
    rating: 4.8,
    reviewsCount: 1820,
    totalHours: "5.0 घंटे",
    badgeType: "bestseller",
    isPaid: true,
  },
  {
    id: "course-3",
    title: "PMEGP एवं मुख्यमंत्री उद्यम क्रांति: ₹50 लाख बैंक DPR एवं 35% सब्सिडी मास्टरक्लास",
    slug: "pmegp-subsidy-dpr-masterclass",
    shortDesc: "प्रोजेक्ट रिपोर्ट (DPR), बैलेंस शीट प्रोजेक्शन, ऑनलाइन आवेदन एवं बैंक इंटरव्यू पास करने की संपूर्ण चरणबद्ध गाइड।",
    thumbnail: "/images/coursera-hero-banner.jpg",
    price: 1999,
    discountedPrice: 799,
    level: "सभी स्तर (All Levels)",
    lessonsCount: 12,
    category: "PMEGP व बैंक सब्सिडी",
    instructor: "सीए दीपक अग्रवाल (प्रोजेक्ट फाइनेंस कंसलटेंट)",
    instructorRole: "बैंकिंग एडवाइजर",
    rating: 4.9,
    reviewsCount: 3100,
    totalHours: "4.5 घंटे",
    badgeType: "hot",
    isPaid: true,
  },
  {
    id: "course-4",
    title: "प्राकृतिक एवं जैविक खेती: जीवामृत, वर्मीकम्पोस्ट और सीधे उपभोक्ता विपणन",
    slug: "organic-farming-enterprise",
    shortDesc: "लागत शून्य करें, जैविक प्रमाणीकरण (NPOP) प्राप्त करें और शहरों में प्रीमियम भाव पर अपनी फसल बेचें।",
    thumbnail: "/images/organic-farming.jpg",
    price: 1499,
    discountedPrice: 0,
    level: "शुरुआती (Beginner)",
    lessonsCount: 10,
    category: "जैविक खेती व एग्रोटेक",
    instructor: "सुरेश पटेल (पद्मश्री सम्मानित कृषक एवं ट्रेनर)",
    instructorRole: "मास्टर ट्रेनर",
    rating: 4.7,
    reviewsCount: 940,
    totalHours: "3.8 घंटे",
    badgeType: "role_play",
    isPaid: false,
  },
  {
    id: "course-5",
    title: "ग्रामीण ई-कॉमर्स व डिजिटल दुकान: ONDC, व्हाट्सएप बिजनेस एवं सोशल मीडिया सेलिंग",
    slug: "digital-business-ondc-mastery",
    shortDesc: "बिना किसी बिचौलिए के अपने उत्पाद सीधे पूरे भारत में बेचें। ONDC कैटलॉगिंग, पेमेंट गेटवे और शिपिंग सेटअप।",
    thumbnail: "/images/digital-business.jpg",
    price: 2199,
    discountedPrice: 899,
    level: "मध्यम (Intermediate)",
    lessonsCount: 15,
    category: "डिजिटल व्यवसाय व ONDC",
    instructor: "अभिषेक सिंह (डिजिटल भारत ग्रोथ स्पेशलिस्ट)",
    instructorRole: "ई-कॉमर्स कंसलटेंट",
    rating: 4.8,
    reviewsCount: 1280,
    totalHours: "4.2 घंटे",
    badgeType: "new",
    isPaid: true,
  },
  {
    id: "course-6",
    title: "सोलर पंप एवं रूफटॉप सोलर उद्यम: इंस्टालेशन, मेंटेनेंस और सरकारी सब्सिडी",
    slug: "solar-energy-enterprise",
    shortDesc: "पीएम कुसुम योजना सोलर पंप इंस्टालेशन, नेट मीटरिंग और ग्रामीण सर्विस सेंटर का लाभदायक मॉडल सीखें।",
    thumbnail: "/images/solar-enterprise.jpg",
    price: 3499,
    discountedPrice: 1499,
    level: "उन्नत (Advanced Masterclass)",
    lessonsCount: 18,
    category: "सौर ऊर्जा एवं रिन्यूएबल",
    instructor: "इंजी. प्रकाश जोशी (रिन्यूएबल एनर्जी इंजीनियर)",
    instructorRole: "सोलर सर्टिफाइड ट्रेनर",
    rating: 4.9,
    reviewsCount: 760,
    totalHours: "7.0 घंटे",
    badgeType: "bestseller",
    isPaid: true,
  },
];

export default async function CoursesPage() {
  let courses: CourseItem[] = FALLBACK_COURSES;

  try {
    const dbCourses = await getPublishedCourses();
    if (dbCourses && dbCourses.length > 0) {
      courses = dbCourses.map((c, index) => {
        const fallback = FALLBACK_COURSES[index % FALLBACK_COURSES.length];
        return {
          id: c.id,
          title: c.title,
          slug: c.slug,
          shortDesc: c.description || fallback.shortDesc,
          thumbnail: c.thumbnail || fallback.thumbnail,
          price: Number(c.price) || fallback.price,
          discountedPrice: c.isPaid ? Number(c.price) : 0,
          level: c.level || fallback.level,
          lessonsCount: c.modules.reduce((acc, m) => acc + m.lessons.length, 0) || fallback.lessonsCount,
          category: fallback.category,
          instructor: fallback.instructor,
          instructorRole: fallback.instructorRole,
          rating: fallback.rating,
          reviewsCount: fallback.reviewsCount,
          totalHours: c.duration ? `${Math.round(c.duration / 60)} घंटे` : fallback.totalHours,
          badgeType: fallback.badgeType,
          isPaid: c.isPaid,
        };
      });
    }
  } catch {
    // Graceful fallback to rich curated catalog
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        
        {/* ================= COURSERA-STYLE HERO BANNER WITH SOFT GRAY BLURRED GRADIENT MESH ================= */}
        <section className="bg-slate-50/90 text-slate-900 border-b border-slate-200/90 relative overflow-hidden">
          {/* Subtle Ambient Blurred Gradient Orbs for Depth */}
          <div className="absolute -top-16 -left-16 w-80 h-80 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-1/3 w-80 h-80 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-115 lg:min-h-120 flex items-center">
            
            {/* Left Column: Proper Typographic Hierarchy */}
            <div className="w-full lg:w-[54%] py-10 sm:py-14 space-y-4 text-left z-10">
              
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <Link href="/" className="hover:text-blue-700 transition-colors">होम (Home)</Link>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-blue-700 font-bold">व्यावसायिक पाठ्यक्रम (Courses)</span>
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-[#0056d2] border border-blue-200/90 shadow-2xs backdrop-blur-xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#0056d2]" />
                <span>प्रमाणित ग्रामीण उद्यम एवं आजीविका अकादमी</span>
              </div>

              {/* Level 1: Main Title (H1) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.16] font-headline">
                ग्रामीण उद्यमिता में,<br />
                <span className="text-[#0056d2]">
                  सफलता हुनर और तकनीक से बनती है।
                </span>
              </h1>

              {/* Level 2: Lead Hook Subtitle */}
              <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                व्यावहारिक वीडियो प्रशिक्षण, बैंक-मान्य DPR रिपोर्ट्स एवं सरकारी सब्सिडी की संपूर्ण आवेदन प्रक्रिया।
              </p>

              {/* Level 3: Body Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg font-body">
                छैगांव उद्यमी के साथ सीखें आधुनिक डेयरी फार्मिंग, फूड प्रोसेसिंग, FSSAI लाइसेंसिंग, PMEGP ₹50 लाख लोन और सीधे डिजिटल विपणन।
              </p>

              {/* Level 4: Trust Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-lg">
                <div className="bg-white/90 border border-slate-200/90 rounded-xl p-2.5 text-center shadow-2xs backdrop-blur-xs">
                  <span className="text-amber-600 font-black text-sm sm:text-base block">100%</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-600 font-semibold">व्यावहारिक ज्ञान</span>
                </div>
                <div className="bg-white/90 border border-slate-200/90 rounded-xl p-2.5 text-center shadow-2xs backdrop-blur-xs">
                  <span className="text-blue-600 font-black text-sm sm:text-base block">₹50L</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-600 font-semibold">बैंक DPR शामिल</span>
                </div>
                <div className="bg-white/90 border border-slate-200/90 rounded-xl p-2.5 text-center shadow-2xs backdrop-blur-xs">
                  <span className="text-emerald-600 font-black text-sm sm:text-base block">35%</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-600 font-semibold">सब्सिडी गाइडेंस</span>
                </div>
                <div className="bg-white/90 border border-slate-200/90 rounded-xl p-2.5 text-center shadow-2xs backdrop-blur-xs">
                  <span className="text-purple-600 font-black text-sm sm:text-base block">QR</span>
                  <span className="text-[10px] sm:text-[11px] text-slate-600 font-semibold">सर्टिफिकेट मान्य</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Link href="#catalog">
                  <button className="px-6 py-3 rounded-lg bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer active:scale-98">
                    <span>कोर्सेज एक्सप्लोर करें (Explore Courses)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Full-Bleed Image flush with right screen edge with Smooth Gray Linear Fade Gradient */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] xl:w-[50%] h-80 sm:h-100 lg:h-full relative overflow-hidden">
            <img
              src="/images/courses-hero-banner.jpg"
              alt="Bright modern Indian rural entrepreneurs learning business skills"
              className="w-full h-full object-cover object-center"
            />
            {/* Smooth Left Horizontal Fade Linear Gradient into Slate Canvas */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-48 bg-linear-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none" />
            <div className="block lg:hidden absolute inset-x-0 top-0 h-16 bg-linear-to-b from-slate-50 to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ================= MAIN CONTENT CONTAINER ================= */}
        <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          
          {/* 1. Interactive Course Explorer with Skills Tabs, Side Filters & Cards */}
          <CourseCatalogView initialCourses={courses} />

          {/* 2. Section 1 from Image 1: Dark Certification & Exam Vouchers Card */}
          <CourseCertificationBanner />

          {/* 3. Section 2 from Image 2: Testimonials Section */}
          <CourseTestimonials />

        </div>

        {/* ================= FREQUENTLY ASKED QUESTIONS SECTION (WITH #ffe4d5 AND BACKGROUND IMAGE) ================= */}
        <section
          className="py-14 lg:py-20 border-t border-orange-200/80 relative overflow-hidden"
          style={{
            background: "#ffe4d5 url('/img/ourstd-bckgrnd.webp') no-repeat center center / cover",
          }}
        >
          {/* Subtle warm ambient overlay */}
          <div className="absolute inset-0 bg-[#ffe4d5]/20 pointer-events-none" />

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-white/90 text-orange-950 border border-orange-300/70 shadow-2xs backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                <span>अक्सर पूछे जाने वाले सवाल</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight font-headline">
                अक्सर पूछे जाने वाले प्रश्न (FAQs)
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-body max-w-lg mx-auto">
                कोर्सेज, सर्टिफिकेट मान्यता, प्रोजेक्ट रिपोर्ट (DPR) एवं 35% सरकारी सब्सिडी से संबंधित महत्वपूर्ण जानकारियां।
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-xl border border-orange-200/80">
              <FaqAccordion />
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
