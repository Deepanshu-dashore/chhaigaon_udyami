import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glass" | "dark";
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
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold shadow-2xs font-label select-none transition-all",
        variant === "primary" && "bg-blue-50 text-[#0056d2] border border-blue-200 shadow-2xs",
        variant === "secondary" && "bg-[#0056d2] text-white shadow-xs",
        variant === "outline" && "bg-white text-slate-700 border border-slate-200 shadow-2xs",
        variant === "glass" && "bg-white/10 text-blue-100 border border-white/20 backdrop-blur-xs",
        variant === "dark" && "bg-slate-900 text-white border border-slate-800",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-3.5 w-3.5 shrink-0",
            variant === "primary" && "text-[#0056d2]",
            variant === "secondary" && "text-white",
            variant === "outline" && "text-blue-600",
            variant === "glass" && "text-amber-300",
            variant === "dark" && "text-amber-400"
          )}
        />
      )}
      <span>{children}</span>
    </div>
  );
}
