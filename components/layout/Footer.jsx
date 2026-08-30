import React from "react";
import Link from "next/link";
import Logo from "@/components/common/Logo";
import Container from "@/components/ui/Container";
import { FOOTER_COMPANY_LINKS, FOOTER_LEGAL_LINKS, SOCIAL_LINKS } from "@/data/navigation";
import { COMPANY_INFO } from "@/data/company";

/**
 * Global site footer component
 */
export default function Footer() {
  return (
    <footer className="bg-[#1b1b1b] text-white border-t border-white/10">
      <Container size="default" className="py-16 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Brand Col */}
          <div className="md:col-span-5 flex flex-col items-start">
            <Logo light showTagline />
            <p className="text-white/50 text-sm leading-relaxed max-w-sm mt-5">
              {COMPANY_INFO.description}
            </p>

            <div className="flex items-center gap-4 mt-8">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-white/40 hover:text-white px-3 py-1.5 rounded-full border border-white/10 hover:border-white/30 transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
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

          {/* Legal Links */}
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
            <p className="text-sm text-white/80 font-medium">{COMPANY_INFO.email}</p>
            <p className="text-xs text-white/40 mt-1">{COMPANY_INFO.phone}</p>
          </div>
        </div>

        {/* Bottom separator and copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>© {COMPANY_INFO.copyrightYear} {COMPANY_INFO.legalName}. All rights reserved.</p>
          <p className="tracking-widest uppercase text-[11px] font-semibold text-white/45">
            {COMPANY_INFO.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}

