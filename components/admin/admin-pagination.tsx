"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface AdminPaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  className?: string;
}

export function AdminPagination({
  meta,
  onPageChange,
  onLimitChange,
  className,
}: AdminPaginationProps) {
  const { page, limit, total, totalPages } = meta;

  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white border-t border-slate-100 text-xs select-none">
      <div className="flex items-center gap-3 text-slate-500 font-medium">
        <span>
          Showing <strong className="text-slate-900 font-bold">{startItem}</strong> to{" "}
          <strong className="text-slate-900 font-bold">{endItem}</strong> of{" "}
          <strong className="text-slate-900 font-bold">{total}</strong> entries
        </span>

        {onLimitChange && (
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-[11px] text-slate-400 font-semibold">Rows:</span>
            <Select
              value={limit.toString()}
              onValueChange={(val) => onLimitChange(parseInt(val, 10))}
            >
              <SelectTrigger className="h-7 w-16 text-xs rounded-md border-slate-200 bg-slate-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent side="top">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChange(1)}
          disabled={page <= 1}
          className="size-7 rounded-md cursor-pointer disabled:opacity-40"
          title="First Page"
        >
          <ChevronsLeft className="size-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="size-7 rounded-md cursor-pointer disabled:opacity-40"
          title="Previous Page"
        >
          <ChevronLeft className="size-3.5" />
        </Button>

        <span className="px-2.5 py-1 text-slate-700 font-bold font-numeric text-xs">
          Page {page} of {Math.max(1, totalPages)}
        </span>

        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages || totalPages === 0}
          className="size-7 rounded-md cursor-pointer disabled:opacity-40"
          title="Next Page"
        >
          <ChevronRight className="size-3.5" />
        </Button>
        <Button
          variant="outline"
          size="icon-xs"
          onClick={() => onPageChange(totalPages)}
          disabled={page >= totalPages || totalPages === 0}
          className="size-7 rounded-md cursor-pointer disabled:opacity-40"
          title="Last Page"
        >
          <ChevronsRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}
