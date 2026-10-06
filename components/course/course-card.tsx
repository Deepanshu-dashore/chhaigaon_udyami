"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp, ArrowRight, Play, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

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
        {/* 1. Thumbnail Image with Play Button & Preview Course UI */}
        <Link
          href={`/courses/${slug}`}
          className="relative block aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-950 mb-2 group/thumb cursor-pointer"
        >
          <img
            src={imgSrc}
            alt={title}
            onError={handleImageError}
            className="w-full h-full object-cover object-center group-hover/thumb:scale-105 transition-transform duration-300 ease-out opacity-90"
          />
          <div className="absolute inset-0 bg-slate-950/20 group-hover/thumb:bg-slate-950/40 transition-colors flex flex-col items-center justify-center gap-1">
            <div className="size-9 sm:size-10 rounded-full bg-white/95 text-[#0056d2] shadow-md flex items-center justify-center group-hover/thumb:scale-110 transition-transform">
              <Play className="size-4 sm:size-4.5 ml-0.5 fill-[#0056d2] text-[#0056d2]" />
            </div>
            <span className="text-white text-[10px] sm:text-[11px] font-semibold drop-shadow tracking-wide">
              Preview Course
            </span>
          </div>
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

        {/* 4. Metadata Line (Icon-based, no raw middle dots) */}
        <div className="flex items-center gap-2 text-[12px] text-slate-600 font-normal leading-normal mb-2.5 min-h-[26px] flex-wrap">
          <div className="flex items-center gap-1 font-semibold text-slate-900">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span>{rating.toFixed(1)}</span>
            <span className="font-normal text-slate-500">({formattedReviews})</span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <Clock className="size-3 text-slate-400" />
            <span>{totalHours}</span>
          </div>

          <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
            {level}
          </span>
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

        <Button
          asChild
          size="sm"
          className="rounded-sm bg-[#0056d2] hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all shrink-0 cursor-pointer h-8 px-3 gap-1.5"
        >
          <Link href={`/courses/${slug}`}>
            <span>{isFree ? "निःशुल्क प्रवेश लें" : "प्रवेश लें"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </div>
    </article>
  );
}







