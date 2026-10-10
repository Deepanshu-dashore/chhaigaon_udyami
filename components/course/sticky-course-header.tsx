"use client";

import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { CourseEnrollButton } from "./course-enroll-button";

interface StickyCourseHeaderProps {
  courseId?: string;
  courseSlug?: string;
  title: string;
  rating: number;
  reviewsCount: number;
  price: number;
  discountedPrice?: number;
  isFree?: boolean;
  isEnrolled?: boolean;
  isAuthenticated?: boolean;
}

export function StickyCourseHeader({
  courseId = "",
  courseSlug = "",
  title,
  rating,
  reviewsCount,
  price,
  discountedPrice,
  isFree = false,
  isEnrolled = false,
  isAuthenticated = false,
}: StickyCourseHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled down past hero (~400px)
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-[64px] left-0 right-0 z-40 bg-white border-b border-[#E5E7EB] shadow-xs font-sans transition-all animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
        
        {/* Title & Micro Rating */}
        <div className="min-w-0 flex-1 space-y-0.5">
          <h4 className="font-bold text-xs sm:text-sm text-[#111827] truncate">
            {title}
          </h4>
          <div className="flex items-center gap-2 text-[11px] text-[#667085]">
            <span className="flex items-center gap-1 font-semibold text-[#111827]">
              <Star className="size-3 fill-amber-400 text-amber-400" />
              {rating.toFixed(1)}
            </span>
            <span>({reviewsCount.toLocaleString("en-IN")} समीक्षाएं)</span>
          </div>
        </div>

        {/* Price & Action CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {!isFree && (
            <div className="hidden sm:flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#111827]">
                {formatCurrency(discountedPrice || price)}
              </span>
              {discountedPrice && (
                <span className="text-xs text-[#667085] line-through">
                  {formatCurrency(price)}
                </span>
              )}
            </div>
          )}

          <CourseEnrollButton
            courseId={courseId}
            courseSlug={courseSlug}
            courseTitle={title}
            isPaid={!isFree}
            price={discountedPrice || price}
            initialIsEnrolled={isEnrolled}
            isAuthenticated={isAuthenticated}
            variant="header"
          />
        </div>

      </div>
    </div>
  );
}
