"use client";

import {
  Users, AlertTriangle, CalendarCheck, Wallet, TrendingUp,
  MessageSquare, Clock, FileText, Activity, ArrowRight,
} from "lucide-react";
import { useDemoStore } from "../_lib/store";
import { useDemoData } from "../_hooks/use-demo-data";
import { useFilteredCases } from "../_hooks/use-filtered-cases";
import { roles } from "../_lib/data";
import { cn, formatMoney, getBlockerInfo } from "../_lib/utils";
import { KpiCard } from "./KpiCard";
import { QueueCard } from "./QueueCard";
import { Badge } from "./Badge";
import { EmptyState } from "./EmptyState";
import type { CaseStage } from "../_lib/types";

const STAGES: CaseStage[] = [
  "Nouveau", "Qualification", "Validation", "Planification", "Sur place", "Cloture",
];

const STAGE_COLORS: Record<CaseStage, string> = {
  Nouveau: "bg-sky-400",
  Qualification: "bg-violet-400",
  Validation: "bg-indigo-400",
  Planification: "bg-teal",
  "Sur place": "bg-emerald-500",
  Cloture: "bg-slate-400",
};

export function OverviewView() {
  const data = useDemoData();
  const filteredCases = useFilteredCases();
  const role = useDemoStore((s) => s.role);
  const filter = useDemoStore((s) => s.queueFilter);
  const setFilter = useDemoStore((s) => s.setFilter);
  const setView = useDemoStore((s) => s.setView);
  const openCase = useDemoStore((s) => s.openCase);
  const roleMeta = roles.find((r) => r.key === role)!;

  const totalValue = data.cases.reduce((sum, c) => sum + c.valueMad, 0);
  const criticalCount = data.cases.filter((c) => c.priority === "critique" || c.priority === "haute").length;
  const blockedCount = data.cases.filter((c) => c.blocked).length;
  const todayEvents = data.events.filter((e) => e.dayOffset === 0).length;
  const pendingComms = data.communications.filter((c) => c.status !== "envoye").length;
  const maxCases = Math.max(...STAGES.map((s) => data.cases.filter((c) => c.stage === s).length), 1);

  // Activity feed — combine all timeline entries across cases
  const activityFeed = data.cases
    .flatMap((c) => c.timeline.map((t) => ({ ...t, patient: c.patient, caseId: c.id })))
    .slice(-6)
    .reverse();

  return (
    <div className="space-y-5">
      {/* Hero narrative */}
      <div className="bg-gradient-to-r from-teal to-teal-light rounded-2xl p-5 text-cream">
        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-brass-light mb-1">
          {roleMeta.label}
        </p>
        <p className="text-sm leading-relaxed text-cream/85 max-w-2xl">
          {roleMeta.story}
        </p>
      </div>

      {/* KPI Row — clickable */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <button onClick={() => setFilter("all")} className="text-left">
          <KpiCard label="Dossiers actifs" value={data.cases.length} accentColor="var(--color-teal)" />
        </button>
        <button onClick={() => setFilter("hot")} className="text-left">
          <KpiCard label="Urgents" value={criticalCount} delta={criticalCount > 2 ? "↑" : undefined} accentColor="#dc2626" />
        </button>
        <button onClick={() => setFilter("blocked")} className="text-left">
          <KpiCard label="Bloques" value={blockedCount} accentColor="#d97706" />
        </button>
        <button onClick={() => setView("calendar")} className="text-left">
          <KpiCard label="RDV aujourd'hui" value={todayEvents} accentColor="var(--color-brass)" />
        </button>
        <button onClick={() => setView("finance")} className="text-left col-span-2 sm:col-span-1">
          <KpiCard label="Pipeline" value={formatMoney(totalValue)} accentColor="var(--demo-success)" />
        </button>
      </div>

      {/* Split grid: Queue + Pipeline + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Priority Queue — 3 cols */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-ink">File prioritaire</h3>
            <div className="flex gap-1">
              {(["all", "hot", "blocked", "today"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors",
                    filter === f
                      ? "bg-teal text-cream"
                      : "bg-stone/50 text-[var(--demo-muted)] hover:bg-stone"
                  )}
                >
                  {f === "all" ? "Tous" : f === "hot" ? "Urgents" : f === "blocked" ? "Bloques" : "Aujourd'hui"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto demo-scroll pr-1">
            {filteredCases.length === 0 ? (
              <EmptyState message="Aucun dossier ne correspond au filtre" />
            ) : (
              filteredCases.map((c) => <QueueCard key={c.id} c={c} />)
            )}
          </div>
        </div>

        {/* Right column — Pipeline + Activity + Finance */}
        <div className="lg:col-span-2 space-y-5">
          {/* Pipeline visualization — horizontal bars */}
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3">Pipeline</h3>
            <div className="bg-white rounded-xl border border-[var(--demo-border)] p-4 space-y-2.5">
              {STAGES.map((stage) => {
                const count = data.cases.filter((c) => c.stage === stage).length;
                const pct = (count / maxCases) * 100;
                const stageValue = data.cases.filter((c) => c.stage === stage).reduce((s, c) => s + c.valueMad, 0);
                return (
                  <div key={stage}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] text-ink-soft">{stage}</span>
                      <div className="flex items-center gap-2">
                        {stageValue > 0 && (
                          <span className="text-[10px] text-[var(--demo-muted)] tabular-nums">{formatMoney(stageValue)}</span>
                        )}
                        <span className="text-[11px] font-bold text-ink tabular-nums w-4 text-right">{count}</span>
                      </div>
                    </div>
                    <div className="h-2 bg-stone/50 rounded-full overflow-hidden">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", STAGE_COLORS[stage])}
                        style={{ width: `${Math.max(pct, count > 0 ? 12 : 0)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Activity feed */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity size={14} className="text-brass" />
              <h3 className="text-sm font-semibold text-ink">Activite recente</h3>
            </div>
            <div className="bg-white rounded-xl border border-[var(--demo-border)] p-3 space-y-0">
              {activityFeed.map((a, i) => (
                <button
                  key={i}
                  onClick={() => openCase(a.caseId)}
                  className="w-full text-left flex items-start gap-2 py-2 border-b border-[var(--demo-border)] last:border-b-0 hover:bg-stone/20 -mx-1 px-1 rounded transition-colors"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] text-ink">
                      <span className="font-medium">{a.patient}</span>
                      {" — "}
                      {a.label}
                    </p>
                    <p className="text-[10px] text-[var(--demo-muted)]">{a.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Finance */}
          <div>
            <h3 className="text-sm font-semibold text-ink mb-3">Exposition</h3>
            <div className="bg-white rounded-xl border border-[var(--demo-border)] p-4 space-y-2">
              {data.invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-ink-soft truncate flex-1">{inv.title}</span>
                  <Badge variant="invoiceStatus" value={inv.status} />
                  <span className="text-xs font-semibold text-ink tabular-nums whitespace-nowrap">
                    {formatMoney(inv.amountMad)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Triptych: Agenda + Comms + Docs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Agenda */}
        <div className="bg-white rounded-xl border border-[var(--demo-border)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <CalendarCheck size={14} className="text-brass" />
            <h4 className="text-xs font-semibold text-ink">Agenda du jour</h4>
          </div>
          {data.events
            .filter((e) => e.dayOffset === 0)
            .map((e) => (
              <button
                key={e.id}
                onClick={() => openCase(e.caseId)}
                className="w-full text-left flex items-center gap-2 py-2 border-b border-[var(--demo-border)] last:border-b-0 hover:bg-stone/30 -mx-1 px-1 rounded transition-colors"
              >
                <Clock size={12} className="text-[var(--demo-muted)] shrink-0" />
                <span className="text-xs font-medium text-ink tabular-nums">{e.time}</span>
                <span className="text-xs text-ink-soft truncate flex-1">{e.title}</span>
              </button>
            ))}
        </div>

        {/* Comms */}
        <div className="bg-white rounded-xl border border-[var(--demo-border)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageSquare size={14} className="text-brass" />
            <h4 className="text-xs font-semibold text-ink">Communications</h4>
            {pendingComms > 0 && (
              <span className="ml-auto text-[10px] font-bold bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-full">
                {pendingComms}
              </span>
            )}
          </div>
          {data.communications.slice(0, 3).map((comm) => (
            <button
              key={comm.id}
              onClick={() => openCase(comm.caseId)}
              className="w-full text-left py-2 border-b border-[var(--demo-border)] last:border-b-0 hover:bg-stone/30 -mx-1 px-1 rounded transition-colors"
            >
              <p className="text-xs font-medium text-ink truncate">{comm.title}</p>
              <p className="text-[11px] text-[var(--demo-muted)] truncate">{comm.summary}</p>
            </button>
          ))}
        </div>

        {/* Docs */}
        <div className="bg-white rounded-xl border border-[var(--demo-border)] p-4">
          <div className="flex items-center gap-2 mb-3">
            <FileText size={14} className="text-brass" />
            <h4 className="text-xs font-semibold text-ink">Documents</h4>
          </div>
          {data.documents
            .filter((d) => d.status !== "valide")
            .slice(0, 3)
            .map((doc) => (
              <button
                key={doc.id}
                onClick={() => openCase(doc.caseId)}
                className="w-full text-left flex items-center gap-2 py-2 border-b border-[var(--demo-border)] last:border-b-0 hover:bg-stone/30 -mx-1 px-1 rounded transition-colors"
              >
                <span className="text-xs text-ink-soft truncate flex-1">{doc.title}</span>
                <Badge variant="docStatus" value={doc.status} />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
