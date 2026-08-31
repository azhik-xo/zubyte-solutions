import React from "react";
import Container from "@/components/ui/Container";
import { Skeleton, ProductCardSkeleton } from "@/components/ui/Skeleton";

export default function ProductsLoading() {
  return (
    <div className="bg-[var(--background)] pt-36 pb-20 min-h-screen">
      <Container size="lg">
        {/* Header Skeleton */}
        <div className="max-w-2xl mb-12">
          <Skeleton className="h-4 w-28 rounded-full mb-4" />
          <Skeleton className="h-10 sm:h-14 w-4/5 rounded-2xl mb-4" />
          <Skeleton className="h-4 w-full rounded-md mb-2" />
          <Skeleton className="h-4 w-3/4 rounded-md" />
        </div>

        {/* 20/80 Products Skeleton */}
        <div className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row min-h-[600px]">
          {/* Left Sidebar Skeleton */}
          <div className="lg:w-[24%] xl:w-[20%] border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[#faf9f5]/50 p-6 flex flex-col gap-2">
            <Skeleton className="h-3 w-28 rounded-full mb-4" />
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-11 w-full rounded-xl" />
            ))}
          </div>

          {/* Right Product Grid Skeleton */}
          <div className="lg:w-[76%] xl:w-[80%] p-6 sm:p-10 flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
              <div className="space-y-2">
                <Skeleton className="h-3 w-24 rounded-full" />
                <Skeleton className="h-7 w-36 rounded-lg" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

