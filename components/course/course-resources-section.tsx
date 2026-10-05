"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FileText, Download, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResourceItem {
  name: string;
  type: string;
  size: string;
  url: string;
}

interface CourseResourcesSectionProps {
  resources: ResourceItem[];
  isEnrolled?: boolean;
  initialEnrolled?: boolean;
}

export function CourseResourcesSection({
  resources,
  isEnrolled: externalIsEnrolled,
  initialEnrolled = false,
}: CourseResourcesSectionProps) {
  const isEnrolled = externalIsEnrolled ?? initialEnrolled;

  return (
    <section id="resources" className="space-y-4 scroll-mt-28 font-sans">
      
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-[#111827]">
          Downloadable Bank DPRs & Resources (डाउनलोड सामग्री)
        </h3>
        <p className="text-xs text-[#667085] mt-0.5">
          NABARD, DIC खंडवा व बैंक-मान्य ₹25 लाख टूलकिट
        </p>
      </div>

      {/* Lock Warning Banner when not enrolled */}
      {!isEnrolled && (
        <div className="p-4 rounded-lg bg-[#F0F5FF] border border-[#C6DCFF] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#0F3875]">
          <div className="flex items-start gap-2.5">
            <Lock className="size-4 text-[#1261D6] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-[#0F3875]">
                बैंक DPR प्रोजेक्ट रिपोर्ट व टूलकिट केवल नामांकित अभ्यर्थियों हेतु उपलब्ध हैं
              </p>
              <p className="text-[#335C9E] leading-relaxed">
                PMEGP ₹25 लाख बैंक-स्वीकृत DPR टूलकिट, एक्सेल कैलकुलेटर व सब्सिडी चेकलिस्ट डाउनलोड करने हेतु कोर्स में प्रवेश लें।
              </p>
            </div>
          </div>
          <Button asChild size="sm" className="bg-[#1261D6] hover:bg-blue-700 text-white font-bold text-xs h-9 px-4 rounded-md shrink-0 cursor-pointer shadow-2xs">
            <Link href="/apply">
              <span>अभी अनलॉक करें</span>
            </Link>
          </Button>
        </div>
      )}

      {/* Resource List Cards */}
      <div className="space-y-2.5">
        {resources.map((res: ResourceItem, idx: number) => (
          <div
            key={idx}
            className={`p-3.5 rounded-lg border transition-colors flex items-center justify-between gap-4 ${
              isEnrolled
                ? "border-[#E5E7EB] bg-white hover:border-blue-300"
                : "border-[#E5E7EB] bg-[#F8FAFC]"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <FileText className={`size-5 shrink-0 ${isEnrolled ? "text-[#1261D6]" : "text-blue-600"}`} />
              <div className="truncate">
                <p className="font-semibold text-xs text-[#111827] truncate">{res.name}</p>
                <p className="text-[11px] text-[#667085] flex items-center gap-1.5 pt-0.5">
                  <span>{res.type} • {res.size}</span>
                  {!isEnrolled && (
                    <span className="inline-flex items-center gap-1 text-[#1261D6] font-semibold">
                      <Lock className="size-3 text-[#1261D6]" />
                      Enrolled Members Only
                    </span>
                  )}
                </p>
              </div>
            </div>

            {isEnrolled ? (
              <Button size="sm" variant="outline" asChild className="h-8.5 px-3.5 text-xs font-bold text-[#111827] border-[#E5E7EB] hover:bg-slate-50 rounded-md shrink-0 cursor-pointer">
                <a href={res.url} download>
                  <Download className="size-3.5 mr-1 text-[#1261D6]" />
                  डाउनलोड (PDF/Excel)
                </a>
              </Button>
            ) : (
              <Button size="sm" variant="outline" asChild className="h-8.5 px-3.5 text-xs font-semibold text-[#1261D6] border-[#1261D6]/40 bg-white hover:bg-blue-50/80 hover:border-[#1261D6] rounded-md shrink-0 cursor-pointer shadow-2xs">
                <Link href="/apply">
                  <Lock className="size-3.5 mr-1 text-[#1261D6]" />
                  <span>अनलॉक करने हेतु एनरोल करें</span>
                </Link>
              </Button>
            )}
          </div>
        ))}
      </div>

    </section>
  );
}
