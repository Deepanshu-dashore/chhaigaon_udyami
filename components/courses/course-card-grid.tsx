"use client";

import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Star, ArrowRight, User } from "lucide-react";

export interface CourseItem {
  id: string;
  title: string;
  slug: string;
  shortDesc?: string | null;
  thumbnail?: string | null;
  price: number;
  discountedPrice?: number | null;
  level?: string;
  lessonsCount?: number;
  category: string;
  instructor: string;
  instructorRole?: string;
  rating: number;
  reviewsCount: number;
  totalHours: string;
  updatedDate?: string;
  badgeType?: "bestseller" | "hot" | "role_play" | "new" | null;
  outcomes?: string[];
  isPaid: boolean;
}

interface CourseCardGridProps {
  course: CourseItem;
  variant?: "udemy" | "compact";
}

export function CourseCardGrid({ course }: CourseCardGridProps) {
  const isFree = !course.isPaid || course.price === 0 || course.discountedPrice === 0;

  const formattedReviews =
    course.reviewsCount >= 1000
      ? `${(course.reviewsCount / 1000).toFixed(course.reviewsCount >= 10000 ? 0 : 1)}K`
      : course.reviewsCount.toString();

  const partnerLogoInitial = (course.instructor || "CU").charAt(0).toUpperCase();

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-300 p-3 sm:p-3.5 h-full justify-between">
      <div>
        {/* 1. Thumbnail Image inside rounded card padding */}
        <Link href={`/courses/${course.slug}`} className="relative block aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-900 mb-3">
          <img
            src={course.thumbnail || "/images/dairy-course.jpg"}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-400 ease-out"
          />
        </Link>

        {/* 2. Partner / Organization Row */}
        <div className="flex items-center gap-1.5 mb-1.5">
          <div className="w-4.5 h-4.5 flex items-center justify-center text-slate-500 shrink-0 shadow-2xs">
            <User className="w-3 h-3 text-slate-600" />
          </div>
          <span className="text-[10px] font-medium text-slate-600 line-clamp-1">
            {course.instructor}
          </span>
        </div>

        {/* 3. Course Title (Slightly lighter, elegant slate color) */}
        <Link href={`/courses/${course.slug}`} className="block mb-1.5">
          <h3 className="font-bold text-[14px] sm:text-[15px] text-slate-700 group-hover:text-[#0056d2] transition-colors line-clamp-2 leading-snug">
            {course.title}
          </h3>
        </Link>

        {/* 4. Metadata Line (Clean, slightly reduced compact typography) */}
        <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium leading-tight mb-2.5 flex-wrap">
          <span className="font-semibold text-slate-800 flex items-center gap-0.5">
            <span className="text-amber-500 font-black text-xs">★</span>
            <span>{course.rating.toFixed(1)}</span>
            <span className="font-normal text-slate-400">({formattedReviews})</span>
          </span>
          <span className="text-slate-300">·</span>
          <span>{course.level || "Beginner"}</span>
          <span className="text-slate-300">·</span>
          <span>Course</span>
          <span className="text-slate-300">·</span>
          <span>{course.totalHours}</span>
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
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              निःशुल्क
            </span>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-black text-slate-950">
                {formatCurrency(course.discountedPrice || course.price)}
              </span>
              {course.discountedPrice && (
                <span className="text-[10.5px] text-slate-400 line-through">
                  {formatCurrency(course.price)}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
