"use client";

import { Clock, MessageSquare, FileWarning, TrendingUp } from "lucide-react";
import { useDemoStore } from "../_lib/store";
import { cn, getInitials, getBlockerInfo } from "../_lib/utils";
import { Badge } from "./Badge";
import type { PatientCase } from "../_lib/types";

export function QueueCard({ c }: { c: PatientCase }) {
  const openCase = useDemoStore((s) => s.openCase);
  const blocker = getBlockerInfo(c.blockerType);

  return (
    <button
      onClick={() => openCase(c.id)}
      className={cn(
        "demo-card w-full text-left bg-white rounded-xl p-4 border border-[var(--demo-border)]",
        c.blocked && "border-l-[3px] border-l-red-400",
        "focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2"
      )}
    >
      {/* Row 1: Patient + badges */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-teal/10 flex items-center justify-center text-[10px] font-bold text-teal shrink-0">
          {getInitials(c.patient)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink truncate">{c.patient}</p>
          <p className="text-[11px] text-[var(--demo-muted)] truncate">{c.cityPath}</p>
        </div>
        <Badge variant="priority" value={c.priority} />
      </div>

      {/* Row 2: Program + Stage + Blocker */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs text-ink-soft truncate flex-1">{c.program}</span>
        {blocker && (
          <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", blocker.bg, blocker.text)}>
            ← {blocker.label}
          </span>
        )}
        <Badge variant="stage" value={c.stage} />
      </div>

      {/* Row 3: Next action */}
      <p className="text-xs text-[var(--demo-muted)] leading-snug mb-2 line-clamp-2">
        → {c.nextAction}
      </p>

      {/* Row 4: Progress bar + Metadata */}
      <div className="mb-2">
        <div className="h-1 bg-stone-dark/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal to-emerald-500 rounded-full transition-all"
            style={{ width: `${c.progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 text-[11px] text-[var(--demo-muted)]">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {c.slaHours}h
        </span>
        <span className="flex items-center gap-1 text-teal font-medium">
          <TrendingUp size={11} />
          {c.progressPercent}%
        </span>
        {c.unread > 0 && (
          <span className="flex items-center gap-1 text-orange-600 font-medium">
            <MessageSquare size={12} />
            {c.unread}
          </span>
        )}
        {c.docsPending > 0 && (
          <span className="flex items-center gap-1 text-red-600 font-medium">
            <FileWarning size={12} />
            {c.docsPending}
          </span>
        )}
        <span className="ml-auto truncate">{c.dueLabel}</span>
      </div>
    </button>
  );
}
