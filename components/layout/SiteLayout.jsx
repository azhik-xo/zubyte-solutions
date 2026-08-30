"use client";

import React, { Suspense } from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

function InnerSiteLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname ? pathname.startsWith("/admin") : false;

  if (isAdmin) {
    return <div className="flex-1 flex flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col">{children}</div>
      <Footer />
    </>
  );
}

export default function SiteLayout({ children }) {
  return (
    <Suspense fallback={<div className="flex-1 flex flex-col">{children}</div>}>
      <InnerSiteLayout>{children}</InnerSiteLayout>
    </Suspense>
  );
}

