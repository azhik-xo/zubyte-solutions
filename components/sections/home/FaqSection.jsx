"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { FAQS as FALLBACK_FAQS } from "@/data/faqs";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * FAQ Section with dynamic live FAQs from MongoDB and Reveal entrance
 */
export default function FaqSection() {
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await api.company.getFaqs();
        if (res.data && res.data.length > 0) {
          setFaqs(res.data);
        }
      } catch (err) {
        console.warn("Could not fetch FAQs from DB, using fallback:", err.message);
      }
    };
    fetchFaqs();
  }, []);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="bg-[var(--background)] py-24 sm:py-28">
      <Container size="sm">
        <Reveal direction="up" delay={50} duration={600}>
          <SectionHeading
            eyebrow="Common questions"
            title="Frequently Asked Questions"
            description="Everything you need to know about starting an engagement with Zubyte."
          />
        </Reveal>

        <Reveal direction="up" delay={150} duration={700}>
          <div className="divide-y divide-[var(--border)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm bg-white">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;

              return (
                <div key={faq._id || i} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full text-left px-6 sm:px-8 py-5 sm:py-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--secondary)]/60 transition-colors focus-visible:outline-none focus-visible:bg-[var(--secondary)]"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-semibold text-sm sm:text-base text-[#1b1b1b]">
                      {faq.q}
                    </span>
                    <span
                      className="shrink-0 text-xl font-light w-6 h-6 flex items-center justify-center rounded-full"
                      style={{ color: "#F1681D" }}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-6 animate-in fade-in duration-200">
                      <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
