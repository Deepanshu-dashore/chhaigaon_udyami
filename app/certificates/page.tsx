import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  QrCode,
  Landmark,
  FileCheck,
  Sparkles,
  ArrowRight,
  ChevronRight,
  GraduationCap,
  BookOpen,
  Check,
  Building2,
  BadgePercent,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CertificateVerifier } from "@/components/certificate/certificate-verifier";
import { CertificateShowcaseTabs } from "@/components/certificate/certificate-showcase-tabs";
import { FaqAccordion } from "@/components/home/faq-accordion";
import { Button } from "@/components/ui/button";

const CERTIFICATE_FAQS = [
  {
    q: "प्रमाण पत्र कब और कैसे मिलता है?",
    a: "पाठ्यक्रम के सभी पाठ पूरा करने के बाद आपको अंतिम क्विज में 60% या अधिक अंक प्राप्त करने होते हैं। उत्तीर्ण होते ही आपका डिजिटल प्रमाण पत्र तुरंत आपके छात्र डैशबोर्ड में उपलब्ध हो जाता है।",
  },
  {
    q: "क्या यह प्रमाण पत्र बैंक लोन एवं सरकारी सब्सिडी के लिए वैध है?",
    a: "हाँ, छैगांव उद्यमी के प्रमाण पत्र संबंधित उद्योग कौशल के सत्यापन हेतु मान्य हैं और इन्हें PMEGP, मुख्यमंत्री उद्यम क्रांति, एवं नाबार्ड योजनाओं की DPR फाइल के साथ संलग्न किया जा सकता है।",
  },
  {
    q: "कोई अन्य व्यक्ति मेरे प्रमाण पत्र की सत्यता कैसे जांच सकता है?",
    a: "प्रमाण पत्र पर दिया गया QR कोड स्कैन करके अथवा इस पोर्टल पर 16-अंकीय प्रमाण पत्र नंबर डालकर कोई भी बैंक प्रबंधक या नियोक्ता 24/7 प्रमाण पत्र की सत्यता सत्यापित कर सकता है।",
  },
  {
    q: "क्या प्रमाण पत्र की हार्ड कॉपी या प्रिंट प्राप्त किया जा सकता है?",
    a: "जी हाँ, आप डैशबोर्ड से 100% हाई-रिजोल्यूशन A4 साइज PDF तुरंत डाउनलोड करके अपने नजदीकी सीएससी सेंटर या प्रिंटर से प्रिंट करवा सकते हैं।",
  },
];

export const metadata = {
  title: "डिजिटल प्रमाण पत्र एवं सत्यापन (Certificates) | छैगांव उद्यमी",
  description:
    "छैगांव उद्यमी मंच द्वारा जारी आधिकारिक डिजिटल कौशल एवं उद्यमिता प्रमाण पत्र। बैंक लोन DPR, PMEGP एवं रोजगार हेतु 100% मान्य।",
};

export default function CertificatesPortalPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
      
      {/* ================= HERO BANNER (MATCHING HOMEPAGE DESIGN) ================= */}
      <section className="bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-115 lg:min-h-125 flex items-center">
          
          {/* Left Column: Clean & Focused */}
          <div className="w-full lg:w-[54%] py-10 sm:py-14 lg:py-16 space-y-4 text-left z-10">
            
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-0.5">
              <Link href="/" className="hover:text-blue-700 transition-colors">
                होम (Home)
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <Link href="/courses" className="hover:text-blue-700 transition-colors">
                कोर्सेज (Courses)
              </Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-blue-700 font-bold">सर्टिफिकेट्स (Certificates)</span>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#0056d2] border border-blue-200 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-[#0056d2]" />
              <span>मान्यता प्राप्त डिजिटल उद्यमिता प्रमाणन</span>
            </div>

            {/* Main Title (H1) */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.18] font-headline">
              सीखें, प्रमाणित बनें और,<br />
              अपने उद्यम को दें नई पहचान।
            </h1>

            {/* Subtitle Subtext */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg font-body">
              छैगांव उद्यमी के डिजिटल प्रमाण पत्र बैंकों, वित्तीय संस्थाओं एवं सरकारी सब्सिडी योजनाओं (PMEGP, मुद्रा लोन, CM उद्यम क्रांति) में DPR के साथ कौशल प्रमाण के रूप में पूर्णतः स्वीकार्य हैं।
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <Link href="/dashboard/certificates">
                <Button
                  size="lg"
                  className="px-5 py-3 h-11 text-xs sm:text-sm font-semibold rounded-[4px] bg-[#0056d2] hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-2 cursor-pointer font-label"
                >
                  <GraduationCap className="h-4 w-4" />
                  <span>मेरे प्रमाण पत्र (Student Vault)</span>
                </Button>
              </Link>

              <Link href="/courses">
                <Button
                  size="lg"
                  variant="ghost"
                  className="px-5 py-3 h-11 text-xs sm:text-sm font-semibold rounded-[4px] border border-[#0056d2] text-[#0056d2] bg-white hover:bg-blue-50/60 transition-colors flex items-center gap-2 cursor-pointer font-label"
                >
                  <BookOpen className="h-4 w-4 text-[#0056d2]" />
                  <span>प्रमाणित कोर्सेज देखें</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

          </div>

        </div>

        {/* Right Column: Full-Bleed Image flush with right screen edge */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] xl:w-[50%] h-80 sm:h-100 lg:h-full relative overflow-hidden">
          <img
            src="/images/certificate-fan-proof.jpg"
            alt="Chhaigaon Udyami Verified Certificates Fan Mockup"
            className="w-full h-full object-cover object-center"
          />
          {/* Smooth Left Horizontal Fade Linear Gradient into White Canvas */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none" />
          <div className="block lg:hidden absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white to-transparent pointer-events-none" />
          
          {/* Floating Verified Badge Overlay */}
          <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 p-3 rounded-lg bg-white/95 backdrop-blur-md border border-slate-200 shadow-md flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-bold text-slate-900 leading-tight">ISO 9001:2015</span>
              <span className="block text-[10px] text-slate-500 font-medium">मान्यता प्राप्त प्रमाणन</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PARTNER / GOVERNMENT AUTHORITY LOGO CLOUD (MATCHING HOMEPAGE) ================= */}
      <section className="border-b border-slate-200 bg-slate-50 py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3.5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 font-label">
            प्रमुख शासन एवं वित्तीय संस्थाओं द्वारा समर्थित व मान्यता प्राप्त
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
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

      {/* ================= MAIN CONTENT SECTIONS ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 sm:space-y-16">
        
        {/* 1. MASTER SHOWCASE SECTION */}
        <section className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-blue-50 text-[#0056d2] border border-blue-200/80">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>लाइव डिजिटल पूर्वावलोकन (Interactive Preview)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-950 font-headline tracking-tight">
              इस तरह दिखता है आपका आधिकारिक डिजिटल प्रमाण पत्र
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 font-body max-w-2xl mx-auto leading-relaxed">
              उच्च-गुणवत्ता A4 प्रिंटेबल डिजाइन, गोल्डन सील, डिजिटल हस्ताक्षर एवं सत्यापन बारकोड।
            </p>
          </div>

          {/* Interactive Certificate Switcher & Renderer */}
          <CertificateShowcaseTabs />
        </section>

        {/* 2. INSTANT CERTIFICATE VERIFICATION TOOL */}
        <section className="pt-2">
          <CertificateVerifier />
        </section>

        {/* 3. RECOGNITION & BANK SUBSIDY ACCEPTANCE */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 font-headline">
              छैगांव उद्यमी प्रमाण पत्र के लाभ एवं उपयोगिता
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              व्यावसायिक प्रशिक्षण के साथ आपको मिलते हैं शासकीय और वित्तीय संस्थागत लाभ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 hover:border-blue-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                बैंक लोन व सब्सिडी DPR में मान्य
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                PMEGP, मुख्यमंत्री उद्यम क्रांति एवं नाबार्ड ऋण आवेदनों में प्रोजेक्ट DPR के साथ कौशल प्रमाण पत्र के रूप में पूरी तरह स्वीकार्य।
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 hover:border-emerald-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <QrCode className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                24/7 इंस्टेंट QR सत्यापन
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                प्रत्येक प्रमाण पत्र पर सुरक्षित एन्क्रिप्टेड QR कोड अंकित होता है, जिसे मोबाइल कैमरे से स्कैन करते ही प्रामाणिकता जांची जा सकती है।
              </p>
            </div>

            <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-3 hover:border-amber-300 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base">
                व्यावहारिक उद्योग कौशल परीक्षण
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                केवल वीडियो देखने से नहीं, बल्कि मॉड्यूल क्विज एवं 60%+ स्कोर हासिल करने के बाद ही अधिकृत प्रमाण पत्र जारी होता है।
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* 4. FULL-WIDTH WHITE FAQ SECTION */}
      <section className="w-full bg-white border-t border-slate-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-950 font-headline tracking-tight">
              अक्सर पूछे जाने वाले प्रश्न (FAQ)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-body">
              प्रमाण पत्र प्राप्ति एवं सत्यापन से संबंधित आवश्यक जानकारियां
            </p>
          </div>

          <FaqAccordion items={CERTIFICATE_FAQS} showCategoryFilters={false} />
        </div>
      </section>

      </main>

      <Footer showValueBanner={false} />
    </div>
  );
}
