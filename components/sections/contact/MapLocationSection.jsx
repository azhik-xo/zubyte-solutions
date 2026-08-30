import React from "react";
import Container from "@/components/ui/Container";
import { GLOBAL_OFFICES } from "@/data/company";

/**
 * Interactive Google Maps Location Section & Global Offices
 */
export default function MapLocationSection() {
  return (
    <section className="bg-[var(--background)] pb-24 sm:pb-28">
      <Container size="default">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[var(--muted-foreground)] mb-2">
              Locate Us
            </p>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#1b1b1b] leading-tight">
              Find us at our
              <br />
              global headquarters.
            </h2>
          </div>
          <div className="text-sm text-[var(--muted-foreground)] max-w-xs leading-relaxed">
            {GLOBAL_OFFICES[0].address}
          </div>
        </div>

        {/* Embedded Map Frame */}
        <div className="rounded-3xl overflow-hidden border border-[var(--border)] shadow-md h-[400px] sm:h-[440px] bg-[#e8e7e1]">
          <iframe
            title="Zubyte Global Headquarters"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY&q=One+World+Trade+Center,New+York,NY"
          />
        </div>

        {/* Global Office Pills */}
        <div className="flex flex-wrap gap-3 mt-6">
          {GLOBAL_OFFICES.map((loc) => (
            <div
              key={loc.city}
              className="flex items-center gap-2.5 bg-[var(--secondary)] border border-[var(--border)] rounded-full px-5 py-2.5 shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full shrink-0 bg-[#F1681D]" />
              <span className="text-sm font-semibold text-[#1b1b1b]">{loc.city}</span>
              <span className="text-xs text-[var(--muted-foreground)]">— {loc.role}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

