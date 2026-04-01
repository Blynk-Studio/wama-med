"use client";

import { MessageSquare, Mail, Phone, Video, Send } from "lucide-react";
import { useSearchScopedData } from "../_hooks/use-search-scoped-data";
import { useDemoStore } from "../_lib/store";
import { SupportStrip } from "./SupportStrip";
import { Badge } from "./Badge";
import { EmptyState } from "./EmptyState";
import { cn } from "../_lib/utils";
import { FocusPanel } from "./FocusPanel";
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
  const { data, searchActive } = useSearchScopedData();
  const openCase = useDemoStore((s) => s.openCase);

  const pending = data.communications.filter((c) => c.status !== "envoye").length;
  const urgent = data.communications.filter((c) => c.priority === "critique" || c.priority === "haute").length;

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Echanges visibles", value: data.communications.length, icon: <MessageSquare size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "En attente", value: pending, icon: <Mail size={18} className="text-amber-600" />, accent: "#fef3c7" },
          { label: "Urgents", value: urgent, icon: <Send size={18} className="text-red-500" />, accent: "#fef2f2" },
        ]}
      />

      <FocusPanel panelId="communicationPanel" className="p-4 md:p-5">
        <div className="space-y-3">
          {data.communications.length === 0 ? (
            <EmptyState message={searchActive ? "Aucune communication ne correspond à cette recherche." : "Aucune communication."} />
          ) : (
            data.communications.map((comm) => {
              const Icon = CHANNEL_ICONS[comm.channel];
              const linkedCase = data.cases.find((c) => c.id === comm.caseId);
              return (
                <button
                  key={comm.id}
                  onClick={() => openCase(comm.caseId)}
                  className="demo-card w-full text-left bg-white rounded-2xl p-4 md:p-5 border border-[var(--demo-border)] flex items-start gap-3 focus-visible:outline-2 focus-visible:outline-brass"
                >
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", CHANNEL_COLORS[comm.channel])}>
                    <Icon size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[15px] font-semibold text-ink truncate">{comm.title}</span>
                      <Badge variant="priority" value={comm.priority} />
                    </div>
                    <p className="text-[13px] text-[var(--demo-muted)] leading-relaxed line-clamp-2">{comm.summary}</p>
                    <div className="flex items-center gap-2 mt-2 flex-wrap text-[13px] text-[var(--demo-muted)]">
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
      </FocusPanel>
    </div>
  );
}
