"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Base Skeleton shimmer element
 */
export function Skeleton({ className = "", ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-black/[0.06] dark:bg-white/[0.08] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-black/[0.05] dark:before:via-white/[0.1] before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

/**
 * Product Card Skeleton
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden p-0 flex flex-col shadow-xs">
      <Skeleton className="h-44 w-full rounded-none" />
      <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
        <div className="space-y-2.5">
          <Skeleton className="h-3 w-20 rounded-full" />
          <Skeleton className="h-5 w-4/5 rounded-lg" />
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-3/4 rounded-md" />
        </div>
        <div className="pt-4 border-t border-[var(--border)] mt-4">
          <Skeleton className="h-9 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

/**
 * Portfolio Case Study Card Skeleton
 */
export function PortfolioCardSkeleton() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden flex flex-col shadow-xs">
      <Skeleton className="h-48 sm:h-52 w-full rounded-none" />
      <div className="p-6 sm:p-7 flex flex-col gap-4 flex-1">
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded-lg" />
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-2/3 rounded-md" />
        </div>
        <div className="flex flex-col gap-2 pt-4 border-t border-[var(--border)] mt-auto">
          <Skeleton className="h-3.5 w-full rounded-md" />
          <Skeleton className="h-3.5 w-5/6 rounded-md" />
          <Skeleton className="h-3.5 w-4/5 rounded-md" />
        </div>
      </div>
    </div>
  );
}

/**
 * Service Group Skeleton
 */
export function ServiceCardSkeleton() {
  return (
    <div className="bg-white border border-[var(--border)] rounded-3xl p-8 sm:p-10 flex flex-col gap-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-32 rounded-lg" />
            <Skeleton className="h-3.5 w-48 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border)]">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-2xl bg-[var(--secondary)]/60 space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-4/5 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Admin Table Row Skeleton
 */
export function TableRowSkeleton({ cols = 6 }) {
  return (
    <tr className="border-b border-white/5 animate-pulse">
      {Array.from({ length: cols }).map((_, idx) => (
        <td key={idx} className="p-4">
          <Skeleton className="h-4 w-4/5 bg-white/10" />
        </td>
      ))}
    </tr>
  );
}

