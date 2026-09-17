import React, { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Sparkles,
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
    <div className="min-h-screen flex flex-col bg-slate-50/70 font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient Blue Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-112.5 bg-linear-to-tr from-blue-200/40 to-indigo-200/40 blur-3xl pointer-events-none rounded-full" />

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Side Value Column */}
          <div className="lg:col-span-5 space-y-6 hidden lg:block pr-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0056d2] text-xs font-semibold shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>100% निःशुल्क पंजीकरण</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-headline">
              अपने गाँव व शहर में <br />
              <span className="text-[#0056d2]">
                सफल व्यापार स्थापित करें
              </span>
            </h1>

            <p className="text-slate-600 text-sm leading-relaxed font-body">
              छैगांव उद्यमी सिर्फ कोर्सेज नहीं, बल्कि आपको ग्राउंड-लेवल बिजनेस सेटअप, सब्सिडी योजनाओं के आवेदन और बाज़ार से जोड़ने का सम्पूर्ण मंच है।
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <Users className="h-5 w-5 text-[#0056d2] mb-1" />
                <div className="text-lg font-bold text-slate-900 font-num">5,000+</div>
                <div className="text-[11px] text-slate-500 font-medium">पंजीकृत उद्यमी</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                <TrendingUp className="h-5 w-5 text-blue-600 mb-1" />
                <div className="text-lg font-bold text-slate-900 font-num">25+</div>
                <div className="text-[11px] text-slate-500 font-medium">व्यावहारिक कोर्सेज</div>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <div className="h-5 w-5 rounded-full bg-blue-100 text-[#0056d2] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span>PMEGP एवं CMUKY 35% सब्सिडी आवेदन सहायता</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <div className="h-5 w-5 rounded-full bg-blue-100 text-[#0056d2] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span>बैंक-मान्य DPR प्रोजेक्ट रिपोर्ट डाउनलोड्स</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-slate-700 font-semibold">
                <div className="h-5 w-5 rounded-full bg-blue-100 text-[#0056d2] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </div>
                <span>प्रमाणित डिजिटल QR सर्टिफिकेट</span>
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
