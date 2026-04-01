"use client";

import { MessageSquare, Mail, Phone, Video, Send } from "lucide-react";
import { useDemoData } from "../_hooks/use-demo-data";
import { useDemoStore } from "../_lib/store";
import { SupportStrip } from "./SupportStrip";
import { Badge } from "./Badge";
import { EmptyState } from "./EmptyState";
import { cn } from "../_lib/utils";
import type { CommChannel } from "../_lib/types";

const CHANNEL_ICONS: Record<CommChannel, typeof MessageSquare> = {
  WhatsApp: MessageSquare,
  Email: Mail,
  SMS: Phone,
  Meeting: Video,
};

const CHANNEL_COLORS: Record<CommChannel, string> = {
  WhatsApp: "bg-green-50 text-green-700",
  Email: "bg-sky-50 text-sky-700",
  SMS: "bg-violet-50 text-violet-700",
  Meeting: "bg-indigo-50 text-indigo-700",
};

export function CommsView() {
  const data = useDemoData();
  const openCase = useDemoStore((s) => s.openCase);

  const pending = data.communications.filter((c) => c.status !== "envoye").length;
  const urgent = data.communications.filter((c) => c.priority === "critique" || c.priority === "haute").length;

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Total echanges", value: data.communications.length, icon: <MessageSquare size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "En attente", value: pending, icon: <Mail size={18} className="text-amber-600" />, accent: "#fef3c7" },
          { label: "Urgents", value: urgent, icon: <Send size={18} className="text-red-500" />, accent: "#fef2f2" },
        ]}
      />

      <div className="space-y-2">
        {data.communications.length === 0 ? (
          <EmptyState message="Aucune communication" />
        ) : (
          data.communications.map((comm) => {
            const Icon = CHANNEL_ICONS[comm.channel];
            const linkedCase = data.cases.find((c) => c.id === comm.caseId);
            return (
              <button
                key={comm.id}
                onClick={() => openCase(comm.caseId)}
                className="demo-card w-full text-left bg-white rounded-xl p-4 border border-[var(--demo-border)] flex items-start gap-3 focus-visible:outline-2 focus-visible:outline-brass"
              >
                {/* Channel icon */}
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", CHANNEL_COLORS[comm.channel])}>
                  <Icon size={16} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-ink truncate">{comm.title}</span>
                    <Badge variant="priority" value={comm.priority} />
                  </div>
                  <p className="text-xs text-[var(--demo-muted)] leading-snug truncate">{comm.summary}</p>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[var(--demo-muted)]">
                    <Badge variant="commStatus" value={comm.status} />
                    <span>·</span>
                    <span>{comm.age}</span>
                    {linkedCase && (
                      <>
                        <span>·</span>
                        <span className="font-medium text-teal">{linkedCase.patient}</span>
                      </>
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
