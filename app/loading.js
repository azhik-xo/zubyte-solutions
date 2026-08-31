import React from "react";
import Container from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function RootLoading() {
  return (
    <div className="bg-[var(--background)] pt-36 pb-20 min-h-screen">
      <Container size="default" className="flex flex-col items-center text-center">
        {/* Eyebrow skeleton */}
        <Skeleton className="h-4 w-32 rounded-full mb-6" />

        {/* Headline skeleton */}
        <Skeleton className="h-14 sm:h-20 w-4/5 max-w-2xl rounded-2xl mb-4" />
        <Skeleton className="h-14 sm:h-20 w-3/5 max-w-xl rounded-2xl mb-6" />

        {/* Subtitle skeleton */}
        <Skeleton className="h-4 w-full max-w-lg rounded-md mb-2" />
        <Skeleton className="h-4 w-4/5 max-w-md rounded-md mb-10" />

        {/* Button skeletons */}
        <div className="flex gap-4 mb-16">
          <Skeleton className="h-12 w-36 rounded-full" />
          <Skeleton className="h-12 w-36 rounded-full" />
        </div>

        {/* Featured Banner skeleton */}
        <Skeleton className="w-full aspect-[16/7] sm:aspect-[21/9] rounded-3xl" />
      </Container>
    </div>
  );
}

