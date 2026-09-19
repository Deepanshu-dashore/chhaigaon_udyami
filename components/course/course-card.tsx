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
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-300 p-3 sm:p-3.5 h-full justify-between">
      <div>
        {/* 1. Thumbnail Image inside rounded card padding */}
        <Link href={`/courses/${slug}`} className="relative block aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 mb-3">
          <img
            src={thumbnail || "/images/dairy-course.jpg"}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-400 ease-out"
          />
        </Link>

        {/* 2. Partner / Organization Row */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-4.5 h-4.5 flex items-center justify-center text-slate-500 shrink-0 shadow-2xs">
            <User className="w-3 h-3 text-slate-600" />
          </div>
          <span className="text-[11px] font-medium text-slate-600 line-clamp-1">
            {instructor}
          </span>
        </div>

        {/* 3. Course Title (Slightly lighter, elegant slate color) */}
        <Link href={`/courses/${slug}`} className="block mb-1.5">
          <h3 className="font-bold text-[14px] sm:text-[15px] text-slate-800 group-hover:text-[#0056d2] transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
        </Link>

        {/* 4. Metadata Line (Clean, slightly reduced compact typography) */}
        <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium leading-tight mb-2.5 flex-wrap">
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

      {/* 5. Bottom Badges Row (Coursera Pills: Top program, Preview / Price) */}
      <div className="pt-2 flex items-center justify-between gap-2 mt-auto border-t border-slate-100/80">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#efe7fc] text-[#5b21b6]">
            Top program
          </span>
          {isFree ? (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-slate-300 text-slate-700 bg-slate-50/60">
              Free trial
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 transition-colors">
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
              <span className="text-sm font-black text-slate-950">
                {formatCurrency(discountedPrice || price)}
              </span>
              {discountedPrice && (
                <span className="text-[10.5px] text-slate-400 line-through">
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

