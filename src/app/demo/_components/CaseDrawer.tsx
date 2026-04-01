"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Clock, CheckCircle2, Circle, MessageSquare, CalendarDays,
  FileText, Handshake, Wallet, StickyNote,
} from "lucide-react";
import { useDemoStore } from "../_lib/store";
import { useDemoData } from "../_hooks/use-demo-data";
import { cn, formatMoney, getInitials } from "../_lib/utils";
import { Badge } from "./Badge";

export function CaseDrawer() {
  const drawerOpen = useDemoStore((s) => s.drawerOpen);
  const selectedCaseId = useDemoStore((s) => s.selectedCaseId);
  const closeDrawer = useDemoStore((s) => s.closeDrawer);
  const data = useDemoData();

  const selectedCase = data.cases.find((c) => c.id === selectedCaseId);
  const caseComms = data.communications.filter((c) => c.caseId === selectedCaseId);
  const caseEvents = data.events.filter((e) => e.caseId === selectedCaseId);
  const caseDocs = data.documents.filter((d) => d.caseId === selectedCaseId);
  const caseInvoices = data.invoices.filter((inv) => inv.caseId === selectedCaseId);
  const casePartners = data.partners.filter((p) =>
    selectedCase?.partnerIds.includes(p.id)
  );
  const caseCommissions = data.commissions.filter((c) =>
    casePartners.some((p) => p.id === c.partnerId)
  );

  return (
    <Dialog.Root open={drawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
      <AnimatePresence>
        {drawerOpen && (
          <Dialog.Portal forceMount>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </Dialog.Overlay>

            {/* Drawer panel */}
            <Dialog.Content asChild>
              <motion.div
                className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
              >
                {selectedCase ? (
                  <>
                    {/* Header */}
                    <div className="flex items-center gap-3 p-5 border-b border-[var(--demo-border)] shrink-0">
                      <div className="w-10 h-10 rounded-xl bg-teal/10 flex items-center justify-center text-sm font-bold text-teal">
                        {getInitials(selectedCase.patient)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Dialog.Title className="text-base font-bold text-ink truncate">
                          {selectedCase.patient}
                        </Dialog.Title>
                        <p className="text-xs text-[var(--demo-muted)]">
                          {selectedCase.id} · {selectedCase.cityPath}
                        </p>
                      </div>
                      <Dialog.Close asChild>
                        <button className="p-2 rounded-lg hover:bg-stone/60 transition-colors" aria-label="Fermer">
                          <X size={18} className="text-ink-soft" />
                        </button>
                      </Dialog.Close>
                    </div>

                    {/* Body — scrollable */}
                    <div className="flex-1 overflow-y-auto demo-scroll p-5 space-y-5">
                      {/* Summary grid */}
                      <div className="grid grid-cols-2 gap-3">
                        <MetaItem label="Etape" value={<Badge variant="stage" value={selectedCase.stage} />} />
                        <MetaItem label="Priorite" value={<Badge variant="priority" value={selectedCase.priority} />} />
                        <MetaItem label="Responsable" value={<span className="text-xs font-medium text-ink">{selectedCase.owner}</span>} />
                        <MetaItem label="Valeur" value={<span className="text-xs font-bold text-ink">{formatMoney(selectedCase.valueMad)}</span>} />
                      </div>

                      {/* Next action */}
                      <div className="bg-amber-50/80 border border-amber-200/50 rounded-xl p-4">
                        <p className="text-[11px] font-medium tracking-wide uppercase text-amber-700 mb-1">
                          Prochaine action
                        </p>
                        <p className="text-sm text-amber-900">{selectedCase.nextAction}</p>
                        <p className="text-[11px] text-amber-600 mt-1">
                          SLA : {selectedCase.slaHours}h · {selectedCase.wait}
                        </p>
                      </div>

                      {/* Timeline */}
                      <Section icon={Clock} title="Chronologie">
                        <div className="space-y-0">
                          {selectedCase.timeline.map((entry, i) => (
                            <div key={i} className="flex gap-3 py-2">
                              <div className="flex flex-col items-center">
                                <div className="w-2 h-2 rounded-full bg-teal mt-1.5" />
                                {i < selectedCase.timeline.length - 1 && (
                                  <div className="w-px flex-1 bg-stone-dark mt-1" />
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium text-ink">{entry.label}</p>
                                <p className="text-[11px] text-[var(--demo-muted)]">{entry.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Section>

                      {/* Tasks */}
                      <Section icon={CheckCircle2} title="Taches">
                        <div className="space-y-2">
                          {selectedCase.tasks.map((task, i) => (
                            <div key={i} className="flex items-start gap-2">
                              {task.status === "En cours" ? (
                                <CheckCircle2 size={14} className="text-teal mt-0.5 shrink-0" />
                              ) : (
                                <Circle size={14} className="text-[var(--demo-muted)] mt-0.5 shrink-0" />
                              )}
                              <div className="min-w-0 flex-1">
                                <p className="text-xs text-ink">{task.label}</p>
                                <p className="text-[11px] text-[var(--demo-muted)]">
                                  {task.owner} · {task.due}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Section>

                      {/* Communications */}
                      {caseComms.length > 0 && (
                        <Section icon={MessageSquare} title="Communications">
                          <div className="space-y-2">
                            {caseComms.map((comm) => (
                              <div key={comm.id} className="flex items-center gap-2 py-1">
                                <span className="text-[11px] font-medium text-ink truncate flex-1">{comm.title}</span>
                                <Badge variant="commStatus" value={comm.status} />
                              </div>
                            ))}
                          </div>
                        </Section>
                      )}

                      {/* Calendar */}
                      {caseEvents.length > 0 && (
                        <Section icon={CalendarDays} title="Rendez-vous">
                          <div className="space-y-2">
                            {caseEvents.map((ev) => (
                              <div key={ev.id} className="flex items-center gap-2 py-1">
                                <span className="text-xs font-medium text-ink tabular-nums">{ev.time}</span>
                                <span className="text-xs text-ink-soft truncate flex-1">{ev.title}</span>
                                <span className="text-[11px] text-[var(--demo-muted)]">{ev.location}</span>
                              </div>
                            ))}
                          </div>
                        </Section>
                      )}

                      {/* Documents */}
                      {caseDocs.length > 0 && (
                        <Section icon={FileText} title="Documents">
                          <div className="space-y-2">
                            {caseDocs.map((doc) => (
                              <div key={doc.id} className="flex items-center gap-2 py-1">
                                <span className="text-xs text-ink-soft truncate flex-1">{doc.title}</span>
                                <Badge variant="docStatus" value={doc.status} />
                              </div>
                            ))}
                          </div>
                        </Section>
                      )}

                      {/* Partners */}
                      {casePartners.length > 0 && (
                        <Section icon={Handshake} title="Partenaires">
                          <div className="space-y-2">
                            {casePartners.map((p) => (
                              <div key={p.id} className="flex items-center gap-2 py-1">
                                <span className="text-xs font-medium text-ink truncate flex-1">{p.name}</span>
                                <Badge variant="partnerHealth" value={p.health} />
                              </div>
                            ))}
                          </div>
                        </Section>
                      )}

                      {/* Finance */}
                      {(caseInvoices.length > 0 || caseCommissions.length > 0) && (
                        <Section icon={Wallet} title="Finance">
                          <div className="space-y-2">
                            {caseInvoices.map((inv) => (
                              <div key={inv.id} className="flex items-center gap-2 py-1">
                                <span className="text-xs text-ink-soft truncate flex-1">{inv.title}</span>
                                <Badge variant="invoiceStatus" value={inv.status} />
                                <span className="text-xs font-semibold text-ink tabular-nums whitespace-nowrap">
                                  {formatMoney(inv.amountMad)}
                                </span>
                              </div>
                            ))}
                            {caseCommissions.map((c) => (
                              <div key={c.id} className="flex items-center gap-2 py-1 text-xs">
                                <span className="text-ink-soft truncate flex-1">{c.title}</span>
                                <span className="font-semibold text-ink tabular-nums whitespace-nowrap">
                                  {formatMoney(c.amountMad)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </Section>
                      )}

                      {/* Notes */}
                      {selectedCase.notes.length > 0 && (
                        <Section icon={StickyNote} title="Notes internes">
                          <div className="space-y-2">
                            {selectedCase.notes.map((note, i) => (
                              <p key={i} className="text-xs text-ink-soft italic leading-relaxed">
                                "{note}"
                              </p>
                            ))}
                          </div>
                        </Section>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-sm text-[var(--demo-muted)]">
                    Aucun dossier selectionne
                  </div>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

/* ─── Helper Components ─── */

function Section({ icon: Icon, title, children }: { icon: typeof Clock; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className="text-brass" />
        <h4 className="text-xs font-semibold text-ink">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="bg-stone/30 rounded-lg p-3">
      <p className="text-[10px] uppercase tracking-wider text-[var(--demo-muted)] mb-1">{label}</p>
      {value}
    </div>
  );
}
