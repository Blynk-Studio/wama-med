"use client";

import { Check } from "lucide-react";
import { cn } from "../_lib/utils";
import type { CaseStage, StageHistoryEntry } from "../_lib/types";

const ALL_STAGES: CaseStage[] = [
  "Nouveau", "Qualification", "Validation", "Planification", "Sur place", "Cloture",
];

const STAGE_SHORT: Record<CaseStage, string> = {
  Nouveau: "Nouveau",
  Qualification: "Qualif.",
  Validation: "Valid.",
  Planification: "Planif.",
  "Sur place": "Sur place",
  Cloture: "Cloture",
};

interface Props {
  currentStage: CaseStage;
  stageHistory: StageHistoryEntry[];
  progressPercent: number;
}

export function JourneyTimeline({ currentStage, stageHistory, progressPercent }: Props) {
  const currentIdx = ALL_STAGES.indexOf(currentStage);

  return (
    <div className="bg-gradient-to-r from-stone/40 to-stone/20 rounded-2xl p-5 border border-[var(--demo-border)]">
      {/* Progress bar header */}
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-medium tracking-[0.12em] uppercase text-[var(--demo-muted)]">
          Parcours patient
        </span>
        <span className="text-[11px] font-bold text-teal tabular-nums">
          {progressPercent}%
        </span>
      </div>

      {/* Overall progress bar */}
      <div className="h-1 bg-stone-dark/50 rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal to-emerald-500 rounded-full transition-all duration-700"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Stage nodes */}
      <div className="flex items-start">
        {ALL_STAGES.map((stage, i) => {
          const isPast = i < currentIdx;
          const isCurrent = i === currentIdx;
          const isFuture = i > currentIdx;
          const historyEntry = stageHistory.find((h) => h.stage === stage);

          return (
            <div key={stage} className="flex-1 flex flex-col items-center relative">
              {/* Connector line */}
              {i > 0 && (
                <div
                  className={cn(
                    "absolute top-3 right-1/2 left-[-50%] h-0.5",
                    isPast || isCurrent ? "bg-teal" : "bg-stone-dark/40"
                  )}
                  style={{ width: "100%", left: "-50%" }}
                />
              )}

              {/* Node */}
              <div
                className={cn(
                  "relative z-10 w-6 h-6 rounded-full flex items-center justify-center transition-all",
                  isPast && "bg-teal text-cream",
                  isCurrent && "bg-teal text-cream ring-4 ring-teal/20 demo-status-dot-live",
                  isFuture && "bg-stone-dark/30 text-[var(--demo-muted)]"
                )}
              >
                {isPast ? (
                  <Check size={12} strokeWidth={3} />
                ) : isCurrent ? (
                  <div className="w-2 h-2 rounded-full bg-cream" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--demo-muted)]/50" />
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-[10px] mt-2 text-center leading-tight font-medium",
                  isCurrent ? "text-teal" : isPast ? "text-ink-soft" : "text-[var(--demo-muted)]"
                )}
              >
                {STAGE_SHORT[stage]}
              </span>

              {/* Duration / Status */}
              {historyEntry && (
                <span className="text-[9px] text-[var(--demo-muted)] mt-0.5 text-center">
                  {historyEntry.duration || (isCurrent ? "En cours" : "")}
                </span>
              )}
              {isFuture && !historyEntry && (
                <span className="text-[9px] text-[var(--demo-muted)]/50 mt-0.5">—</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
