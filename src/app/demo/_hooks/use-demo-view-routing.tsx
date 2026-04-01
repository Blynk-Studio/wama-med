"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DemoView } from "../_lib/types";
import { parseDemoView } from "../_lib/utils";

const DemoViewContext = createContext<{
  activeView: DemoView;
  setActiveView: (view: DemoView) => void;
} | null>(null);

export function DemoViewProvider({
  initialView,
  children,
}: {
  initialView: DemoView;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const rawView = searchParams.get("view");
  const parsedView = parseDemoView(rawView);
  const activeView = parsedView ?? initialView;

  useEffect(() => {
    if (rawView === null) return;

    if (parsedView === null || parsedView === "overview") {
      const params = new URLSearchParams(searchParamsString);
      params.delete("view");
      const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(nextUrl, { scroll: false });
    }
  }, [parsedView, pathname, rawView, router, searchParamsString]);

  const setActiveView = useCallback(
    (view: DemoView) => {
      const params = new URLSearchParams(searchParamsString);

      if (view === "overview") {
        params.delete("view");
      } else {
        params.set("view", view);
      }

      const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
      router.replace(nextUrl, { scroll: false });
    },
    [pathname, router, searchParamsString],
  );

  const value = useMemo(
    () => ({ activeView, setActiveView }),
    [activeView, setActiveView],
  );

  return <DemoViewContext.Provider value={value}>{children}</DemoViewContext.Provider>;
}

export function useDemoViewRouting() {
  const context = useContext(DemoViewContext);

  if (!context) {
    throw new Error("useDemoViewRouting must be used within DemoViewProvider.");
  }

  return context;
}
