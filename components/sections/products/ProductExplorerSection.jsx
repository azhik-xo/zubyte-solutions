"use client";

import React, { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { PRODUCT_CATEGORIES } from "@/data/products";
import { cn } from "@/lib/utils";

/**
 * 20/80 Split Product Explorer with sidebar filter and product suite summary
 */
export default function ProductExplorerSection() {
  const [activeCategory, setActiveCategory] = useState("All Products");

  const allProducts = PRODUCT_CATEGORIES.flatMap((cat) =>
    cat.products.map((prod) => ({
      ...prod,
      categoryLabel: cat.label,
      suite: cat.suite,
      color: cat.color,
      img: cat.img,
    }))
  );

  const navCategories = [
    "All Products",
    ...PRODUCT_CATEGORIES.map((c) => c.label),
  ];

  const visibleProducts =
    activeCategory === "All Products"
      ? allProducts
      : allProducts.filter((p) => p.categoryLabel === activeCategory);

  return (
    <section className="bg-[var(--background)] py-16 sm:py-20">
      <Container size="lg">
        {/* 20/80 Split Box */}
        <div className="bg-white border border-[var(--border)] rounded-3xl overflow-hidden shadow-sm flex flex-col lg:flex-row min-h-[600px] mb-16">
          {/* LEFT 20% / Sidebar Filter */}
          <div className="lg:w-[24%] xl:w-[20%] border-b lg:border-b-0 lg:border-r border-[var(--border)] bg-[#faf9f5]/50 p-6 sm:p-8 flex flex-col gap-1 shrink-0">
            <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)] mb-4">
              Browse Categories
            </p>
            {navCategories.map((cat) => {
              const isSelected = activeCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer select-none",
                    isSelected
                      ? "bg-[#1b1b1b] text-white shadow-sm font-bold"
                      : "text-[#797876] hover:bg-black/5 hover:text-[#1b1b1b]"
                  )}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* RIGHT 80% / Products Grid */}
          <div className="lg:w-[76%] xl:w-[80%] p-6 sm:p-10 flex flex-col">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border)]">
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)] mb-1">
                  Viewing Category
                </p>
                <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#1b1b1b]">
                  {activeCategory}
                </h2>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)]">
                {visibleProducts.length} {visibleProducts.length === 1 ? "Product" : "Products"}
              </span>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {visibleProducts.map((prod) => (
                <div
                  key={prod.name}
                  className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  {/* Thumbnail Image */}
                  <div className="relative h-44 overflow-hidden bg-[#222222]">
                    <img
                      src={`https://images.unsplash.com/${prod.img}?w=600&h=350&fit=crop&auto=format`}
                      alt={prod.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <span
                        className="text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm"
                        style={{
                          background: prod.status === "Live" ? "#10b981" : "#F1681D",
                          color: "#ffffff",
                        }}
                      >
                        {prod.status}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col gap-3 flex-1 justify-between">
                    <div>
                      <p className="text-[10px] font-bold tracking-widest uppercase text-[var(--muted-foreground)] mb-1">
                        {prod.suite}
                      </p>
                      <h3 className="font-heading font-bold text-[#1b1b1b] text-base leading-snug mb-2">
                        {prod.name}
                      </h3>
                      <p className="text-[var(--muted-foreground)] text-xs leading-relaxed">
                        {prod.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--border)]">
                      <Button
                        href="/contact"
                        variant="primary"
                        size="sm"
                        className="w-full justify-center text-xs py-2.5"
                      >
                        Try Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Suite Summary Card */}
        <div className="bg-[#1b1b1b] rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-2xl text-white border border-white/10">
          <div className="p-8 sm:p-14 flex flex-col justify-center">
            <p className="text-xs font-bold tracking-widest uppercase mb-4 text-[#F1681D]">
              Get started today
            </p>
            <h2
              className="font-heading font-bold text-white leading-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}
            >
              See the full suite
              <br />
              in action.
            </h2>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-8">
              Schedule a tailored demonstration and discover how Zubyte's integrated product ecosystem accelerates your operations.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/contact" variant="orange" size="md">
                Request a Demo →
              </Button>
              <Button href="/contact" variant="outlineDark" size="md">
                Talk to Sales
              </Button>
            </div>
          </div>

          {/* Right Suite List */}
          <div className="p-8 sm:p-14 border-t md:border-t-0 md:border-l border-white/10 flex flex-col justify-center gap-4 bg-[#222222]/50">
            <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-2">
              All Product Suites
            </p>
            {PRODUCT_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-4 py-3 border-b border-white/10 last:border-0"
              >
                <div
                  className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center"
                  style={{ background: `${cat.color}20` }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: cat.color }}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm">{cat.label}</p>
                  <p className="text-xs font-semibold" style={{ color: cat.color }}>
                    {cat.suite}
                  </p>
                </div>
                <span className="text-xs font-bold text-white/40">
                  {cat.products.length} Products
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

