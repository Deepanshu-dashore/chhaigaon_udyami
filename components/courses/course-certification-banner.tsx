"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight, Sparkles, ShieldCheck, Award } from "lucide-react";

interface CertificationCardProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  href?: string;
}

function CertBadgeCard({
  title,
  subtitle,
  imageSrc,
  href = "/courses",
}: CertificationCardProps) {
  return (
    <div className="group flex flex-col justify-between rounded-2xl bg-white p-3 sm:p-2 transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 border border-slate-200/90 hover:border-blue-400/80">
      <div>
        {/* Big Crisp Certificate Preview Image */}
        <Link
          href={href}
          className="relative block aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-50 mb-3.5 border border-slate-100 shadow-xs"
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-400 ease-out"
          />
          <div className="absolute top-2.5 left-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-slate-800 shadow-xs flex items-center gap-1 border border-slate-200 backdrop-blur-xs">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>प्रमाणित</span>
            </span>
          </div>
        </Link>

        {/* Clean Title & Short Subtitle */}
        <div className="space-y-1 mb-2">
          <Link href={href}>
            <h4 className="text-slate-900 font-bold text-[15px] group-hover:text-[#0056d2] transition-colors leading-snug">
              {title}
            </h4>
          </Link>
          <p className="text-xs text-slate-500 font-medium line-clamp-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Clean Enroll Button */}
      <div className="pt-3 mt-auto border-t border-slate-100">
        <Link href={href} className="block">
          <button className="w-full py-2 px-3.5 rounded-lg bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98">
            <span>एनरोल करें (Enroll Now)</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export function CourseCertificationBanner() {
  return (
    <section className="py-6 sm:py-8">
      <div className="rounded-3xl bg-[#0f172a] shadow-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-slate-800">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
          
          {/* Left Column: Compact Heading & Description */}
          <div className="lg:col-span-4 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20 backdrop-blur-md shadow-xs">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>मान्यता प्राप्त सर्टिफिकेशन</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug font-headline">
              प्रमाणित बनें और अपने उद्यम को आगे बढ़ाएं
            </h2>

            <p className="text-xs text-slate-300/90 leading-relaxed font-body">
              व्यावहारिक वीडियो कोर्सेज, क्विज एवं बैंक लोन DPR के साथ डिजिटल सर्टिफिकेशन प्राप्त करें।
            </p>

            <div className="pt-0.5">
              <Link
                href="/#schemes"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 group transition-colors"
              >
                <span>सभी सर्टिफिकेशन्स देखें</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean White Certification Cards */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: FSSAI & Food Safety */}
            <CertBadgeCard
              title="FSSAI खाद्य सुरक्षा"
              subtitle="FBO लाइसेंसिंग एवं हाइजीन मानक"
              imageSrc="/images/cert-fssai-collage.jpg"
              href="/courses?category=food-processing"
            />

            {/* Card 2: MSME & PMEGP */}
            <CertBadgeCard
              title="MSME व PMEGP लोन"
              subtitle="₹50 लाख बैंक DPR व 35% सब्सिडी"
              imageSrc="/images/cert-msme-collage.jpg"
              href="/courses?category=schemes"
            />

            {/* Card 3: NABARD & Dairy Credit */}
            <CertBadgeCard
              title="नाबार्ड व डेयरी उद्यम"
              subtitle="डेयरी लोन, पशुपालन व कोल्ड चेन"
              imageSrc="/images/cert-nabard-collage.jpg"
              href="/courses?category=dairy"
            />

          </div>

        </div>
      </div>
    </section>
  );
}
