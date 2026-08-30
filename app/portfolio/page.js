import React, { Suspense } from "react";
import PortfolioHeroSection from "@/components/sections/portfolio/PortfolioHeroSection";
import PortfolioExplorerSection from "@/components/sections/portfolio/PortfolioExplorerSection";
import CtaSection from "@/components/sections/common/CtaSection";

export const metadata = {
  title: "Proof of Work | Case Studies & Delivered Systems",
  description:
    "Explore delivered systems across web engineering, mobile apps, UI/UX design systems, cloud migrations, and AI document intelligence using the STAR framework.",
};

function PortfolioContent({ searchParams }) {
  const service = searchParams?.service || "All Services";

  return (
    <>
      <PortfolioHeroSection selectedService={service} />
      <PortfolioExplorerSection initialService={service} />
      <CtaSection
        title="Let us build your next breakthrough system."
        description="Tell us about your goals and we will engineer a solution tailored to your operational scale."
        variant="dark"
      />
    </>
  );
}

export default async function PortfolioPage({ searchParams }) {
  const resolvedParams = await searchParams;

  return (
    <main className="flex-1">
      <Suspense fallback={<div className="pt-36 text-center py-20">Loading case studies...</div>}>
        <PortfolioContent searchParams={resolvedParams} />
      </Suspense>
    </main>
  );
}

