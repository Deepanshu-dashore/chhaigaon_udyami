"use client";

import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Star, Check, Sparkles, Clock, BookOpen, ShoppingCart, ArrowRight } from "lucide-react";

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

export function CourseCardGrid({ course, variant = "udemy" }: CourseCardGridProps) {
  const isFree = !course.isPaid || course.price === 0 || course.discountedPrice === 0;

  // Badge styling matching the reference screenshot
  const renderBadge = () => {
    switch (course.badgeType) {
      case "bestseller":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#d1f2eb] text-[#0e6251]">
            Bestseller
          </span>
        );
      case "hot":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#fadbd8] text-[#922b21]">
            Hot & New
          </span>
        );
      case "role_play":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#ebdef0] text-[#5b2c6f]">
            Role Play
          </span>
        );
      case "new":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
            नया (New)
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="group flex flex-col bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
      {/* Thumbnail Container */}
      <Link href={`/courses/${course.slug}`} className="relative block aspect-[16/9] w-full overflow-hidden bg-slate-900">
        <img
          src={course.thumbnail || "/images/dairy-course.jpg"}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Top Floating Badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/95 text-slate-900 shadow-sm backdrop-blur-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-blue-600" />
            {course.category}
          </span>
        </div>

        {/* Bottom Floating Meta */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[10.5px] text-white/90 font-medium">
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
            <BookOpen className="w-3 h-3 text-blue-300" />
            {course.lessonsCount || 12} पाठ
          </span>
          <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded">
            <Clock className="w-3 h-3 text-amber-300" />
            {course.totalHours}
          </span>
        </div>
      </Link>

      {/* Course Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link href={`/courses/${course.slug}`}>
            <h3 className="font-bold text-[15px] text-slate-900 group-hover:text-[#0056d2] transition-colors line-clamp-2 leading-snug mb-1">
              {course.title}
            </h3>
          </Link>

          {/* Instructor */}
          <p className="text-xs text-slate-500 font-medium line-clamp-1 mb-2">
            {course.instructor}
          </p>

          {/* Ratings & Badge row */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            {renderBadge()}
            
            <div className="flex items-center gap-1 text-xs font-bold text-slate-900">
              <span className="text-amber-700 font-extrabold">{course.rating.toFixed(1)}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(course.rating)
                        ? "text-amber-500 fill-amber-500"
                        : "text-slate-300 fill-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-slate-500 text-[11px] font-normal">
                ({course.reviewsCount.toLocaleString()})
              </span>
            </div>
          </div>
        </div>

        {/* Price & Action Button Row (Matching reference screenshot) */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-baseline gap-1.5">
            {isFree ? (
              <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                निःशुल्क (FREE)
              </span>
            ) : (
              <>
                <span className="text-base font-extrabold text-slate-900">
                  {formatCurrency(course.discountedPrice || course.price)}
                </span>
                {course.discountedPrice && (
                  <span className="text-xs text-slate-400 line-through">
                    {formatCurrency(course.price)}
                  </span>
                )}
              </>
            )}
          </div>

          <Link href={`/courses/${course.slug}`}>
            <button className="px-3.5 py-1.5 rounded-lg border border-[#5624d0] hover:bg-[#5624d0] hover:text-white text-[#5624d0] font-bold text-xs transition-all duration-200 cursor-pointer active:scale-95 flex items-center gap-1 shadow-2xs">
              <span>{isFree ? "शुरू करें" : "Add to cart"}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
