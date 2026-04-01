"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  X, Clock, CheckCircle2, Circle, MessageSquare, CalendarDays,
  FileText, Handshake, Wallet, StickyNote, Send, Upload, PenLine,
  AlertTriangle, TrendingUp,
} from "lucide-react";
import { useDemoStore } from "../_lib/store";
import { useDemoData } from "../_hooks/use-demo-data";
import { cn, formatMoney, getInitials, getBlockerInfo } from "../_lib/utils";
import { Badge } from "./Badge";
import { JourneyTimeline } from "./JourneyTimeline";
import { SlaRing } from "./SlaRing";
import { useToast, ToastContainer } from "./Toast";

export function CaseDrawer() {
  const drawerOpen = useDemoStore((s) => s.drawerOpen);
  const selectedCaseId = useDemoStore((s) => s.selectedCaseId);
  const closeDrawer = useDemoStore((s) => s.closeDrawer);
  const data = useDemoData();
  const { toasts, showToast } = useToast();

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

  const blockerInfo = selectedCase ? getBlockerInfo(selectedCase.blockerType) : null;
  const hasDocIssues = caseDocs.some((d) => d.status !== "valide");
  const hasFinanceIssues = caseInvoices.some((i) => i.status === "en_retard" || i.status === "en_attente");
  const hasUnreadComms = caseComms.some((c) => c.status === "attente-reponse" || c.status === "nouveau");

  return (
    <>
      <Dialog.Root open={drawerOpen} onOpenChange={(open) => !open && closeDrawer()}>
        <AnimatePresence>
          {drawerOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 bg-ink/20 backdrop-blur-sm z-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white shadow-2xl z-50 flex flex-col overflow-hidden"
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
                        {/* Progress pill */}
                        <div className="flex items-center gap-1.5 bg-stone/50 rounded-full px-2.5 py-1 shrink-0">
                          <TrendingUp size={12} className="text-teal" />
                          <span className="text-[11px] font-bold text-teal tabular-nums">{selectedCase.progressPercent}%</span>
                        </div>
                        <Dialog.Close asChild>
                          <button className="p-2 rounded-lg hover:bg-stone/60 transition-colors" aria-label="Fermer">
                            <X size={18} className="text-ink-soft" />
                          </button>
                        </Dialog.Close>
                      </div>

                      {/* Body */}
                      <div className="flex-1 overflow-y-auto demo-scroll p-5 space-y-5">
                        {/* Journey Timeline — the hero piece */}
                        <JourneyTimeline
                          currentStage={selectedCase.stage}
                          stageHistory={selectedCase.stageHistory}
                          progressPercent={selectedCase.progressPercent}
                        />

                        {/* Blocker banner */}
                        {selectedCase.blocked && blockerInfo && (
                          <div className={cn("rounded-xl p-4 border flex items-center gap-3", blockerInfo.bg, "border-current/10")}>
                            <AlertTriangle size={18} style={{ color: blockerInfo.color }} />
                            <div>
                              <p className={cn("text-xs font-bold", blockerInfo.text)}>
                                Bloque — {blockerInfo.label}
                              </p>
                              <p className="text-[11px] text-ink-soft mt-0.5">{selectedCase.wait}</p>
                            </div>
                          </div>
                        )}

                        {/* Summary grid */}
                        <div className="grid grid-cols-2 gap-3">
                          <MetaItem label="Etape" value={<Badge variant="stage" value={selectedCase.stage} />} />
                          <MetaItem label="Priorite" value={<Badge variant="priority" value={selectedCase.priority} />} />
                          <MetaItem label="Responsable" value={<span className="text-xs font-medium text-ink">{selectedCase.owner}</span>} />
                          <MetaItem label="Valeur pipeline" value={<span className="text-xs font-bold text-ink">{formatMoney(selectedCase.valueMad)}</span>} />
                        </div>

                        {/* Next action with SLA ring */}
                        <div className="bg-amber-50/80 border border-amber-200/50 rounded-xl p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="text-[11px] font-medium tracking-wide uppercase text-amber-700 mb-1">
                                Prochaine action
                              </p>
                              <p className="text-sm text-amber-900 leading-snug">{selectedCase.nextAction}</p>
                            </div>
                            <SlaRing slaHours={selectedCase.slaHours} />
                          </div>
                        </div>

                        {/* Quick actions bar */}
                        <div className="flex gap-2">
                          <QuickAction icon={Send} label="Envoyer rappel" onClick={() => showToast("Rappel envoye (simulation)")} />
                          <QuickAction icon={Upload} label="Demander document" onClick={() => showToast("Demande envoyee (simulation)")} />
                          <QuickAction icon={PenLine} label="Ajouter note" onClick={() => showToast("Note ajoutee (simulation)")} />
                        </div>

                        {/* Timeline */}
                        <Section icon={Clock} title="Chronologie">
                          <div className="space-y-0">
                            {selectedCase.timeline.map((entry, i) => (
                              <div key={i} className="flex gap-3 py-2">
                                <div className="flex flex-col items-center">
                                  <div className={cn(
                                    "w-2.5 h-2.5 rounded-full mt-1",
                                    i === selectedCase.timeline.length - 1 ? "bg-teal demo-status-dot-live" : "bg-teal/40"
                                  )} />
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

                        {/* Tasks — enhanced with urgency */}
                        <Section icon={CheckCircle2} title="Taches" count={selectedCase.tasks.length}>
                          <div className="space-y-2">
                            {selectedCase.tasks.map((task, i) => (
                              <div key={i} className={cn(
                                "flex items-start gap-2 p-2 rounded-lg -mx-2",
                                task.status === "A faire" && "bg-amber-50/50"
                              )}>
                                {task.status === "En cours" ? (
                                  <CheckCircle2 size={14} className="text-teal mt-0.5 shrink-0" />
                                ) : (
                                  <Circle size={14} className="text-amber-500 mt-0.5 shrink-0" />
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

                        {/* Communications — highlighted if unread */}
                        {caseComms.length > 0 && (
                          <Section
                            icon={MessageSquare}
                            title="Communications"
                            count={caseComms.length}
                            highlight={hasUnreadComms}
                          >
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
                          <Section icon={CalendarDays} title="Rendez-vous" count={caseEvents.length}>
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

                        {/* Documents — highlighted if issues */}
                        {caseDocs.length > 0 && (
                          <Section
                            icon={FileText}
                            title="Documents"
                            count={caseDocs.length}
                            highlight={hasDocIssues}
                          >
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
                          <Section icon={Handshake} title="Partenaires" count={casePartners.length}>
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

                        {/* Finance — highlighted if issues */}
                        {(caseInvoices.length > 0 || caseCommissions.length > 0) && (
                          <Section
                            icon={Wallet}
                            title="Finance"
                            highlight={hasFinanceIssues}
                          >
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
                                  &ldquo;{note}&rdquo;
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
      <ToastContainer toasts={toasts} />
    </>
  );
}

/* ─── Helper Components ─── */

function Section({
  icon: Icon,
  title,
  count,
  highlight,
  children,
}: {
  icon: typeof Clock;
  title: string;
  count?: number;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(
      "rounded-xl p-3 -mx-1 transition-colors",
      highlight && "bg-amber-50/60 border border-amber-200/30"
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={cn(highlight ? "text-amber-600" : "text-brass")} />
        <h4 className="text-xs font-semibold text-ink">{title}</h4>
        {count !== undefined && (
          <span className={cn(
            "ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full",
            highlight ? "bg-amber-100 text-amber-700" : "bg-stone/60 text-[var(--demo-muted)]"
          )}>
            {count}
          </span>
        )}
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

function QuickAction({ icon: Icon, label, onClick }: { icon: typeof Send; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-[var(--demo-border)] text-[11px] font-medium text-ink-soft hover:bg-stone/40 hover:text-ink transition-colors"
    >
      <Icon size={13} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
