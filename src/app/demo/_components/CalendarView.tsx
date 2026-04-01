"use client";

import { ChevronLeft, ChevronRight, CalendarDays, Clock } from "lucide-react";
import { useDemoStore } from "../_lib/store";
import { useSearchScopedData } from "../_hooks/use-search-scoped-data";
import { SupportStrip } from "./SupportStrip";
import { EmptyState } from "./EmptyState";
import { cn, getEventStatusColor } from "../_lib/utils";
import { FocusPanel } from "./FocusPanel";

const DAY_LABELS = ["Hier", "Aujourd'hui", "Demain", "Apres-demain"];

function getDayLabel(offset: number): string {
  if (offset >= -1 && offset <= 2) return DAY_LABELS[offset + 1];
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "short" });
}

export function CalendarView() {
  const { data, searchActive } = useSearchScopedData();
  const dayOffset = useDemoStore((s) => s.dayOffset);
  const setDayOffset = useDemoStore((s) => s.setDayOffset);
  const openCase = useDemoStore((s) => s.openCase);

  const dayEvents = data.events
    .filter((e) => e.dayOffset === dayOffset)
    .sort((a, b) => a.time.localeCompare(b.time));

  const totalToday = data.events.filter((e) => e.dayOffset === 0).length;
  const totalTomorrow = data.events.filter((e) => e.dayOffset === 1).length;

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Aujourd'hui", value: totalToday, icon: <CalendarDays size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "Demain", value: totalTomorrow, icon: <Clock size={18} className="text-brass" />, accent: "#fef3c7" },
          { label: "Total cette semaine", value: data.events.length, icon: <CalendarDays size={18} className="text-indigo-500" />, accent: "#eef2ff" },
        ]}
      />

      <FocusPanel panelId="agendaPanel" className="p-4 md:p-5">
        <div className="flex items-center justify-center gap-4 pb-4 border-b border-[var(--demo-border)]">
          <button
            onClick={() => setDayOffset(dayOffset - 1)}
            className="p-2 rounded-lg hover:bg-stone/60 transition-colors focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            aria-label="Jour precedent"
          >
            <ChevronLeft size={18} className="text-ink-soft" />
          </button>
          <div className="text-center min-w-[170px]">
            <p className="text-base font-semibold text-ink">{getDayLabel(dayOffset)}</p>
            <p className="text-[13px] text-[var(--demo-muted)] mt-1">
              {dayEvents.length} événement{dayEvents.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={() => setDayOffset(dayOffset + 1)}
            className="p-2 rounded-lg hover:bg-stone/60 transition-colors focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
            aria-label="Jour suivant"
          >
            <ChevronRight size={18} className="text-ink-soft" />
          </button>
        </div>

        <div className="space-y-3 mt-4">
          {dayEvents.length === 0 ? (
            <EmptyState message={searchActive ? "Aucun rendez-vous ne correspond à cette recherche." : "Aucun événement ce jour."} />
          ) : (
            dayEvents.map((ev) => {
              const linkedCase = data.cases.find((c) => c.id === ev.caseId);
              return (
                <button
                  key={ev.id}
                  onClick={() => openCase(ev.caseId)}
                  className={cn(
                    "demo-card w-full text-left bg-white rounded-2xl p-4 md:p-5 border border-[var(--demo-border)] border-l-[3px] focus-visible:outline-2 focus-visible:outline-brass",
                    getEventStatusColor(ev.status),
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-stone/60 rounded-xl px-3 py-2 shrink-0">
                      <span className="text-sm font-semibold text-ink tabular-nums">{ev.time}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-semibold text-ink truncate">{ev.title}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap text-[13px] text-[var(--demo-muted)]">
                        <span>{ev.location}</span>
                        <span>·</span>
                        <span>{ev.owner}</span>
                        {linkedCase && (
                          <>
                            <span>·</span>
                            <span className="font-medium text-teal">{linkedCase.patient}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--demo-muted)] shrink-0">
                      {ev.type}
                    </span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </FocusPanel>
    </div>
  );
}
