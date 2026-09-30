"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, ArrowRight } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  shortDesc?: string | null;
  thumbnail?: string | null;
  price: number;
  discountedPrice?: number | null;
  level?: string;
  lessonsCount?: number;
  category?: string;
  instructor?: string;
  rating?: number;
  reviewsCount?: number;
  totalHours?: string;
  updatedDate?: string;
  outcomes?: string[];
  isLastInRow?: boolean;
}

export function CourseCard({
  title,
  slug,
  thumbnail = "/images/dairy-course.jpg",
  price,
  discountedPrice,
  level = "Beginner",
  instructor = "छैगांव उद्यमी अकादमी",
  rating = 4.8,
  reviewsCount = 420,
  totalHours = "4.5 घंटे",
  category,
}: CourseCardProps) {
  const isFree = price === 0 || discountedPrice === 0;
  const DEFAULT_THUMBNAIL = "/images/dairy-course.jpg";

  const [imgSrc, setImgSrc] = useState<string>(
    thumbnail && thumbnail.trim() !== "" ? thumbnail : DEFAULT_THUMBNAIL
  );

  useEffect(() => {
    setImgSrc(thumbnail && thumbnail.trim() !== "" ? thumbnail : DEFAULT_THUMBNAIL);
  }, [thumbnail]);

  const handleImageError = () => {
    if (imgSrc !== DEFAULT_THUMBNAIL) {
      setImgSrc(DEFAULT_THUMBNAIL);
    }
  };

  const formattedReviews =
    reviewsCount >= 1000
      ? `${(reviewsCount / 1000).toFixed(reviewsCount >= 10000 ? 0 : 1)}K`
      : reviewsCount.toString();

  const partnerLogoInitial = (instructor || "CU").charAt(0).toUpperCase();

  return (
    <article className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 p-2.5 sm:p-3 h-full justify-between overflow-hidden">
      <div>
        {/* 1. Thumbnail Image */}
        <Link
          href={`/courses/${slug}`}
          className="relative block aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-100 mb-2"
        >
          <img
            src={imgSrc}
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300 ease-out"
          />
        </Link>

        {/* 2. Partner / Organization Row */}
        <div className="flex items-center gap-1.5 mb-1.5 min-h-[22px]">
          <div className="w-5 h-5 rounded border border-slate-200 bg-white p-0.5 flex items-center justify-center text-[11px] font-black text-[#0056d2] shadow-2xs shrink-0">
            {partnerLogoInitial}
          </div>
          <span className="text-[12px] font-medium text-slate-800 line-clamp-1">
            {instructor}
          </span>
        </div>

        {/* 3. Course Title (Fixed height for strict grid alignment across cards) */}
        <Link href={`/courses/${slug}`} className="block mb-1.5">
          <h3 className="font-bold text-[14px] sm:text-[15px] text-slate-900 group-hover:text-[#0056d2] transition-colors line-clamp-2 leading-snug min-h-[40px] sm:min-h-[44px]">
            {title}
          </h3>
        </Link>

        {/* 4. Metadata Line (Fixed height for clean row baseline) */}
        <div className="text-[12px] text-slate-600 font-normal leading-normal mb-2.5 min-h-[36px] line-clamp-2">
          <span className="font-semibold text-slate-800">
            <span className="text-slate-900 font-bold">★ {rating.toFixed(1)}</span>{" "}
            <span className="font-normal text-slate-500">({formattedReviews})</span>
          </span>
          <span className="mx-1 text-slate-400">·</span>
          <span>{level}</span>
          <span className="mx-1 text-slate-400">·</span>
          <span>{category || "प्रमाणपत्र"}</span>
          <span className="mx-1 text-slate-400">·</span>
          <span>{totalHours}</span>
        </div>

        {/* 5. Dedicated Badges Row */}
        <div className="flex items-center gap-1.5 flex-wrap mb-2 min-h-[24px]">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#fce8e6] text-[#b00020]">
            <TrendingUp className="w-3 h-3 text-[#b00020]" />
            Trending right now
          </span>
          {isFree ? (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#e8f0fe] text-[#1a73e8]">
              Free trial
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors">
              Preview
            </span>
          )}
        </div>
      </div>

      {/* 6. Footer Price & Enroll CTA Row */}
      <div className="pt-2.5 mt-auto border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          {isFree ? (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              निःशुल्क
            </span>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-slate-950">
                {formatCurrency(discountedPrice || price)}
              </span>
              {discountedPrice && (
                <span className="text-[10px] text-slate-400 line-through">
                  {formatCurrency(price)}
                </span>
              )}
            </div>
          )}
        </div>

        <Link
          href={`/courses/${slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#0056d2] hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all shrink-0 cursor-pointer"
        >
          <span>{isFree ? "निःशुल्क प्रवेश लें" : "प्रवेश लें"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
}







