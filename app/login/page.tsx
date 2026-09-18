import React, { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { GradientWaves } from "@/components/ui/gradient-waves";
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
    <div className="min-h-screen flex flex-col font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Dynamic Interactive Gradient Waves Background */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <GradientWaves
            horizonColor="#2b51f5"
            waveColor="#0326da"
            crestColor="#ffffff"
            speed={0.35}
            amplitude={2.5}
            waveScale={0.6}
            waveRatio={0.9}
            swell={35}
            turbulence={20}
            tilt={1.11}
            zoom={1.0}
            height={5.5}
            fogDepth={16}
            detail="medium"
            brightness={1.0}
            opacity={1.8}
            mouseInteraction={false}
            parallaxStrength={0.45}
            grain={true}
            grainIntensity={0.03}
          />
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Side Value Column */}
          <div className="lg:col-span-6 space-y-6 hidden lg:block pr-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-100/90 shadow-sm shadow-blue-900/5 ring-1 ring-slate-900/5">
              <span className="flex items-center justify-center h-5 w-5 rounded-full bg-blue-50 text-[#0056d2] border border-blue-100">
                <Sparkles className="h-3 w-3" />
              </span>
              <span className="text-xs font-semibold text-slate-800 tracking-tight">
                ग्रामीण उद्यमिता सशक्तिकरण
              </span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-headline">
              सीखें अपनी भाषा में, <br />
              <span className="bg-gradient-to-r from-[#0056d2] via-blue-700 to-indigo-700 bg-clip-text text-transparent font-extrabold">
                बनाएं अपना सफल व्यवसाय
              </span>
            </h1>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal max-w-lg">
              छैगांव उद्यमी के साथ 5,000+ से अधिक ग्रामीण व कस्बाई युवा नई तकनीक, सरकारी सब्सिडी योजनाएं और व्यावहारिक कौशल सीखकर आत्मनिर्भर बन रहे हैं।
            </p>

            {/* Value checklist */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-800 font-semibold bg-white/85 hover:bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-white/80 shadow-md shadow-blue-950/5 transition-all group">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-[#0056d2] border border-blue-200/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>सुरक्षित और उच्च गुणवत्ता वाले वीडियो लेक्चर्स (VdoCipher HD)</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-800 font-semibold bg-white/85 hover:bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-white/80 shadow-md shadow-blue-950/5 transition-all group">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-[#0056d2] border border-blue-200/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>PM मुद्रा, PMEGP और NABARD प्रोजेक्ट रिपोर्ट सहायता</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-800 font-semibold bg-white/85 hover:bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl border border-white/80 shadow-md shadow-blue-950/5 transition-all group">
                <div className="h-6 w-6 rounded-full bg-blue-100 text-[#0056d2] border border-blue-200/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span>कोर्स पूरा होने पर आधिकारिक डिजिटल सर्टिफिकेट</span>
              </div>
            </div>
          </div>

          {/* Right Side Form Column */}
          <div className="lg:col-span-6 flex justify-center">
            <Suspense fallback={<Skeleton className="h-[460px] w-full max-w-md rounded-2xl" />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
