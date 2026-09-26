import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glass" | "dark" | "emerald" | "amber";
  className?: string;
}

export function SectionBadge({
  icon: Icon,
  children,
  variant = "primary",
  className,
}: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold shadow-2xs font-label select-none transition-all",
        variant === "primary" && "bg-blue-50 text-[#0056d2] border border-blue-200 shadow-2xs",
        variant === "secondary" && "bg-[#0056d2] text-white shadow-xs",
        variant === "outline" && "bg-white text-slate-950 border border-slate-300 shadow-2xs",
        variant === "glass" && "bg-white text-slate-950 border border-slate-300 shadow-2xs",
        variant === "dark" && "bg-slate-900 text-white border border-slate-800",
        variant === "emerald" && "bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs",
        variant === "amber" && "bg-amber-50 text-amber-900 border border-amber-200 shadow-2xs",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-3.5 w-3.5 shrink-0",
            variant === "primary" && "text-[#0056d2]",
            variant === "secondary" && "text-white",
            variant === "outline" && "text-[#0056d2]",
            variant === "glass" && "text-[#0056d2]",
            variant === "dark" && "text-amber-400",
            variant === "emerald" && "text-emerald-600",
            variant === "amber" && "text-amber-600"
          )}
        />
      )}
      <span>{children}</span>
    </div>
  );
}
