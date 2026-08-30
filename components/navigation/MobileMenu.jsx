"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/data/navigation";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

/**
 * Mobile navigation menu dropdown
 */
export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="pointer-events-auto md:hidden absolute top-[72px] left-4 right-4 bg-[#171717] rounded-2xl p-6 flex flex-col gap-3 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
      <nav className="flex flex-col gap-1">
        {NAV_LINKS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "text-left text-sm font-semibold tracking-[0.6px] py-3 px-3 rounded-xl transition-colors select-none",
                isActive
                  ? "text-white bg-white/10 font-bold"
                  : "text-[rgba(250,249,246,0.7)] hover:text-white hover:bg-white/5"
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="pt-3 border-t border-white/10 mt-2">
        <Button
          href="/contact"
          variant="orange"
          size="md"
          className="w-full justify-center"
          onClick={onClose}
        >
          Get in Touch
        </Button>
      </div>
    </div>
  );
}

