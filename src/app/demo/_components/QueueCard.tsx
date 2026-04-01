"use client";

import { Clock, MessageSquare, FileWarning, TrendingUp } from "lucide-react";
import { useDemoStore } from "../_lib/store";
import { cn, getInitials, getBlockerInfo } from "../_lib/utils";
import { Badge } from "./Badge";
import type { PatientCase } from "../_lib/types";

export function QueueCard({ c }: { c: PatientCase }) {
  const openCase = useDemoStore((s) => s.openCase);
  const blocker = c.blocked ? getBlockerInfo(c.blockerType) : null;
  const watch = !c.blocked ? getBlockerInfo(c.watchType ?? null) : null;

  return (
    <button
      onClick={() => openCase(c.id)}
      className={cn(
        "demo-card w-full text-left bg-white rounded-2xl p-4 md:p-5 border border-[var(--demo-border)]",
        c.blocked && "border-l-[3px] border-l-red-400",
        "focus-visible:outline-2 focus-visible:outline-brass focus-visible:outline-offset-2",
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center text-xs font-bold text-teal shrink-0">
          {getInitials(c.patient)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-ink truncate">{c.patient}</p>
          <p className="text-[13px] text-[var(--demo-muted)] truncate mt-0.5">{c.cityPath}</p>
        </div>
        <Badge variant="priority" value={c.priority} />
      </div>

      <div className="flex items-start gap-2.5 mb-3">
        <span className="text-[13px] text-ink-soft leading-relaxed flex-1">{c.program}</span>
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

      <p className="text-[13px] text-[var(--demo-muted)] leading-relaxed mb-3 line-clamp-2">
        {c.nextAction}
      </p>

      <div className="mb-3">
        <div className="h-1.5 bg-stone-dark/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal to-emerald-500 rounded-full transition-all"
            style={{ width: `${c.progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap text-[13px] text-[var(--demo-muted)]">
        <span className="flex items-center gap-1.5">
          <Clock size={13} />
          {c.slaHours}h
        </span>
        <span className="flex items-center gap-1.5 text-teal font-medium">
          <TrendingUp size={12} />
          {c.progressPercent}%
        </span>
        {c.unread > 0 && (
          <span className="flex items-center gap-1 text-orange-600 font-medium">
            <MessageSquare size={13} />
            {c.unread}
          </span>
        )}
        {c.docsPending > 0 && (
          <span className="flex items-center gap-1 text-red-600 font-medium">
            <FileWarning size={13} />
            {c.docsPending}
          </span>
        )}
        <span className="ml-auto truncate text-ink-soft">{c.dueLabel}</span>
      </div>
    </button>
  );
}
