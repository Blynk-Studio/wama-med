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
          className="flex items-center gap-3 bg-white rounded-2xl p-4 md:p-5 border border-[var(--demo-border)]"
        >
          {item.icon && (
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: item.accent || "var(--color-stone)" }}
            >
              {item.icon}
            </div>
          )}
          <div className="min-w-0">
            <p className="text-[1.4rem] font-bold leading-none text-ink tabular-nums">{item.value}</p>
            <p className="text-[13px] text-[var(--demo-muted)] truncate mt-1">{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
