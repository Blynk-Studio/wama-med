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
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let cleanup = () => {};

    (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (lineRef.current) {
          gsap.set(lineRef.current, { scaleY: 0 });
        }
        cardsRef.current.forEach((el, i) => {
          if (!el) return;
          const fromX = i % 2 === 0 ? -40 : 40;
          gsap.set(el, { opacity: 0, x: fromX });
        });

        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: lineRef.current.parentElement,
                start: "top 72%",
                end: "bottom 28%",
                scrub: true,
              },
            }
          );
        }

        cardsRef.current.forEach((el, i) => {
          if (!el) return;
          const fromX = i % 2 === 0 ? -40 : 40;
          gsap.fromTo(
            el,
            { opacity: 0, x: fromX },
            {
              opacity: 1,
              x: 0,
              duration: 0.75,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 92%",
                once: true,
              },
            }
          );
        });
      });

      timeoutId = setTimeout(() => {
        cardsRef.current.forEach((el) => {
          if (!el) return;
          const computed = window.getComputedStyle(el);
          if (parseFloat(computed.opacity) < 0.5) {
            gsap.set(el, { opacity: 1, x: 0 });
          }
        });
        if (lineRef.current) {
          const computed = window.getComputedStyle(lineRef.current);
          if (computed.transform.includes("0, 0, 0, 0")) {
            gsap.set(lineRef.current, { scaleY: 1 });
          }
        }
      }, 1500);

      cleanup = () => {
        if (timeoutId) clearTimeout(timeoutId);
        ctx.revert();
      };
    })();

    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="relative">
      {/* Vertical brass line */}
      <div
        ref={lineRef}
        className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-0.5"
        style={{
          background: "rgba(201,168,76,0.3)",
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
                style={{ background: "#0A0E1A" }}
                aria-hidden="true"
              >
                <div className="absolute inset-1 rounded-full bg-brass/40" />
              </div>

              {/* Card content — alternates sides on desktop */}
              <div
                className={`${isEven ? "sm:col-start-1 sm:text-right sm:pr-12" : "sm:col-start-2 sm:pl-12"}`}
              >
                <div
                  className={`rounded-[1.75rem] p-8 sm:p-9 border border-brass/15`}
                  style={{
                    background:
                      idx % 2 === 0
                        ? "linear-gradient(180deg, rgba(20, 25, 40, 0.96) 0%, rgba(15, 20, 34, 0.98) 100%)"
                        : "linear-gradient(180deg, rgba(18, 24, 39, 0.88) 0%, rgba(13, 18, 31, 0.95) 100%)",
                    boxShadow: "0 24px 48px rgba(0,0,0,0.22)",
                  }}
                >
                  {/* Ghost number */}
                  <p
                    className="font-cormorant select-none pointer-events-none mb-2"
                    style={{
                      fontSize: "4rem",
                      lineHeight: 1,
                      color: "rgba(201,168,76,0.08)",
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
                    className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium mb-5"
                    style={{ background: "rgba(212,180,131,0.15)", color: "var(--gold)" }}
                  >
                    {step.durationLabel}: {step.duration}
                  </span>

                  <h3
                    className={`text-2xl sm:text-[2rem] font-black mb-4 leading-tight ${isEven ? "sm:text-right" : ""}`}
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--text-high)" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className={`body-copy mb-5 ${isEven ? "sm:text-right" : ""}`}
                    style={{ color: "var(--text-body)" }}
                  >
                    {step.desc}
                  </p>

                  <ul className={`space-y-2 mb-4 ${isEven ? "sm:text-right" : ""}`}>
                    {step.details.map((d) => (
                      <li
                        key={d}
                        className={`flex items-start gap-2.5 text-base ${isEven ? "sm:flex-row-reverse sm:text-right" : ""}`}
                        style={{ color: "var(--text-muted)" }}
                      >
                        <span className="text-brass mt-0.5 flex-shrink-0">&#10003;</span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <blockquote
                    className={`rounded-2xl p-5 text-base italic leading-relaxed border border-brass/10 ${isEven ? "sm:text-right" : ""}`}
                    style={{
                      fontFamily: "var(--font-crimson)",
                      color: "var(--text-muted)",
                      background: "rgba(212,180,131,0.06)",
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
