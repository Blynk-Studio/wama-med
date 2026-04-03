/* ─── Pipeline stages ─── */
export const PIPELINE_STAGES = [
  "inquiry",
  "coordination",
  "treatment",
  "recovery",
  "billing",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

/* ─── Views ─── */
export const DEMO_VIEWS = ["pipeline", "finances", "partners"] as const;
export type DemoV2View = (typeof DEMO_VIEWS)[number];

/* ─── Patient ─── */
export interface Patient {
  id: string;
  name: string;
  country: string;
  countryFlag: string;
  summary: string;
  stage: PipelineStage;
  nextDate: string;
  assignedTo: string;
  valueMad: number;
  notes: string;
}

/* ─── Invoice ─── */
export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface Invoice {
  id: string;
  patientId: string;
  patientName: string;
  description: string;
  amountMad: number;
  status: InvoiceStatus;
  date: string;
}

/* ─── Partner ─── */
export type PartnerType = "clinic" | "hotel" | "transport" | "doctor";
export type PartnerStatus = "active" | "review" | "inactive";

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  city: string;
  status: PartnerStatus;
  activeCases: number;
  contact: string;
  rating: string;
}

/* ─── Revenue ─── */
export type RevenuePeriod = "daily" | "weekly" | "monthly" | "yearly";

export interface RevenueSnapshot {
  period: RevenuePeriod;
  revenue: number;
  expenses: number;
  profit: number;
  invoiceCount: number;
}

/* ─── Stage metadata ─── */
export interface StageMeta {
  key: PipelineStage;
  label: string;
  color: string;
  bgTint: string;
}

/* ─── View metadata ─── */
export interface ViewMeta {
  key: DemoV2View;
  label: string;
  icon: string; // lucide icon name (resolved in component)
}
