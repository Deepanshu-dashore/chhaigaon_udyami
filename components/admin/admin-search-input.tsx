"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
  className?: string;
}

export function AdminSearchInput({
  value,
  onChange,
  placeholder = "Search by Name, Email, or ID...",
  debounceMs = 350,
  isLoading = false,
  className,
}: AdminSearchInputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  // Sync internal state when external value changes
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Debounce effect
  useEffect(() => {
    if (internalValue === value) {
      setIsDebouncing(false);
      return;
    }

    setIsDebouncing(true);
    const timer = setTimeout(() => {
      onChange(internalValue);
      setIsDebouncing(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [internalValue, value, onChange, debounceMs]);

  const handleClear = useCallback(() => {
    setInternalValue("");
    onChange("");
  }, [onChange]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    } else if (e.key === "Enter") {
      onChange(internalValue);
      setIsDebouncing(false);
    }
  };

  const showLoading = isDebouncing || isLoading;

  return (
    <div className={cn("relative flex items-center max-w-md w-full", className)}>
      <Search className="absolute left-3 size-4 text-slate-400 pointer-events-none z-10" />

      <Input
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="h-9 pl-9 pr-9 text-xs bg-slate-50/90 rounded-lg border-slate-200 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-1 focus-visible:ring-[#0056d2]/20"
      />

      <div className="absolute right-2 flex items-center gap-1 z-10">
        {showLoading && (
          <Loader2 className="size-3.5 text-[#0056d2] animate-spin" />
        )}
        {internalValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            onClick={handleClear}
            className="size-5 rounded-md hover:bg-slate-200/80 text-slate-400 hover:text-slate-700 transition cursor-pointer"
            title="Clear search (Esc)"
          >
            <X className="size-3.5" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  );
}
