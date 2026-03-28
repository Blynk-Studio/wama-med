"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3" data-animate-children>
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.q}
            className="rounded-xl border border-brass/10 overflow-hidden transition-all duration-200"
            style={{ background: "#0A1E2A" }}
            data-animate-child
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
