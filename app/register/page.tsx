import React, { Suspense } from "react";
import { RegisterForm } from "@/components/auth/register-form";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Skeleton } from "@/components/ui/skeleton";
import { GradientWaves } from "@/components/ui/gradient-waves";

export const metadata = {
  title: "नया खाता बनाएं | Chhaigaon Udyami",
  description: "छैगांव उद्यमी मंच पर निःशुल्क पंजीकरण करें और ग्रामीण व्यापार, कृषि एवं डिजिटल कौशल सीखें।",
};

export default function RegisterPage() {
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

        <div className="w-full max-w-xl md:max-w-2xl mx-auto relative z-10">
          <Suspense fallback={<Skeleton className="h-[520px] w-full max-w-2xl rounded-3xl" />}>
            <RegisterForm />
          </Suspense>
        </div>
      </main>

      <Footer />
    </div>
  );
}
