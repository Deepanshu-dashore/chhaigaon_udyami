import React, { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { GradientWaves } from "@/components/ui/gradient-waves";

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
            opacity={2}
            mouseInteraction={false}
            parallaxStrength={0.45}
            grain={true}
            grainIntensity={0.03}
          />
        </div>

        <div className="w-full max-w-md mx-auto relative z-10">
          <Suspense fallback={<Skeleton className="h-[460px] w-full max-w-md rounded-2xl" />}>
            <LoginForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
