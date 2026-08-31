import React from "react";
import Container from "@/components/ui/Container";
import { Skeleton, PortfolioCardSkeleton } from "@/components/ui/Skeleton";

export default function PortfolioLoading() {
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

        {/* Filter Pills Skeleton */}
        <div className="flex items-center gap-2 mb-8 overflow-hidden pb-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-xl shrink-0" />
          ))}
        </div>

        {/* Sub-filters Pill Skeleton */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-8 w-32 rounded-full" />
          ))}
        </div>

        {/* 6-Card Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PortfolioCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
}

