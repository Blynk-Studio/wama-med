"use client";

import { useEffect, useRef } from "react";

export function WordRevealQuote({ text, cite }: { text: string; cite: string }) {
  const containerRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Mobile: skip the dim-then-reveal effect entirely — render words fully visible.
    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (isMobile) {
      el.querySelectorAll<HTMLSpanElement>("[data-word]").forEach(w => {
        w.style.opacity = "1";
      });
      return;
    }

    // Desktop: word-by-word opacity reveal on scroll intersection.
    let revealed = false;

    const revealWords = async () => {
      if (revealed) return;
      revealed = true;
      const { default: gsap } = await import("gsap");
      const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        { opacity: 1, stagger: 0.06, duration: 0.5, ease: "power2.out" }
      );
    };

    (async () => {
      const { default: gsap } = await import("gsap");
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          revealWords();
        },
        { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
      );
      observer.observe(el);

      setTimeout(() => {
        if (revealed) return;
        revealed = true;
        const words = el.querySelectorAll<HTMLSpanElement>("[data-word]");
        gsap.to(words, { opacity: 1, stagger: 0.03, duration: 0.3, ease: "power2.out" });
      }, 1200);
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
        style={{ color: "rgba(28,20,16,0.8)" }}
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
        style={{ color: "rgba(11,64,66,0.6)" }}
      >
        — {cite}
      </cite>
    </blockquote>
  );
}
