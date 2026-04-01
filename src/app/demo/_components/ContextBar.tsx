"use client";

import { useDemoStore } from "../_lib/store";
import { views, roles, scenariosMeta } from "../_lib/data";
import { cn } from "../_lib/utils";

export function ContextBar() {
  const activeView = useDemoStore((s) => s.activeView);
  const role = useDemoStore((s) => s.role);
  const scenario = useDemoStore((s) => s.scenario);
  const setScenario = useDemoStore((s) => s.setScenario);

  const viewMeta = views.find((v) => v.key === activeView)!;
  const roleMeta = roles.find((r) => r.key === role)!;

  return (
    <div className="px-5 py-4 border-b border-[var(--demo-border)]">
      {/* View title + Role narrative */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
        <div className="min-w-0">
          <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-brass mb-1">
            {viewMeta.eyebrow}
          </p>
          <h2 className="text-lg font-bold text-ink leading-tight">
            {viewMeta.title}
          </h2>
          <p className="text-sm text-[var(--demo-muted)] mt-0.5 leading-snug">
            {viewMeta.subtitle}
          </p>
        </div>

        {/* Role narrative pill */}
        <div className="shrink-0 max-w-xs text-right hidden lg:block">
          <p className="text-[11px] text-[var(--demo-muted)] leading-relaxed italic">
            {roleMeta.narrative.slice(0, 100)}
            {roleMeta.narrative.length > 100 ? "..." : ""}
          </p>
        </div>
      </div>

      {/* Scenario switcher */}
      <div className="flex flex-wrap gap-1.5">
        {scenariosMeta.map((s) => (
          <button
            key={s.key}
            onClick={() => setScenario(s.key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150",
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
    </div>
  );
}
