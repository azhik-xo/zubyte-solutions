import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminLoading() {
  return (
    <div className="flex flex-col gap-6 p-2 min-h-screen">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56 rounded-xl bg-white/10" />
          <Skeleton className="h-4 w-80 rounded-md bg-white/5" />
        </div>
        <Skeleton className="h-10 w-32 rounded-2xl bg-white/10" />
      </div>

      {/* 4 Stat Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-3">
            <Skeleton className="h-4 w-28 rounded-md bg-white/10" />
            <Skeleton className="h-8 w-20 rounded-xl bg-white/15" />
            <Skeleton className="h-3 w-36 rounded-md bg-white/5" />
          </div>
        ))}
      </div>

      {/* Main Table Skeleton */}
      <div className="p-6 rounded-3xl bg-[#141414] border border-white/10 space-y-4">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <Skeleton className="h-6 w-40 rounded-lg bg-white/10" />
          <Skeleton className="h-9 w-60 rounded-xl bg-white/5" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-white/5">
            <div className="space-y-1.5 flex-1">
              <Skeleton className="h-4 w-48 rounded-md bg-white/10" />
              <Skeleton className="h-3 w-64 rounded-md bg-white/5" />
            </div>
            <Skeleton className="h-8 w-24 rounded-xl bg-white/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

