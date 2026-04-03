"use client";

import { useEffect } from "react";
import type { DemoV2View } from "../_lib/types";
import { useDemoV2Store } from "../_lib/store";
import { useV2UrlSync } from "../_hooks/use-v2-routing";
import { ToastProvider } from "./Toast";
import { Shell } from "./Shell";

export function DemoV2App({ initialView }: { initialView: DemoV2View }) {
  const setView = useDemoV2Store((s) => s.setView);

  /* Seed the store with the server-parsed initial view */
  useEffect(() => {
    if (initialView !== "pipeline") {
      setView(initialView);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* Sync store → URL (no useSearchParams, no Suspense needed) */
  useV2UrlSync();

  return (
    <div className="demo-v2-root min-h-dvh bg-cream">
      <ToastProvider>
        <Shell />
      </ToastProvider>
    </div>
  );
}
