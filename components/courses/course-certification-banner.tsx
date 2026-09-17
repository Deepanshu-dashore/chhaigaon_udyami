"use client";

import React from "react";
import Link from "next/link";
import { Award, ChevronRight } from "lucide-react";

interface CertificationCardProps {
  title: string;
  tags: string;
  imageSrc: string;
  href?: string;
}

function CertBadgeCard({
  title,
  tags,
  imageSrc,
  href = "/courses",
}: CertificationCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between rounded-2xl bg-[#1e2333] hover:bg-[#252c40] p-4 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5"
    >
      {/* Visual Badge Graphic Image with Clean Rounded Corner */}
      <div className="relative aspect-16/10 w-full rounded-xl overflow-hidden bg-slate-900 mb-3.5">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
      </div>

      {/* Title & Description Tags */}
      <div>
        <h4 className="text-white font-extrabold text-[15px] group-hover:text-blue-300 transition-colors flex items-center justify-between">
          <span>{title}</span>
        </h4>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed font-normal">
          {tags}
        </p>
      </div>
    </Link>
  );
}

export function CourseCertificationBanner() {
  return (
    <section className="py-8">
      <div className="rounded-3xl bg-[#171a26] shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* Left Column: Heading & Description (Matching Reference Image 1) */}
          <div className="lg:col-span-4 space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight font-headline">
              Get certified and get ahead in your career
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed font-body">
              Prep for certifications with comprehensive courses, practice tests, and special offers on exam vouchers.
            </p>

            <div className="pt-1">
              <Link
                href="/#schemes"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-400 hover:text-blue-300 group"
              >
                <span>Explore certifications and vouchers</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Clean Certification Cards with Generated Collage Images */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Card 1: FSSAI & Food Safety */}
            <CertBadgeCard
              title="FSSAI & Food Safety"
              tags="Food Safety, FBO Licensing, Hygiene, Packaging Standards"
              imageSrc="/images/cert-fssai-collage.jpg"
              href="/courses?category=food-processing"
            />

            {/* Card 2: MSME & PMEGP */}
            <CertBadgeCard
              title="MSME & PMEGP"
              tags="Udyam Aadhar, ₹50L DPR Appraisal, Bank Guarantee"
              imageSrc="/images/cert-msme-collage.jpg"
              href="/courses?category=schemes"
            />

            {/* Card 3: NABARD & Dairy Credit */}
            <CertBadgeCard
              title="NABARD & Dairy"
              tags="Agri Credit, Dairy Excellence, Cold Chain Subsidy"
              imageSrc="/images/cert-nabard-collage.jpg"
              href="/courses?category=dairy"
            />

          </div>

        </div>
      </div>
    </section>
  );
}
