"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { formatCurrency, cn } from "@/lib/utils";
import { ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  id?: string;
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

// Distinct styles for different skill and course levels
function getLevelBadgeConfig(levelStr?: string) {
  const upper = (levelStr || "").toUpperCase();

  if (upper.includes("BEGINNER") || upper.includes("शुरुआती")) {
    return {
      label: "Beginner",
      className:
        "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100/80 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
    };
  }

  if (upper.includes("INTERMEDIATE") || upper.includes("मध्यम")) {
    return {
      label: "Intermediate",
      className:
        "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100/80 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300",
    };
  }

  if (upper.includes("ADVANCED") || upper.includes("उन्नत")) {
    return {
      label: "Advanced",
      className:
        "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100/80 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300",
    };
  }

  return {
    label: upper.includes("ALL") || upper.includes("सभी") ? "All Levels" : levelStr || "General",
    className:
      "border-blue-200 bg-blue-50 text-[#0056d2] hover:bg-blue-100/80 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300",
  };
}

export function CourseCard({
  title,
  slug,
  thumbnail = "/images/dairy-course.jpg",
  price,
  discountedPrice,
  level = "Beginner",
  category,
  instructor = "छैगांव उद्यमी अकादमी",
  rating = 4.8,
  reviewsCount = 420,
  totalHours = "4.5 घंटे",
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

  const levelBadge = getLevelBadgeConfig(level);

  // Short monogram for the square organization logo box (e.g. CU, डॉ, etc.)
  const partnerLogoInitial = (instructor || "CU").trim().slice(0, 2).toUpperCase();

  return (
    <Card className="group flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-3 sm:p-3 w-full max-w-[360px] mx-auto sm:max-w-none justify-between">
      <div>
        {/* 1. Inset Thumbnail Image with rounded corners on all sides (Coursera style) */}
        <Link
          href={`/courses/${slug}`}
          className="relative block aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-100 cursor-pointer shrink-0 mb-3"
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={imgSrc}
            alt={title}
            onError={handleImageError}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-250 ease-out"
          />
        </Link>

        {/* 2. Main Card Content */}
        <CardContent className="p-0 space-y-2.5">
          {/* Organization / Partner Row with Square Logo Avatar (SkillUp style) */}
          <div className="flex items-center gap-2 h-8">
            <div className="size-8 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center font-bold text-xs text-[#0056d2] shadow-2xs shrink-0 select-none">
              {partnerLogoInitial}
            </div>
            <span className="text-xs sm:text-[13px] font-semibold text-slate-800 line-clamp-1">
              {instructor}
            </span>
          </div>

          {/* Course Title */}
          <Link href={`/courses/${slug}`} className="block group/title">
            <CardTitle
              className="text-[15px] sm:text-[16px] font-semibold text-slate-9`00 group-hover/title:text-[#155EEF] transition-colors leading-snug line-clamp-2 min-h-[44px]"
              style={{
                fontFamily:
                  "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
              }}
            >
              {title}
            </CardTitle>
          </Link>

          {/* Single Unified Metadata, Level Badge & Star Rating Row */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide shrink-0 transition-colors shadow-2xs",
                levelBadge.className
              )}
            >
              {levelBadge.label}
            </Badge>
            <span className="text-slate-300 select-none">·</span>
            <span className="truncate">{category || "प्रशिक्षण"}</span>
            <span className="text-slate-300 select-none">·</span>
            <span className="shrink-0">{totalHours}</span>

            <div className="flex items-center gap-1 text-xs font-semibold text-slate-700 shrink-0 ml-auto">
              <Star className="w-3.5 h-3.5 text-[#F4B400] fill-[#F4B400]" />
              <span>{rating.toFixed(1)}</span>
              <span className="font-normal text-slate-400 text-[11px]">({formattedReviews})</span>
            </div>
          </div>
        </CardContent>
      </div>

      {/* 3. Footer Price & CTA */}
     
    </Card>
  );
}
