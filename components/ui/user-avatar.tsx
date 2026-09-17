"use client";

import React, { useState } from "react";
import Image from "next/image";
import { User as UserIcon } from "lucide-react";

interface UserAvatarProps {
  src?: string | null;
  alt?: string;
  name?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-16 w-16 text-lg",
  xl: "h-20 w-20 text-xl",
};

const pixelSizes = {
  sm: 32,
  md: 40,
  lg: 64,
  xl: 80,
};

export default function UserAvatar({
  src,
  alt = "User Avatar",
  name,
  size = "md",
  className = "",
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const initial = name?.trim() ? name.trim().charAt(0).toUpperCase() : null;

  if (src && !imageError) {
    return (
      <div
        className={`relative rounded-full overflow-hidden shrink-0 border border-slate-200 bg-slate-100 ${sizeClasses[size]} ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          width={pixelSizes[size]}
          height={pixelSizes[size]}
          className="object-cover w-full h-full"
          onError={() => setImageError(true)}
          unoptimized
        />
      </div>
    );
  }

  // Fallback with initials or User Icon
  return (
    <div
      className={`rounded-full shrink-0 flex items-center justify-center font-bold bg-linear-to-tr from-[#0056d2] to-blue-500 text-white shadow-xs border border-blue-200 ${sizeClasses[size]} ${className}`}
    >
      {initial ? (
        <span>{initial}</span>
      ) : (
        <UserIcon className="w-1/2 h-1/2 text-white" />
      )}
    </div>
  );
}
