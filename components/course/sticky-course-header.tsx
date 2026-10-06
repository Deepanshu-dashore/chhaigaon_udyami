"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface StickyCourseHeaderProps {
  title: string;
  rating: number;
  reviewsCount: number;
  price: number;
  discountedPrice?: number;
  isFree?: boolean;
}

export function StickyCourseHeader({
  title,
  rating,
  reviewsCount,
  price,
  discountedPrice,
  isFree = false,
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

          <Button asChild size="sm" className="h-9 px-4 text-xs font-bold bg-[#1261D6] hover:bg-blue-700 text-white rounded-sm shadow-2xs cursor-pointer">
            <Link href="/apply">
              <span>{isFree ? "निःशुल्क प्रवेश लें " : "अभी प्रवेश लें (Enroll Now)"}</span>
              <ArrowRight className="size-3.5 ml-1" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
