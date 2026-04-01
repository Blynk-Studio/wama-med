"use client";

import { useRoleMeta } from "../_hooks/use-role-meta";
import { useDemoStore } from "../_lib/store";
import { views, scenariosMeta } from "../_lib/data";
import { cn } from "../_lib/utils";
import { FocusPanel } from "./FocusPanel";

export function ContextBar() {
  const activeView = useDemoStore((s) => s.activeView);
  const scenario = useDemoStore((s) => s.scenario);
  const setScenario = useDemoStore((s) => s.setScenario);

  const viewMeta = views.find((v) => v.key === activeView)!;
  const roleMeta = useRoleMeta();

  return (
    <div className="px-4 pt-3 md:px-5 md:pt-5">
      <FocusPanel panelId="contextBar" className="p-3.5 md:p-5">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
          <div className="min-w-0">
            <p className="text-xs font-semibold tracking-[0.16em] uppercase text-brass mb-2">
              {viewMeta.eyebrow}
            </p>
            <div className="inline-flex items-center rounded-full bg-stone/70 px-3 py-1 text-xs font-semibold text-ink-soft lg:hidden">
              {roleMeta.label}
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-ink leading-tight">
              {viewMeta.title}
            </h2>
            <p className="text-sm md:text-[15px] text-[var(--demo-muted)] mt-2 leading-relaxed max-w-3xl">
              {viewMeta.subtitle}
            </p>
          </div>

          <div className="hidden lg:block rounded-xl bg-stone/55 px-4 py-3.5">
            <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[var(--demo-muted)] mb-1.5">
              {roleMeta.label}
            </p>
            <p className="text-sm text-ink-soft leading-relaxed mb-2">
              {roleMeta.narrative}
            </p>
            <p className="text-[13px] text-[var(--demo-muted)] leading-relaxed">
              {roleMeta.queueNarrative}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 md:mt-4">
          {scenariosMeta.map((s) => (
            <button
              key={s.key}
              onClick={() => setScenario(s.key)}
              aria-pressed={scenario === s.key}
              className={cn(
                "px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2",
                scenario === s.key
                  ? "bg-teal text-cream shadow-sm demo-scenario-active"
                  : "bg-stone/60 text-ink-soft hover:bg-stone hover:text-ink"
              )}
              title={s.description}
            >
              {s.label}
            </button>
          ))}
        </div>
      </FocusPanel>
    </div>
  );
}
