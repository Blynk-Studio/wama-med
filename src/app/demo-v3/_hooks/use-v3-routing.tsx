"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useDemoV3Store } from "../_lib/store";

export function useV3UrlSync() {
  const router = useRouter();
  const pathname = usePathname();
  const activeView = useDemoV3Store((state) => state.activeView);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const current = params.get("view") ?? "dashboard";

    if (activeView === "dashboard" && current !== "dashboard") {
      params.delete("view");
      const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(nextUrl, { scroll: false });
      return;
    }

    if (activeView !== "dashboard" && current !== activeView) {
      params.set("view", activeView);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [activeView, pathname, router]);
}
