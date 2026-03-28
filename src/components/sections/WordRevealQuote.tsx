"use client";

import { useEffect, useRef } from "react";

export function WordRevealQuote({ text, cite }: { text: string; cite: string }) {
  const containerRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    (async () => {
      const { default: gsap } = await import("gsap");

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();

          const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
          gsap.fromTo(
            words,
            { opacity: 0.15 },
            {
              opacity: 1,
              stagger: 0.06,
              duration: 0.5,
              ease: "power2.out",
            }
          );
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
    })();
  }, []);

  const words = text.split(" ");

  return (
    <blockquote
      ref={containerRef}
      className="border-l-2 border-brass/50 pl-5 my-6"
      style={{ fontFamily: "var(--font-crimson)" }}
    >
      <p
        className="text-xl sm:text-2xl italic leading-relaxed"
        style={{ color: "rgba(245,240,232,0.85)" }}
      >
        &ldquo;
        {words.map((word, i) => (
          <span
            key={i}
            data-word
            className="inline-block"
            style={{ opacity: 0.15 }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
        &rdquo;
      </p>
      <cite
        className="text-sm not-italic font-medium mt-3 block"
        style={{ color: "rgba(201,168,76,0.7)" }}
      >
        — {cite}
      </cite>
    </blockquote>
  );
}
