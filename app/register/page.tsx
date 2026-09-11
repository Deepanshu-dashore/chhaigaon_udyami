import React, { Suspense } from "react";
import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Sparkles,
  Award,
  Users,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "नया खाता बनाएं | Chhaigaon Udyami",
  description: "छैगांव उद्यमी मंच पर निःशुल्क पंजीकरण करें और ग्रामीण व्यापार, कृषि एवं डिजिटल कौशल सीखें।",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-teal-200/40 to-emerald-200/40 blur-3xl pointer-events-none rounded-full" />

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Side Value Column */}
          <div className="lg:col-span-5 space-y-6 hidden lg:block pr-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              100% निःशुल्क पंजीकरण
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
              अपने गाँव व शहर में <br />
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                सफल व्यापार स्थापित करें
              </span>
            </h1>

            <p className="text-slate-600 text-sm leading-relaxed">
              छैगांव उद्यमी सिर्फ कोर्सेज नहीं, बल्कि आपको ग्राउंड-लेवल बिजनेस सेटअप, सब्सिडी योजनाओं के आवेदन और बाज़ार से जोड़ने का सम्पूर्ण मंच है।
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Users className="h-5 w-5 text-emerald-600 mb-1" />
                <div className="text-lg font-semibold text-slate-900 font-num">5,000+</div>
                <div className="text-[11px] text-slate-500 font-medium">पंजीकृत उद्यमी</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <TrendingUp className="h-5 w-5 text-teal-600 mb-1" />
                <div className="text-lg font-semibold text-slate-900 font-num">25+</div>
                <div className="text-[11px] text-slate-500 font-medium">व्यावहारिक कोर्सेज</div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>लाइफटाइम एक्सेस और मोबाइल फ्रेंडली वीडियो</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>कम्युनिटी सपोर्ट एवं मेंटर से सीधा संवाद</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>उद्योग आधार व प्रोजेक्ट रिपोर्ट टेम्पलेट्स</span>
              </div>
            </div>
          </div>

          {/* Right Side Form Column */}
          <div className="lg:col-span-7 flex justify-center">
            <Suspense fallback={<div className="h-96 w-full max-w-lg bg-white border border-slate-200 rounded-2xl animate-pulse" />}>
              <RegisterForm />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
