"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/utils";

/**
 * Desktop navigation bar links
 */
export default function Navbar({ className = "" }) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-6", className)} aria-label="Main Navigation">
      {NAV_LINKS.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "text-[12px] font-semibold tracking-[0.6px] whitespace-nowrap transition-colors select-none",
              isActive
                ? "text-white font-bold"
                : "text-[rgba(250,249,246,0.75)] hover:text-white"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

