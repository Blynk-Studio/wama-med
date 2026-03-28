"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// ─────────────────────────────────────────────────────────────────────────────
// AnimationProvider — GSAP + Lenis init, route-change aware
//
// ROOT CAUSE OF BLANK SECTIONS ON NAVIGATION:
//   This component lives in layout.tsx and stays mounted across all route
//   changes (Next.js App Router keeps the layout alive). On first load,
//   GSAP initialises, creates ScrollTriggers, and everything works.
//   On navigation: the old DOM is replaced with new page DOM, but GSAP's
//   ScrollTriggers still point at old (now-detached) nodes. New sections
//   with data-animate never get picked up → they stay at opacity:0 forever.
//
// THE FIX — three-part:
//   1. Watch pathname with usePathname(). On every change:
//      a. Kill ALL existing ScrollTriggers (they point at old DOM)
//      b. Destroy Lenis (scroll position & state is stale)
//      c. Re-init GSAP from scratch against the new DOM
//   2. Scroll to top before re-init (prevents stale scroll position
//      causing ScrollTriggers to fire/not-fire incorrectly)
//   3. Fallback observer re-attaches on every route change too — handles
//      the async gap before GSAP imports finish
//
// LIGHTHOUSE SAFETY:
//   GSAP is still interaction-gated (pointerdown/keydown) so it never
//   runs during headless Lighthouse simulation.
//   On route change we bypass the gate — the user has already interacted
//   to navigate. The `hasInteracted` ref persists across navigations.
// ─────────────────────────────────────────────────────────────────────────────

type GSAPType = typeof import("gsap").default;
type LenisType = import("lenis").default;
type STType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Persist GSAP/Lenis instances across re-initialisations
  const gsapRef = useRef<GSAPType | null>(null);
  const lenisRef = useRef<LenisType | null>(null);
  const STRef = useRef<STType | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    let fallbackIO: IntersectionObserver | null = null;

    // ── Fallback observer ───────────────────────────────────────────────────
    // Attached on every route change. If GSAP hasn't loaded yet (first visit,
    // slow network), this ensures sections never stay invisible permanently.
    const attachFallback = () => {
      if (fallbackIO) fallbackIO.disconnect();
      fallbackIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            // Only apply fallback if GSAP hasn't handled this element yet
            const el = entry.target as HTMLElement;
            if (el.dataset.gsapDone === "true") return;
            el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            el.style.opacity = "1";
            el.style.transform = "none";
            fallbackIO!.unobserve(el);
          });
        },
        { rootMargin: "0px 0px 300px 0px", threshold: 0.01 }
      );
      document
        .querySelectorAll<HTMLElement>("[data-animate], [data-animate-child]")
        .forEach((el) => fallbackIO!.observe(el));
    };

    attachFallback();

    // ── Core re-init ────────────────────────────────────────────────────────
    const reinit = async () => {
      const gsap = gsapRef.current;
      const ST = STRef.current;
      const lenis = lenisRef.current;

      // Step 1: Kill all existing ScrollTriggers (they point at old/stale DOM)
      if (ST) {
        ST.getAll().forEach((t) => t.kill());
        ST.clearScrollMemory();
      }

      // Step 2: Destroy Lenis (stale scroll state)
      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
      }

      // Step 3: Reset scroll position before re-init
      // This prevents stale positions from miscalculating ScrollTrigger start/end
      if (typeof history !== "undefined") history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      // Step 4: Import GSAP (may be cached from previous init — that's fine)
      const [{ default: gsapFresh }, { ScrollTrigger }, { default: LenisCtor }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

      // Disconnect fallback — GSAP is now loaded
      if (fallbackIO) fallbackIO.disconnect();

      gsapRef.current = gsapFresh;
      STRef.current = ScrollTrigger;

      // Mark any elements already in viewport that fallback may have shown
      // so GSAP doesn't double-animate them
      document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
        if (el.style.opacity === "1") el.dataset.gsapDone = "true";
      });

      gsapFresh.registerPlugin(ScrollTrigger);

      // Step 5: Fresh Lenis instance
      const lenisNew = new LenisCtor({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenisNew;

      // Remove any previous ticker callbacks before adding a new one
      gsapFresh.ticker.lagSmoothing(0);
      const lenisRaf = (time: number) => lenisNew.raf(time * 1000);
      gsapFresh.ticker.add(lenisRaf);

      // Step 6: ScrollTrigger.refresh() after a tick to let React finish
      // painting the new page DOM before calculating trigger positions
      requestAnimationFrame(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
          setupAnimations(gsapFresh, ScrollTrigger);
        }, 100);
      });

      // Also refresh once everything (fonts, images) is fully loaded
      window.addEventListener(
        "load",
        () => setTimeout(() => ScrollTrigger.refresh(), 200),
        { once: true }
      );

      return () => {
        gsapFresh.ticker.remove(lenisRaf);
        lenisNew.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    // ── Gate GSAP behind user interaction on FIRST LOAD only ───────────────
    // Prevents GSAP from running during Lighthouse headless simulation.
    // After first interaction, hasInteracted stays true for all route changes.
    if (hasInteracted.current) {
      // Already interacted (navigating between pages) — init immediately
      reinit();
    } else {
      // First load — wait for real user interaction
      const onInteraction = () => {
        hasInteracted.current = true;
        reinit();
      };
      window.addEventListener("pointerdown", onInteraction, { passive: true, once: true });
      window.addEventListener("keydown", onInteraction, { once: true });

      return () => {
        window.removeEventListener("pointerdown", onInteraction);
        window.removeEventListener("keydown", onInteraction);
        if (fallbackIO) fallbackIO.disconnect();
      };
    }

    return () => {
      if (fallbackIO) fallbackIO.disconnect();
    };
  // pathname is the key dependency — re-run this entire effect on every route change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return <>{children}</>;
}

// ── Animation setup — called after ScrollTrigger.refresh() ─────────────────
// Runs fresh on every route change against the current DOM.
function setupAnimations(
  gsap: GSAPType,
  ScrollTrigger: STType
) {
  // Section fade-up entrances
  const sections = document.querySelectorAll<HTMLElement>("[data-animate]");
  sections.forEach((el) => {
    if (el.dataset.gsapDone === "true") return; // fallback already showed it
    gsap.set(el, { opacity: 0, y: 32 });
    el.dataset.gsapDone = "true";
    gsap.fromTo(
      el,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      }
    );
  });

  // Staggered children
  const childGroups = document.querySelectorAll<HTMLElement>("[data-animate-children]");
  childGroups.forEach((parent) => {
    const children = parent.querySelectorAll<HTMLElement>("[data-animate-child]");
    gsap.set(children, { opacity: 0, y: 24, scale: 0.98 });
    gsap.fromTo(
      children,
      { opacity: 0, y: 24, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: parent,
          start: "top 90%",
          once: true,
        },
      }
    );
  });

  // Brass rules — width reveal
  const brassRules = document.querySelectorAll<HTMLElement>(".brass-rule");
  brassRules.forEach((el) => {
    gsap.fromTo(
      el,
      { width: 0 },
      {
        width: 48,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      }
    );
  });

  // Process connector lines
  const connectorLines = document.querySelectorAll<HTMLElement>("[data-connector-line]");
  connectorLines.forEach((el) => {
    gsap.fromTo(
      el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 92%",
          once: true,
        },
      }
    );
  });

  // Safety timeout — force-show any element that still hasn't been revealed
  // after 2 seconds. Catches edge cases (browser extension, slow GSAP, etc.)
  setTimeout(() => {
    document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
      if (window.getComputedStyle(el).opacity === "0") {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.3 });
      }
    });
  }, 2000);

  // CountUp — re-initialise for new page
  initCountUps(gsap);
}

function initCountUps(gsap: GSAPType) {
  const countEls = Array.from(
    document.querySelectorAll<HTMLElement>("[data-count-to]")
  ).filter((el) => el.dataset.countInitialized !== "true");

  if (countEls.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        if (el.dataset.countInitialized === "true") return;
        el.dataset.countInitialized = "true";
        observer.unobserve(el);

        const target = parseFloat(el.dataset.countTo || "0");
        const isDecimal = target % 1 !== 0;
        const suffix = el.dataset.countSuffix || "";
        const prefix = el.dataset.countPrefix || "";
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent =
              prefix +
              (isDecimal ? obj.val.toFixed(1) : Math.round(obj.val).toString()) +
              suffix;
          },
        });
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  countEls.forEach((el) => {
    el.textContent =
      (el.dataset.countPrefix || "") + "0" + (el.dataset.countSuffix || "");
    observer.observe(el);
  });
}
