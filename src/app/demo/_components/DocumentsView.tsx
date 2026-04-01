"use client";

import { FileText, AlertCircle } from "lucide-react";
import { useSearchScopedData } from "../_hooks/use-search-scoped-data";
import { useDemoStore } from "../_lib/store";
import { SupportStrip } from "./SupportStrip";
import { Badge } from "./Badge";
import { EmptyState } from "./EmptyState";
import { FocusPanel } from "./FocusPanel";

export function DocumentsView() {
  const { data, searchActive } = useSearchScopedData();
  const openCase = useDemoStore((s) => s.openCase);

  const pending = data.documents.filter((d) => d.status !== "valide").length;
  const critical = data.documents.filter(
    (d) => d.status === "manquant" || (d.priority === "critique" || d.priority === "haute")
  ).length;

  const sorted = [...data.documents].sort((a, b) => {
    const priorityWeight = (doc: (typeof data.documents)[number]) => {
      if (doc.status === "manquant" || doc.priority === "critique") return 3;
      if (doc.priority === "haute" || doc.status !== "valide") return 2;
      if (doc.status === "valide") return 0;
      return 1;
    };

    return priorityWeight(b) - priorityWeight(a);
  });

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Documents visibles", value: data.documents.length, icon: <FileText size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "A traiter", value: pending, icon: <AlertCircle size={18} className="text-amber-600" />, accent: "#fef3c7" },
          { label: "Sensibles", value: critical, icon: <AlertCircle size={18} className="text-red-600" />, accent: "#fef2f2" },
        ]}
      />

      <FocusPanel panelId="documentPanel" className="p-4 md:p-5">
        <div className="space-y-3">
          {sorted.length === 0 ? (
            <EmptyState message={searchActive ? "Aucun document ne correspond à cette recherche." : "Aucun document."} />
          ) : (
            sorted.map((doc) => {
              const linkedCase = data.cases.find((c) => c.id === doc.caseId);
              return (
                <button
                  key={doc.id}
                  onClick={() => openCase(doc.caseId)}
                  className="demo-card w-full text-left bg-white rounded-2xl p-4 md:p-5 border border-[var(--demo-border)] flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-brass"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone/60 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-ink-soft" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[15px] font-semibold text-ink truncate">{doc.title}</span>
                      <Badge variant="docStatus" value={doc.status} />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap text-[13px] text-[var(--demo-muted)]">
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
                      <p className="text-[13px] text-[var(--demo-muted)] mt-1.5 italic leading-relaxed">{doc.note}</p>
                    )}
                  </div>

                  <Badge variant="priority" value={doc.priority} />
                </button>
              );
            })
          )}
        </div>
      </FocusPanel>
    </div>
  );
}
