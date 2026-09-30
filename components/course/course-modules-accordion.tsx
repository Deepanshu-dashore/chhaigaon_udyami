"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileText,
  HelpCircle,
  CheckCircle,
  Lock,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LessonItem {
  id: string;
  title: string;
  duration?: string;
  type?: "video" | "reading" | "quiz";
  isPreview?: boolean;
}

interface ModuleItem {
  id: string;
  order: number;
  title: string;
  description?: string;
  duration?: string;
  lessons: LessonItem[];
}

interface CourseModulesAccordionProps {
  modules: ModuleItem[];
}

export function CourseModulesAccordion({ modules }: CourseModulesAccordionProps) {
  const [openModuleId, setOpenModuleId] = useState<string | null>(
    modules[0]?.id || null
  );

  const toggleModule = (id: string) => {
    setOpenModuleId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3 font-sans">
      {modules.map((mod, index) => {
        const isOpen = openModuleId === mod.id;
        return (
          <div
            key={mod.id}
            className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-2xs transition-all duration-200"
          >
            {/* Module Accordion Header */}
            <button
              onClick={() => toggleModule(mod.id)}
              className="w-[#100%] text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3.5 flex-1">
                <div className="size-8 rounded-xl bg-blue-50 text-[#0056d2] font-black text-xs flex items-center justify-center shrink-0 border border-blue-100">
                  {index + 1}
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 font-headline leading-snug">
                    {mod.title}
                  </h4>
                  {mod.description && (
                    <p className="text-xs text-slate-500 font-body line-clamp-1">
                      {mod.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden sm:block">
                  <span className="text-xs font-semibold text-slate-600 block">
                    {mod.lessons.length} अध्याय
                  </span>
                  {mod.duration && (
                    <span className="text-[11px] text-slate-400 font-medium">
                      {mod.duration}
                    </span>
                  )}
                </div>

                <div className="size-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </div>
            </button>

            {/* Module Accordion Expanded Content */}
            {isOpen && (
              <div className="border-t border-slate-100 bg-slate-50/50 p-4 sm:p-5 divide-y divide-slate-200/60">
                {mod.lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id || idx}
                    className="py-3 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2.5 flex-1">
                      {lesson.type === "quiz" ? (
                        <HelpCircle className="h-4 w-4 text-purple-600 shrink-0" />
                      ) : lesson.type === "reading" ? (
                        <FileText className="h-4 w-4 text-amber-600 shrink-0" />
                      ) : (
                        <PlayCircle className="h-4 w-4 text-[#0056d2] shrink-0" />
                      )}

                      <span className="font-medium text-slate-800 leading-normal">
                        {lesson.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {lesson.duration && (
                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {lesson.duration}
                        </span>
                      )}

                      {lesson.isPreview ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] font-bold">
                          मुफ्त पूर्वावलोकन (Preview)
                        </Badge>
                      ) : (
                        <Lock className="h-3.5 w-3.5 text-slate-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
