"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { ServiceCardSkeleton, Skeleton } from "@/components/ui/Skeleton";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * Interactive Service Navigator tab panel fetching live from MongoDB with Skeleton states
 */
export default function ServicesNavigatorSection() {
  const [serviceGroups, setServiceGroups] = useState([]);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLiveServices = async () => {
      try {
        setIsLoading(true);
        const res = await api.services.getAll();
        if (res.data && res.data.length > 0) {
          setServiceGroups(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch live services from DB:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLiveServices();
  }, []);

  const activeGroup = serviceGroups[activeGroupIndex] || serviceGroups[0] || null;

  return (
    <section className="bg-[var(--background)] py-16 sm:py-20">
      <Container size="default">
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="hidden lg:flex lg:col-span-3 flex-col gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 rounded-2xl w-full" />
              ))}
            </div>
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <ServiceCardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : serviceGroups.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[var(--border)] shadow-xs">
            <p className="text-base font-bold text-[#1b1b1b]">No services available</p>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Please populate services from the Admin Panel.
            </p>
          </div>
        ) : (
          <>
            {/* Mobile Horizontal Tabs */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide">
              {serviceGroups.map((group, idx) => {
                const isSelected = activeGroupIndex === idx;

                return (
                  <button
                    key={group._id || group.group || idx}
                    type="button"
                    onClick={() => setActiveGroupIndex(idx)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer",
                      isSelected
                        ? "bg-[#1b1b1b] text-white shadow-sm"
                        : "bg-[#f0efe9] text-[#797876] hover:text-[#1b1b1b]"
                    )}
                  >
                    <span>{group.icon || "⬡"}</span>
                    <span>{group.group}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Vertical Tab Rail */}
              <div className="hidden lg:flex lg:col-span-3 flex-col gap-2 sticky top-28">
                {serviceGroups.map((group, idx) => {
                  const isSelected = activeGroupIndex === idx;

                  return (
                    <button
                      key={group._id || group.group || idx}
                      type="button"
                      onClick={() => setActiveGroupIndex(idx)}
                      className={cn(
                        "flex items-center gap-3 px-5 py-3.5 rounded-2xl text-left transition-all cursor-pointer group w-full",
                        isSelected
                          ? "bg-[#1b1b1b] text-white shadow-md font-bold"
                          : "bg-transparent text-[#797876] hover:bg-black/5 hover:text-[#1b1b1b]"
                      )}
                    >
                      <span className="text-lg shrink-0">{group.icon || "⬡"}</span>
                      <span className="font-heading text-sm">{group.group}</span>
                      {isSelected && (
                        <span className="ml-auto text-xs text-[#F1681D]">→</span>
                      )}
                    </button>
                  );
                })}

                {/* Visual thumbnail preview */}
                {activeGroup?.img && (
                  <div className="mt-4 rounded-2xl overflow-hidden aspect-[4/3] bg-[#e8e7e1] shadow-inner">
                    <img
                      src={
                        activeGroup.img.startsWith("http") || activeGroup.img.startsWith("/")
                          ? activeGroup.img
                          : `https://images.unsplash.com/${activeGroup.img}?w=400&h=300&fit=crop&auto=format`
                      }
                      alt={activeGroup.group}
                      className="w-full h-full object-cover transition-opacity duration-300"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              {/* Right Service Cards Area */}
              {activeGroup && (
                <div className="lg:col-span-9">
                  <div className="flex items-center gap-3 mb-8 pb-6 border-b border-[var(--border)]">
                    <span className="text-2xl text-[#1b1b1b]">{activeGroup.icon || "⬡"}</span>
                    <div>
                      <p className="text-xs font-semibold tracking-widest uppercase text-[var(--muted-foreground)]">
                        Discipline
                      </p>
                      <h2 className="font-heading font-bold text-2xl text-[#1b1b1b]">
                        {activeGroup.group}
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {activeGroup.items?.map((item, idx) => {
                      const isDark = idx === 0;
                      const isOrange = idx === 1;

                      return (
                        <div
                          key={item._id || item.name || idx}
                          className={cn(
                            "rounded-3xl p-7 flex flex-col justify-between min-h-[260px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                            isDark && "bg-[#1b1b1b] text-white",
                            isOrange && "bg-[#F1681D] text-white",
                            !isDark && !isOrange && "bg-white border border-[var(--border)] shadow-xs"
                          )}
                        >
                          <div>
                            <span
                              className={cn(
                                "font-brand font-bold text-xs tracking-widest block mb-4",
                                isDark && "text-white/40",
                                isOrange && "text-white/60",
                                !isDark && !isOrange && "text-[#F1681D]"
                              )}
                            >
                              0{idx + 1}
                            </span>
                            <h3
                              className={cn(
                                "font-heading font-bold text-lg sm:text-xl leading-snug mb-3",
                                isDark && "text-white",
                                isOrange && "text-white",
                                !isDark && !isOrange && "text-[#1b1b1b]"
                              )}
                            >
                              {item.name}
                            </h3>
                            <p
                              className={cn(
                                "text-xs sm:text-sm leading-relaxed mb-6",
                                isDark && "text-white/70",
                                isOrange && "text-white/85",
                                !isDark && !isOrange && "text-[var(--muted-foreground)]"
                              )}
                            >
                              {item.desc}
                            </p>
                          </div>

                          <div>
                            <Link
                              href={`/portfolio?service=${encodeURIComponent(item.name)}`}
                              className={cn(
                                "inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase underline underline-offset-4 cursor-pointer transition-colors",
                                isDark && "text-white hover:text-white/80",
                                isOrange && "text-white hover:text-white/80",
                                !isDark && !isOrange && "text-[#1b1b1b] hover:text-[#F1681D]"
                              )}
                            >
                              Proof of Work →
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
