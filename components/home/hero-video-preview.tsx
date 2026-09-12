"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, Shield, BookOpen, Star, Sparkles, X } from "lucide-react";

export function HeroVideoPreview() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative">
      {/* Video Player Card */}
      <div className="rounded-2xl bg-white text-slate-900 border border-white/20 p-5 shadow-2xl relative">
        
        {/* Video Screen Preview */}
        <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-950 shadow-md">
          {isPlaying ? (
            <div className="relative w-full h-full">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&mute=0"
                title="Chhaigaon Udyami Course Demo"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setIsPlaying(false)}
                className="absolute top-2 right-2 h-7 w-7 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer z-10"
                aria-label="Close video"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <img
                src="/images/dairy-course.jpg"
                alt="उद्यमिता वीडियो पूर्वावलोकन"
                className="w-full h-full object-cover opacity-90 hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

              {/* Top Status Badges */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-600 text-white shadow">
                  <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                  लाइव वीडियो पूर्वावलोकन
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-slate-200">
                  <Shield className="h-3 w-3 text-emerald-400" /> DRM Protected
                </span>
              </div>

              {/* Glowing Center Play Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center group/play cursor-pointer"
                aria-label="Play demo video"
              >
                <div className="relative flex items-center justify-center">
                  <div className="absolute h-18 w-18 rounded-full bg-white/30 animate-ping" />
                  <div className="h-14 w-14 rounded-full bg-[#0056d2] text-white flex items-center justify-center shadow-2xl group-hover/play:scale-110 transition-transform">
                    <Play className="h-6 w-6 fill-current ml-0.5" />
                  </div>
                </div>
              </button>

              {/* Bottom Video Metas */}
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px]">
                <span className="bg-black/60 px-2.5 py-0.5 rounded flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-blue-300" />
                  16 लेक्चर्स • 4.5 घंटे
                </span>
                <span className="bg-black/60 px-2.5 py-0.5 rounded text-amber-300 font-bold flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-current" />
                  4.9 रेटिंग (380+ शिक्षार्थी)
                </span>
              </div>
            </>
          )}
        </div>

        {/* Card Summary Bottom */}
        <div className="pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#0056d2] flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              आधुनिक डेयरी एवं मिल्क प्रोसेसिंग
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              सर्टिफाइड कोर्स
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed font-body">
            10 से 50 दुधारू पशुओं की इकाई, FSSAI लाइसेंसिंग एवं ₹10 लाख मुद्रा लोन की संपूर्ण प्रक्रिया।
          </p>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-blue-50 text-[#0056d2] font-bold text-xs flex items-center justify-center border border-blue-200">
                CU
              </div>
              <span className="text-[11px] text-slate-600 font-medium">जिला उद्योग केंद्र प्रमाणित</span>
            </div>

            <Link href="/courses/modern-dairy-farming">
              <span className="text-xs font-bold text-[#0056d2] hover:underline flex items-center">
                पूरा सिलेबस देखें →
              </span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
