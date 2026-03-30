"use client";

import { useEffect, useRef } from "react";

interface TimelineStep {
  number: string;
  title: string;
  duration: string;
  durationLabel: string;
  desc: string;
  details: string[];
  callout: string;
}

export function AnimatedTimeline({ steps }: { steps: TimelineStep[] }) {
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const isMobile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const initDesktop = async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (lineRef.current) {
        gsap.set(lineRef.current, { scaleY: 0 });
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: lineRef.current.parentElement,
              start: "top 70%",
              end: "bottom 30%",
              scrub: true,
            },
          }
        );
      }

      cardsRef.current.forEach((el, i) => {
        if (!el) return;
        const fromX = i % 2 === 0 ? -40 : 40;
        gsap.set(el, { opacity: 0, x: fromX });
        gsap.fromTo(
          el,
          { opacity: 0, x: fromX },
          {
            opacity: 1, x: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });
    };

    const initMobile = async () => {
      // On mobile: line animates via CSS scaleY driven by IntersectionObserver
      // (simple, no GSAP dependency). Cards are visible immediately per global CSS.
      // The line draw is a nice-to-have — animate it with a CSS transition
      // once the section enters the viewport.
      const line = lineRef.current;
      if (!line) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          line.style.transition = "transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)";
          line.style.transform = "scaleY(1)";
        },
        { threshold: 0.1 }
      );
      line.style.transformOrigin = "top center";
      line.style.transform = "scaleY(0)";
      observer.observe(line.parentElement ?? line);
      return () => observer.disconnect();
    };

    if (isMobile) {
      initMobile();
    } else {
      initDesktop();
    }
  }, []);

  return (
    <div className="relative">
      {/* Vertical brass line */}
      <div
        ref={lineRef}
        className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5"
        style={{
          background: "rgba(11,64,66,0.3)",
          transformOrigin: "top center",
        }}
        aria-hidden="true"
      />

      <div className="space-y-12 sm:space-y-16">
        {steps.map((step, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={step.number}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className={`relative pl-20 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-12 items-start`}
            >
              {/* Dot on the line */}
              <div
                className="absolute left-[26px] sm:left-1/2 sm:-translate-x-1/2 top-8 w-5 h-5 rounded-full border-2 border-brass z-10"
                style={{ background: "#FAFAF8" }}
                aria-hidden="true"
              >
                <div className="absolute inset-1 rounded-full bg-brass/40" />
              </div>

              {/* Card content — alternates sides on desktop */}
              <div
                className={`${isEven ? "sm:col-start-1 sm:text-right sm:pr-12" : "sm:col-start-2 sm:pl-12"}`}
              >
                <div
                  className={`rounded-2xl p-6 sm:p-8 border border-brass/10 ${
                    isEven ? "" : ""
                  }`}
                  style={{ background: idx % 2 === 0 ? "#FFFFFF" : "#F5F0E8" }}
                >
                  {/* Ghost number */}
                  <p
                    className="font-cormorant select-none pointer-events-none mb-2"
                    style={{
                      fontSize: "4rem",
                      lineHeight: 1,
                      color: "rgba(11,64,66,0.08)",
                      position: "absolute",
                      top: "0.5rem",
                      right: isEven ? undefined : "1.5rem",
                      left: isEven ? "1.5rem" : undefined,
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </p>

                  {/* Duration badge */}
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium mb-4"
                    style={{ background: "rgba(11,64,66,0.1)", color: "#0B4042" }}
                  >
                    {step.durationLabel}: {step.duration}
                  </span>

                  <h3
                    className={`text-xl sm:text-2xl font-black mb-3 leading-tight ${isEven ? "sm:text-right" : ""}`}
                    style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed mb-4 ${isEven ? "sm:text-right" : ""}`}
                    style={{ color: "rgba(28,20,16,0.6)" }}
                  >
                    {step.desc}
                  </p>

                  <ul className={`space-y-2 mb-4 ${isEven ? "sm:text-right" : ""}`}>
                    {step.details.map((d) => (
                      <li
                        key={d}
                        className={`flex items-start gap-2.5 text-sm ${isEven ? "sm:flex-row-reverse sm:text-right" : ""}`}
                        style={{ color: "rgba(28,20,16,0.55)" }}
                      >
                        <span className="text-brass mt-0.5 flex-shrink-0">&#10003;</span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <blockquote
                    className={`rounded-lg p-4 text-sm italic leading-relaxed border border-brass/10 ${isEven ? "sm:text-right" : ""}`}
                    style={{
                      fontFamily: "var(--font-crimson)",
                      color: "rgba(28,20,16,0.5)",
                      background: "rgba(11,64,66,0.05)",
                    }}
                  >
                    {step.callout}
                  </blockquote>
                </div>
              </div>

              {/* Empty column for layout on the opposite side */}
              {isEven && <div className="hidden sm:block" />}
              {!isEven && <div className="hidden sm:block sm:col-start-1 sm:row-start-1" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
