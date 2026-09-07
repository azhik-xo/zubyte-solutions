"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

/**
 * FAQ Section fetching strictly from MongoDB
 */
export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setIsLoading(true);
        const res = await api.company.getFaqs();
        if (res.data && Array.isArray(res.data)) {
          setFaqs(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch FAQs from DB:", err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  if (!isLoading && faqs.length === 0) {
    return null;
  }

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
            {isLoading ? (
              <div className="p-8 text-center text-xs text-[var(--muted-foreground)]">
                Loading FAQs...
              </div>
            ) : (
              faqs.map((faq, i) => {
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
              })
            )}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
