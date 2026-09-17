import React, { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import {
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "लॉग इन | Chhaigaon Udyami",
  description: "छैगांव उद्यमी मंच पर लॉग इन करें और अपने ग्रामीण व्यापार प्रशिक्षण को आगे बढ़ाएं।",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient blue glow styling */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-linear-to-tr from-blue-200/40 to-indigo-200/40 blur-3xl pointer-events-none rounded-full" />

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Side Value Column */}
          <div className="lg:col-span-6 space-y-6 hidden lg:block pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0056d2] text-xs font-semibold shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>ग्रामीण उद्यमिता सशक्तिकरण</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-headline">
              सीखें अपनी भाषा में, <br />
              <span className="text-[#0056d2]">
                बनाएं अपना सफल व्यवसाय
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-body">
              छैगांव उद्यमी के साथ 5,000+ से अधिक ग्रामीण व कस्बाई युवा नई तकनीक, सरकारी सब्सिडी योजनाएं और व्यावहारिक कौशल सीखकर आत्मनिर्भर बन रहे हैं।
            </p>

            {/* Value checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-[#0056d2] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>सुरक्षित और उच्च गुणवत्ता वाले वीडियो लेक्चर्स (VdoCipher HD)</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-[#0056d2] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>PM मुद्रा, PMEGP और NABARD प्रोजेक्ट रिपोर्ट सहायता</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 font-medium">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-[#0056d2] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>कोर्स पूरा होने पर आधिकारिक डिजिटल सर्टिफिकेट</span>
              </div>
            </div>

            {/* Testimonial Quote Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm mt-6">
              <p className="text-xs italic text-slate-600 leading-relaxed">
                &ldquo;छैगांव उद्यमी के डेयरी एवं मिल्क प्रोसेसिंग कोर्स ने मुझे गाँव में ही अपना ब्रांड शुरू करने का आत्मविश्वास दिया।&rdquo;
              </p>
              <div className="mt-3 flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-full bg-[#0056d2] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  R
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 font-headline">
                    राजेश पटेल
                  </h4>
                  <p className="text-[10px] text-slate-500">डेयरी उद्यमी, मध्य प्रदेश</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Form Column */}
          <div className="lg:col-span-6 flex justify-center">
            <Suspense fallback={<div className="h-96 w-full max-w-md bg-white border border-slate-200 rounded-2xl animate-pulse" />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
