import type {
  AccountingTab,
  DemoV3View,
  FinanceTab,
  PartnerCategory,
  Patient,
} from "./types";
import { ACCOUNTING_TABS, DEMO_V3_VIEWS, FINANCE_TABS, PARTNER_TABS } from "./types";

export function parseDemoV3View(value: string | string[] | undefined): DemoV3View | null {
  const candidate = Array.isArray(value) ? value[0] : value;
  return DEMO_V3_VIEWS.includes(candidate as DemoV3View)
    ? (candidate as DemoV3View)
    : null;
}

export function isPartnerCategory(value: string): value is PartnerCategory {
  return PARTNER_TABS.includes(value as PartnerCategory);
}

export function isFinanceTab(value: string): value is FinanceTab {
  return FINANCE_TABS.includes(value as FinanceTab);
}

export function isAccountingTab(value: string): value is AccountingTab {
  return ACCOUNTING_TABS.includes(value as AccountingTab);
}

export function formatCurrency(value: number, currency = "MAD") {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function formatDate(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(value?: string | null) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function patientFullName(patient: Pick<Patient, "civilite" | "prenom" | "nom">) {
  return `${patient.civilite} ${patient.prenom} ${patient.nom}`.replace(/\s+/g, " ").trim();
}

export function patientStatusLabel(status: number) {
  const labels: Record<number, string> = {
    1: "Premier contact",
    2: "Qualification",
    3: "Documents attendus",
    4: "Questionnaire médical",
    5: "Analyse dossier",
    6: "Évaluation médicale",
    7: "Devis en cours",
    8: "PEC / assurance",
    9: "Validation médicale",
    10: "Planification séjour",
    11: "Billets & logistique",
    12: "Patient sur place",
    13: "Consultation réalisée",
    14: "Intervention programmée",
    15: "Fit-to-fly",
    16: "Retour organisé",
    17: "Suivi post-op",
    18: "Clôturé",
  };
  return labels[status] ?? `Statut ${status}`;
}

export function urgencyLabel(urgency: string) {
  const labels: Record<string, string> = {
    urgent: "Urgent",
    "semi-urgent": "Semi-urgent",
    programme: "Programmé",
  };
  return labels[urgency] ?? urgency;
}

export function makeSlugId(prefix: string, size: number) {
  return `${prefix}-${String(size + 1).padStart(3, "0")}`;
}
