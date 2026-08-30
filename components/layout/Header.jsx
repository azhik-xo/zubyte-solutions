"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ZZMark from "@/components/common/ZZMark";
import Navbar from "@/components/navigation/Navbar";
import MobileMenu from "@/components/navigation/MobileMenu";
import Button from "@/components/ui/Button";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";

/**
 * Floating dark pill navigation bar component
 */
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu whenever pathname changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scrolling when mobile navigation is open
  useScrollLock(mobileMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-4 pt-4 pointer-events-none">
      {/* Desktop Floating Dark Pill */}
      <div className="pointer-events-auto hidden md:flex items-center justify-between bg-[#171717]/95 backdrop-blur-md rounded-2xl shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.15),0px_8px_10px_-6px_rgba(0,0,0,0.1)] border border-white/10 w-full max-w-[1130px] h-[72px] pl-[12px] pr-[12px] py-[8px] transition-all duration-300">
        {/* Left: Brand mark + Nav links */}
        <div className="flex items-center gap-8 pl-[8px]">
          <Link
            href="/"
            className="flex items-center gap-2 relative shrink-0 cursor-pointer hover:opacity-85 transition-opacity group"
            aria-label="Zubyte Home"
          >
            <ZZMark fill="#FAF9F6" className="w-8 h-7 group-hover:scale-105 transition-transform" />
          </Link>

          <Navbar />
        </div>

        {/* Right: CTA button */}
        <div className="flex items-center gap-3">
          <Button
            href="/contact"
            variant="dark"
            size="sm"
            className="text-[12px] font-semibold tracking-[0.6px] px-7 py-[13px] rounded-xl hover:bg-white"
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Mobile Compact Dark Pill */}
      <div className="pointer-events-auto md:hidden flex items-center justify-between bg-[#171717]/95 backdrop-blur-md rounded-2xl w-full h-[58px] px-4 shadow-[0px_8px_20px_rgba(0,0,0,0.25)] border border-white/10">
        <Link
          href="/"
          className="cursor-pointer shrink-0 hover:opacity-80 transition-opacity flex items-center gap-2"
          aria-label="Zubyte Home"
        >
          <ZZMark fill="#FAF9F6" className="w-7 h-6" />
          <span className="font-brand font-bold text-xs text-white tracking-widest uppercase">
            ZUBYTE
          </span>
        </Link>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2.5 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <div className="w-5 flex flex-col gap-1.5 justify-center items-center">
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-all duration-300",
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-all duration-300",
                mobileMenuOpen ? "opacity-0" : ""
              )}
            />
            <span
              className={cn(
                "block h-0.5 w-5 bg-white transition-all duration-300",
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </header>
  );
}

