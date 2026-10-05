"use client";

import React from "react";
import { Check, Wrench } from "lucide-react";

interface SkillsToolsGridProps {
  skills: string[];
  tools: string[];
}

export function SkillsToolsGrid({ skills, tools }: SkillsToolsGridProps) {
  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Skills Covered Chips */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-[#111827]">
          Skills Covered ({skills.length}+ व्यावसायिक कौशल)
        </h3>

        <div className="flex flex-wrap gap-2">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] border border-[#E5E7EB] bg-white text-xs font-medium text-[#111827]"
            >
              <Check className="size-3.5 text-[#16845B] shrink-0" />
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Tools & Frameworks Covered Chips */}
      <div className="space-y-3 pt-4 border-t border-[#E5E7EB]">
        <h3 className="text-lg font-bold text-[#111827] flex items-center gap-2">
          <Wrench className="size-4 text-[#667085]" />
          <span>Tools & Applications Covered ({tools.length}+)</span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {tools.map((tool, idx) => (
            <span
              key={idx}
              className="inline-flex items-center px-3 py-1.5 rounded-[6px] border border-[#E5E7EB] bg-[#F8FAFC] text-xs font-medium text-[#111827]"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}
