"use client";

import React from "react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import Container from "@/components/ui/Container";
import { FOOTER_COMPANY_LINKS, FOOTER_LEGAL_LINKS } from "@/data/navigation";
import { useCompany } from "@/context/CompanyContext";

/**
 * Global site footer component with dynamic company identity
 */
export default function Footer() {
  const { companyInfo } = useCompany();

  return (
    <footer className="bg-[#1b1b1b] text-white border-t border-white/10">
      <Container size="default" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Logo light />
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mt-5">
              {companyInfo.description}
            </p>
          </div>

          {/* Company Links */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {FOOTER_COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links & Direct Contact */}
          <div className="md:col-span-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-5">
              Legal & Trust
            </p>
            <ul className="space-y-3 text-sm text-white/60 mb-8">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <p className="text-xs font-semibold tracking-widest uppercase text-white/30 mb-3">
              Contact Directly
            </p>
            <p className="text-sm text-white/80 font-medium">{companyInfo.email}</p>
            <p className="text-xs text-white/40 mt-1">{companyInfo.phone}</p>
          </div>
        </div>

        {/* Bottom separator and copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>© {companyInfo.copyrightYear || new Date().getFullYear()} {companyInfo.legalName || "Zubyte IT Solutions Inc."}. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[11px] font-semibold text-white/45">
            {companyInfo.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
