"use client";

import { FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useDemoData } from "../_hooks/use-demo-data";
import { useDemoStore } from "../_lib/store";
import { SupportStrip } from "./SupportStrip";
import { Badge } from "./Badge";
import { EmptyState } from "./EmptyState";

export function DocumentsView() {
  const data = useDemoData();
  const openCase = useDemoStore((s) => s.openCase);

  const validated = data.documents.filter((d) => d.status === "valide").length;
  const pending = data.documents.filter((d) => d.status !== "valide").length;
  const critical = data.documents.filter(
    (d) => d.status === "manquant" || (d.priority === "critique" || d.priority === "haute")
  ).length;

  // Sort: critical first, then by status
  const sorted = [...data.documents].sort((a, b) => {
    if (a.status === "valide" && b.status !== "valide") return 1;
    if (a.status !== "valide" && b.status === "valide") return -1;
    return 0;
  });

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Total documents", value: data.documents.length, icon: <FileText size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "A traiter", value: pending, icon: <AlertCircle size={18} className="text-amber-600" />, accent: "#fef3c7" },
          { label: "Valides", value: validated, icon: <CheckCircle size={18} className="text-emerald-600" />, accent: "#ecfdf5" },
        ]}
      />

      <div className="space-y-2">
        {sorted.length === 0 ? (
          <EmptyState message="Aucun document" />
        ) : (
          sorted.map((doc) => {
            const linkedCase = data.cases.find((c) => c.id === doc.caseId);
            return (
              <button
                key={doc.id}
                onClick={() => openCase(doc.caseId)}
                className="demo-card w-full text-left bg-white rounded-xl p-4 border border-[var(--demo-border)] flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-brass"
              >
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-stone/60 flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-ink-soft" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-ink truncate">{doc.title}</span>
                    <Badge variant="docStatus" value={doc.status} />
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-[var(--demo-muted)]">
                    <span className="font-medium">{doc.category}</span>
                    <span>·</span>
                    <span>{doc.owner}</span>
                    {linkedCase && (
                      <>
                        <span>·</span>
                        <span className="text-teal font-medium">{linkedCase.patient}</span>
                      </>
                    )}
                  </div>
                  {doc.note && (
                    <p className="text-[11px] text-[var(--demo-muted)] mt-1 italic">{doc.note}</p>
                  )}
                </div>

                {/* Priority */}
                <Badge variant="priority" value={doc.priority} />
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
