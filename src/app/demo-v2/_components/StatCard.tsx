"use client";

import { useEffect, useRef, useState } from "react";
import { cn, formatMoney } from "../_lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  format?: "money" | "number";
  accent?: string;
  icon?: React.ReactNode;
}

export function StatCard({
  label,
  value,
  format = "money",
  accent = "#0B4042",
  icon,
}: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number>(0);
  const startTime = useRef<number>(0);

  useEffect(() => {
    const duration = 800;
    startTime.current = performance.now();
    const from = 0;
    const to = value;

    function tick(now: number) {
      const elapsed = now - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(from + (to - from) * eased));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  const formatted =
    format === "money"
      ? formatMoney(displayValue)
      : displayValue.toLocaleString("fr-FR");

  return (
    <div
      className="v2-stat-accent bg-white p-6 md:p-7"
      style={{ "--accent-color": accent } as React.CSSProperties}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-sm font-medium text-ink-soft/75 uppercase tracking-wide">
          {label}
        </span>
        {icon && (
          <span className="text-ink-soft/50">{icon}</span>
        )}
      </div>
      <div className={cn("text-3xl md:text-4xl font-bold text-ink tracking-tight")}>
        {formatted}
      </div>
    </div>
  );
}
