"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "about", label: "विवरण (About)" },
  { id: "outcomes", label: "क्या सीखेंगे (Outcomes)" },
  { id: "curriculum", label: "पाठ्यक्रम (Courses)" },
  { id: "instructor", label: "मेंटर व संस्था (Instructor)" },
  { id: "reviews", label: "समीक्षाएं (Reviews)" },
];

export function CourseDetailTabs() {
  const [activeTab, setActiveTab] = useState("about");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-6 sm:space-x-8 overflow-x-auto py-3 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={cn(
                  "text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer pb-1 relative",
                  isActive
                    ? "text-[#0056d2] font-black"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0056d2] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
