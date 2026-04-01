"use client";

import { cn } from "../_lib/utils";
import type { CasePriority, CaseStage, CommStatus, DocStatus, InvoiceStatus, PartnerHealth } from "../_lib/types";
import {
  getPriorityColor,
  getStageColor,
  getCommStatusColor,
  getDocStatusColor,
  getInvoiceStatusColor,
  getPartnerHealthColor,
} from "../_lib/utils";

type BadgeVariant =
  | { variant: "priority"; value: CasePriority }
  | { variant: "stage"; value: CaseStage }
  | { variant: "commStatus"; value: CommStatus }
  | { variant: "docStatus"; value: DocStatus }
  | { variant: "invoiceStatus"; value: InvoiceStatus }
  | { variant: "partnerHealth"; value: PartnerHealth };

const PRIORITY_LABELS: Record<CasePriority, string> = {
  critique: "Critique",
  haute: "Haute",
  moyenne: "Moyenne",
  standard: "Standard",
};

const COMM_STATUS_LABELS: Record<CommStatus, string> = {
  nouveau: "Nouveau",
  "attente-reponse": "Attente reponse",
  "attente-piece": "Attente piece",
  planifie: "Planifie",
  envoye: "Envoye",
};

const DOC_STATUS_LABELS: Record<DocStatus, string> = {
  valide: "Valide",
  incomplet: "Incomplet",
  manquant: "Manquant",
  "a verifier": "A verifier",
  "a obtenir": "A obtenir",
};

const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  confirme: "Confirme",
  en_attente: "En attente",
  a_envoyer: "A envoyer",
  en_retard: "En retard",
};

const HEALTH_LABELS: Record<PartnerHealth, string> = {
  solide: "Solide",
  vigilance: "Vigilance",
  attention: "Attention",
};

export function Badge(props: BadgeVariant) {
  let bg: string, text: string, label: string;

  switch (props.variant) {
    case "priority": {
      const c = getPriorityColor(props.value);
      bg = c.bg; text = c.text; label = PRIORITY_LABELS[props.value];
      break;
    }
    case "stage": {
      const c = getStageColor(props.value);
      bg = c.bg; text = c.text; label = props.value;
      break;
    }
    case "commStatus": {
      const c = getCommStatusColor(props.value);
      bg = c.bg; text = c.text; label = COMM_STATUS_LABELS[props.value];
      break;
    }
    case "docStatus": {
      const c = getDocStatusColor(props.value);
      bg = c.bg; text = c.text; label = DOC_STATUS_LABELS[props.value];
      break;
    }
    case "invoiceStatus": {
      const c = getInvoiceStatusColor(props.value);
      bg = c.bg; text = c.text; label = INVOICE_STATUS_LABELS[props.value];
      break;
    }
    case "partnerHealth": {
      const c = getPartnerHealthColor(props.value);
      bg = c.bg; text = c.text; label = HEALTH_LABELS[props.value];
      break;
    }
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium leading-tight",
        bg, text,
        props.variant === "priority" && props.value === "critique" && "demo-pulse"
      )}
    >
      {label}
    </span>
  );
}
