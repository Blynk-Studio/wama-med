"use client";

import { useState, useEffect, useRef } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Trigger the CSS staggered fade-up when the FAQ section enters viewport.
    // Works on both mobile and desktop — no GSAP dependency.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        el.classList.add("faq-section-visible");
      },
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-3" ref={containerRef}>
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.q}
            className="rounded-xl border border-brass/10 overflow-hidden transition-all duration-200 faq-item"
            style={{
              background: "#0A1E2A",
              animationDelay: `${i * 80}ms`,
            }}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors duration-200 hover:bg-white/[0.02]"
              aria-expanded={isOpen}
            >
              <span
                className="font-bold text-base pr-4"
                style={{ fontFamily: "var(--font-fraunces)", color: "#F5F0E8" }}
              >
                {faq.q}
              </span>
              <span
                className="text-brass text-xl flex-shrink-0 transition-transform duration-300"
                style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden"
              style={{ transition: "max-height 0.35s ease-in-out", maxHeight: isOpen ? "400px" : "0" }}
            >
              <p
                className="px-6 pb-5 text-sm leading-relaxed"
                style={{ color: "rgba(245,240,232,0.6)" }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
