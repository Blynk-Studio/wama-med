"use client";

import { Workspace } from "./Workspace";

export function DemoApp() {
  return (
    <div
      className="demo-root h-screen w-screen overflow-hidden bg-cream flex items-center justify-center p-3"
      style={{
        /* Demo-scoped color tokens */
        "--demo-success": "#16a34a",
        "--demo-warning": "#d97706",
        "--demo-info": "#2563eb",
        "--demo-muted": "#897770",
        "--demo-border": "rgba(28, 20, 16, 0.08)",
      } as React.CSSProperties}
    >
      <Workspace />
    </div>
  );
}
