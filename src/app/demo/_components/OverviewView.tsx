"use client";

import {
  Activity,
  CalendarCheck,
  Clock,
  FileText,
  MessageSquare,
} from "lucide-react";
import { useDemoStore } from "../_lib/store";
import { useFilteredCases } from "../_hooks/use-filtered-cases";
import { useRoleMeta } from "../_hooks/use-role-meta";
import { useSearchScopedData } from "../_hooks/use-search-scoped-data";
import { cn, formatMoney } from "../_lib/utils";
import { KpiCard } from "./KpiCard";
import { QueueCard } from "./QueueCard";
import { Badge } from "./Badge";
import { EmptyState } from "./EmptyState";
import { FocusPanel } from "./FocusPanel";
import type { CaseStage } from "../_lib/types";

const STAGES: CaseStage[] = [
  "Nouveau",
  "Qualification",
  "Validation",
  "Planification",
  "Sur place",
  "Cloture",
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
  const { data, searchActive } = useSearchScopedData();
  const filteredCases = useFilteredCases();
  const filter = useDemoStore((s) => s.queueFilter);
  const setFilter = useDemoStore((s) => s.setFilter);
  const setView = useDemoStore((s) => s.setView);
  const openCase = useDemoStore((s) => s.openCase);
  const roleMeta = useRoleMeta();

  const totalValue = data.cases.reduce((sum, c) => sum + c.valueMad, 0);
  const criticalCount = data.cases.filter((c) => c.priority === "critique" || c.priority === "haute").length;
  const blockedCount = data.cases.filter((c) => c.blocked).length;
  const todayEvents = data.events.filter((e) => e.dayOffset === 0).length;
  const pendingComms = data.communications.filter((c) => c.status !== "envoye").length;
  const maxCases = Math.max(...STAGES.map((stage) => data.cases.filter((c) => c.stage === stage).length), 1);
  const activityFeed = data.cases
    .flatMap((c) => c.timeline.map((t) => ({ ...t, patient: c.patient, caseId: c.id })))
    .slice(-6)
    .reverse();
  const queueEmptyMessage = searchActive
    ? "Aucun dossier ne correspond à cette recherche."
    : "Aucun dossier ne correspond au filtre en cours.";

  return (
    <div className="space-y-6">
      <FocusPanel panelId="overviewHero" className="overflow-hidden">
        <div className="bg-gradient-to-r from-teal to-teal-light px-5 py-6 text-cream md:px-6 md:py-7">
          <p className="text-xs font-semibold tracking-[0.16em] uppercase text-brass-light mb-2">
            {roleMeta.label}
          </p>
          <p className="text-base leading-relaxed text-cream/90 max-w-3xl">
            {roleMeta.story}
          </p>
        </div>
      </FocusPanel>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <button
          onClick={() => setFilter("all")}
          aria-pressed={filter === "all"}
          className="text-left focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-3 rounded-2xl"
        >
          <KpiCard label="Dossiers actifs" value={data.cases.length} accentColor="var(--color-teal)" />
        </button>
        <button
          onClick={() => setFilter("hot")}
          aria-pressed={filter === "hot"}
          className="text-left focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-3 rounded-2xl"
        >
          <KpiCard label="Urgents" value={criticalCount} delta={criticalCount > 2 ? "↑" : undefined} accentColor="#dc2626" />
        </button>
        <button
          onClick={() => setFilter("blocked")}
          aria-pressed={filter === "blocked"}
          className="text-left focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-3 rounded-2xl"
        >
          <KpiCard label="Bloqués" value={blockedCount} accentColor="#d97706" />
        </button>
        <button
          onClick={() => setView("calendar")}
          className="text-left focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-3 rounded-2xl"
        >
          <KpiCard label="RDV du jour" value={todayEvents} accentColor="var(--color-brass)" />
        </button>
        <button
          onClick={() => setView("finance")}
          className="text-left focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-3 rounded-2xl"
        >
          <KpiCard label="Pipeline" value={formatMoney(totalValue)} accentColor="var(--demo-success)" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <FocusPanel panelId="queuePanel" className="xl:col-span-3 p-4 md:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-ink">File prioritaire</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-[var(--demo-muted)] max-w-2xl">
                {roleMeta.queueNarrative}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(["all", "hot", "blocked", "today"] as const).map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                  className={cn(
                    "px-3 py-2 rounded-xl text-[13px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2",
                    filter === item
                      ? "bg-teal text-cream"
                      : "bg-stone/50 text-[var(--demo-muted)] hover:bg-stone hover:text-ink",
                  )}
                >
                  {item === "all" ? "Tous" : item === "hot" ? "Urgents" : item === "blocked" ? "Bloqués" : "Aujourd'hui"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 max-h-none overflow-visible md:max-h-[460px] md:overflow-y-auto demo-scroll pr-0 md:pr-1 mt-4">
            {filteredCases.length === 0 ? (
              <EmptyState message={queueEmptyMessage} />
            ) : (
              filteredCases.map((c) => <QueueCard key={c.id} c={c} />)
            )}
          </div>
        </FocusPanel>

        <div className="xl:col-span-2 space-y-5">
          <FocusPanel panelId="journeyPanel" className="p-4 md:p-5">
            <h3 className="text-base font-semibold text-ink mb-4">Pipeline</h3>
            <div className="space-y-3">
              {STAGES.map((stage) => {
                const count = data.cases.filter((c) => c.stage === stage).length;
                const pct = (count / maxCases) * 100;
                const stageValue = data.cases.filter((c) => c.stage === stage).reduce((sum, c) => sum + c.valueMad, 0);

                return (
                  <div key={stage}>
                    <div className="flex items-center justify-between mb-1.5 gap-3">
                      <span className="text-[13px] text-ink-soft font-medium">{stage}</span>
                      <div className="flex items-center gap-2 text-[13px]">
                        {stageValue > 0 && (
                          <span className="text-[var(--demo-muted)] tabular-nums">{formatMoney(stageValue)}</span>
                        )}
                        <span className="font-semibold text-ink tabular-nums min-w-5 text-right">{count}</span>
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
          </FocusPanel>

          <FocusPanel panelId="financePanel" className="p-4 md:p-5">
            <h3 className="text-base font-semibold text-ink mb-4">Exposition</h3>
            <div className="space-y-3">
              {data.invoices.length === 0 ? (
                <EmptyState message="Aucun flux financier visible pour cette recherche." />
              ) : (
                data.invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-ink-soft truncate flex-1">{invoice.title}</span>
                    <Badge variant="invoiceStatus" value={invoice.status} />
                    <span className="text-sm font-semibold text-ink tabular-nums whitespace-nowrap">
                      {formatMoney(invoice.amountMad)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </FocusPanel>

          <div className="rounded-2xl border border-[var(--demo-border)] bg-white/96 shadow-[0_10px_26px_-22px_rgba(53,31,22,0.24)] p-4 md:p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity size={16} className="text-brass" />
              <h3 className="text-base font-semibold text-ink">Activité récente</h3>
            </div>
            <div className="space-y-0">
              {activityFeed.length === 0 ? (
                <EmptyState message="Aucune activité visible pour cette recherche." />
              ) : (
                activityFeed.map((item, index) => (
                  <button
                    key={`${item.caseId}-${item.time}-${index}`}
                    onClick={() => openCase(item.caseId)}
                    className="w-full text-left flex items-start gap-2.5 py-2.5 border-b border-[var(--demo-border)] last:border-b-0 hover:bg-stone/20 -mx-1 px-1 rounded transition-colors"
                  >
                    <div className="w-2 h-2 rounded-full bg-teal mt-1.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] leading-relaxed text-ink">
                        <span className="font-semibold">{item.patient}</span>
                        {" — "}
                        {item.label}
                      </p>
                      <p className="text-xs text-[var(--demo-muted)] mt-0.5">{item.time}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <FocusPanel panelId="agendaPanel" className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <CalendarCheck size={16} className="text-brass" />
            <h4 className="text-base font-semibold text-ink">Agenda du jour</h4>
          </div>
          {data.events.filter((e) => e.dayOffset === 0).length === 0 ? (
            <EmptyState message="Aucun rendez-vous visible pour cette recherche." />
          ) : (
            data.events
              .filter((e) => e.dayOffset === 0)
              .map((event) => (
                <button
                  key={event.id}
                  onClick={() => openCase(event.caseId)}
                  className="w-full text-left flex items-center gap-2.5 py-2.5 border-b border-[var(--demo-border)] last:border-b-0 hover:bg-stone/30 -mx-1 px-1 rounded transition-colors"
                >
                  <Clock size={13} className="text-[var(--demo-muted)] shrink-0" />
                  <span className="text-sm font-semibold text-ink tabular-nums">{event.time}</span>
                  <span className="text-sm text-ink-soft truncate flex-1">{event.title}</span>
                </button>
              ))
          )}
        </FocusPanel>

        <FocusPanel panelId="communicationPanel" className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <MessageSquare size={16} className="text-brass" />
            <h4 className="text-base font-semibold text-ink">Communications</h4>
            {pendingComms > 0 && (
              <span className="ml-auto text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                {pendingComms}
              </span>
            )}
          </div>
          {data.communications.length === 0 ? (
            <EmptyState message="Aucune communication visible pour cette recherche." />
          ) : (
            data.communications.slice(0, 3).map((comm) => (
              <button
                key={comm.id}
                onClick={() => openCase(comm.caseId)}
                className="w-full text-left py-2.5 border-b border-[var(--demo-border)] last:border-b-0 hover:bg-stone/30 -mx-1 px-1 rounded transition-colors"
              >
                <p className="text-sm font-semibold text-ink truncate">{comm.title}</p>
                <p className="text-[13px] text-[var(--demo-muted)] mt-0.5 line-clamp-2">{comm.summary}</p>
              </button>
            ))
          )}
        </FocusPanel>

        <FocusPanel panelId="documentPanel" className="p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <FileText size={16} className="text-brass" />
            <h4 className="text-base font-semibold text-ink">Documents</h4>
          </div>
          {data.documents.filter((d) => d.status !== "valide").length === 0 ? (
            <EmptyState message="Aucun document à traiter pour cette recherche." />
          ) : (
            data.documents
              .filter((d) => d.status !== "valide")
              .slice(0, 3)
              .map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => openCase(doc.caseId)}
                  className="w-full text-left flex items-center gap-2.5 py-2.5 border-b border-[var(--demo-border)] last:border-b-0 hover:bg-stone/30 -mx-1 px-1 rounded transition-colors"
                >
                  <span className="text-sm text-ink-soft truncate flex-1">{doc.title}</span>
                  <Badge variant="docStatus" value={doc.status} />
                </button>
              ))
          )}
        </FocusPanel>
      </div>
    </div>
  );
}
