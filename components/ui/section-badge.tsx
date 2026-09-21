import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SectionBadgeProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
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
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-semibold shadow-xs border-none select-none transition-all",
        variant === "primary"
          ? "bg-white text-black/80 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          : "bg-primary text-white shadow-xs",
        className
      )}
    >
      {Icon && (
        <Icon
          className={cn(
            "h-3.5 w-3.5 shrink-0",
            variant === "primary" ? "text-black/80" : "text-white"
          )}
        />
      )}
      <span>{children}</span>
    </div>
  );
}
