"use client";

import { cn } from "../_lib/utils";

interface KpiCardProps {
  label: string;
  value: string | number;
  delta?: string;
  accentColor?: string;
  className?: string;
}

export function KpiCard({ label, value, delta, accentColor, className }: KpiCardProps) {
  return (
    <div
      className={cn(
        "demo-card demo-kpi-accent bg-white rounded-2xl p-5 border border-[var(--demo-border)]",
        className
      )}
      style={{ "--accent-color": accentColor } as React.CSSProperties}
    >
      <p className="text-[11px] font-medium tracking-wide uppercase text-[var(--demo-muted)] mb-2">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-ink tabular-nums">
          {value}
        </span>
        {delta && (
          <span
            className={cn(
              "text-xs font-medium",
              delta.startsWith("+") || delta.startsWith("↑")
                ? "text-[var(--demo-success)]"
                : delta.startsWith("-") || delta.startsWith("↓")
                ? "text-red-600"
                : "text-[var(--demo-muted)]"
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
