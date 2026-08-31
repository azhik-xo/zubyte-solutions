"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Smooth Page Redirection & Route Transition Wrapper
 * Provides top loading bar and smooth content cross-fade on route change
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Trigger entrance transition on path change
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 350);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Top Route Progress Bar Indicator */}
      <div
        className={`fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none transition-all duration-300 ${
          isTransitioning
            ? "opacity-100 bg-[#F1681D] shadow-[0_0_8px_#F1681D]"
            : "opacity-0"
        }`}
        style={{
          width: isTransitioning ? "100%" : "0%",
          transition: isTransitioning ? "width 300ms ease-out, opacity 150ms" : "opacity 200ms",
        }}
      />

      {/* Smooth Content Cross-Fade Container */}
      <div
        key={pathname}
        className="flex-1 flex flex-col page-enter-animation"
      >
        {children}
      </div>
    </>
  );
}

