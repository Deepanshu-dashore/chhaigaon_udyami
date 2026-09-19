import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { NeedToKnowTabs } from "@/components/apply/need-to-know-tabs";
import { ApplyFormWizard } from "@/components/apply/apply-form-wizard";
import {
  Sparkles,
  GraduationCap,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Users,
  CheckCircle2,
  FileText,
  PhoneCall,
  Mail,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ऑनलाइन प्रवेश एवं सब्सिडी सहायता आवेदन | Apply Now | Chhaigaon Udyami",
  description:
    "छैगांव उद्यमी के व्यावसायिक पाठ्यक्रमों एवं PMEGP 35% सब्सिडी सहायता हेतु ऑनलाइन आवेदन करें। सत्र 2026-27 के प्रवेश प्रारंभ।",
};

export default function ApplyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        
        {/* ================= HERO BANNER ================= */}
        <section className="bg-white border-b border-slate-200/90 relative overflow-hidden">
          
          {/* Subtle ambient lighting */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-96 lg:min-h-105 flex items-center">
            
            {/* Left Column Text */}
            <div className="w-full lg:w-[54%] py-8 sm:py-10 space-y-3.5 text-left z-10">
              {/* Breadcrumb */}
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 mb-0.5">
                <Link href="/" className="hover:text-blue-700 transition-colors">होम (Home)</Link>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <Link href="/courses" className="hover:text-blue-700 transition-colors">कोर्सेज (Courses)</Link>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-blue-700 font-bold">प्रवेश आवेदन (Apply Now)</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/95 text-[#0056d2] border border-blue-200/90 shadow-2xs backdrop-blur-xs mt-5">
                <GraduationCap className="w-3.5 h-3.5 text-[#0056d2]" />
                <span>सत्र 2026-27 प्रवेश एवं सब्सिडी आवेदन</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[36px] font-black tracking-tight leading-[1.24] font-headline">
                <span className="bg-linear-to-r from-slate-950 via-blue-950 to-indigo-900 bg-clip-text text-transparent inline-block">
                  कौशल सीखें, उद्यम लगाएं —
                </span>
                <br />
                <span className="bg-linear-to-r from-[#0056d2] via-blue-600 to-indigo-600 bg-clip-text text-transparent inline-block pb-1">
                  ऑनलाइन प्रवेश आवेदन करें।
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg font-body">
                डेयरी फार्मिंग, फूड प्रोसेसिंग, FSSAI सर्टिफिकेशन एवं PMEGP ₹50 लाख बैंक DPR मास्टरक्लास हेतु प्रवेश प्रक्रिया प्रारंभ हो चुकी है।
              </p>
            </div>

          </div>

          {/* Right Column: Full-Bleed Image flush with right edge */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] xl:w-[50%] h-72 sm:h-80 lg:h-full relative overflow-hidden">
            <img
              src="/images/apply-hero-banner.jpg"
              alt="Indian students applying for skill development and enterprise training"
              className="w-full h-full object-cover object-center"
            />
            {/* Smooth Left Horizontal Fade Linear Gradient into White Canvas */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none" />
            <div className="block lg:hidden absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ================= MAIN CONTENT CONTAINER ================= */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
          
          {/* 1. EVERYTHING YOU NEED TO KNOW TABBED SECTION (MATCHING USER SCREENSHOT) */}
          <NeedToKnowTabs />

          {/* 2. APPLICATION FORM WIZARD */}
          <ApplyFormWizard />

          {/* 3. DOCUMENT CHECKLIST & ADMISSION HELPDESK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Document Checklist */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span>आवश्यक दस्तावेजों की सूची (Checklist of Documents)</span>
              </h3>
              
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-body">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>आधार कार्ड:</strong> पहचान व पते के प्रमाण हेतु।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>पासपोर्ट साइज फोटो:</strong> डिजिटल प्रोफाइल एवं सर्टिफिकेट हेतु।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>शैक्षणिक अंकसूची:</strong> 8वीं / 10वीं / 12वीं या स्नातक।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>बैंक पासबुक:</strong> सब्सिडी खाते के सत्यापन हेतु।</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>जाति प्रमाण पत्र:</strong> OBC / SC / ST / महिला 35% सब्सिडी पात्रता हेतु।</span>
                </li>
              </ul>
            </div>

            {/* Admission Helpdesk */}
            <div className="bg-linear-to-br from-blue-50 via-indigo-50/50 to-white rounded-2xl border border-blue-200/80 p-6 sm:p-8 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-950 flex items-center gap-2 mb-2">
                  <PhoneCall className="w-4 h-4 text-[#0056d2]" />
                  <span>प्रवेश सहायता केंद्र (Admission Helpdesk)</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                  यदि आपको फॉर्म भरने या योजना पात्रता में कोई संशय है, तो हमारे काउंसलर से सीधे संपर्क करें।
                </p>

                <div className="mt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <PhoneCall className="w-4 h-4 text-blue-600" />
                    <span>हेल्पलाइन: <strong>+91 98765 43210</strong> (प्रातः 9:00 से सायं 6:00)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-800 font-semibold">
                    <Mail className="w-4 h-4 text-blue-600" />
                    <span>ईमेल: <strong>admissions@chhaigaonudyami.in</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-200/60 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">त्वरित सहायता चाहिए?</span>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  व्हाट्सएप पर चैट करें
                </a>
              </div>
            </div>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
