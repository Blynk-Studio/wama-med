import type {
  PipelineStage,
  InvoiceStatus,
  PartnerStatus,
  DemoV2View,
  DEMO_VIEWS,
} from "./types";

/* ─── Class name helper ─── */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

/* ─── Currency formatter (MAD, French locale) ─── */
export function formatMoney(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    maximumFractionDigits: 0,
  })
    .format(amount)
    .concat(" MAD");
}

/* ─── Initials from full name ─── */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/* ─── Stage colors (warm-shifted) ─── */
const STAGE_COLORS: Record<
  PipelineStage,
  { color: string; bg: string; text: string }
> = {
  inquiry: { color: "#4A90A4", bg: "rgba(74,144,164,0.08)", text: "#3A7384" },
  coordination: {
    color: "#7B6FA0",
    bg: "rgba(123,111,160,0.08)",
    text: "#6A5F8A",
  },
  treatment: { color: "#0B4042", bg: "rgba(11,64,66,0.08)", text: "#0B4042" },
  recovery: { color: "#3D8B6E", bg: "rgba(61,139,110,0.08)", text: "#327256" },
  billing: { color: "#B8903A", bg: "rgba(184,144,58,0.08)", text: "#96752F" },
};

export function getStageColor(stage: PipelineStage) {
  return STAGE_COLORS[stage];
}

/* ─── Invoice status colors ─── */
const INVOICE_COLORS: Record<
  InvoiceStatus,
  { bg: string; text: string; dot: string }
> = {
  paid: { bg: "rgba(45,134,89,0.08)", text: "#2D8659", dot: "#2D8659" },
  pending: { bg: "rgba(196,132,30,0.08)", text: "#96752F", dot: "#C4841E" },
  overdue: { bg: "rgba(194,74,74,0.08)", text: "#9B3B30", dot: "#C24A4A" },
};

export function getInvoiceColor(status: InvoiceStatus) {
  return INVOICE_COLORS[status];
}

/* ─── Partner status colors ─── */
const PARTNER_COLORS: Record<
  PartnerStatus,
  { bg: string; text: string; dot: string }
> = {
  active: { bg: "rgba(45,134,89,0.08)", text: "#2D8659", dot: "#2D8659" },
  review: { bg: "rgba(196,132,30,0.08)", text: "#96752F", dot: "#C4841E" },
  inactive: { bg: "rgba(138,127,117,0.08)", text: "#6B6058", dot: "#8A7F75" },
};

export function getPartnerColor(status: PartnerStatus) {
  return PARTNER_COLORS[status];
}

/* ─── View parser ─── */
export function parseV2View(
  raw: string | string[] | undefined,
): DemoV2View | null {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v) return null;
  const views: readonly string[] = ["pipeline", "finances", "partners"];
  return views.includes(v) ? (v as DemoV2View) : null;
}
