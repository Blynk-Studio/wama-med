"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDemoV2Store } from "../_lib/store";

/**
 * Syncs the store's activeView to the URL search params.
 * Read is one-way: store → URL. The initial view comes from the server component.
 * This avoids useSearchParams() which requires Suspense and blocks hydration.
 */
export function useV2UrlSync() {
  const router = useRouter();
  const pathname = usePathname();
  const activeView = useDemoV2Store((s) => s.activeView);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const current = params.get("view") ?? "pipeline";

    if (activeView === "pipeline" && current !== "pipeline") {
      params.delete("view");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    } else if (activeView !== "pipeline" && current !== activeView) {
      params.set("view", activeView);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [activeView, router, pathname]);
}
