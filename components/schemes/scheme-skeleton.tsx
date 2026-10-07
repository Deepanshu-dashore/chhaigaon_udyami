import React from "react";

export function SchemeCardSkeleton() {
  return (
    <div className="bg-white rounded-lg border border-slate-200 border-t-3 border-t-slate-300 p-4 sm:p-5 shadow-2xs animate-pulse flex flex-col justify-between h-[280px]">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="h-5 w-24 bg-slate-200 rounded" />
          <div className="h-3 w-16 bg-slate-200 rounded" />
        </div>
        <div className="h-5 w-4/5 bg-slate-200 rounded mb-2" />
        <div className="h-3 w-2/5 bg-slate-200 rounded mb-4" />
        <div className="space-y-1.5 mb-4">
          <div className="h-3 w-full bg-slate-100 rounded" />
          <div className="h-3 w-3/4 bg-slate-100 rounded" />
        </div>
        <div className="h-12 w-full bg-slate-100 rounded-md" />
      </div>
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="h-4 w-20 bg-slate-200 rounded" />
        <div className="h-7 w-20 bg-slate-200 rounded" />
      </div>
    </div>
  );
}

export function SchemeGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, idx) => (
        <SchemeCardSkeleton key={idx} />
      ))}
    </div>
  );
}
