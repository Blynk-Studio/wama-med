"use client";

import dynamic from "next/dynamic";

// Loaded lazily — off the hydration critical path to improve LCP
export const LazyAIWidget = dynamic(
  () => import("@/components/widgets/AIWidget").then((m) => ({ default: m.AIWidget })),
  { ssr: false }
);
