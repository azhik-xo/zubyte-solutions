import React from "react";
import ProductsHeroSection from "@/components/sections/products/ProductsHeroSection";
import ProductExplorerSection from "@/components/sections/products/ProductExplorerSection";

export const metadata = {
  title: "Enterprise Product Suites | Zubyte Edu, Biz, Work & Staff",
  description:
    "Explore Zubyte's scalable enterprise platforms: One Digital Campus, Zubyte LMS, Billing & Inventory, Workforce Management, and Get Staff.",
};

export default function ProductsPage() {
  return (
    <main className="flex-1">
      <ProductsHeroSection />
      <ProductExplorerSection />
    </main>
  );
}

