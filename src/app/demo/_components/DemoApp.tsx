"use client";

import type { DemoView } from "../_lib/types";
import { DemoViewProvider } from "../_hooks/use-demo-view-routing";
import { Workspace } from "./Workspace";

export function DemoApp({ initialView }: { initialView: DemoView }) {
  return (
    <div
      className="demo-root min-h-dvh w-full bg-cream p-0 md:h-screen md:w-screen md:overflow-hidden md:flex md:items-center md:justify-center md:p-3"
      style={{
        /* Demo-scoped color tokens */
        "--demo-success": "#16a34a",
        "--demo-warning": "#d97706",
        "--demo-info": "#2563eb",
        "--demo-muted": "#897770",
        "--demo-border": "rgba(28, 20, 16, 0.08)",
      } as React.CSSProperties}
    >
      <DemoViewProvider initialView={initialView}>
        <Workspace />
      </DemoViewProvider>
    </div>
  );
}
