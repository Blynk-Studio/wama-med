"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { resetGsapReady, signalGsapReady } from "@/lib/gsap-ready";
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
//   GSAP is still interaction-gated (scroll/wheel/touchstart) so it never
//   runs during headless Lighthouse simulation.
//   On route change we bypass the gate — the user has already interacted
//   to navigate. The `hasInteracted` ref persists across navigations.
// ─────────────────────────────────────────────────────────────────────────────

type GSAPType = typeof import("gsap").default;
type LenisType = import("lenis").default;
type STType = typeof import("gsap/ScrollTrigger").ScrollTrigger;

const EDITABLE_SELECTOR = 'input, textarea, select, [contenteditable=""], [contenteditable="true"]';
const HANDLED_SCROLL_KEYS = new Set([
  "ArrowDown",
  "ArrowUp",
  "PageDown",
  "PageUp",
  "Home",
  "End",
  " ",
  "Spacebar",
]);

function isEditableTarget(target: EventTarget | null): boolean {
  return target instanceof HTMLElement && !!target.closest(EDITABLE_SELECTOR);
}

function isHandledScrollKey(event: KeyboardEvent): boolean {
  return HANDLED_SCROLL_KEYS.has(event.key);
}

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Persist GSAP/Lenis instances across re-initialisations
  const gsapRef = useRef<GSAPType | null>(null);
  const lenisRef = useRef<LenisType | null>(null);
  const STRef = useRef<STType | null>(null);
  const hasInteracted = useRef(false);
  const initCycleRef = useRef(0);

  useLayoutEffect(() => {
    initCycleRef.current += 1;
    resetGsapReady();

    // Always start new route renders at the top, regardless of previous page position.
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  useEffect(() => {
    let fallbackIO: IntersectionObserver | null = null;
    const cycle = initCycleRef.current;
    let cancelled = false;
    let loadHandler: (() => void) | null = null;

    const isCurrentCycle = () => !cancelled && cycle === initCycleRef.current;

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

      // Step 3: (scroll reset removed — Next.js App Router handles scroll-to-top
      // on navigation natively. Forcing window.scrollTo(0,0) here was causing
      // a visible jump/snap on route changes, especially on Services page.)

      // Step 4: Import GSAP (may be cached from previous init — that's fine)
      const [{ default: gsapFresh }, { ScrollTrigger }, { default: LenisCtor }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

      if (!isCurrentCycle()) return;

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
      const removeLenisScrollListener = lenisNew.on("scroll", ScrollTrigger.update);

      // Remove any previous ticker callbacks before adding a new one
      gsapFresh.ticker.lagSmoothing(0);
      const lenisRaf = (time: number) => lenisNew.raf(time * 1000);
      gsapFresh.ticker.add(lenisRaf);

      const onKeyboardScroll = (event: KeyboardEvent) => {
        if (event.defaultPrevented) return;
        if (!isHandledScrollKey(event)) return;
        if (event.metaKey || event.ctrlKey || event.altKey) return;
        if (isEditableTarget(event.target)) return;

        const currentTarget = lenisNew.targetScroll;
        const arrowStep = Math.max(120, Math.round(window.innerHeight * 0.12));
        const pageStep = Math.max(arrowStep * 4, Math.round(window.innerHeight * 0.9));
        let nextTarget = currentTarget;

        switch (event.key) {
          case "ArrowDown":
            nextTarget += arrowStep;
            break;
          case "ArrowUp":
            nextTarget -= arrowStep;
            break;
          case "PageDown":
            nextTarget += pageStep;
            break;
          case "PageUp":
            nextTarget -= pageStep;
            break;
          case "Home":
            nextTarget = 0;
            break;
          case "End":
            nextTarget = lenisNew.limit;
            break;
          case " ":
          case "Spacebar":
            nextTarget += event.shiftKey ? -pageStep : pageStep;
            break;
          default:
            return;
        }

        event.preventDefault();

        lenisNew.scrollTo(Math.max(0, Math.min(lenisNew.limit, nextTarget)), {
          duration: 0.9,
          force: true,
          userData: { initiator: "keyboard" },
        });
      };
      window.addEventListener("keydown", onKeyboardScroll, { capture: true });

      // Step 6: ScrollTrigger.refresh() after a tick to let React finish
      // painting the new page DOM before calculating trigger positions
      requestAnimationFrame(() => {
        if (!isCurrentCycle()) return;
        // Two rAFs to ensure the new page DOM has fully painted before we
        // measure element positions in ScrollTrigger.refresh().
        requestAnimationFrame(() => {
          if (!isCurrentCycle()) return;
          setTimeout(() => {
            if (!isCurrentCycle()) return;
            ScrollTrigger.refresh();
            // On mobile (touch devices), skip scroll-reveal animations entirely.
            // GSAP scroll-reveals on mobile cause the flash-in jank: elements are
            // set to opacity:0 by gsap.set(), then pop in when ScrollTrigger fires.
            // Mobile users scroll fast and expectations are different — content
            // should be visible immediately. Animations are a desktop enhancement.
            const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
            if (!isMobile) {
              setupAnimations(gsapFresh);
            } else {
              // On mobile: force all [data-animate] elements to full visibility immediately.
              // No pop-in, no opacity:0, no jank.
              document.querySelectorAll<HTMLElement>(
                '[data-animate], [data-animate-child], [data-animate-children]'
              ).forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
                el.dataset.gsapDone = 'true';
              });
              // Also force brass rules visible
              document.querySelectorAll<HTMLElement>('.brass-rule').forEach(el => {
                el.style.width = '48px';
              });
            }
            // Signal component-level triggers that GSAP is ready.
            signalGsapReady({ gsap: gsapFresh, ScrollTrigger });
          }, 200);
        }); // second rAF
      });

      // Also refresh once everything (fonts, images) is fully loaded
      loadHandler = () => {
        setTimeout(() => {
          if (!isCurrentCycle()) return;
          ScrollTrigger.refresh();
        }, 200);
      };
      window.addEventListener("load", loadHandler, { once: true });

      return () => {
        removeLenisScrollListener();
        window.removeEventListener("keydown", onKeyboardScroll, true);
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
      window.addEventListener("wheel", onInteraction, { passive: true, once: true });
      window.addEventListener("scroll", onInteraction, { passive: true, once: true });
      window.addEventListener("touchstart", onInteraction, { passive: true, once: true });

      return () => {
        cancelled = true;
        window.removeEventListener("wheel", onInteraction);
        window.removeEventListener("scroll", onInteraction);
        window.removeEventListener("touchstart", onInteraction);
        if (loadHandler) window.removeEventListener("load", loadHandler);
        if (fallbackIO) fallbackIO.disconnect();
      };
    }

    return () => {
      cancelled = true;
      if (loadHandler) window.removeEventListener("load", loadHandler);
      if (fallbackIO) fallbackIO.disconnect();
    };
  }, [pathname]);

  return <>{children}</>;
}

// ── Animation setup — called after ScrollTrigger.refresh() ─────────────────
// Runs fresh on every route change against the current DOM.
function setupAnimations(
  gsap: GSAPType
) {
  // This function is only called on non-touch/desktop devices (see call site).
  // Section fade-up entrances
  const sections = document.querySelectorAll<HTMLElement>("[data-animate]");
  sections.forEach((el) => {
    if (el.dataset.gsapDone === "true") return; // fallback already showed it
    if (el.querySelector("img")) return; // never animate wrappers containing images
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
