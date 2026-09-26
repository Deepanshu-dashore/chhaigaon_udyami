import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Star, ArrowRight, User } from "lucide-react";

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
}: CourseCardProps) {
  const isFree = price === 0 || discountedPrice === 0;

  const formattedReviews =
    reviewsCount >= 1000
      ? `${(reviewsCount / 1000).toFixed(reviewsCount >= 10000 ? 0 : 1)}K`
      : reviewsCount.toString();

  const partnerLogoInitial = (instructor || "CU").charAt(0).toUpperCase();

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-300 p-2.5 sm:p-3 h-full justify-between">
      <div>
        {/* 1. Thumbnail Image */}
        <Link href={`/courses/${slug}`} className="relative block aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-900 mb-2.5">
          <img
            src={thumbnail || "/images/dairy-course.jpg"}
            alt={title}
            className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-300 ease-out"
          />
        </Link>

        {/* 2. Partner / Organization Row */}
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-4 h-4 flex items-center justify-center text-slate-500 shrink-0">
            <User className="w-3 h-3 text-slate-600" />
          </div>
          <span className="text-[12px] font-medium text-slate-600 line-clamp-1">
            {instructor}
          </span>
        </div>

        {/* 3. Course Title */}
        <Link href={`/courses/${slug}`} className="block mb-1.5">
          <h3 className="font-bold text-[15px] sm:text-[16px] text-slate-900 group-hover:text-[#0056d2] transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        {/* 4. Metadata Line */}
        <div className="flex items-center gap-1 text-[12px] text-slate-500 font-medium leading-tight mb-2 flex-wrap">
          <span className="font-semibold text-slate-800 flex items-center gap-0.5">
            <span className="text-amber-500 font-black text-xs">★</span>
            <span>{rating.toFixed(1)}</span>
            <span className="font-normal text-slate-400">({formattedReviews})</span>
          </span>
          <span className="text-slate-300">·</span>
          <span>{level}</span>
          <span className="text-slate-300">·</span>
          <span>Course</span>
          <span className="text-slate-300">·</span>
          <span>{totalHours}</span>
        </div>
      </div>

      {/* 5. Bottom Badges Row */}
      <div className="pt-2 flex items-center justify-between gap-2 mt-auto border-t border-slate-100">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#efe7fc] text-[#5b21b6]">
            Top program
          </span>
          {isFree ? (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold border border-slate-300 text-slate-700 bg-slate-50/60">
              Free trial
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors">
              Preview
            </span>
          )}
        </div>

        <div>
          {isFree ? (
            <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              निःशुल्क
            </span>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-slate-950">
                {formatCurrency(discountedPrice || price)}
              </span>
              {discountedPrice && (
                <span className="text-[11px] text-slate-400 line-through">
                  {formatCurrency(price)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

