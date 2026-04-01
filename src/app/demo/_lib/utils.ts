import type { CasePriority, CaseStage, CommStatus, DocStatus, InvoiceStatus, PartnerHealth, EventStatus, CommissionStatus, BlockerType } from "./types";

/** Conditional class joiner — no external dep needed for this scope */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/** Format MAD currency with French-style spacing: 118 000 MAD */
export function formatMoney(amount: number): string {
  return amount.toLocaleString("fr-FR").replace(/,/g, " ") + " MAD";
}

/** First + last initial: "Aissatou Faye" → "AF" */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ─── Color Maps ─── */

export function getPriorityColor(p: CasePriority) {
  const map: Record<CasePriority, { bg: string; text: string; dot: string }> = {
    critique: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
    haute:    { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
    moyenne:  { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    standard: { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" },
  };
  return map[p];
}

export function getStageColor(s: CaseStage) {
  const map: Record<CaseStage, { bg: string; text: string }> = {
    Nouveau:        { bg: "bg-sky-50", text: "text-sky-700" },
    Qualification:  { bg: "bg-violet-50", text: "text-violet-700" },
    Validation:     { bg: "bg-indigo-50", text: "text-indigo-700" },
    Planification:  { bg: "bg-teal-50", text: "text-teal-700" },
    "Sur place":    { bg: "bg-emerald-50", text: "text-emerald-700" },
    Cloture:        { bg: "bg-slate-50", text: "text-slate-600" },
  };
  return map[s];
}

export function getCommStatusColor(s: CommStatus) {
  const map: Record<CommStatus, { bg: string; text: string }> = {
    nouveau:          { bg: "bg-sky-50", text: "text-sky-700" },
    "attente-reponse": { bg: "bg-orange-50", text: "text-orange-700" },
    "attente-piece":   { bg: "bg-amber-50", text: "text-amber-700" },
    planifie:         { bg: "bg-indigo-50", text: "text-indigo-700" },
    envoye:           { bg: "bg-slate-50", text: "text-slate-600" },
  };
  return map[s];
}

export function getDocStatusColor(s: DocStatus) {
  const map: Record<DocStatus, { bg: string; text: string }> = {
    valide:       { bg: "bg-emerald-50", text: "text-emerald-700" },
    incomplet:    { bg: "bg-orange-50", text: "text-orange-700" },
    manquant:     { bg: "bg-red-50", text: "text-red-700" },
    "a verifier": { bg: "bg-amber-50", text: "text-amber-700" },
    "a obtenir":  { bg: "bg-violet-50", text: "text-violet-700" },
  };
  return map[s];
}

export function getInvoiceStatusColor(s: InvoiceStatus) {
  const map: Record<InvoiceStatus, { bg: string; text: string }> = {
    confirme:   { bg: "bg-emerald-50", text: "text-emerald-700" },
    en_attente: { bg: "bg-amber-50", text: "text-amber-700" },
    a_envoyer:  { bg: "bg-sky-50", text: "text-sky-700" },
    en_retard:  { bg: "bg-red-50", text: "text-red-700" },
  };
  return map[s];
}

export function getPartnerHealthColor(h: PartnerHealth) {
  const map: Record<PartnerHealth, { bg: string; text: string; dot: string }> = {
    solide:    { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
    vigilance: { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
    attention: { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  };
  return map[h];
}

export function getEventStatusColor(s: EventStatus) {
  const map: Record<EventStatus, string> = {
    normal:   "border-l-slate-300",
    attention: "border-l-amber-400",
    chaud:    "border-l-orange-500",
    critique: "border-l-red-500",
  };
  return map[s];
}

export function getCommissionStatusColor(s: CommissionStatus) {
  const map: Record<CommissionStatus, { bg: string; text: string }> = {
    confirmee:  { bg: "bg-emerald-50", text: "text-emerald-700" },
    a_recevoir: { bg: "bg-amber-50", text: "text-amber-700" },
  };
  return map[s];
}

/** Priority weight for sorting (higher = more urgent) */
export function priorityWeight(p: CasePriority): number {
  const map: Record<CasePriority, number> = {
    critique: 4,
    haute: 3,
    moyenne: 2,
    standard: 1,
  };
  return map[p];
}

/* ─── SLA Status ─── */

export function getSlaStatus(slaHours: number): { color: string; percent: number; label: string } {
  // Simulate elapsed time: shorter SLA = more burned
  const elapsed = slaHours <= 3 ? 0.75 : slaHours <= 9 ? 0.55 : slaHours <= 18 ? 0.35 : 0.15;
  const remaining = 1 - elapsed;
  const percent = Math.round(remaining * 100);

  if (remaining > 0.5) return { color: "#16a34a", percent, label: `${Math.round(slaHours * remaining)}h restantes` };
  if (remaining > 0.25) return { color: "#d97706", percent, label: `${Math.round(slaHours * remaining)}h restantes` };
  return { color: "#dc2626", percent, label: `${Math.round(slaHours * remaining)}h restantes` };
}

/* ─── Blocker ─── */

export function getBlockerInfo(type: BlockerType): { label: string; color: string; bg: string; text: string } | null {
  if (!type) return null;
  const map: Record<NonNullable<BlockerType>, { label: string; color: string; bg: string; text: string }> = {
    docs:    { label: "Docs", color: "#dc2626", bg: "bg-red-50", text: "text-red-700" },
    finance: { label: "Finance", color: "#d97706", bg: "bg-amber-50", text: "text-amber-700" },
    partner: { label: "Partenaire", color: "#2563eb", bg: "bg-blue-50", text: "text-blue-700" },
    medical: { label: "Medical", color: "#7c3aed", bg: "bg-violet-50", text: "text-violet-700" },
  };
  return map[type];
}
