"use client";

import type { ReactNode } from "react";
import { useDemoStore } from "../_lib/store";
import { cn } from "../_lib/utils";
import { useRoleFocus } from "../_hooks/use-role-meta";
import type { PanelId, Role } from "../_lib/types";

const ROLE_PANEL_STYLES: Record<Role, string> = {
  coordinator:
    "border-teal/25 ring-1 ring-teal/12 shadow-[0_18px_42px_-28px_rgba(11,64,66,0.4)]",
  manager:
    "border-brass/28 ring-1 ring-brass/15 shadow-[0_18px_42px_-28px_rgba(184,144,58,0.35)]",
  finance:
    "border-amber-500/30 ring-1 ring-amber-500/12 shadow-[0_18px_42px_-28px_rgba(217,119,6,0.35)]",
  leadership:
    "border-teal-light/28 ring-1 ring-teal-light/12 shadow-[0_18px_42px_-28px_rgba(21,85,88,0.35)]",
};

export function FocusPanel({
  panelId,
  className,
  children,
}: {
  panelId: PanelId;
  className?: string;
  children: ReactNode;
}) {
  const role = useDemoStore((s) => s.role);
  const focused = useRoleFocus(panelId);

  return (
    <div
      className={cn(
        "rounded-2xl border border-[var(--demo-border)] bg-white/96 shadow-[0_10px_26px_-22px_rgba(53,31,22,0.24)] transition-[border-color,box-shadow,transform] duration-200",
        focused && ROLE_PANEL_STYLES[role],
        className,
      )}
    >
      {children}
    </div>
  );
}
