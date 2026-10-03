import * as React from "react";
import { cn } from "@/lib/utils";

export function InputGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative flex items-center w-full min-w-0 rounded-lg border border-slate-200 bg-slate-50/90 shadow-2xs transition-all focus-within:bg-white focus-within:border-[#0056d2] focus-within:ring-1 focus-within:ring-[#0056d2]/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function InputGroupAddon({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-center px-3 text-slate-400 select-none pointer-events-none shrink-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
