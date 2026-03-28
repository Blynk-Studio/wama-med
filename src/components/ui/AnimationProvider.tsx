"use client";

import { useEffect } from "react";

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const init = async () => {
      // MUST be first — resets browser-stored scroll before Lenis init
      if (typeof history !== "undefined") history.scrollRestoration = "manual";
      window.scrollTo(0, 0);

      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

      gsap.registerPlugin(ScrollTrigger);

      // Init Lenis
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      // Connect Lenis to GSAP ticker
      gsap.ticker.add((time: number) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Animate sections with data-animate attribute
      const sections = document.querySelectorAll<HTMLElement>("[data-animate]");
      sections.forEach((el) => {
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
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      // Animate staggered children
      const childGroups =
        document.querySelectorAll<HTMLElement>("[data-animate-children]");
      childGroups.forEach((parent) => {
        const children = parent.querySelectorAll<HTMLElement>(
          "[data-animate-child]"
        );
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
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      // CountUp animations via IntersectionObserver (not ScrollTrigger)
      initCountUps(gsap);

      return () => {
        lenis.destroy();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    };

    const cleanup = init();
    return () => {
      cleanup.then((fn) => fn && fn());
    };
  }, []);

  return <>{children}</>;
}

function initCountUps(gsap: typeof import("gsap").default) {
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
              (isDecimal
                ? obj.val.toFixed(1)
                : Math.round(obj.val).toString()) +
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
