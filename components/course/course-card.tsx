import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  Star,
  Check,
  ShieldCheck,
} from "lucide-react";

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
  id,
  title,
  slug,
  shortDesc,
  thumbnail = "/images/dairy-course.jpg",
  price,
  discountedPrice,
  level = "शुरुआती (Beginner)",
  lessonsCount = 14,
  category = "उद्यम कौशल",
  instructor = "जिला उद्योग विशेषज्ञ एवं प्रमाणित प्रशिक्षक",
  rating = 4.8,
  reviewsCount = 420,
  totalHours = "4.5 घंटे",
  updatedDate = "फरवरी 2026",
  isLastInRow = false,
  outcomes = [
    "व्यावहारिक प्रोजेक्ट रिपोर्ट (DPR) एवं बैंक लोन प्रक्रिया की पूरी जानकारी।",
    "सरकारी सब्सिडी (PMEGP / मुख्यमंत्री उद्यम क्रांति) हेतु प्रत्यक्ष आवेदन मार्गदर्शन।",
    "उद्योग आधार एवं FSSAI लाइसेंसिंग प्रक्रिया का व्यावहारिक ज्ञान।",
  ],
}: CourseCardProps) {
  const isFree = price === 0 || discountedPrice === 0;
  const isBestseller = price > 0;

  return (
    <div className="relative group/card w-full">
      {/* 1. Main Course Card */}
      <div className="flex flex-col justify-between rounded-xl bg-white border border-slate-200/90 hover:border-slate-300 shadow-xs hover:shadow-lg transition-all duration-200 p-3 cursor-pointer">
        <div>
          {/* Thumbnail */}
          <div className="relative aspect-[16/10] w-full rounded-lg overflow-hidden bg-slate-950 mb-2.5">
            <img
              src={thumbnail || "/images/dairy-course.jpg"}
              alt={title}
              className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <span className="px-2 py-0.5 rounded text-[9.5px] font-bold bg-white/95 text-slate-900 shadow-xs flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5 text-amber-500" />
                {category}
              </span>
            </div>

            {/* Bottom Meta Bar */}
            <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-white text-[10px] font-medium">
              <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded">
                <BookOpen className="h-2.5 w-2.5 text-blue-300" />
                {lessonsCount} लेक्चर्स
              </span>
              <span className="flex items-center gap-1 bg-black/60 backdrop-blur-xs px-1.5 py-0.5 rounded">
                <Clock className="h-2.5 w-2.5 text-amber-300" />
                {totalHours}
              </span>
            </div>
          </div>

          {/* Title & Instructor */}
          <div className="space-y-1">
            <h3 className="font-bold text-[14px] text-slate-900 group-hover/card:text-[#0056d2] transition-colors line-clamp-2 leading-snug">
              {title}
            </h3>

            <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">
              {instructor}
            </p>

            {/* Ratings & Bestseller Badge */}
            <div className="flex items-center gap-1.5 pt-0.5 flex-wrap">
              {isBestseller && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-900">
                  Bestseller
                </span>
              )}
              <div className="flex items-center gap-0.5 text-xs font-bold text-amber-600">
                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{rating}</span>
              </div>
              <span className="text-[10px] text-slate-500 px-1 py-0.5 rounded border border-slate-200">
                ({reviewsCount})
              </span>
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="pt-2.5 mt-2.5 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5">
            {isFree ? (
              <span className="text-sm font-extrabold text-emerald-600">निःशुल्क</span>
            ) : (
              <>
                <span className="text-[15px] font-black text-slate-950">
                  {formatCurrency(discountedPrice || price)}
                </span>
                {discountedPrice && (
                  <span className="text-[11px] text-slate-400 line-through">
                    {formatCurrency(price)}
                  </span>
                )}
              </>
            )}
          </div>

          <Link href={`/courses/${slug}`}>
            <button className="px-3 py-1 rounded-md text-[11px] font-bold bg-[#0056d2] hover:bg-blue-800 text-white flex items-center gap-1 shadow-xs transition-colors cursor-pointer">
              <span>शुरू करें</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </Link>
        </div>
      </div>

      {/* 2. Interactive Desktop Hover Quick-Preview Popover */}
      <div
        className={`hidden lg:block absolute top-1/2 ${
          isLastInRow
            ? "-left-4 -translate-x-full"
            : "-right-4 translate-x-full"
        } -translate-y-1/2 w-80 bg-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-200 z-50 opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:pointer-events-auto transition-all duration-200 scale-95 group-hover/card:scale-100`}
      >
        {/* Arrow Pointer with seamless border */}
        <div
          className={`absolute top-1/2 ${
            isLastInRow
              ? "-right-[7px] border-t border-r"
              : "-left-[7px] border-b border-l"
          } -translate-y-1/2 w-3.5 h-3.5 bg-white border-slate-200 rotate-45 z-10`}
        />

        <h4 className="font-bold text-sm text-slate-900 leading-snug mb-1.5">
          {title}
        </h4>

        <div className="flex items-center gap-2 text-xs mb-1">
          {isBestseller && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-900">
              Bestseller
            </span>
          )}
          <span className="text-emerald-700 text-[11px] font-medium">
            अपडेट: <strong className="font-bold">{updatedDate}</strong>
          </span>
        </div>

        <p className="text-[11px] text-slate-500 mb-2">
          {totalHours} • {lessonsCount} लेक्चर्स • {level}
        </p>

        <p className="text-xs text-slate-600 leading-relaxed mb-3">
          {shortDesc || "व्यावहारिक प्रोजेक्ट रिपोर्ट, सरकारी सब्सिडी एवं तकनीकी कौशल पर आधारित सम्पूर्ण प्रशिक्षण।"}
        </p>

        {/* Outcomes Checklist */}
        <div className="space-y-1.5 mb-4 border-t border-slate-100 pt-2.5">
          <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider mb-1">
            आप क्या सीखेंगे:
          </span>
          {outcomes.map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-700 leading-snug">
              <Check className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <Link href={`/courses/${slug}`} className="block">
          <button className="w-full py-2.5 rounded-xl bg-[#5624d0] hover:bg-[#401b9c] text-white font-bold text-xs shadow-md transition-colors cursor-pointer active:scale-98">
            Add to cart / शुरू करें
          </button>
        </Link>
      </div>
    </div>
  );
}

