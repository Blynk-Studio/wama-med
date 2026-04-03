"use client";

import { cn } from "../_lib/utils";

interface BadgeProps {
  label: string;
  color: string;
  bg: string;
  className?: string;
  dot?: boolean;
}

export function Badge({ label, color, bg, className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold",
        className,
      )}
      style={{ backgroundColor: bg, color }}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      {label}
    </span>
  );
}
