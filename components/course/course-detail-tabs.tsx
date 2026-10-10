"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "about", label: "विवरण (About)" },
  { id: "outcomes", label: "क्या सीखेंगे (Outcomes)" },
  { id: "curriculum", label: "पाठ्यक्रम (Curriculum)" },
  { id: "skills", label: "कौशल (Skills & Tools)" },
  { id: "resources", label: "सामग्री (Resources)" },
  { id: "instructor", label: "संस्था (Instructor)" },
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
    <div className="bg-white border-b border-[#E5E7EB] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <nav className="flex space-x-6 sm:space-x-8 overflow-x-auto scrollbar-none">
              {tabs.map(
                (tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => scrollToSection(tab.id)}
                    className={cn(
                      "text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer py-3.5 border-b-2 -mb-px",
                      isActive
                        ? "border-[#1261D6] text-[#1261D6] font-semibold"
                        : "border-transparent text-[#667085] hover:text-[#111827]"
                    )}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
