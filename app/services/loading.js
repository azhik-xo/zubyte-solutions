import React from "react";
import Container from "@/components/ui/Container";
import { Skeleton, ServiceCardSkeleton } from "@/components/ui/Skeleton";

export default function ServicesLoading() {
  return (
    <div className="bg-[var(--background)] pt-36 pb-20 min-h-screen">
      <Container size="default">
        {/* Header Skeleton */}
        <div className="max-w-2xl mb-12">
          <Skeleton className="h-4 w-28 rounded-full mb-4" />
          <Skeleton className="h-10 sm:h-14 w-4/5 rounded-2xl mb-4" />
          <Skeleton className="h-4 w-full rounded-md mb-2" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>

        {/* 20/80 Layout Skeleton */}
        <div className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Sidebar Skeleton */}
          <div className="lg:w-[28%] xl:w-[24%] border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[#faf9f5]/50 p-6 flex flex-col gap-3">
            <Skeleton className="h-3 w-28 rounded-full mb-3" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-16 w-full rounded-2xl" />
            ))}
          </div>

          {/* Right Main Content Skeleton */}
          <div className="lg:w-[72%] xl:w-[76%] p-6 sm:p-10 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-6 border-b border-[var(--border)]">
              <div className="space-y-2">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-8 w-48 rounded-xl" />
              </div>
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-6 rounded-2xl border border-[var(--border)] bg-white space-y-3">
                  <Skeleton className="h-5 w-40 rounded-lg" />
                  <Skeleton className="h-3.5 w-full rounded-md" />
                  <Skeleton className="h-3.5 w-4/5 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

