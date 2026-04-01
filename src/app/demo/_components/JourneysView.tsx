"use client";

import { useDemoData } from "../_hooks/use-demo-data";
import { useDemoStore } from "../_lib/store";
import { cn, getInitials, formatMoney, getBlockerInfo } from "../_lib/utils";
import { Badge } from "./Badge";
import { SupportStrip } from "./SupportStrip";
import { Route, ArrowRight, AlertTriangle, Clock, TrendingUp } from "lucide-react";
import type { CaseStage, PatientCase } from "../_lib/types";

const STAGES: CaseStage[] = [
  "Nouveau", "Qualification", "Validation", "Planification", "Sur place", "Cloture",
];

const STAGE_ACCENT: Record<CaseStage, string> = {
  Nouveau: "border-t-sky-400",
  Qualification: "border-t-violet-400",
  Validation: "border-t-indigo-400",
  Planification: "border-t-teal",
  "Sur place": "border-t-emerald-500",
  Cloture: "border-t-slate-400",
};

const STAGE_DOT: Record<CaseStage, string> = {
  Nouveau: "bg-sky-400",
  Qualification: "bg-violet-400",
  Validation: "bg-indigo-400",
  Planification: "bg-teal",
  "Sur place": "bg-emerald-500",
  Cloture: "bg-slate-400",
};

export function JourneysView() {
  const data = useDemoData();
  const openCase = useDemoStore((s) => s.openCase);

  const casesByStage = STAGES.map((stage) => ({
    stage,
    cases: data.cases.filter((c) => c.stage === stage),
  }));

  const totalValue = data.cases.reduce((s, c) => s + c.valueMad, 0);

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Dossiers en cours", value: data.cases.length, icon: <Route size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "Valeur pipeline", value: formatMoney(totalValue), icon: <TrendingUp size={18} className="text-brass" />, accent: "#fef3c7" },
          { label: "Bloques", value: data.cases.filter((c) => c.blocked).length, icon: <AlertTriangle size={18} className="text-red-500" />, accent: "#fef2f2" },
        ]}
      />

      {/* Kanban */}
      <div className="demo-kanban-scroll flex gap-3 pb-2">
        {casesByStage.map(({ stage, cases }) => {
          const stageValue = cases.reduce((s, c) => s + c.valueMad, 0);
          return (
            <div key={stage} className="min-w-[240px] flex-1">
              {/* Column header */}
              <div className={cn("border-t-[3px] rounded-t-xl pt-3 pb-2 px-3", STAGE_ACCENT[stage])}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", STAGE_DOT[stage])} />
                    <h3 className="text-xs font-semibold text-ink">{stage}</h3>
                  </div>
                  <span className="text-[11px] font-bold text-[var(--demo-muted)] bg-stone/60 rounded-full w-5 h-5 flex items-center justify-center">
                    {cases.length}
                  </span>
                </div>
                {stageValue > 0 && (
                  <p className="text-[10px] text-[var(--demo-muted)] tabular-nums">{formatMoney(stageValue)}</p>
                )}
              </div>

              {/* Cards */}
              <div className="space-y-2 mt-2">
                {cases.map((c) => (
                  <LaneCard key={c.id} c={c} onClick={() => openCase(c.id)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LaneCard({ c, onClick }: { c: PatientCase; onClick: () => void }) {
  const blocker = getBlockerInfo(c.blockerType);
  // Time-in-stage color: simulate based on stageHistory
  const currentHistory = c.stageHistory.find((h) => h.stage === c.stage);
  const isStuck = currentHistory?.duration && parseInt(currentHistory.duration) >= 3;
  const isModerate = currentHistory?.duration && parseInt(currentHistory.duration) >= 1;

  return (
    <button
      onClick={onClick}
      className="demo-card w-full text-left bg-white rounded-xl p-3 border border-[var(--demo-border)] focus-visible:outline-2 focus-visible:outline-brass"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center text-[9px] font-bold text-teal shrink-0">
          {getInitials(c.patient)}
        </div>
        <span className="text-xs font-semibold text-ink truncate flex-1">{c.patient}</span>
      </div>
      <p className="text-[11px] text-[var(--demo-muted)] truncate mb-1.5">{c.program}</p>

      {/* Next action preview */}
      <p className="text-[10px] text-ink-soft leading-snug mb-2 line-clamp-1">
        → {c.nextAction}
      </p>

      {/* Badges row */}
      <div className="flex items-center gap-1.5 mb-2">
        <Badge variant="priority" value={c.priority} />
        {blocker && (
          <span className={cn("text-[9px] font-bold px-1.5 py-0.5 rounded", blocker.bg, blocker.text)}>
            ← {blocker.label}
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1 bg-stone-dark/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal to-emerald-500 rounded-full"
            style={{ width: `${c.progressPercent}%` }}
          />
        </div>
        <span className="text-[9px] font-bold text-teal tabular-nums">{c.progressPercent}%</span>
      </div>

      {/* Time-in-stage indicator */}
      <div className="mt-2 flex items-center gap-1.5">
        <div className={cn(
          "h-0.5 flex-1 rounded-full",
          isStuck ? "bg-red-400" : isModerate ? "bg-amber-400" : "bg-emerald-400"
        )} />
        <span className="text-[9px] text-[var(--demo-muted)]">
          {currentHistory?.enteredAt ? `Depuis ${currentHistory.duration || "< 1j"}` : ""}
        </span>
      </div>
    </button>
  );
}
