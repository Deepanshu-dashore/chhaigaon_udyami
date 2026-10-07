"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SchemeData, SchemeFilterOptions } from "@/lib/data/default-schemes";

interface UseSchemesApiOptions {
  initialSchemes: SchemeData[];
  initialFilterOptions?: SchemeFilterOptions;
  initialTotal?: number;
  initialTotalPages?: number;
}

export function useSchemesApi({
  initialSchemes,
  initialFilterOptions,
  initialTotal,
  initialTotalPages,
}: UseSchemesApiOptions) {
  const [schemes, setSchemes] = useState<SchemeData[]>(initialSchemes);
  const [filterOptions, setFilterOptions] = useState<SchemeFilterOptions>(
    initialFilterOptions || { categories: [], departments: [] }
  );
  const [total, setTotal] = useState<number>(initialTotal ?? initialSchemes.length);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(6);
  const [totalPages, setTotalPages] = useState<number>(
    initialTotalPages ?? Math.max(1, Math.ceil((initialTotal ?? initialSchemes.length) / 6))
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Active filters
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("default");

  const abortControllerRef = useRef<AbortController | null>(null);
  const isFirstRender = useRef(true);

  // Debounce search query by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // When filters or search changes, reset to page 1
  useEffect(() => {
    setPage(1);
  }, [debouncedQuery, selectedCategory, selectedDepartment, sortBy]);

  // Fetch schemes from /api/schemes with AbortController
  const fetchSchemes = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (debouncedQuery.trim()) {
        params.set("search", debouncedQuery.trim());
      }
      if (selectedCategory && selectedCategory !== "all") {
        params.set("category", selectedCategory);
      }
      if (selectedDepartment && selectedDepartment !== "all") {
        params.set("department", selectedDepartment);
      }
      if (sortBy && sortBy !== "default") {
        params.set("sort", sortBy);
      }
      params.set("page", String(page));
      params.set("limit", String(limit));

      const queryString = params.toString();
      const url = `/api/schemes${queryString ? `?${queryString}` : ""}`;

      const res = await fetch(url, {
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        setSchemes(data.data || []);
        setTotal(data.total ?? (data.data ? data.data.length : 0));
        setTotalPages(data.totalPages ?? 1);
        if (data.filterOptions) {
          setFilterOptions(data.filterOptions);
        }
      } else {
        throw new Error(data.error || "Failed to fetch schemes data");
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        return;
      }
      console.error("useSchemesApi error:", err);
      setError("योजनाओं की जानकारी लोड करने में समस्या हुई। कृपया पुनः प्रयास करें।");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedQuery, selectedCategory, selectedDepartment, sortBy, page, limit]);

  // Trigger fetch on changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchSchemes();
      return;
    }

    fetchSchemes();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchSchemes]);

  const resetFilters = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSelectedCategory("all");
    setSelectedDepartment("all");
    setSortBy("default");
    setPage(1);
  }, []);

  return {
    schemes,
    filterOptions,
    total,
    page,
    setPage,
    limit,
    totalPages,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDepartment,
    setSelectedDepartment,
    sortBy,
    setSortBy,
    resetFilters,
    refetch: fetchSchemes,
  };
}
