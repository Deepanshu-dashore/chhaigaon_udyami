import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  Star,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  slug: string;
  shortDesc?: string | null;
  thumbnail?: string | null;
  price: number;
  discountedPrice?: number | null;
  level: string;
  lessonsCount?: number;
  category?: string;
}

// Preset textured gradients matching Ideogram reference cards
const gradientPresets = [
  "from-pink-500 via-rose-500 to-amber-300", // Sunset Mesh
  "from-teal-800 via-cyan-900 to-slate-950",  // Deep Ocean Mesh
  "from-purple-400 via-violet-500 to-fuchsia-400", // Lavender Agent Mesh
  "from-blue-600 via-indigo-700 to-slate-900",  // Royal Tech Mesh
  "from-emerald-600 via-teal-700 to-lime-400", // Bio-Organic Mesh
  "from-amber-500 via-orange-600 to-red-600", // Agri-food Mesh
];

export function CourseCard({
  id,
  title,
  slug,
  shortDesc,
  thumbnail,
  price,
  discountedPrice,
  level,
  lessonsCount = 12,
  category = "उद्यम कौशल",
}: CourseCardProps) {
  const isFree = price === 0 || discountedPrice === 0;

  // Pick deterministic gradient preset based on course id / slug
  const charCodeSum = (slug || id || "").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradientClass = gradientPresets[charCodeSum % gradientPresets.length];

  return (
    <div className="group flex flex-col justify-between rounded-3xl bg-white border border-slate-200/80 hover:border-slate-300 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08)] transition-all duration-300 p-4 sm:p-5">
      <div className="space-y-4">
        {/* Ideogram Style Top Rounded Banner */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden shadow-inner bg-slate-900 flex items-center justify-center p-6 sm:p-8 text-center">
          {/* Rich textured gradient layer */}
          <div className={`absolute inset-0 bg-gradient-to-tr ${gradientClass} opacity-95 group-hover:scale-105 transition-transform duration-700 ease-out`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.25),transparent_65%)] pointer-events-none" />
          
          {/* Background image overlay if available */}
          {thumbnail && (
            <img
              src={thumbnail}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:opacity-40 transition-opacity"
            />
          )}

          {/* Centered Large White Title (Ideogram Exact Spec) */}
          <h4 className="relative z-10 text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md leading-snug max-w-[90%] font-headline">
            {title}
          </h4>

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center gap-1">
              <Sparkles className="h-3 w-3" />
              {category}
            </span>
          </div>

          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-black/40 backdrop-blur-md text-white border border-white/10">
              {level}
            </span>
          </div>

          {/* Bottom Metas */}
          <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between text-xs font-semibold text-white/95">
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
              <BookOpen className="h-3.5 w-3.5 text-blue-300" />
              {lessonsCount} लेक्चर्स
            </span>
            <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md">
              <Clock className="h-3.5 w-3.5 text-amber-300" />
              स्वयं की गति
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-1 space-y-3">
          {/* Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1 text-slate-800 font-semibold">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>4.9</span>
              <span className="text-slate-400 text-[11px]">(350+ समीक्षाएं)</span>
            </div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0056d2]">
              हिंदी माध्यम
            </span>
          </div>

          {/* Headline */}
          <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 group-hover:text-[#0056d2] transition-colors line-clamp-2 leading-snug font-headline">
            {title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 font-body">
            {shortDesc || "व्यावहारिक प्रोजेक्ट रिपोर्ट, सरकारी सब्सिडी एवं तकनीकी कौशल पर आधारित सम्पूर्ण प्रशिक्षण।"}
          </p>

          {/* Key Included Features */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-medium text-slate-600 pt-1">
            <span className="flex items-center gap-1 text-emerald-700 font-semibold">
              <FileSpreadsheet className="h-3.5 w-3.5" /> DPR टेम्पलेट
            </span>
            <span className="flex items-center gap-1 text-[#0056d2] font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" /> QR सर्टिफिकेट
            </span>
          </div>
        </div>
      </div>

      {/* Dual Pill Action Buttons (Ideogram Exact Spec) */}
      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2 px-1">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            शुल्क
          </span>
          {isFree ? (
            <span className="text-sm font-black text-emerald-600">निःशुल्क</span>
          ) : (
            <span className="text-sm font-black text-slate-900">
              {formatCurrency(discountedPrice || price)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Link href={`/courses/${slug}`}>
            <button className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition">
              विवरण
            </button>
          </Link>

          <Link href={`/courses/${slug}`}>
            <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-950 hover:bg-black text-white flex items-center gap-1 shadow-sm transition">
              <span>शुरू करें</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
