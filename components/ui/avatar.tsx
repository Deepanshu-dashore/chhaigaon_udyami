"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// ==========================================
// AVATAR ROOT
// ==========================================

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center rounded-full select-none",
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

// ==========================================
// AVATAR IMAGE
// ==========================================

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  onLoadingStatusChange?: (status: "loading" | "loaded" | "error") => void;
}

export const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt = "Avatar", onError, ...props }, ref) => {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
      return null;
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src={src}
        alt={alt}
        onError={(e) => {
          setHasError(true);
          onError?.(e);
        }}
        className={cn(
          "aspect-square h-full w-full rounded-full object-cover",
          className
        )}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

// ==========================================
// AVATAR FALLBACK
// ==========================================

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLDivElement> {
  delayMs?: number;
}

export const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  AvatarFallbackProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-slate-100 font-semibold text-slate-700 uppercase tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AvatarFallback.displayName = "AvatarFallback";

// ==========================================
// AVATAR BADGE
// ==========================================

export interface AvatarBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  position?: "bottom-right" | "top-right" | "bottom-left" | "top-left";
}

export const AvatarBadge = React.forwardRef<HTMLSpanElement, AvatarBadgeProps>(
  ({ className, position = "bottom-right", ...props }, ref) => {
    const positionClasses = {
      "bottom-right": "bottom-0 right-0",
      "top-right": "top-0 right-0",
      "bottom-left": "bottom-0 left-0",
      "top-left": "top-0 left-0",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "absolute z-10 block h-3 w-3 rounded-full ring-2 ring-white dark:ring-slate-900 bg-emerald-500",
          positionClasses[position],
          className
        )}
        {...props}
      />
    );
  }
);
AvatarBadge.displayName = "AvatarBadge";

// ==========================================
// AVATAR GROUP
// ==========================================

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center -space-x-3 rtl:space-x-reverse hover:space-x-1 transition-all duration-200",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

// ==========================================
// AVATAR GROUP COUNT
// ==========================================

export interface AvatarGroupCountProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const AvatarGroupCount = React.forwardRef<
  HTMLDivElement,
  AvatarGroupCountProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
AvatarGroupCount.displayName = "AvatarGroupCount";
