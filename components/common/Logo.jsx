import React from "react";
import Link from "next/link";
import ZZMark from "./ZZMark";
import { cn } from "@/lib/utils";

/**
 * Zubyte Solution brand logo with ZZ mark and Syne typography
 */
export default function Logo({
  light = false,
  className = "",
  showTagline = false,
  onClick,
  isLink = true,
  href = "/",
}) {
  const content = (
    <div className={cn("inline-flex items-center gap-2.5 group cursor-pointer", className)}>
      <div className="w-7 h-[23px] shrink-0 transition-transform group-hover:scale-105 duration-200">
        <ZZMark
          className="w-full h-full"
          fill={light ? "#ffffff" : "#1b1b1b"}
        />
      </div>
      <div className="flex flex-col">
        <span
          className={cn(
            "font-brand font-bold text-sm tracking-[0.06em] leading-none uppercase select-none transition-colors",
            light ? "text-white group-hover:text-white/90" : "text-[#1b1b1b] group-hover:text-[#F1681D]"
          )}
        >
          ZUBYTE SOLUTION
        </span>
        {showTagline && (
          <span
            className={cn(
              "text-[9px] tracking-[0.16em] uppercase font-light mt-0.5",
              light ? "text-white/40" : "text-[#797876]"
            )}
          >
            Where Ideas Evolve Into Products
          </span>
        )}
      </div>
    </div>
  );

  if (!isLink || !href) {
    return content;
  }

  return (
    <Link href={href} onClick={onClick} aria-label="Zubyte Solution Home">
      {content}
    </Link>
  );
}
