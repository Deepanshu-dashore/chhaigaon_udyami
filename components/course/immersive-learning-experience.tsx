"use client";

import React from "react";
import { GraduationCap, Clock, Users, ShieldCheck } from "lucide-react";

export function ImmersiveLearningExperience() {
  const features = [
    {
      icon: GraduationCap,
      title: "Learn from Industry Experts",
      description: "Learn directly from DIC Khandwa, ICAR & NABARD certified trainers equipped with real field experience.",
    },
    {
      icon: Clock,
      title: "Flexi Learn",
      description: "Access 24x7 recordings to maintain your learning progress and keep up with your cohort.",
    },
    {
      icon: Users,
      title: "Mentoring Sessions",
      description: "1-on-1 expert guidance sessions for bank loan DPR filing, PMEGP application & doubt resolution.",
    },
    {
      icon: ShieldCheck,
      title: "Learning & Loan Support",
      description: "Get dedicated support for all your government subsidy queries and help at every step.",
    },
  ];

  return (
    <div className="space-y-4 font-sans">
      <h3 className="text-lg font-bold text-[#111827]">
        An Immersive Learning Experience
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-lg border border-[#E5E7EB] p-4 flex flex-col space-y-2.5"
            >
              <div className="size-9 rounded-md bg-[#F8FAFC] border border-[#E5E7EB] text-[#1261D6] flex items-center justify-center shrink-0">
                <Icon className="size-5" />
              </div>

              <div className="space-y-1">
                <h4 className="font-semibold text-xs sm:text-sm text-[#111827]">
                  {feat.title}
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
