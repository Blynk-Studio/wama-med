"use client";

import dynamic from "next/dynamic";

// Loaded lazily — off the hydration critical path to improve LCP
export const LazyCustomCursor = dynamic(
  () => import("@/components/ui/CustomCursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);

export const LazyAIWidget = dynamic(
  () => import("@/components/widgets/AIWidget").then((m) => ({ default: m.AIWidget })),
  { ssr: false }
);
