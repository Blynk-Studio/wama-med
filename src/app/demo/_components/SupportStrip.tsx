"use client";

import type { ReactNode } from "react";
import { cn } from "../_lib/utils";

interface StripItem {
  label: string;
  value: string | number;
  icon?: ReactNode;
  accent?: string;
}

export function SupportStrip({ items, className }: { items: StripItem[]; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-3", className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center gap-3 bg-white rounded-xl p-4 border border-[var(--demo-border)]"
        >
          {item.icon && (
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: item.accent || "var(--color-stone)" }}
            >
              {item.icon}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-lg font-bold text-ink tabular-nums">{item.value}</p>
            <p className="text-[11px] text-[var(--demo-muted)] truncate">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
