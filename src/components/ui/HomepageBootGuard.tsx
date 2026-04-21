"use client";

import { useEffect } from "react";

const BOOT_TIMEOUT_MS = 2200;
const JOURNEY_READY_EVENT = "wama:scroll-journey-ready";

function releaseHomeBoot(fadeCleanupDelay = 700) {
  const root = document.documentElement;
  root.classList.remove("wama-home-boot-lock");
  root.classList.add("wama-home-boot-ready");

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "auto";
  }

  window.setTimeout(() => {
    root.classList.remove("wama-home-boot-ready");
  }, fadeCleanupDelay);
}

export function HomepageBootGuard() {
  useEffect(() => {
    let released = false;
    let timeoutId = 0;
    const root = document.documentElement;

    const release = () => {
      if (released) return;
      released = true;
      window.clearTimeout(timeoutId);
      window.removeEventListener(JOURNEY_READY_EVENT, release);
      releaseHomeBoot();
    };

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    root.classList.add("wama-home-boot-lock");
    root.classList.remove("wama-home-boot-ready");
    window.scrollTo(0, 0);

    window.addEventListener(JOURNEY_READY_EVENT, release, { once: true });
    timeoutId = window.setTimeout(release, BOOT_TIMEOUT_MS);

    if (document.querySelector('[data-scroll-journey-ready="true"]')) {
      requestAnimationFrame(release);
    }

    return () => {
      release();
    };
  }, []);

  return (
    <div className="wama-home-boot" aria-hidden="true">
      <div className="wama-home-boot__mark">
        <span className="wama-home-boot__monogram">W</span>
        <span className="wama-home-boot__ring" />
      </div>
    </div>
  );
}
