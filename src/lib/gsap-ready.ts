// ─────────────────────────────────────────────────────────────────────────────
// gsap-ready — global GSAP initialization signal
//
// WHY THIS EXISTS:
//   Multiple components (ServicesOverview, ScrollJourney, HeroSection, etc.)
//   each create their own GSAP ScrollTriggers via async imports. AnimationProvider
//   calls ScrollTrigger.refresh() at 100ms after init. If a component's async
//   import resolves AFTER that refresh, its ScrollTrigger positions are calculated
//   against a stale layout — causing the hiccup / blank section on first scroll.
//
// THE FIX:
//   1. AnimationProvider resolves `gsapReadyResolve` once GSAP is fully init'd
//      and ScrollTrigger.refresh() has run.
//   2. Any component that creates its own ScrollTrigger awaits `waitForGsap()`
//      before calling ScrollTrigger.create(). This ensures all triggers are
//      registered against a stable, refreshed scroll layout.
//
// ARCHITECTURE RULE:
//   AnimationProvider owns the GSAP init lifecycle.
//   Individual components are consumers — they wait, they don't race.
// ─────────────────────────────────────────────────────────────────────────────

type GSAPReadyPayload = {
  gsap: typeof import("gsap").default;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
};

let gsapReadyResolve!: (value: GSAPReadyPayload) => void;

const gsapReadyPromise = new Promise<GSAPReadyPayload>((resolve) => {
  gsapReadyResolve = resolve;
});

/** Called by AnimationProvider once GSAP + ScrollTrigger are fully initialized and refresh() has run. */
export function signalGsapReady(payload: GSAPReadyPayload) {
  gsapReadyResolve(payload);
}

/** Awaited by any component that needs to create its own ScrollTrigger. */
export function waitForGsap(): Promise<GSAPReadyPayload> {
  return gsapReadyPromise;
}
