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
    <div className="min-h-screen flex flex-col bg-slate-50/80 font-sans text-slate-900">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Dynamic Interactive Gradient Waves Background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-45 overflow-hidden">
          <GradientWaves
            horizonColor="#003882"
            waveColor="#0056d2"
            crestColor="#93c5fd"
            speed={0.32}
            amplitude={2.0}
            waveScale={0.55}
            waveRatio={0.85}
            swell={28}
            turbulence={16}
            tilt={1.12}
            zoom={1.0}
            height={5.2}
            fogDepth={18}
            detail="medium"
            brightness={1.05}
            opacity={0.75}
            mouseInteraction={true}
            parallaxStrength={0.35}
            grain={true}
            grainIntensity={0.03}
          />
        </div>

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Side Value Column */}
          <div className="lg:col-span-6 space-y-6 hidden lg:block pr-4">
            <Badge variant="outline" className="px-3 py-1 bg-blue-50 border-blue-200 text-[#0056d2] text-xs font-semibold shadow-2xs gap-2 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>ग्रामीण उद्यमिता सशक्तिकरण</span>
            </Badge>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-headline">
              सीखें अपनी भाषा में, <br />
              <span className="bg-linear-to-r from-[#0056d2] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
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
