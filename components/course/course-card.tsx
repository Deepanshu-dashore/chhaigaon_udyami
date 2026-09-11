import React from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  Award,
  ArrowRight,
  Star,
  CheckCircle2,
  Sparkles,
  FileSpreadsheet,
  BadgePercent,
  Infinity as InfinityIcon,
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
}

export function CourseCard({
  title,
  slug,
  shortDesc,
  thumbnail,
  price,
  discountedPrice,
  level,
  lessonsCount = 12,
}: CourseCardProps) {
  const discountPercent =
    price > 0 && discountedPrice !== null && discountedPrice !== undefined && discountedPrice < price
      ? Math.round(((price - discountedPrice) / price) * 100)
      : null;

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-surface-container-lowest border border-outline-variant/70 hover:border-primary/60 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div>
        {/* Course Thumbnail Container */}
        <div className="relative aspect-[16/10] w-full bg-surface-container-low overflow-hidden">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-on-surface-variant bg-gradient-to-br from-primary-fixed/30 to-secondary-fixed/30">
              <span className="font-semibold text-primary font-headline text-lg">
                छैगांव उद्यमी
              </span>
            </div>
          )}

          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-black/10" />

          {/* Top Left Badge: Level */}
          <div className="absolute top-3.5 left-3.5">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-surface/90 backdrop-blur-md text-primary border border-outline-variant/40 shadow-sm font-label flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-tertiary fill-tertiary" />
              {level}
            </span>
          </div>

          {/* Top Right Badge: Certified */}
          <div className="absolute top-3.5 right-3.5">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-primary-fixed text-on-primary-fixed font-label shadow-sm flex items-center gap-1">
              <Award className="h-3.5 w-3.5 text-primary" />
              सर्टिफाइड
            </span>
          </div>

          {/* Bottom Duration Badge inside Image */}
          <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-[11px] font-medium font-label">
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/10">
              <BookOpen className="h-3.5 w-3.5 text-primary-fixed" />
              <span className="font-num font-semibold">{lessonsCount}</span> लेक्चर्स
            </span>
            <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 border border-white/10">
              <Clock className="h-3.5 w-3.5 text-amber-400" />
              स्वयं की गति (Self-paced)
            </span>
          </div>
        </div>

        {/* Course Body Content */}
        <div className="p-6 space-y-3.5">
          {/* Rating Row */}
          <div className="flex items-center justify-between text-xs text-on-surface-variant font-label">
            <div className="flex items-center gap-1.5 text-tertiary font-semibold">
              <Star className="h-3.5 w-3.5 fill-tertiary text-tertiary" />
              <span className="font-num text-sm text-on-surface font-bold">4.9</span>
              <span className="text-on-surface-variant font-normal font-num">(380+ शिक्षार्थी)</span>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label">
              हिंदी माध्यम
            </span>
          </div>

          {/* Course Title - Semibold Heading */}
          <h3 className="font-semibold text-lg sm:text-xl text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug font-headline">
            {title}
          </h3>

          {/* Short Description */}
          <p className="text-on-surface-variant text-xs sm:text-sm line-clamp-2 leading-relaxed font-body hindi-text">
            {shortDesc || "ग्रामीण उद्यमियों के लिए व्यावहारिक प्रोजेक्ट रिपोर्ट, सब्सिडी एवं तकनीक आधारित सम्पूर्ण प्रशिक्षण।"}
          </p>

          {/* Key Value Checklist with Proper Icons */}
          <div className="pt-2.5 border-t border-outline-variant/30 flex flex-wrap items-center gap-y-1.5 gap-x-3 text-[11px] font-medium text-on-surface-variant font-label">
            <span className="flex items-center gap-1.5 text-primary">
              <FileSpreadsheet className="h-3.5 w-3.5" /> प्रोजेक्ट रिपोर्ट
            </span>
            <span className="flex items-center gap-1.5 text-secondary">
              <BadgePercent className="h-3.5 w-3.5" /> सब्सिडी लोन गाइड
            </span>
            <span className="flex items-center gap-1.5 text-tertiary">
              <InfinityIcon className="h-3.5 w-3.5" /> लाइफटाइम एक्सेस
            </span>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & CTA */}
      <div className="p-6 pt-4 border-t border-outline-variant/40 bg-surface-container-low/40 flex items-center justify-between gap-3">
        {/* Price Section */}
        <div>
          <span className="text-[10px] uppercase tracking-wider text-on-surface-variant block font-semibold font-label">
            कोर्स शुल्क
          </span>
          {discountedPrice !== null && discountedPrice !== undefined && discountedPrice !== price ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-bold text-primary font-num tracking-tight">
                {discountedPrice === 0 ? "निःशुल्क (Free)" : formatCurrency(discountedPrice)}
              </span>
              <span className="text-xs text-outline line-through font-num">
                {formatCurrency(price)}
              </span>
              {discountPercent && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-num">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          ) : (
            <span className="text-xl sm:text-2xl font-bold text-on-surface font-num tracking-tight">
              {price === 0 ? "निःशुल्क (Free)" : formatCurrency(price)}
            </span>
          )}
        </div>

        {/* Enroll Button */}
        <Link href={`/courses/${slug}`}>
          <Button
            size="md"
            className="px-5 py-2.5 h-11 text-sm font-semibold rounded-lg bg-primary hover:bg-primary-container hover:text-on-primary-container text-on-primary shadow-md shadow-primary/20 group-hover:shadow-lg transition-all cursor-pointer font-label flex items-center gap-2"
          >
            <span>कोर्स देखें</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </div>
  );
}


