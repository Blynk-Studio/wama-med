"use client";

import { useDemoData } from "../_hooks/use-demo-data";
import { useDemoStore } from "../_lib/store";
import { cn, getInitials } from "../_lib/utils";
import { Badge } from "./Badge";
import { SupportStrip } from "./SupportStrip";
import { Route, ArrowRight, AlertTriangle } from "lucide-react";
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

export function JourneysView() {
  const data = useDemoData();
  const openCase = useDemoStore((s) => s.openCase);

  const casesByStage = STAGES.map((stage) => ({
    stage,
    cases: data.cases.filter((c) => c.stage === stage),
  }));

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Dossiers en cours", value: data.cases.length, icon: <Route size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "Flux moyen", value: "4.2j", icon: <ArrowRight size={18} className="text-brass" />, accent: "#fef3c7" },
          { label: "Bloques", value: data.cases.filter((c) => c.blocked).length, icon: <AlertTriangle size={18} className="text-red-500" />, accent: "#fef2f2" },
        ]}
      />

      {/* Kanban */}
      <div className="demo-kanban-scroll flex gap-3 pb-2">
        {casesByStage.map(({ stage, cases }) => (
          <div key={stage} className="min-w-[220px] flex-1">
            {/* Column header */}
            <div className={cn("border-t-[3px] rounded-t-xl pt-3 pb-2 px-3", STAGE_ACCENT[stage])}>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-ink">{stage}</h3>
                <span className="text-[11px] font-bold text-[var(--demo-muted)] bg-stone/60 rounded-full w-5 h-5 flex items-center justify-center">
                  {cases.length}
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="space-y-2 mt-2">
              {cases.map((c) => (
                <LaneCard key={c.id} c={c} onClick={() => openCase(c.id)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LaneCard({ c, onClick }: { c: PatientCase; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="demo-card w-full text-left bg-white rounded-xl p-3 border border-[var(--demo-border)] focus-visible:outline-2 focus-visible:outline-brass"
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div className="w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center text-[9px] font-bold text-teal shrink-0">
          {getInitials(c.patient)}
        </div>
        <span className="text-xs font-semibold text-ink truncate">{c.patient}</span>
      </div>
      <p className="text-[11px] text-[var(--demo-muted)] truncate mb-2">{c.program}</p>
      <div className="flex items-center gap-1.5">
        <Badge variant="priority" value={c.priority} />
        {c.blocked && (
          <span className="text-[10px] font-medium text-red-600">Bloque</span>
        )}
      </div>
    </button>
  );
}
