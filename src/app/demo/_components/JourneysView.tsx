"use client";

import { useDemoData } from "../_hooks/use-demo-data";
import { useDemoStore } from "../_lib/store";
import { cn, getInitials, formatMoney, getBlockerInfo, getSlaStatus } from "../_lib/utils";
import { Badge } from "./Badge";
import { SupportStrip } from "./SupportStrip";
import { EmptyState } from "./EmptyState";
import {
  Route, AlertTriangle, TrendingUp, Clock, MessageSquare,
  FileWarning, ChevronRight, User, MapPin,
} from "lucide-react";
import type { CaseStage, PatientCase } from "../_lib/types";

const STAGES: CaseStage[] = [
  "Nouveau", "Qualification", "Validation", "Planification", "Sur place", "Cloture",
];

const STAGE_META: Record<CaseStage, { color: string; gradient: string; dot: string; label: string }> = {
  Nouveau:       { color: "sky",     gradient: "from-sky-500 to-sky-400",     dot: "bg-sky-400",     label: "Nouveau" },
  Qualification: { color: "violet",  gradient: "from-violet-500 to-violet-400", dot: "bg-violet-400", label: "Qualification" },
  Validation:    { color: "indigo",  gradient: "from-indigo-500 to-indigo-400", dot: "bg-indigo-400", label: "Validation" },
  Planification: { color: "teal",    gradient: "from-teal to-teal-light",     dot: "bg-teal",        label: "Planification" },
  "Sur place":   { color: "emerald", gradient: "from-emerald-600 to-emerald-500", dot: "bg-emerald-500", label: "Sur place" },
  Cloture:       { color: "slate",   gradient: "from-slate-500 to-slate-400", dot: "bg-slate-400",   label: "Cloture" },
};

const COUNTRY_FLAGS: Record<string, string> = {
  Senegal: "🇸🇳", Maroc: "🇲🇦", "Cote d'Ivoire": "🇨🇮", Mali: "🇲🇱",
  France: "🇫🇷", Guinee: "🇬🇳",
};

export function JourneysView() {
  const data = useDemoData();
  const openCase = useDemoStore((s) => s.openCase);

  const casesByStage = STAGES.map((stage) => ({
    stage,
    cases: data.cases.filter((c) => c.stage === stage),
    value: data.cases.filter((c) => c.stage === stage).reduce((s, c) => s + c.valueMad, 0),
  }));

  const totalValue = data.cases.reduce((s, c) => s + c.valueMad, 0);
  const avgProgress = Math.round(data.cases.reduce((s, c) => s + c.progressPercent, 0) / data.cases.length);

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Dossiers en cours", value: data.cases.length, icon: <Route size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "Valeur pipeline", value: formatMoney(totalValue), icon: <TrendingUp size={18} className="text-brass" />, accent: "#fef3c7" },
          { label: "Progression moy.", value: `${avgProgress}%`, icon: <ChevronRight size={18} className="text-emerald-600" />, accent: "#ecfdf5" },
        ]}
      />

      {/* ═══ Kanban Board ═══ */}

      {/* Desktop: horizontal scroll with all columns visible */}
      {/* Tablet: horizontal scroll, ~3 columns visible */}
      {/* Mobile: vertical stack */}

      <div className="demo-kanban-board">
        {casesByStage.map(({ stage, cases, value }) => {
          const meta = STAGE_META[stage];
          return (
            <div key={stage} className="demo-kanban-col">
              {/* ─── Column Header ─── */}
              <div className="sticky top-0 z-10 bg-cream/95 backdrop-blur-sm pb-2">
                <div className={cn(
                  "rounded-xl overflow-hidden border border-[var(--demo-border)]",
                )}>
                  {/* Color accent bar */}
                  <div className={cn("h-1 bg-gradient-to-r", meta.gradient)} />

                  <div className="px-3.5 py-2.5 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-2 h-2 rounded-full shrink-0", meta.dot)} />
                        <h3 className="text-[13px] font-semibold text-ink">{meta.label}</h3>
                      </div>
                      <span className={cn(
                        "text-[11px] font-bold px-2 py-0.5 rounded-full",
                        cases.length > 0 ? "bg-ink/5 text-ink" : "bg-stone/60 text-[var(--demo-muted)]"
                      )}>
                        {cases.length}
                      </span>
                    </div>
                    {value > 0 && (
                      <p className="text-[11px] text-[var(--demo-muted)] mt-1 tabular-nums font-medium">
                        {formatMoney(value)}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ─── Cards ─── */}
              <div className="space-y-2.5 min-h-[120px]">
                {cases.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center rounded-xl border-2 border-dashed border-stone-dark/20">
                    <div className={cn("w-3 h-3 rounded-full mb-2 opacity-30", meta.dot)} />
                    <p className="text-[11px] text-[var(--demo-muted)]">Aucun dossier</p>
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
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Pipeline Card — the individual client card in each column
   ═══════════════════════════════════════════════════════════ */

function PipelineCard({ c, onClick }: { c: PatientCase; onClick: () => void }) {
  const blocker = getBlockerInfo(c.blockerType);
  const sla = getSlaStatus(c.slaHours);
  const flag = COUNTRY_FLAGS[c.country] || "";

  const currentHistory = c.stageHistory.find((h) => h.stage === c.stage);
  const durationDays = currentHistory?.duration ? parseInt(currentHistory.duration) : 0;
  const timeColor = durationDays >= 3 ? "text-red-600" : durationDays >= 1 ? "text-amber-600" : "text-emerald-600";
  const timeBg = durationDays >= 3 ? "bg-red-500" : durationDays >= 1 ? "bg-amber-400" : "bg-emerald-400";

  return (
    <button
      onClick={onClick}
      className={cn(
        "demo-card w-full text-left bg-white rounded-2xl border border-[var(--demo-border)] overflow-hidden",
        "focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2",
        c.blocked && "ring-1 ring-red-300"
      )}
    >
      {/* Time-in-stage accent bar */}
      <div className={cn("h-[3px]", timeBg)} />

      <div className="p-4">
        {/* Row 1: Avatar + Name + Flag */}
        <div className="flex items-center gap-2.5 mb-3">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl bg-teal/8 flex items-center justify-center text-[11px] font-bold text-teal">
              {getInitials(c.patient)}
            </div>
            {/* SLA dot */}
            <div
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white"
              style={{ backgroundColor: sla.color }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold text-ink leading-tight truncate">
              {c.patient}
            </p>
            <p className="text-[11px] text-[var(--demo-muted)] flex items-center gap-1">
              {flag && <span className="text-xs">{flag}</span>}
              <span className="truncate">{c.cityPath}</span>
            </p>
          </div>
        </div>

        {/* Row 2: Program */}
        <p className="text-xs text-ink-soft font-medium mb-2 leading-snug">{c.program}</p>

        {/* Row 3: Next action — highlighted callout */}
        <div className="bg-stone/40 rounded-lg px-3 py-2 mb-3">
          <p className="text-[11px] text-ink leading-snug line-clamp-2">
            <span className="text-brass font-semibold">→</span> {c.nextAction}
          </p>
        </div>

        {/* Row 4: Badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <Badge variant="priority" value={c.priority} />
          {c.blocked && blocker && (
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-md", blocker.bg, blocker.text)}>
              ← {blocker.label}
            </span>
          )}
        </div>

        {/* Row 5: Progress */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex-1 h-1.5 bg-stone-dark/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-teal to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${c.progressPercent}%` }}
            />
          </div>
          <span className="text-[10px] font-bold text-teal tabular-nums w-8 text-right">
            {c.progressPercent}%
          </span>
        </div>

        {/* Row 6: Metadata strip */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-[var(--demo-border)]">
          <div className="flex items-center gap-2.5 text-[11px] text-[var(--demo-muted)]">
            {/* Owner */}
            <span className="flex items-center gap-1">
              <User size={11} />
              <span className="font-medium">{c.owner.split(" ")[0]}</span>
            </span>
            {/* SLA */}
            <span className="flex items-center gap-1" style={{ color: sla.color }}>
              <Clock size={11} />
              <span className="font-medium tabular-nums">{c.slaHours}h</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            {c.unread > 0 && (
              <span className="flex items-center gap-0.5 text-orange-600 font-bold">
                <MessageSquare size={11} />
                {c.unread}
              </span>
            )}
            {c.docsPending > 0 && (
              <span className="flex items-center gap-0.5 text-red-600 font-bold">
                <FileWarning size={11} />
                {c.docsPending}
              </span>
            )}
          </div>
        </div>

        {/* Row 7: Time in stage */}
        <div className="flex items-center justify-between mt-2 text-[10px]">
          <span className={cn("font-medium", timeColor)}>
            {currentHistory?.duration ? `${currentHistory.duration} dans cette etape` : "Aujourd'hui"}
          </span>
          <span className="text-[var(--demo-muted)] tabular-nums">{c.dueLabel}</span>
        </div>
      </div>
    </button>
  );
}
