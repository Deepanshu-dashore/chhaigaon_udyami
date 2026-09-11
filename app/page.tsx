import React from "react";
import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CourseCard } from "@/components/course/course-card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  TrendingUp,
  Award,
  BookOpen,
  PlayCircle,
  FileText,
  BadgePercent,
  HelpCircle,
  Compass,
  Zap,
  Building2,
  Landmark,
  Coins,
  Check,
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
}

// Fallback featured courses with rich authentic local enterprise images
const defaultCourses: CourseItem[] = [
  {
    id: "c-1",
    title: "आधुनिक डेयरी फार्मिंग एवं मिल्क प्रोसेसिंग मास्टरक्लास",
    slug: "modern-dairy-farming",
    shortDesc: "नस्ल सुधार, पोषण प्रबंधन, दूध के उत्पाद (पनीर, घी) और PM मुद्रा लोन गाइडेंस।",
    thumbnail: "/images/dairy-course.jpg",
    price: 999,
    discountedPrice: 499,
    level: "शुरुआती (Beginner)",
    lessonsCount: 16,
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
  },
];

export default async function HomePage() {
  let coursesToDisplay: CourseItem[] = defaultCourses;

  try {
    const dbCourses = await prisma.course.findMany({
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
    });

    if (dbCourses && dbCourses.length > 0) {
      coursesToDisplay = dbCourses.map((c) => {
        const totalLessons = c.modules.reduce((acc, m) => acc + m.lessons.length, 0);
        return {
          id: c.id,
          title: c.title,
          slug: c.slug,
          shortDesc: c.description,
          thumbnail: c.thumbnail || "/images/dairy-course.jpg",
          price: Number(c.price),
          discountedPrice: c.isPaid ? Number(c.price) : 0,
          level: c.level || "Beginner",
          lessonsCount: totalLessons || 10,
        };
      });
    }
  } catch (err) {
    // Fallback courses used seamlessly
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-outline-variant/60 bg-gradient-to-b from-surface-container-low via-surface to-surface-container-lowest">
          {/* Ambient Decorative Background */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-primary-fixed/40 via-secondary-container/30 to-tertiary-fixed/30 blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Hero Value Proposition */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-fixed border border-primary-fixed-dim text-on-primary-fixed text-xs font-semibold shadow-sm animate-in fade-in duration-500 font-label">
                  <Sparkles className="h-4 w-4 text-tertiary fill-tertiary" />
                  <span>ग्रामीण भारत का अपना कौशल एवं उद्यमिता मंच</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-on-surface leading-[1.18] font-headline">
                  सीखें अपनी भाषा में, <br />
                  <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                    शुरू करें अपना सफल उद्योग
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto lg:mx-0 leading-relaxed font-body hindi-text">
                  व्यावहारिक बिजनेस ट्रेनिंग, सुरक्षित वीडियो लेक्चर्स, सरकारी सब्सिडी लोन (PMMY, PMEGP) मार्गदर्शन और सफल ग्रामीण उद्यमियों से सीधा सहयोग।
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                  <Link href="/courses" className="w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto px-8 h-12 text-base font-semibold rounded-lg bg-primary hover:bg-primary-container hover:text-on-primary-container text-on-primary shadow-lg shadow-primary/20 transition-all cursor-pointer font-label"
                    >
                      कोर्सेज एक्सप्लोर करें (Explore Courses)
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>

                  <Link href="/register" className="w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto px-7 h-12 text-base font-bold rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-900 shadow-sm cursor-pointer font-label"
                    >
                      फ्री में खाता बनाएं (Join Free)
                    </Button>
                  </Link>
                </div>

                {/* Rating / Social Proof */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-on-surface-variant font-label">
                  <div className="flex items-center gap-1 text-tertiary">
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3.5 w-3.5 fill-tertiary text-tertiary" />
                      <Star className="h-3.5 w-3.5 fill-tertiary text-tertiary" />
                      <Star className="h-3.5 w-3.5 fill-tertiary text-tertiary" />
                      <Star className="h-3.5 w-3.5 fill-tertiary text-tertiary" />
                      <Star className="h-3.5 w-3.5 fill-tertiary text-tertiary" />
                    </div>
                    <span className="text-on-surface ml-1 font-num font-semibold">4.9/5</span>
                  </div>
                  <span>•</span>
                  <span><strong className="font-num font-semibold text-on-surface">5,000+</strong> से अधिक ग्रामीण शिक्षार्थी</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-primary font-semibold">
                    <ShieldCheck className="h-4 w-4 text-primary" /> <span className="font-num font-semibold">100%</span> प्रमाणित सामग्री
                  </span>
                </div>
              </div>

              {/* Right Column: Hero Visual Showcase */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-surface-container-lowest bg-surface-container-lowest group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src="/images/hero-entrepreneurs.jpg"
                      alt="ग्रामीण उद्यमिता - Chhaigaon Udyami"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  </div>

                  {/* Overlay Details */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-surface/90 backdrop-blur-md border border-outline-variant/60 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block font-label">
                          सफलता की कहानी
                        </span>
                        <h4 className="text-sm font-semibold text-on-surface font-headline">
                          ग्रामीण एग्री-बिजनेस एवं फूड प्रोसेसिंग
                        </h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold font-label">
                        सत्यापित
                      </span>
                    </div>
                  </div>

                  {/* Floating Metric Badge 1 */}
                  <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant/80 shadow-md flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-primary-fixed text-primary flex items-center justify-center font-bold">
                      <Check className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-on-surface font-headline"><span className="font-num font-bold">92%</span> सफलता दर</div>
                      <div className="text-[10px] text-on-surface-variant font-label">स्थानीय उद्यम स्थापना</div>
                    </div>
                  </div>

                  {/* Floating Metric Badge 2 */}
                  <div className="absolute top-4 right-4 p-2.5 rounded-2xl bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant/80 shadow-md flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold">
                      <Coins className="h-4 w-4 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-on-surface font-headline"><span className="font-num font-bold">15%-35%</span> सब्सिडी</div>
                      <div className="text-[10px] text-on-surface-variant font-label">PMEGP & मुद्रा योजना</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ================= STATS SECTION ================= */}
        <section className="py-10 bg-surface-container-lowest border-b border-outline-variant/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30">
                <div className="text-3xl sm:text-4xl font-bold text-primary font-num tracking-tight">
                  5,000+
                </div>
                <div className="text-xs sm:text-sm font-medium text-on-surface-variant mt-1 font-label">
                  पंजीकृत ग्रामीण उद्यमी
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30">
                <div className="text-3xl sm:text-4xl font-bold text-secondary font-num tracking-tight">
                  25+
                </div>
                <div className="text-xs sm:text-sm font-medium text-on-surface-variant mt-1 font-label">
                  व्यावहारिक मास्टरक्लास
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30">
                <div className="text-3xl sm:text-4xl font-bold text-tertiary font-num tracking-tight">
                  ₹5 Cr+
                </div>
                <div className="text-xs sm:text-sm font-medium text-on-surface-variant mt-1 font-label">
                  सब्सिडी व लोन मार्गदर्शन
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/30">
                <div className="text-3xl sm:text-4xl font-bold text-primary font-num tracking-tight">
                  92%
                </div>
                <div className="text-xs sm:text-sm font-medium text-on-surface-variant mt-1 font-label">
                  व्यवसाय स्थापना सफलता दर
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CORE VALUE PILLARS ================= */}
        <section id="about" className="py-20 bg-surface-container-low/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-label">
                विशेषताएं (Why Choose Us)
              </span>
              <h2 className="text-3xl font-bold text-on-surface mt-2 font-headline">
                ग्रामीण उद्यम को नई ऊँचाइयों पर ले जाने के साधन
              </h2>
              <p className="text-sm text-on-surface-variant mt-3 font-body hindi-text">
                गाँव की परिस्थितियों और स्थानीय संसाधनों को ध्यान में रखकर तैयार किया गया संपूर्ण डिजिटल उद्यम मंच।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Feature 1 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                <div className="h-12 w-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-4 border border-primary-fixed-dim">
                  <PlayCircle className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-on-surface mb-2 font-headline">
                  सुरक्षित HD वीडियो लेक्चर्स
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body hindi-text">
                  VdoCipher एन्क्रिप्शन के साथ हाई-स्पीड, बफर-मुक्त और आसान हिंदी में वीडियो प्रशिक्षण।
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm hover:shadow-md hover:border-secondary/40 transition-all">
                <div className="h-12 w-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center mb-4 border border-secondary-fixed-dim">
                  <BadgePercent className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-on-surface mb-2 font-headline">
                  सरकारी सब्सिडी व लोन सहायता
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body hindi-text">
                  PM मुद्रा, PMEGP, और NABARD योजनाओं के लिए प्रोजेक्ट रिपोर्ट व ऑनलाइन आवेदन गाइडेंस।
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm hover:shadow-md hover:border-tertiary/40 transition-all">
                <div className="h-12 w-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-4 border border-tertiary-fixed-dim">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-on-surface mb-2 font-headline">
                  प्रमाणित डिजिटल सर्टिफिकेट
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body hindi-text">
                  कोर्स और क्विज पूरा करने पर तत्काल मान्य डिजिटल सर्टिफिकेट जो बैंक लोन में मददगार साबित होता है।
                </p>
              </div>

              {/* Feature 4 */}
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm hover:shadow-md hover:border-primary/40 transition-all">
                <div className="h-12 w-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center mb-4 border border-outline-variant/40">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg text-on-surface mb-2 font-headline">
                  मेंटरशिप एवं मार्केट लिंकेज
                </h3>
                <p className="text-sm text-on-surface-variant leading-relaxed font-body hindi-text">
                  सफल उद्यमियों से सीधा संवाद और अपने उत्पादों को शहरों के बाज़ार तक पहुंचाने में सहायता।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURED COURSES WITH PICTURES ================= */}
        <section className="py-20 bg-surface-container-lowest border-y border-outline-variant/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-primary font-label">
                  प्रशिक्षण कार्यक्रम (Featured Courses)
                </span>
                <h2 className="text-3xl font-bold text-on-surface mt-1 font-headline">
                  लोकप्रिय व्यावहारिक पाठ्यक्रम
                </h2>
                <p className="text-sm text-on-surface-variant mt-2 font-body hindi-text">
                  आज ही शुरू करें और अपने क्षेत्र के सफल व्यवसायी बनें।
                </p>
              </div>

              <Link href="/courses">
                <Button variant="outline" className="font-semibold text-xs sm:text-sm border-outline-variant text-on-surface hover:bg-surface-container cursor-pointer font-label">
                  सभी कोर्सेज देखें (View All Courses)
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                />
              ))}
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS (STEP BY STEP) ================= */}
        <section className="py-20 bg-surface-container-low/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary font-label">
                आसान प्रक्रिया (How It Works)
              </span>
              <h2 className="text-3xl font-bold text-on-surface mt-2 font-headline">
                सीखने से लेकर उद्योग शुरू करने तक का 4-स्टेप सफर
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm relative">
                <div className="text-4xl font-bold text-primary/10 absolute top-4 right-4 font-num">
                  01
                </div>
                <div className="h-10 w-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold mb-4 shadow-sm font-num text-sm">
                  1
                </div>
                <h4 className="font-semibold text-base text-on-surface mb-2 font-headline">
                  कोर्स चुनें (Choose Course)
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body hindi-text">
                  डेयरी, फूड प्रोसेसिंग या डिजिटल व्यापार में से अपनी रुचि अनुसार कोर्स चुनें।
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm relative">
                <div className="text-4xl font-bold text-secondary/15 absolute top-4 right-4 font-num">
                  02
                </div>
                <div className="h-10 w-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-bold mb-4 shadow-sm font-num text-sm">
                  2
                </div>
                <h4 className="font-semibold text-base text-on-surface mb-2 font-headline">
                  स्टेप-बाय-स्टेप सीखें (Learn)
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body hindi-text">
                  सरल हिंदी में वीडियो देखें, क्विज हल करें और व्यावहारिक ज्ञान प्राप्त करें।
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm relative">
                <div className="text-4xl font-bold text-tertiary/15 absolute top-4 right-4 font-num">
                  03
                </div>
                <div className="h-10 w-10 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center font-bold mb-4 shadow-sm font-num text-sm">
                  3
                </div>
                <h4 className="font-semibold text-base text-on-surface mb-2 font-headline">
                  सब्सिडी व रिपोर्ट (Funding)
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body hindi-text">
                  बैंक लोन के लिए विस्तृत प्रोजेक्ट रिपोर्ट और सरकारी सब्सिडी आवेदन में मदद पाएं।
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-sm relative">
                <div className="text-4xl font-bold text-primary/10 absolute top-4 right-4 font-num">
                  04
                </div>
                <div className="h-10 w-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold mb-4 shadow-sm font-num text-sm">
                  4
                </div>
                <h4 className="font-semibold text-base text-on-surface mb-2 font-headline">
                  सर्टिफिकेट व शुरुआत (Launch)
                </h4>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body hindi-text">
                  सर्टिफिकेट प्राप्त कर स्थानीय स्तर पर अपना उद्योग स्थापित करें और कमाई शुरू करें।
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= GOVERNMENT SCHEMES SPOTLIGHT ================= */}
        <section id="schemes" className="py-20 bg-surface-container-lowest border-t border-outline-variant/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-tertiary font-label">
                वित्तीय सहायता (Government Schemes)
              </span>
              <h2 className="text-3xl font-bold text-on-surface mt-2 font-headline">
                प्रमुख सरकारी सब्सिडी योजनाएं
              </h2>
              <p className="text-sm text-on-surface-variant mt-2 font-body hindi-text">
                हम आपको इन योजनाओं के तहत <span className="font-num font-semibold">15% से 35%</span> तक सब्सिडी और आसान बैंक लोन प्राप्त करने का मार्गदर्शन देते हैं।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Scheme 1 */}
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/60 shadow-sm hover:border-primary/50 transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold font-label">
                    सब्सिडी: <span className="font-num">15% - 35%</span>
                  </span>
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-on-surface font-headline">
                  PMEGP लोन योजना
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body hindi-text">
                  विनिर्माण (Manufacturing) के लिए <span className="font-num font-semibold">₹50</span> लाख और सेवा क्षेत्र के लिए <span className="font-num font-semibold">₹20</span> लाख तक का ऋण व भारी सब्सिडी सहायता।
                </p>
                <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between text-xs font-semibold text-primary font-label">
                  <span>प्रोजेक्ट रिपोर्ट सहायता उपलब्ध</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Scheme 2 */}
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/60 shadow-sm hover:border-secondary/50 transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-semibold font-label">
                    ऋण: <span className="font-num">₹50,000 - ₹10</span> लाख
                  </span>
                  <Coins className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="text-lg font-semibold text-on-surface font-headline">
                  PM मुद्रा योजना (PMMY)
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body hindi-text">
                  शिशु, किशोर एवं तरुण श्रेणियों में बिना किसी गारंटी के छोटे दुकानदारों व कारीगरों के लिए सीधा बैंक लोन।
                </p>
                <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between text-xs font-semibold text-secondary font-label">
                  <span>शून्य प्रोसेसिंग फीस</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>

              {/* Scheme 3 */}
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/60 shadow-sm hover:border-tertiary/50 transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-xs font-semibold font-label">
                    कृषि व डेयरी सब्सिडी
                  </span>
                  <Landmark className="h-5 w-5 text-tertiary" />
                </div>
                <h3 className="text-lg font-semibold text-on-surface font-headline">
                  NABARD पशुपालन योजना
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed font-body hindi-text">
                  डेयरी फार्म, कोल्ड स्टोरेज और कृषि प्रसंस्करण इकाइयों की स्थापना हेतु वित्तीय सहायता व तकनीकी परामर्श।
                </p>
                <div className="pt-2 border-t border-outline-variant/40 flex items-center justify-between text-xs font-semibold text-tertiary font-label">
                  <span>पशुपालन विशेष योजना</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CALL TO ACTION BANNER ================= */}
        <section className="py-20 bg-gradient-to-tr from-primary via-secondary to-primary text-on-primary relative overflow-hidden">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-headline">
              क्या आप भी अपने गाँव में नया व्यवसाय शुरू करने के लिए तैयार हैं?
            </h2>
            <p className="text-primary-fixed text-base max-w-2xl mx-auto leading-relaxed font-body hindi-text">
              आज ही छैगांव उद्यमी से जुड़ें और 5,000+ सफल उद्यमियों के नेटवर्क का हिस्सा बनें।
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 font-bold bg-white text-slate-900 hover:bg-slate-100 shadow-xl cursor-pointer font-label"
                >
                  अभी निःशुल्क शुरू करें (Get Started Free)
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 font-semibold border-2 border-white text-white hover:bg-white/10 cursor-pointer font-label"
                >
                  पाठ्यक्रम देखें (View Courses)
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
