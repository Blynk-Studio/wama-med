"use client";

import {
  Clock,
  FileWarning,
  MessageSquare,
  Route,
  TrendingUp,
  User,
} from "lucide-react";
import { useSearchScopedData } from "../_hooks/use-search-scoped-data";
import { useDemoStore } from "../_lib/store";
import { cn, formatMoney, getBlockerInfo, getInitials, getSlaStatus } from "../_lib/utils";
import { Badge } from "./Badge";
import { SupportStrip } from "./SupportStrip";
import { EmptyState } from "./EmptyState";
import { FocusPanel } from "./FocusPanel";
import type { CaseStage, PatientCase } from "../_lib/types";

const STAGES: CaseStage[] = [
  "Nouveau",
  "Qualification",
  "Validation",
  "Planification",
  "Sur place",
  "Cloture",
];

const STAGE_META: Record<CaseStage, { gradient: string; dot: string; label: string }> = {
  Nouveau: { gradient: "from-sky-500 to-sky-400", dot: "bg-sky-400", label: "Nouveau" },
  Qualification: { gradient: "from-violet-500 to-violet-400", dot: "bg-violet-400", label: "Qualification" },
  Validation: { gradient: "from-indigo-500 to-indigo-400", dot: "bg-indigo-400", label: "Validation" },
  Planification: { gradient: "from-teal to-teal-light", dot: "bg-teal", label: "Planification" },
  "Sur place": { gradient: "from-emerald-600 to-emerald-500", dot: "bg-emerald-500", label: "Sur place" },
  Cloture: { gradient: "from-slate-500 to-slate-400", dot: "bg-slate-400", label: "Clôture" },
};

const COUNTRY_FLAGS: Record<string, string> = {
  Senegal: "🇸🇳",
  Maroc: "🇲🇦",
  "Cote d'Ivoire": "🇨🇮",
  Mali: "🇲🇱",
  France: "🇫🇷",
  Guinee: "🇬🇳",
};

export function JourneysView() {
  const { data, searchActive } = useSearchScopedData();
  const openCase = useDemoStore((s) => s.openCase);

  const casesByStage = STAGES.map((stage) => ({
    stage,
    cases: data.cases.filter((c) => c.stage === stage),
    value: data.cases.filter((c) => c.stage === stage).reduce((sum, c) => sum + c.valueMad, 0),
  }));
  const totalValue = data.cases.reduce((sum, c) => sum + c.valueMad, 0);
  const avgProgress = data.cases.length
    ? Math.round(data.cases.reduce((sum, c) => sum + c.progressPercent, 0) / data.cases.length)
    : 0;

  return (
    <div className="space-y-6">
      <SupportStrip
        items={[
          { label: "Dossiers visibles", value: data.cases.length, icon: <Route size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "Valeur pipeline", value: formatMoney(totalValue), icon: <TrendingUp size={18} className="text-brass" />, accent: "#fef3c7" },
          { label: "Progression moyenne", value: `${avgProgress}%`, icon: <TrendingUp size={18} className="text-emerald-600" />, accent: "#ecfdf5" },
        ]}
      />

      <FocusPanel panelId="journeyPanel" className="p-4 md:p-5 overflow-hidden">
        {data.cases.length === 0 ? (
          <EmptyState message={searchActive ? "Aucun parcours ne correspond à cette recherche." : "Aucun parcours visible."} />
        ) : (
          <div className="demo-kanban-board">
            {casesByStage.map(({ stage, cases, value }) => {
              const meta = STAGE_META[stage];

              return (
                <div key={stage} className="demo-kanban-col">
                  <div className="pb-2">
                    <div className="rounded-xl overflow-hidden border border-[var(--demo-border)] bg-white">
                      <div className={cn("h-1 bg-gradient-to-r", meta.gradient)} />
                      <div className="px-4 py-3">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <div className={cn("w-2.5 h-2.5 rounded-full shrink-0", meta.dot)} />
                            <h3 className="text-[15px] font-semibold text-ink">{meta.label}</h3>
                          </div>
                          <span
                            className={cn(
                              "text-xs font-semibold px-2 py-1 rounded-full",
                              cases.length > 0 ? "bg-ink/5 text-ink" : "bg-stone/60 text-[var(--demo-muted)]",
                            )}
                          >
                            {cases.length}
                          </span>
                        </div>
                        {value > 0 && (
                          <p className="text-[13px] text-[var(--demo-muted)] mt-1 tabular-nums font-medium">
                            {formatMoney(value)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 min-h-[140px]">
                    {cases.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-10 text-center rounded-xl border-2 border-dashed border-stone-dark/20">
                        <div className={cn("w-3 h-3 rounded-full mb-2 opacity-30", meta.dot)} />
                        <p className="text-[13px] text-[var(--demo-muted)]">Aucun dossier</p>
                      </div>
                    ) : (
                      cases.map((c) => (
                        <PipelineCard key={c.id} c={c} onClick={() => openCase(c.id)} />
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </FocusPanel>
    </div>
  );
}

function PipelineCard({ c, onClick }: { c: PatientCase; onClick: () => void }) {
  const blocker = c.blocked ? getBlockerInfo(c.blockerType) : null;
  const watch = !c.blocked ? getBlockerInfo(c.watchType ?? null) : null;
  const sla = getSlaStatus(c.slaHours);
  const flag = COUNTRY_FLAGS[c.country] || "";
  const currentHistory = c.stageHistory.find((h) => h.stage === c.stage);
  const durationDays = currentHistory?.duration ? parseInt(currentHistory.duration, 10) : 0;
  const timeColor = durationDays >= 3 ? "text-red-600" : durationDays >= 1 ? "text-amber-600" : "text-emerald-600";
  const timeBg = durationDays >= 3 ? "bg-red-500" : durationDays >= 1 ? "bg-amber-400" : "bg-emerald-400";

  return (
    <button
      onClick={onClick}
      className={cn(
        "demo-card w-full text-left bg-white rounded-2xl border border-[var(--demo-border)] overflow-hidden focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2",
        c.blocked && "ring-1 ring-red-300",
      )}
    >
      <div className={cn("h-[3px]", timeBg)} />

      <div className="p-4 md:p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl bg-teal/8 flex items-center justify-center text-xs font-bold text-teal">
              {getInitials(c.patient)}
            </div>
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: sla.color }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-ink leading-tight truncate">
              {c.patient}
            </p>
            <p className="text-[13px] text-[var(--demo-muted)] flex items-center gap-1.5 mt-0.5">
              {flag && <span className="text-sm">{flag}</span>}
              <span className="truncate">{c.cityPath}</span>
            </p>
          </div>
        </div>

        <p className="text-[13px] text-ink-soft font-medium mb-3 leading-relaxed">{c.program}</p>

        <div className="bg-stone/40 rounded-xl px-3 py-2.5 mb-3">
          <p className="text-[13px] text-ink leading-relaxed line-clamp-2">
            {c.nextAction}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="priority" value={c.priority} />
          {blocker && (
            <span className={cn("text-xs font-semibold px-2 py-1 rounded-lg", blocker.bg, blocker.text)}>
              Bloqué · {blocker.label}
            </span>
          )}
          {!blocker && watch && (
            <span className={cn("text-xs font-medium px-2 py-1 rounded-lg", watch.bg, watch.text)}>
              Vigilance · {watch.label}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-1.5 bg-stone-dark/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${c.progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-semibold text-teal tabular-nums w-9 text-right">
            {c.progressPercent}%
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-[var(--demo-border)]">
          <div className="flex items-center gap-3 text-[13px] text-[var(--demo-muted)] flex-wrap">
            <span className="flex items-center gap-1.5">
              <User size={13} />
              <span className="font-medium">{c.owner.split(" ")[0]}</span>
            </span>
            <span className="flex items-center gap-1.5" style={{ color: sla.color }}>
              <Clock size={13} />
              <span className="font-medium tabular-nums">{c.slaHours}h</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[13px]">
            {c.unread > 0 && (
              <span className="flex items-center gap-1 text-orange-600 font-semibold">
                <MessageSquare size={13} />
                {c.unread}
              </span>
            )}
            {c.docsPending > 0 && (
              <span className="flex items-center gap-1 text-red-600 font-semibold">
                <FileWarning size={13} />
                {c.docsPending}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-3 text-xs gap-3">
          <span className={cn("font-medium", timeColor)}>
            {currentHistory?.duration ? `${currentHistory.duration} dans cette étape` : "Aujourd'hui"}
          </span>
          <span className="text-[var(--demo-muted)] tabular-nums">{c.dueLabel}</span>
        </div>
      </div>
    </button>
  );
}
