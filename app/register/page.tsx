import React, { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GradientWaves } from "@/components/ui/gradient-waves";
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

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Side Value Column */}
          <div className="lg:col-span-5 space-y-6 hidden lg:block pr-2">
            <Badge variant="outline" className="px-3 py-1 bg-blue-50 border-blue-200 text-[#0056d2] text-xs font-semibold shadow-2xs gap-2 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>100% निःशुल्क पंजीकरण</span>
            </Badge>

            <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight font-headline">
              अपने गाँव व शहर में <br />
              <span className="bg-linear-to-r from-[#0056d2] via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                सफल व्यापार स्थापित करें
              </span>
            </h1>

            <p className="text-slate-600 text-sm leading-relaxed font-body">
              छैगांव उद्यमी सिर्फ कोर्सेज नहीं, बल्कि आपको ग्राउंड-लेवल बिजनेस सेटअप, सब्सिडी योजनाओं के आवेदन और बाज़ार से जोड़ने का सम्पूर्ण मंच है।
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <Card className="rounded-xl bg-white border-slate-200 shadow-sm">
                <CardContent className="p-3.5">
                  <Users className="h-5 w-5 text-[#0056d2] mb-1" />
                  <div className="text-lg font-bold text-slate-900 font-num">5,000+</div>
                  <div className="text-[11px] text-slate-500 font-medium">पंजीकृत उद्यमी</div>
                </CardContent>
              </Card>

              <Card className="rounded-xl bg-white border-slate-200 shadow-sm">
                <CardContent className="p-3.5">
                  <TrendingUp className="h-5 w-5 text-blue-600 mb-1" />
                  <div className="text-lg font-bold text-slate-900 font-num">25+</div>
                  <div className="text-[11px] text-slate-500 font-medium">व्यावहारिक कोर्सेज</div>
                </CardContent>
              </Card>
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
            <Suspense fallback={<Skeleton className="h-[520px] w-full max-w-lg rounded-2xl" />}>
              <RegisterForm />
            </Suspense>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
