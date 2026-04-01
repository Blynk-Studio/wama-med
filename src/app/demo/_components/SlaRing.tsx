"use client";

import { getSlaStatus } from "../_lib/utils";

interface Props {
  slaHours: number;
  size?: number;
}

export function SlaRing({ slaHours, size = 48 }: Props) {
  const { color, percent, label } = getSlaStatus(slaHours);
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent / 100);

  return (
    <div className="flex items-center gap-3">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        {/* Background ring */}
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(28,20,16,0.06)"
            strokeWidth={3}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-700"
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold tabular-nums" style={{ color }}>
            {percent}%
          </span>
        </div>
      </div>
      <div>
        <p className="text-[13px] font-medium text-ink">{label}</p>
        <p className="text-xs text-[var(--demo-muted)] mt-0.5">SLA : {slaHours}h</p>
      </div>
    </div>
  );
}
