"use client";

import React, { useState, useEffect, useCallback } from "react";
import { InputGroup, InputGroupAddon } from "@/components/ui/input-group";
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
    <InputGroup className={cn("max-w-md h-9", className)}>
      <InputGroupAddon>
        <Search className="size-4 text-slate-400" />
      </InputGroupAddon>

      <input
        type="text"
        placeholder={placeholder}
        value={internalValue}
        onChange={(e) => setInternalValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 min-w-0 bg-transparent py-1 text-xs text-slate-900 placeholder:text-slate-400 outline-none border-0 focus:ring-0"
      />

      <div className="flex items-center gap-1.5 pr-2.5 shrink-0">
        {showLoading && (
          <Loader2 className="size-3.5 text-[#0056d2] animate-spin" />
        )}
        {internalValue && (
          <button
            type="button"
            onClick={handleClear}
            className="p-0.5 rounded-md hover:bg-slate-200/80 text-slate-400 hover:text-slate-700 transition cursor-pointer"
            title="Clear search (Esc)"
          >
            <X className="size-3.5" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>
    </InputGroup>
  );
}
