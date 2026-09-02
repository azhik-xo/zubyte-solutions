"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";
import PageTransition from "@/components/ui/PageTransition";
import { CompanyProvider } from "@/context/CompanyContext";

function InnerSiteLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname ? pathname.startsWith("/admin") : false;

  if (isAdmin) {
    return (
      <PageTransition>
        <div className="flex-1 flex flex-col">{children}</div>
      </PageTransition>
    );
  }

  return (
    <>
      <Header />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  );
}

export default function SiteLayout({ children }) {
  return (
    <CompanyProvider>
      <Suspense fallback={<div className="flex-1 flex flex-col">{children}</div>}>
        <InnerSiteLayout>{children}</InnerSiteLayout>
      </Suspense>
    </CompanyProvider>
  );
}
