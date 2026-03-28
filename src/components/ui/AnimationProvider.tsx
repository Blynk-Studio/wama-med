"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type GSAPType = typeof import("gsap").default;
export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;

    let isActive = true;

    const init = async () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (typeof history !== "undefined") {
        history.scrollRestoration = "manual";
      }

      const [{ default: gsap }, { ScrollTrigger }, { default: LenisCtor }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);

      if (!isActive) return;

      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      ScrollTrigger.clearScrollMemory();

      let cleanup = () => {};

      if (reducedMotion) {
        document
          .querySelectorAll<HTMLElement>("[data-animate], [data-animate-child]")
          .forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "none";
          });
        cleanupRef.current = cleanup;
        return;
      }

      const lenis = new LenisCtor({
        duration: 1.1,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const onLenisScroll = () => ScrollTrigger.update();
      const onLoad = () => window.setTimeout(() => ScrollTrigger.refresh(), 120);
      const onFontsReady = () => window.setTimeout(() => ScrollTrigger.refresh(), 120);
      const lenisRaf = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", onLenisScroll);
      gsap.ticker.lagSmoothing(0);
      gsap.ticker.add(lenisRaf);

      setupAnimations(gsap);

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      window.addEventListener("load", onLoad, { once: true });
      document.fonts?.ready.then(onFontsReady).catch(() => {});

      cleanup = () => {
        gsap.ticker.remove(lenisRaf);
        lenis.off("scroll", onLenisScroll);
        lenis.destroy();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };

      cleanupRef.current = cleanup;
    };

    void init();

    return () => {
      isActive = false;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [pathname]);

  return <>{children}</>;
}

function setupAnimations(gsap: GSAPType) {
  const sections = document.querySelectorAll<HTMLElement>("[data-animate]");
  sections.forEach((el) => {
    gsap.set(el, { opacity: 0, y: 32 });
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

  setTimeout(() => {
    document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
      if (window.getComputedStyle(el).opacity === "0") {
        gsap.to(el, { opacity: 1, y: 0, duration: 0.3 });
      }
    });
  }, 2000);

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
