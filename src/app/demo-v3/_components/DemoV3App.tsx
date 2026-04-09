"use client";

import Image from "next/image";
import { Fragment, startTransition, useDeferredValue, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Download,
  FileSpreadsheet,
  FileText,
  Filter,
  FolderOpen,
  HandCoins,
  Handshake,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Settings,
  Stethoscope,
  Trash2,
  UserRoundPlus,
  Users,
  X,
} from "lucide-react";
import { Chart, registerables } from "chart.js";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useDemoV3Store } from "../_lib/store";
import type {
  AccountingEntry,
  AccountingTab,
  AlertItem,
  CalendarEventItem,
  CommissionItem,
  DemoV3Seed,
  DemoV3View,
  FacturePatient,
  FinanceTab,
  MedicalDocument,
  Medecin,
  PartnerCategory,
  Patient,
} from "../_lib/types";
import { useV3UrlSync } from "../_hooks/use-v3-routing";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  patientFullName,
  patientStatusLabel,
  urgencyLabel,
} from "../_lib/utils";

Chart.register(...registerables);

const NAV_ITEMS: Array<{
  view: DemoV3View;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { view: "dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
  { view: "patients", label: "Patients", icon: Users },
  { view: "medecins", label: "Médecins", icon: Stethoscope },
  { view: "partenaires", label: "Partenaires", icon: Handshake },
  { view: "documents", label: "Documents", icon: FolderOpen },
  { view: "templates", label: "Templates", icon: Mail },
  { view: "calendrier", label: "Calendrier", icon: CalendarDays },
  { view: "alertes", label: "Alertes", icon: Bell },
  { view: "emails", label: "Emails Patients", icon: Inbox },
  { view: "financier", label: "Financier", icon: CircleDollarSign },
  { view: "rapports", label: "Rapports", icon: FileText },
  { view: "comptabilite", label: "Comptabilité", icon: Calculator },
];

const PARTNER_LABELS: Record<PartnerCategory, string> = {
  cliniques: "Cliniques",
  hebergements: "Hébergements",
  chauffeurs: "Chauffeurs",
  assurances: "Assurances",
};

const FINANCE_TAB_LABELS: Record<FinanceTab, string> = {
  commissions: "Commissions Partenaires",
  factures: "Factures Patients",
  services: "Catalogue Services",
  parametres: "Paramètres",
};

const TEMPLATE_VARIABLE_LABELS: Record<string, string> = {
  civilite: "Civilité",
  prenom_patient: "Prénom patient",
  nom_patient: "Nom patient",
  pathologie: "Pathologie",
  numero_dossier: "Numéro dossier",
  prenom_cm: "Prénom CM",
  nom_cm: "Nom CM",
  titre_medecin: "Titre médecin",
  nom_medecin: "Nom médecin",
  date_consultation: "Date consultation",
  date_intervention: "Date intervention",
  documents_manquants: "Documents manquants",
};

type PartnerDraft = Record<string, string | number | boolean | string[] | undefined>;

function createPartnerId(category: PartnerCategory, size: number) {
  const prefixMap: Record<PartnerCategory, string> = {
    cliniques: "CLI",
    hebergements: "HEB",
    chauffeurs: "CHA",
    assurances: "ASS",
  };

  return `${prefixMap[category]}-${String(size + 1).padStart(3, "0")}`;
}

function createPatientId(size: number) {
  return `WM-${new Date().getFullYear()}-${String(size + 1).padStart(3, "0")}`;
}

function createMedecinId(size: number) {
  return `MED-${String(size + 1).padStart(3, "0")}`;
}

function createDocumentId(size: number) {
  return `DOC-${String(size + 1).padStart(3, "0")}`;
}

function createEmailId() {
  return `EMAIL-${Date.now()}`;
}

function createCommissionId(size: number) {
  return `COM-${String(size + 1).padStart(3, "0")}`;
}

function createFactureId(size: number) {
  return `FAC-P-${String(size + 1).padStart(3, "0")}`;
}

function createAccountingId(size: number) {
  return `ECR-${String(size + 1).padStart(3, "0")}`;
}

function getPatientNameById(patients: Patient[], patientId: string) {
  const patient = patients.find((item) => item.id === patientId);
  return patient ? patientFullName(patient) : patientId;
}

function buildAlerts(
  patients: Patient[],
  documents: MedicalDocument[],
  evenements: CalendarEventItem[],
  emails: DemoV3Seed["emails"],
  factures: FacturePatient[],
) {
  const alerts: AlertItem[] = [];

  patients.forEach((patient) => {
    if (patient.urgence === "urgent" && patient.statut < 10) {
      alerts.push({
        id: `urgence-${patient.id}`,
        type: "urgence",
        priorite: "critique",
        titre: "Cas urgent à traiter",
        description: `${patientFullName(patient)} doit passer en phase opérationnelle.`,
        action: "Activer une coordination immédiate",
        patientId: patient.id,
        patientNom: patientFullName(patient),
        dateCreation: patient.dateCreation,
      });
    }

    const patientDocuments = documents.filter((document) => document.patientId === patient.id);
    if (patient.statut <= 6 && patientDocuments.length === 0) {
      alerts.push({
        id: `documents-${patient.id}`,
        type: "document_manquant",
        priorite: "haute",
        titre: "Documents médicaux manquants",
        description: `${patientFullName(patient)} n'a encore aucun document qualifié dans le dossier.`,
        action: "Relancer le patient",
        patientId: patient.id,
        patientNom: patientFullName(patient),
        dateCreation: patient.dateCreation,
      });
    }
  });

  evenements.forEach((event) => {
    if (event.statut === "confirmé" && !event.rappelEnvoye) {
      alerts.push({
        id: `rdv-${event.id}`,
        type: "rdv_proche",
        priorite: "moyenne",
        titre: "Rappel rendez-vous à envoyer",
        description: `${event.title} à ${event.lieu ?? "Casablanca"} avec ${event.medecin ?? "l'équipe médicale"}.`,
        action: "Envoyer le rappel",
        patientId: event.patientId,
        patientNom: getPatientNameById(patients, event.patientId),
        dateCreation: event.start,
      });
    }
  });

  emails
    .filter((email) => email.statut === "en_attente")
    .forEach((email) => {
      alerts.push({
        id: `email-${email.id}`,
        type: "email_patient",
        priorite: email.priorite === "normale" ? "moyenne" : email.priorite,
        titre: "Email patient en attente",
        description: `${email.patientNom} attend une réponse sur “${email.sujet}”.`,
        action: "Répondre au patient",
        patientId: email.patientId,
        patientNom: email.patientNom,
        dateCreation: email.dateReception,
      });
    });

  factures
    .filter((facture) => facture.statut !== "payee")
    .forEach((facture) => {
      alerts.push({
        id: `facture-${facture.id}`,
        type: "facture",
        priorite: facture.statut === "envoyee" ? "moyenne" : "haute",
        titre: "Facture à suivre",
        description: `${facture.numero} pour ${facture.patient_nom} reste à encaisser.`,
        action: "Relancer ou encaisser",
        patientId: facture.patient_id,
        patientNom: facture.patient_nom,
        dateCreation: facture.date_emission,
      });
    });

  const priorityOrder = { critique: 0, haute: 1, moyenne: 2, basse: 3 };
  return alerts.sort(
    (left, right) =>
      priorityOrder[left.priorite] - priorityOrder[right.priorite] ||
      new Date(right.dateCreation).getTime() - new Date(left.dateCreation).getTime(),
  );
}

function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function exportTablePdf(title: string, headers: string[], rows: string[][]) {
  const document = new jsPDF({ unit: "pt", format: "a4" });
  document.setFontSize(18);
  document.text(title, 40, 42);
  autoTable(document, {
    head: [headers],
    body: rows,
    startY: 60,
    theme: "grid",
    headStyles: {
      fillColor: [99, 102, 241],
    },
    styles: {
      fontSize: 9,
      cellPadding: 6,
    },
  });
  document.save(`${title.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}

function exportJson(filename: string, data: unknown) {
  downloadBlob(
    filename,
    new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }),
  );
}

function renderPriorityPill(priority: AlertItem["priorite"]) {
  return {
    critique: "pill-danger",
    haute: "pill-warning",
    moyenne: "pill-info",
    basse: "pill-neutral",
  }[priority];
}

function prettifyTemplateVariable(variable?: string | null) {
  if (!variable) {
    return "Variable";
  }

  const normalized = variable.replace(/[{}[\]]/g, "").replace(/\s+/g, "");
  if (TEMPLATE_VARIABLE_LABELS[normalized]) {
    return TEMPLATE_VARIABLE_LABELS[normalized];
  }

  return normalized
    .split(/[_-]/)
    .filter(Boolean)
    .map((chunk, index) =>
      index === 0 ? chunk.charAt(0).toUpperCase() + chunk.slice(1) : chunk.toLowerCase(),
    )
    .join(" ");
}

function normalizeTemplatePreview(text?: string | null) {
  if (!text) {
    return "";
  }

  return text.replace(/\s+/g, " ").trim();
}

function renderTemplateRichText(text: string | undefined | null, maxLength: number) {
  const normalized = normalizeTemplatePreview(text);
  const truncated =
    normalized.length > maxLength ? `${normalized.slice(0, maxLength).trimEnd()}…` : normalized;
  const parts = truncated.split(/(\{[^}]+\}|\[[^\]]+\])/g).filter(Boolean);

  return parts.map((part, index) => {
    if ((part.startsWith("{") && part.endsWith("}")) || (part.startsWith("[") && part.endsWith("]"))) {
      return (
        <span className="template-token-inline" key={`${part}-${index}`}>
          {prettifyTemplateVariable(part)}
        </span>
      );
    }

    return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
  });
}

function templatePreviewBody(body: string) {
  const meaningfulLines = body
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, 3);

  return meaningfulLines.join(" ");
}

function templateDisplaySubject(template: { sujet?: string | null; corps: string; type: string }) {
  const explicitSubject = normalizeTemplatePreview(template.sujet);
  if (explicitSubject) {
    return explicitSubject;
  }

  if (template.type === "sms") {
    return "Message SMS";
  }

  if (template.type === "whatsapp") {
    return "Message WhatsApp";
  }

  return templatePreviewBody(template.corps);
}

function ChartPanel({
  type,
  data,
  options,
  height = 260,
}: {
  type: "doughnut" | "line" | "bar";
  data: Record<string, unknown>;
  options: Record<string, unknown>;
  height?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const chart = new Chart(canvasRef.current, {
      type,
      data: data as never,
      options: options as never,
    });

    return () => chart.destroy();
  }, [data, options, type]);

  return (
    <div className="v3-chart-panel" style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

function StatCard({
  label,
  value,
  meta,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  meta: string;
  icon: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "success" | "warning" | "danger" | "info";
}) {
  return (
    <div className={`v3-stat-card tone-${tone}`}>
      <div className="v3-stat-icon">
        <Icon className="h-5 w-5" />
      </div>
      <div className="v3-stat-copy">
        <p>{label}</p>
        <h3>{value}</h3>
        <span>{meta}</span>
      </div>
    </div>
  );
}

function TableCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <section className="v3-card">
      <div className="v3-card-header">
        <div>
          <h3>{title}</h3>
        </div>
        <div className="v3-card-action">{action}</div>
      </div>
      <div className="v3-card-body">{children}</div>
    </section>
  );
}

function ModalFrame({
  title,
  subtitle,
  onClose,
  children,
  onSubmit,
  submitLabel = "Enregistrer",
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
}) {
  return (
    <div className="v3-modal-overlay" onClick={onClose}>
      <div className="v3-modal-panel" onClick={(event) => event.stopPropagation()}>
        <div className="v3-modal-header">
          <div>
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Fermer">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form
          className="v3-form-grid"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit(event);
          }}
        >
          {children}
          <div className="v3-modal-actions">
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Annuler
            </button>
            <button className="btn btn-primary" type="submit">
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function PatientModal({
  patient,
  onClose,
  onSave,
  nextId,
}: {
  patient?: Patient;
  onClose: () => void;
  onSave: (patient: Patient) => void;
  nextId: string;
}) {
  const [draft, setDraft] = useState<Patient>(
    patient ?? {
      id: nextId,
      nom: "",
      prenom: "",
      civilite: "M.",
      pays: "Maroc",
      ville: "Casablanca",
      telephone: "",
      email: "",
      pathologie: "",
      specialite: "Cardiologie",
      statut: 1,
      phase: "admission",
      urgence: "programme",
      dateCreation: new Date().toISOString().slice(0, 10),
      notes: "",
    },
  );

  return (
    <ModalFrame
      title={patient ? "Modifier le patient" : "Nouveau patient"}
      subtitle="Version 3 alignée sur la structure du dossier client."
      onClose={onClose}
      onSubmit={() => onSave(draft)}
    >
      <label>
        Civilité
        <select
          value={draft.civilite}
          onChange={(event) => setDraft({ ...draft, civilite: event.target.value })}
        >
          <option value="M.">M.</option>
          <option value="Mme">Mme</option>
          <option value="Dr.">Dr.</option>
          <option value="Pr.">Pr.</option>
        </select>
      </label>
      <label>
        Prénom
        <input
          value={draft.prenom}
          onChange={(event) => setDraft({ ...draft, prenom: event.target.value })}
          required
        />
      </label>
      <label>
        Nom
        <input
          value={draft.nom}
          onChange={(event) => setDraft({ ...draft, nom: event.target.value })}
          required
        />
      </label>
      <label>
        Pays
        <input
          value={draft.pays}
          onChange={(event) => setDraft({ ...draft, pays: event.target.value })}
          required
        />
      </label>
      <label>
        Ville
        <input
          value={draft.ville ?? ""}
          onChange={(event) => setDraft({ ...draft, ville: event.target.value })}
        />
      </label>
      <label>
        Téléphone
        <input
          value={draft.telephone ?? ""}
          onChange={(event) => setDraft({ ...draft, telephone: event.target.value })}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={draft.email ?? ""}
          onChange={(event) => setDraft({ ...draft, email: event.target.value })}
        />
      </label>
      <label>
        Pathologie
        <input
          value={draft.pathologie ?? ""}
          onChange={(event) => setDraft({ ...draft, pathologie: event.target.value })}
        />
      </label>
      <label>
        Spécialité
        <input
          value={draft.specialite ?? ""}
          onChange={(event) => setDraft({ ...draft, specialite: event.target.value })}
        />
      </label>
      <label>
        Phase
        <select
          value={draft.phase}
          onChange={(event) => setDraft({ ...draft, phase: event.target.value })}
        >
          <option value="admission">Admission</option>
          <option value="evaluation">Évaluation</option>
          <option value="validation">Validation</option>
          <option value="operationnel">Opérationnel</option>
          <option value="cloture">Clôture</option>
        </select>
      </label>
      <label>
        Priorité
        <select
          value={draft.urgence}
          onChange={(event) => setDraft({ ...draft, urgence: event.target.value })}
        >
          <option value="urgent">Urgent</option>
          <option value="semi-urgent">Semi-urgent</option>
          <option value="programme">Programmé</option>
        </select>
      </label>
      <label>
        Statut numérique
        <input
          type="number"
          min={1}
          max={18}
          value={draft.statut}
          onChange={(event) =>
            setDraft({ ...draft, statut: Number.parseInt(event.target.value, 10) || 1 })
          }
        />
      </label>
      <label className="full-width">
        Notes
        <textarea
          rows={4}
          value={draft.notes ?? ""}
          onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
        />
      </label>
    </ModalFrame>
  );
}

function MedecinModal({
  medecin,
  onClose,
  onSave,
  nextId,
}: {
  medecin?: Medecin;
  onClose: () => void;
  onSave: (medecin: Medecin) => void;
  nextId: string;
}) {
  const [draft, setDraft] = useState<Medecin>(
    medecin ?? {
      id: nextId,
      nom: "",
      prenom: "",
      civilite: "Dr.",
      specialite: "Cardiologie",
      sousSpecialite: "",
      pays: "Maroc",
      ville: "Casablanca",
      clinique: "",
      telephone: "",
      email: "",
      experience: 10,
      diplomes: "",
      langues: ["Français"],
      disponibilite: "immediate",
      urgences: true,
      conventionWama: true,
      evaluation: 4.5,
    },
  );

  return (
    <ModalFrame
      title={medecin ? "Modifier le médecin" : "Nouveau médecin"}
      subtitle="Base médecins synchronisée sur les champs du dossier client."
      onClose={onClose}
      onSubmit={() => onSave(draft)}
    >
      <label>
        Civilité
        <select
          value={draft.civilite}
          onChange={(event) => setDraft({ ...draft, civilite: event.target.value })}
        >
          <option value="Dr.">Dr.</option>
          <option value="Pr.">Pr.</option>
        </select>
      </label>
      <label>
        Prénom
        <input
          value={draft.prenom}
          onChange={(event) => setDraft({ ...draft, prenom: event.target.value })}
          required
        />
      </label>
      <label>
        Nom
        <input
          value={draft.nom}
          onChange={(event) => setDraft({ ...draft, nom: event.target.value })}
          required
        />
      </label>
      <label>
        Spécialité
        <input
          value={draft.specialite}
          onChange={(event) => setDraft({ ...draft, specialite: event.target.value })}
          required
        />
      </label>
      <label>
        Sous-spécialité
        <input
          value={draft.sousSpecialite ?? ""}
          onChange={(event) => setDraft({ ...draft, sousSpecialite: event.target.value })}
        />
      </label>
      <label>
        Clinique
        <input
          value={draft.clinique ?? ""}
          onChange={(event) => setDraft({ ...draft, clinique: event.target.value })}
        />
      </label>
      <label>
        Pays
        <input
          value={draft.pays}
          onChange={(event) => setDraft({ ...draft, pays: event.target.value })}
        />
      </label>
      <label>
        Ville
        <input
          value={draft.ville}
          onChange={(event) => setDraft({ ...draft, ville: event.target.value })}
        />
      </label>
      <label>
        Téléphone
        <input
          value={draft.telephone ?? ""}
          onChange={(event) => setDraft({ ...draft, telephone: event.target.value })}
        />
      </label>
      <label>
        Email
        <input
          value={draft.email ?? ""}
          onChange={(event) => setDraft({ ...draft, email: event.target.value })}
        />
      </label>
      <label>
        Disponibilité
        <input
          value={draft.disponibilite ?? ""}
          onChange={(event) => setDraft({ ...draft, disponibilite: event.target.value })}
        />
      </label>
      <label>
        Évaluation
        <input
          type="number"
          min={0}
          max={5}
          step="0.1"
          value={draft.evaluation ?? 4.5}
          onChange={(event) =>
            setDraft({ ...draft, evaluation: Number.parseFloat(event.target.value) || 0 })
          }
        />
      </label>
      <label className="full-width">
        Diplômes
        <textarea
          rows={3}
          value={draft.diplomes ?? ""}
          onChange={(event) => setDraft({ ...draft, diplomes: event.target.value })}
        />
      </label>
    </ModalFrame>
  );
}

function PartnerModal({
  category,
  partner,
  onClose,
  onSave,
  nextId,
}: {
  category: PartnerCategory;
  partner?: PartnerDraft;
  onClose: () => void;
  onSave: (category: PartnerCategory, partner: PartnerDraft) => void;
  nextId: string;
}) {
  const [draft, setDraft] = useState<PartnerDraft>(
    partner ?? {
      id: nextId,
      nom: "",
      prenom: category === "chauffeurs" ? "" : undefined,
      civilite: category === "chauffeurs" ? "M." : undefined,
      type:
        category === "cliniques"
          ? "Privée"
          : category === "hebergements"
            ? "Hôtel 4 étoiles"
            : category === "assurances"
              ? "Internationale"
              : undefined,
      pays: "Maroc",
      ville: "Casablanca",
      telephone: "",
      email: "",
      conventionWama: true,
      evaluation: 4.5,
      quartier: category === "hebergements" ? "" : undefined,
      typeVehicule: category === "chauffeurs" ? "Berline" : undefined,
    },
  );
  const detailValue = Array.isArray(draft.couverture)
    ? draft.couverture.join(", ")
    : Array.isArray(draft.specialites)
      ? draft.specialites.join(", ")
      : String(draft.quartier ?? draft.typeVehicule ?? "");

  return (
    <ModalFrame
      title={partner ? `Modifier ${PARTNER_LABELS[category]}` : `Nouveau ${PARTNER_LABELS[category]}`}
      subtitle="Interface unifiée pour les quatre catégories partenaires."
      onClose={onClose}
      onSubmit={() => onSave(category, draft)}
    >
      {category === "chauffeurs" ? (
        <>
          <label>
            Civilité
            <select
              value={String(draft.civilite ?? "M.")}
              onChange={(event) => setDraft({ ...draft, civilite: event.target.value })}
            >
              <option value="M.">M.</option>
              <option value="Mme">Mme</option>
            </select>
          </label>
          <label>
            Prénom
            <input
              value={String(draft.prenom ?? "")}
              onChange={(event) => setDraft({ ...draft, prenom: event.target.value })}
              required
            />
          </label>
        </>
      ) : null}
      <label>
        {category === "chauffeurs" ? "Nom" : "Nom / Raison sociale"}
        <input
          value={String(draft.nom ?? "")}
          onChange={(event) => setDraft({ ...draft, nom: event.target.value })}
          required
        />
      </label>
      <label>
        Type
        <input
          value={String(draft.type ?? draft.typeVehicule ?? "")}
          onChange={(event) =>
            setDraft(
              category === "chauffeurs"
                ? { ...draft, typeVehicule: event.target.value }
                : { ...draft, type: event.target.value },
            )
          }
        />
      </label>
      <label>
        Pays
        <input
          value={String(draft.pays ?? "")}
          onChange={(event) => setDraft({ ...draft, pays: event.target.value })}
          required
        />
      </label>
      <label>
        Ville
        <input
          value={String(draft.ville ?? "")}
          onChange={(event) => setDraft({ ...draft, ville: event.target.value })}
          required
        />
      </label>
      <label>
        Téléphone
        <input
          value={String(draft.telephone ?? "")}
          onChange={(event) => setDraft({ ...draft, telephone: event.target.value })}
        />
      </label>
      <label>
        Email
        <input
          type="email"
          value={String(draft.email ?? "")}
          onChange={(event) => setDraft({ ...draft, email: event.target.value })}
        />
      </label>
      <label>
        Évaluation
        <input
          type="number"
          min={0}
          max={5}
          step="0.1"
          value={String(draft.evaluation ?? 4.5)}
          onChange={(event) =>
            setDraft({ ...draft, evaluation: Number.parseFloat(event.target.value) || 0 })
          }
        />
      </label>
      <label className="full-width">
        Détail
        <textarea
          rows={3}
          value={detailValue}
          onChange={(event) => {
            const value = event.target.value;
            if (category === "cliniques") {
              setDraft({ ...draft, specialites: value.split(",").map((item) => item.trim()) });
            } else if (category === "assurances") {
              setDraft({ ...draft, couverture: value.split(",").map((item) => item.trim()) });
            } else if (category === "hebergements") {
              setDraft({ ...draft, quartier: value });
            } else {
              setDraft({ ...draft, typeVehicule: value });
            }
          }}
        />
      </label>
    </ModalFrame>
  );
}

function DocumentModal({
  documentItem,
  patients,
  onClose,
  onSave,
  nextId,
}: {
  documentItem?: MedicalDocument;
  patients: Patient[];
  onClose: () => void;
  onSave: (documentItem: MedicalDocument) => void;
  nextId: string;
}) {
  const [draft, setDraft] = useState<MedicalDocument>(
    documentItem ?? {
      id: nextId,
      patientId: patients[0]?.id ?? "",
      titre: "",
      categorie: "Imagerie",
      type: "Scanner",
      dateDocument: new Date().toISOString().slice(0, 10),
      dateUpload: new Date().toISOString().slice(0, 10),
      taille: "250 KB",
      format: "PDF",
      lienStockage: "",
      uploadePar: "WAMA MED",
      notes: "",
      statut: "À vérifier",
      urgent: false,
    },
  );

  return (
    <ModalFrame
      title={documentItem ? "Modifier le document" : "Nouveau document"}
      subtitle="Module documents médicalement centralisé."
      onClose={onClose}
      onSubmit={() => onSave(draft)}
    >
      <label>
        Patient
        <select
          value={draft.patientId}
          onChange={(event) => setDraft({ ...draft, patientId: event.target.value })}
        >
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patientFullName(patient)}
            </option>
          ))}
        </select>
      </label>
      <label>
        Titre
        <input
          value={draft.titre}
          onChange={(event) => setDraft({ ...draft, titre: event.target.value })}
          required
        />
      </label>
      <label>
        Catégorie
        <input
          value={draft.categorie}
          onChange={(event) => setDraft({ ...draft, categorie: event.target.value })}
        />
      </label>
      <label>
        Type
        <input
          value={draft.type}
          onChange={(event) => setDraft({ ...draft, type: event.target.value })}
        />
      </label>
      <label>
        Statut
        <select
          value={draft.statut}
          onChange={(event) => setDraft({ ...draft, statut: event.target.value })}
        >
          <option value="Validé">Validé</option>
          <option value="À vérifier">À vérifier</option>
          <option value="Refusé">Refusé</option>
        </select>
      </label>
      <label>
        Taille
        <input
          value={draft.taille ?? ""}
          onChange={(event) => setDraft({ ...draft, taille: event.target.value })}
        />
      </label>
      <label className="full-width">
        Notes
        <textarea
          rows={3}
          value={draft.notes ?? ""}
          onChange={(event) => setDraft({ ...draft, notes: event.target.value })}
        />
      </label>
    </ModalFrame>
  );
}

function EmailModal({
  email,
  patients,
  onClose,
  onSave,
}: {
  email?: DemoV3Seed["emails"][number];
  patients: Patient[];
  onClose: () => void;
  onSave: (email: DemoV3Seed["emails"][number]) => void;
}) {
  const [draft, setDraft] = useState<DemoV3Seed["emails"][number]>(
    email ?? {
      id: createEmailId(),
      patientId: patients[0]?.id ?? "",
      patientNom: patients[0] ? patientFullName(patients[0]) : "",
      sujet: "",
      contenu: "",
      dateReception: new Date().toISOString(),
      dateReponse: null,
      statut: "en_attente",
      priorite: "normale",
      tempsReponse: null,
    },
  );

  return (
    <ModalFrame
      title={email ? "Modifier l'email" : "Enregistrer un email patient"}
      subtitle="Nouveau flux client inspiré du module emails du dossier source."
      onClose={onClose}
      onSubmit={() => onSave(draft)}
    >
      <label>
        Patient
        <select
          value={draft.patientId}
          onChange={(event) => {
            const nextPatient = patients.find((patient) => patient.id === event.target.value);
            setDraft({
              ...draft,
              patientId: event.target.value,
              patientNom: nextPatient ? patientFullName(nextPatient) : "",
            });
          }}
        >
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patientFullName(patient)}
            </option>
          ))}
        </select>
      </label>
      <label className="full-width">
        Sujet
        <input
          value={draft.sujet}
          onChange={(event) => setDraft({ ...draft, sujet: event.target.value })}
          required
        />
      </label>
      <label className="full-width">
        Contenu
        <textarea
          rows={5}
          value={draft.contenu}
          onChange={(event) => setDraft({ ...draft, contenu: event.target.value })}
          required
        />
      </label>
    </ModalFrame>
  );
}

function CommissionModal({
  commission,
  onClose,
  onSave,
  nextId,
}: {
  commission?: CommissionItem;
  onClose: () => void;
  onSave: (commission: CommissionItem) => void;
  nextId: string;
}) {
  const [draft, setDraft] = useState<CommissionItem>(
    commission ?? {
      id: nextId,
      date: new Date().toISOString().slice(0, 10),
      patient_id: "",
      patient_nom: "",
      partenaire_type: "cliniques",
      partenaire_id: "",
      partenaire_nom: "",
      service: "",
      montant_base: 0,
      taux_commission: 10,
      montant_commission: 0,
      devise: "MAD",
      statut: "due",
      date_facture: null,
      date_paiement: null,
      notes: "",
    },
  );

  return (
    <ModalFrame
      title={commission ? "Modifier la commission" : "Nouvelle commission"}
      subtitle="Suivi financier inspiré du module 10 du dossier client."
      onClose={onClose}
      onSubmit={() =>
        onSave({
          ...draft,
          montant_commission: Math.round((draft.montant_base * draft.taux_commission) / 100),
        })
      }
    >
      <label>
        Patient
        <input
          value={draft.patient_nom}
          onChange={(event) => setDraft({ ...draft, patient_nom: event.target.value })}
          required
        />
      </label>
      <label>
        Partenaire
        <input
          value={draft.partenaire_nom}
          onChange={(event) => setDraft({ ...draft, partenaire_nom: event.target.value })}
          required
        />
      </label>
      <label>
        Service
        <input
          value={draft.service}
          onChange={(event) => setDraft({ ...draft, service: event.target.value })}
          required
        />
      </label>
      <label>
        Montant de base
        <input
          type="number"
          value={draft.montant_base}
          onChange={(event) =>
            setDraft({ ...draft, montant_base: Number.parseInt(event.target.value, 10) || 0 })
          }
        />
      </label>
      <label>
        Taux %
        <input
          type="number"
          value={draft.taux_commission}
          onChange={(event) =>
            setDraft({
              ...draft,
              taux_commission: Number.parseInt(event.target.value, 10) || 0,
            })
          }
        />
      </label>
      <label>
        Statut
        <select
          value={draft.statut}
          onChange={(event) => setDraft({ ...draft, statut: event.target.value })}
        >
          <option value="due">À recevoir</option>
          <option value="facturee">Facturée</option>
          <option value="payee">Payée</option>
          <option value="annulee">Annulée</option>
        </select>
      </label>
    </ModalFrame>
  );
}

function FactureModal({
  facture,
  onClose,
  onSave,
  nextId,
}: {
  facture?: FacturePatient;
  onClose: () => void;
  onSave: (facture: FacturePatient) => void;
  nextId: string;
}) {
  const [serviceName, setServiceName] = useState(facture?.lignes[0]?.nom ?? "Coordination médicale");
  const [amount, setAmount] = useState(facture?.montant_total ?? 0);
  const [draft, setDraft] = useState<FacturePatient>(
    facture ?? {
      id: nextId,
      numero: `WAMA-${new Date().getFullYear()}-${String(nextId.split("-").pop()).padStart(3, "0")}`,
      date_emission: new Date().toISOString().slice(0, 10),
      patient_id: "",
      patient_nom: "",
      patient_email: "",
      lignes: [],
      montant_total: 0,
      devise: "MAD",
      statut: "envoyee",
      montant_paye: 0,
      date_paiement: null,
      mode_paiement: null,
      notes: "",
    },
  );

  return (
    <ModalFrame
      title={facture ? "Modifier la facture" : "Nouvelle facture"}
      subtitle="Facturation services patients, inspirée du module financier client."
      onClose={onClose}
      onSubmit={() =>
        onSave({
          ...draft,
          lignes: [
            {
              service_id: "SRV-CUSTOM",
              nom: serviceName,
              quantite: 1,
              prix_unitaire: amount,
              total: amount,
            },
          ],
          montant_total: amount,
          montant_paye: draft.statut === "payee" ? amount : draft.montant_paye,
        })
      }
    >
      <label>
        Patient
        <input
          value={draft.patient_nom}
          onChange={(event) => setDraft({ ...draft, patient_nom: event.target.value })}
          required
        />
      </label>
      <label>
        Email patient
        <input
          type="email"
          value={draft.patient_email ?? ""}
          onChange={(event) => setDraft({ ...draft, patient_email: event.target.value })}
        />
      </label>
      <label className="full-width">
        Service principal
        <input value={serviceName} onChange={(event) => setServiceName(event.target.value)} required />
      </label>
      <label>
        Montant total
        <input
          type="number"
          value={amount}
          onChange={(event) => setAmount(Number.parseInt(event.target.value, 10) || 0)}
        />
      </label>
      <label>
        Statut
        <select
          value={draft.statut}
          onChange={(event) => setDraft({ ...draft, statut: event.target.value })}
        >
          <option value="a_facturer">À facturer</option>
          <option value="envoyee">Envoyée</option>
          <option value="payee">Payée</option>
          <option value="impayee">Impayée</option>
        </select>
      </label>
    </ModalFrame>
  );
}

function AccountingModal({
  entry,
  journalCodes,
  onClose,
  onSave,
  nextId,
}: {
  entry?: AccountingEntry;
  journalCodes: Array<{ code: string; intitule: string }>;
  onClose: () => void;
  onSave: (entry: AccountingEntry) => void;
  nextId: string;
}) {
  const [draft, setDraft] = useState({
    id: entry?.id ?? nextId,
    date: entry?.date ?? new Date().toISOString().slice(0, 10),
    journal: entry?.journal ?? journalCodes[0]?.code ?? "VEN",
    pieceRef: entry?.pieceRef ?? "",
    libelle: entry?.libelle ?? "",
    compteDebit: entry?.lignes[0]?.compte ?? "411",
    intituleDebit: entry?.lignes[0]?.intitule ?? "Clients",
    compteCredit: entry?.lignes[1]?.compte ?? "707",
    intituleCredit: entry?.lignes[1]?.intitule ?? "Prestations de services",
    montant: entry?.lignes[0]?.debit ?? entry?.lignes[1]?.credit ?? 0,
  });

  return (
    <ModalFrame
      title={entry ? "Modifier l'écriture" : "Nouvelle écriture"}
      subtitle="Écriture double simple, inspirée du module comptabilité MAD."
      onClose={onClose}
      onSubmit={() =>
        onSave({
          id: draft.id,
          date: draft.date,
          journal: draft.journal,
          pieceRef: draft.pieceRef,
          libelle: draft.libelle,
          lignes: [
            {
              compte: draft.compteDebit,
              intitule: draft.intituleDebit,
              debit: draft.montant,
              credit: 0,
            },
            {
              compte: draft.compteCredit,
              intitule: draft.intituleCredit,
              debit: 0,
              credit: draft.montant,
            },
          ],
        })
      }
    >
      <label>
        Date
        <input
          type="date"
          value={draft.date}
          onChange={(event) => setDraft({ ...draft, date: event.target.value })}
        />
      </label>
      <label>
        Journal
        <select
          value={draft.journal}
          onChange={(event) => setDraft({ ...draft, journal: event.target.value })}
        >
          {journalCodes.map((journal) => (
            <option key={journal.code} value={journal.code}>
              {journal.code} · {journal.intitule}
            </option>
          ))}
        </select>
      </label>
      <label>
        Pièce
        <input
          value={draft.pieceRef}
          onChange={(event) => setDraft({ ...draft, pieceRef: event.target.value })}
          required
        />
      </label>
      <label className="full-width">
        Libellé
        <input
          value={draft.libelle}
          onChange={(event) => setDraft({ ...draft, libelle: event.target.value })}
          required
        />
      </label>
      <label>
        Compte débit
        <input
          value={draft.compteDebit}
          onChange={(event) => setDraft({ ...draft, compteDebit: event.target.value })}
        />
      </label>
      <label>
        Intitulé débit
        <input
          value={draft.intituleDebit}
          onChange={(event) => setDraft({ ...draft, intituleDebit: event.target.value })}
        />
      </label>
      <label>
        Compte crédit
        <input
          value={draft.compteCredit}
          onChange={(event) => setDraft({ ...draft, compteCredit: event.target.value })}
        />
      </label>
      <label>
        Intitulé crédit
        <input
          value={draft.intituleCredit}
          onChange={(event) => setDraft({ ...draft, intituleCredit: event.target.value })}
        />
      </label>
      <label>
        Montant
        <input
          type="number"
          value={draft.montant}
          onChange={(event) =>
            setDraft({ ...draft, montant: Number.parseInt(event.target.value, 10) || 0 })
          }
        />
      </label>
    </ModalFrame>
  );
}

function PatientDrawer({
  patient,
  documents,
  evenements,
  emails,
  factures,
  onClose,
}: {
  patient?: Patient;
  documents: MedicalDocument[];
  evenements: CalendarEventItem[];
  emails: DemoV3Seed["emails"];
  factures: FacturePatient[];
  onClose: () => void;
}) {
  if (!patient) return null;

  const patientDocuments = documents.filter((document) => document.patientId === patient.id);
  const patientEvents = evenements.filter((event) => event.patientId === patient.id);
  const patientEmails = emails.filter((email) => email.patientId === patient.id);
  const patientInvoices = factures.filter((facture) => facture.patient_id === patient.id);

  return (
    <div className="v3-drawer-overlay" onClick={onClose}>
      <aside className="v3-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="v3-drawer-header">
          <div>
            <p className="eyebrow">Dossier patient</p>
            <h3>{patientFullName(patient)}</h3>
            <span>{patient.pathologie}</span>
          </div>
          <button className="icon-button" onClick={onClose} type="button" aria-label="Fermer">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="v3-drawer-grid">
          <InfoRow label="ID" value={patient.id} />
          <InfoRow label="Pays" value={`${patient.pays}${patient.ville ? ` · ${patient.ville}` : ""}`} />
          <InfoRow label="Statut" value={patientStatusLabel(patient.statut)} />
          <InfoRow label="Priorité" value={urgencyLabel(patient.urgence)} />
          <InfoRow label="Clinique" value={patient.clinique ?? "À confirmer"} />
          <InfoRow label="Médecin" value={patient.medecinReferent ?? "À assigner"} />
          <InfoRow label="Téléphone" value={patient.telephone ?? "—"} />
          <InfoRow label="Email" value={patient.email ?? "—"} />
        </div>
        <div className="v3-drawer-block">
          <h4>Notes</h4>
          <p>{patient.notes || "Aucune note clinique ajoutée."}</p>
        </div>
        <div className="v3-drawer-block">
          <h4>Documents</h4>
          <ul className="compact-list">
            {patientDocuments.map((document) => (
              <li key={document.id}>
                <span>{document.titre}</span>
                <small>{document.statut}</small>
              </li>
            ))}
            {patientDocuments.length === 0 ? <li>Aucun document rattaché.</li> : null}
          </ul>
        </div>
        <div className="v3-drawer-block">
          <h4>Calendrier</h4>
          <ul className="compact-list">
            {patientEvents.map((event) => (
              <li key={event.id}>
                <span>{event.title}</span>
                <small>{formatDateTime(event.start)}</small>
              </li>
            ))}
            {patientEvents.length === 0 ? <li>Aucun événement planifié.</li> : null}
          </ul>
        </div>
        <div className="v3-drawer-block">
          <h4>Emails & facturation</h4>
          <ul className="compact-list">
            {patientEmails.slice(0, 2).map((email) => (
              <li key={email.id}>
                <span>{email.sujet}</span>
                <small>{email.statut}</small>
              </li>
            ))}
            {patientInvoices.slice(0, 2).map((facture) => (
              <li key={facture.id}>
                <span>{facture.numero}</span>
                <small>{facture.statut}</small>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="info-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export function DemoV3App({
  initialView,
  seed,
}: {
  initialView: DemoV3View;
  seed: DemoV3Seed;
}) {
  const store = useDemoV3Store();
  const bootstrap = useDemoV3Store((state) => state.bootstrap);
  const setView = useDemoV3Store((state) => state.setView);
  const activeView = useDemoV3Store((state) => state.activeView);
  const deferredSearch = useDeferredValue(store.search);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCalendarEvent, setSelectedCalendarEvent] =
    useState<CalendarEventItem | null>(null);
  const [phaseFilter, setPhaseFilter] = useState("all");
  const [urgencyFilter, setUrgencyFilter] = useState("all");

  useEffect(() => {
    bootstrap(seed);
  }, [bootstrap, seed]);

  useEffect(() => {
    if (activeView !== initialView) {
      setView(initialView);
    }
  }, [activeView, initialView, setView]);

  useV3UrlSync();

  const alerts = buildAlerts(
    store.patients,
    store.documents,
    store.evenements,
    store.emails,
    store.facturesPatients,
  ).filter((alert) => !store.dismissedAlertIds.includes(alert.id));

  const pendingEmails = store.emails.filter((email) => email.statut === "en_attente");
  const selectedPatient = store.patients.find((patient) => patient.id === store.selectedPatientId);

  const dashboardPhaseData = {
    labels: ["Admission", "Évaluation", "Validation", "Opérationnel", "Clôture"],
    datasets: [
      {
        label: "Patients",
        data: [
          store.patients.filter((patient) => patient.phase === "admission").length,
          store.patients.filter((patient) => patient.phase === "evaluation").length,
          store.patients.filter((patient) => patient.phase === "validation").length,
          store.patients.filter((patient) => patient.phase === "operationnel").length,
          store.patients.filter((patient) => patient.phase === "cloture").length,
        ],
        backgroundColor: ["#6366f1", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b"],
        borderWidth: 0,
      },
    ],
  };

  const dashboardTrendData = {
    labels: ["Semaine 1", "Semaine 2", "Semaine 3", "Semaine 4", "Semaine 5", "Semaine 6"],
    datasets: [
      {
        label: "Flux patients",
        data: [4, 5, 6, 7, 6, 8],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(99,102,241,0.15)",
        tension: 0.35,
        fill: true,
      },
    ],
  };

  const financeRevenueData = {
    labels: ["Sept", "Oct", "Nov", "Déc", "Jan", "Fév"],
    datasets: [
      {
        label: "Commissions",
        data: [52000, 64000, 71000, 68000, 74000, 81280],
        backgroundColor: "#6366f1",
      },
      {
        label: "Services",
        data: [31000, 36000, 42000, 39000, 45100, 47300],
        backgroundColor: "#10b981",
      },
    ],
  };

  const financeTotal =
    store.commissions.reduce((total, commission) => total + commission.montant_commission, 0) +
    store.facturesPatients.reduce((total, facture) => total + facture.montant_total, 0);

  const activeCases = store.patients.filter((patient) => patient.statut < 18);
  const pageTitle =
    NAV_ITEMS.find((item) => item.view === activeView)?.label ?? "Mission Control CRM";

  const headerActions: Partial<Record<DemoV3View, React.ReactNode>> = {
    dashboard: (
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => store.openModal({ type: "patient", mode: "create" })}
      >
        <Plus className="h-4 w-4" />
        Nouvelle demande
      </button>
    ),
    patients: (
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => store.openModal({ type: "patient", mode: "create" })}
      >
        <UserRoundPlus className="h-4 w-4" />
        Ajouter un patient
      </button>
    ),
    medecins: (
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => store.openModal({ type: "medecin", mode: "create" })}
      >
        <Plus className="h-4 w-4" />
        Nouveau médecin
      </button>
    ),
    partenaires: (
      <button
        className="btn btn-primary"
        type="button"
        onClick={() =>
          store.openModal({
            type: "partner",
            mode: "create",
            partnerCategory: store.partnerTab,
          })
        }
      >
        <Plus className="h-4 w-4" />
        Nouveau partenaire
      </button>
    ),
    documents: (
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => store.openModal({ type: "document", mode: "create" })}
      >
        <Plus className="h-4 w-4" />
        Nouveau document
      </button>
    ),
    emails: (
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => store.openModal({ type: "email", mode: "create" })}
      >
        <Plus className="h-4 w-4" />
        Enregistrer un email
      </button>
    ),
    financier: (
      <div className="header-actions">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() =>
            exportTablePdf(
              "rapport-financier-v3",
              ["Référence", "Patient", "Montant", "Statut"],
              store.facturesPatients.map((facture) => [
                facture.numero,
                facture.patient_nom,
                formatCurrency(facture.montant_total),
                facture.statut,
              ]),
            )
          }
        >
          <Download className="h-4 w-4" />
          Export PDF
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => store.openModal({ type: "facture", mode: "create" })}
        >
          <Plus className="h-4 w-4" />
          Nouvelle facture
        </button>
      </div>
    ),
    rapports: (
      <div className="header-actions">
        <button
          className="btn btn-secondary"
          type="button"
          onClick={() => exportJson("wamamed-demo-v3.json", store)}
        >
          <FileSpreadsheet className="h-4 w-4" />
          Export JSON
        </button>
      </div>
    ),
    comptabilite: (
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => store.openModal({ type: "ecriture", mode: "create" })}
      >
        <Plus className="h-4 w-4" />
        Nouvelle écriture
      </button>
    ),
  };

  function renderView() {
    if (activeView === "dashboard") {
      const patientsToFollow = [...activeCases]
        .sort((left, right) => right.statut - left.statut)
        .slice(0, 4);

      return (
        <div className="v3-stack">
          <div className="v3-stat-grid">
            <StatCard
              label="Dossiers actifs"
              value={String(activeCases.length)}
              meta="+8% ce mois"
              icon={Users}
            />
            <StatCard
              label="Patients sur place"
              value={String(store.patients.filter((patient) => patient.statut >= 12 && patient.statut <= 16).length)}
              meta="Flux hébergement & clinique"
              icon={Building2}
              tone="success"
            />
            <StatCard
              label="RDV planifiés"
              value={String(store.evenements.filter((event) => event.statut !== "terminé").length)}
              meta="Consultations, suivis, interventions"
              icon={CalendarDays}
              tone="warning"
            />
            <StatCard
              label="Alertes ouvertes"
              value={String(alerts.length)}
              meta="Priorités terrain"
              icon={AlertTriangle}
              tone="danger"
            />
          </div>

          <div className="v3-dashboard-grid">
            <TableCard title="Répartition par phase" action={<MoreVertical className="h-4 w-4" />}>
              <ChartPanel
                type="doughnut"
                data={dashboardPhaseData}
                options={{
                  plugins: {
                    legend: { position: "bottom" },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </TableCard>
            <TableCard title="Évolution mensuelle" action={<MoreVertical className="h-4 w-4" />}>
              <ChartPanel
                type="line"
                data={dashboardTrendData}
                options={{
                  plugins: {
                    legend: { display: false },
                  },
                  scales: {
                    y: { beginAtZero: true },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </TableCard>
          </div>

          <div className="v3-dashboard-grid">
            <TableCard title="Activité récente" action={<ArrowRight className="h-4 w-4" />}>
              <div className="activity-list">
                {store.facturesPatients.slice(0, 3).map((facture) => (
                  <div className="activity-item" key={facture.id}>
                    <div className="activity-icon tone-primary">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <strong>{facture.numero}</strong>
                      <p>{facture.patient_nom} · {formatCurrency(facture.montant_total)}</p>
                    </div>
                    <small>{formatDate(facture.date_emission)}</small>
                  </div>
                ))}
                {store.commissions.slice(0, 2).map((commission) => (
                  <div className="activity-item" key={commission.id}>
                    <div className="activity-icon tone-success">
                      <HandCoins className="h-4 w-4" />
                    </div>
                    <div>
                      <strong>{commission.partenaire_nom}</strong>
                      <p>{commission.service} · {formatCurrency(commission.montant_commission)}</p>
                    </div>
                    <small>{formatDate(commission.date)}</small>
                  </div>
                ))}
              </div>
            </TableCard>

            <TableCard title="Patients à suivre" action={<ArrowRight className="h-4 w-4" />}>
              <div className="follow-list">
                {patientsToFollow.map((patient) => (
                  <button
                    className="follow-card"
                    key={patient.id}
                    onClick={() => store.openPatient(patient.id)}
                    type="button"
                  >
                    <div>
                      <strong>{patientFullName(patient)}</strong>
                      <p>
                        {patient.pathologie} · {patient.clinique ?? "Clinique à confirmer"}
                      </p>
                    </div>
                    <span className={`pill ${patient.urgence === "urgent" ? "pill-danger" : "pill-info"}`}>
                      {urgencyLabel(patient.urgence)}
                    </span>
                  </button>
                ))}
              </div>
            </TableCard>
          </div>
        </div>
      );
    }

    if (activeView === "patients") {
      const filteredPatients = store.patients.filter((patient) => {
        const searchBlob = [
          patient.nom,
          patient.prenom,
          patient.pathologie,
          patient.specialite,
          patient.pays,
          patient.ville,
        ]
          .join(" ")
          .toLowerCase();

        const matchesSearch = deferredSearch
          ? searchBlob.includes(deferredSearch.toLowerCase())
          : true;
        const matchesPhase = phaseFilter === "all" ? true : patient.phase === phaseFilter;
        const matchesUrgency =
          urgencyFilter === "all" ? true : patient.urgence === urgencyFilter;
        return matchesSearch && matchesPhase && matchesUrgency;
      });

      return (
        <div className="v3-stack">
          <div className="v3-toolbar">
            <div className="toolbar-search">
              <Search className="h-4 w-4" />
              <input
                value={store.search}
                onChange={(event) => store.setSearch(event.target.value)}
                placeholder="Rechercher un patient, une pathologie, un pays..."
              />
            </div>
            <div className="toolbar-filters">
              <select value={phaseFilter} onChange={(event) => setPhaseFilter(event.target.value)}>
                <option value="all">Toutes les phases</option>
                <option value="admission">Admission</option>
                <option value="evaluation">Évaluation</option>
                <option value="validation">Validation</option>
                <option value="operationnel">Opérationnel</option>
                <option value="cloture">Clôture</option>
              </select>
              <select value={urgencyFilter} onChange={(event) => setUrgencyFilter(event.target.value)}>
                <option value="all">Toutes priorités</option>
                <option value="urgent">Urgent</option>
                <option value="semi-urgent">Semi-urgent</option>
                <option value="programme">Programmé</option>
              </select>
            </div>
          </div>
          <TableCard
            title={`Patients (${filteredPatients.length})`}
            action={
              <button
                className="btn btn-secondary"
                type="button"
                onClick={() =>
                  exportTablePdf(
                    "patients-v3",
                    ["ID", "Patient", "Pays", "Pathologie", "Statut"],
                    filteredPatients.map((patient) => [
                      patient.id,
                      patientFullName(patient),
                      patient.pays,
                      patient.pathologie ?? "",
                      patientStatusLabel(patient.statut),
                    ]),
                  )
                }
              >
                <Download className="h-4 w-4" />
                Export PDF
              </button>
            }
          >
            <div className="table-wrapper">
              <table className="v3-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Pays</th>
                    <th>Pathologie</th>
                    <th>Statut</th>
                    <th>Priorité</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id}>
                      <td>
                        <button
                          className="link-button"
                          onClick={() => store.openPatient(patient.id)}
                          type="button"
                        >
                          {patientFullName(patient)}
                        </button>
                        <small>{patient.id}</small>
                      </td>
                      <td>{patient.pays}</td>
                      <td>{patient.pathologie}</td>
                      <td>
                        <span className="pill pill-neutral">{patientStatusLabel(patient.statut)}</span>
                      </td>
                      <td>
                        <span
                          className={`pill ${
                            patient.urgence === "urgent"
                              ? "pill-danger"
                              : patient.urgence === "semi-urgent"
                                ? "pill-warning"
                                : "pill-info"
                          }`}
                        >
                          {urgencyLabel(patient.urgence)}
                        </span>
                      </td>
                      <td>
                        <div className="row-actions">
                          <button
                            className="icon-button"
                            type="button"
                            onClick={() =>
                              store.openModal({ type: "patient", mode: "edit", id: patient.id })
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            className="icon-button danger"
                            type="button"
                            onClick={() => store.deletePatient(patient.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableCard>
        </div>
      );
    }

    if (activeView === "medecins") {
      const filteredDoctors = store.medecins.filter((medecin) =>
        [medecin.nom, medecin.prenom, medecin.specialite, medecin.ville, medecin.pays]
          .join(" ")
          .toLowerCase()
          .includes(deferredSearch.toLowerCase()),
      );

      return (
        <div className="v3-card-grid doctors-grid">
          {filteredDoctors.map((medecin) => (
            <article className="profile-card doctor-card" key={medecin.id}>
              <div className="profile-card-header">
                <div className="profile-heading">
                  <p className="eyebrow">{medecin.specialite}</p>
                  <h3>
                    {medecin.civilite} {medecin.prenom} {medecin.nom}
                  </h3>
                  <p className="profile-subheading">{medecin.sousSpecialite ?? medecin.clinique}</p>
                </div>
                <span className="pill pill-success rating-pill">
                  {medecin.evaluation?.toFixed(1) ?? "4.5"}
                </span>
              </div>
              <p className="profile-card-copy doctor-copy">{medecin.diplomes}</p>
              <div className="profile-card-meta meta-stack">
                <span>
                  <strong>Lieu</strong>
                  {medecin.ville}, {medecin.pays}
                </span>
                <span>
                  <strong>Clinique</strong>
                  {medecin.clinique ?? "À préciser"}
                </span>
                <span>
                  <strong>Disponibilité</strong>
                  {medecin.disponibilite ?? "À confirmer"}
                </span>
              </div>
              <div className="row-actions card-actions">
                <button
                  className="btn btn-secondary btn-compact"
                  onClick={() => store.openModal({ type: "medecin", mode: "edit", id: medecin.id })}
                  type="button"
                >
                  <Pencil className="h-4 w-4" />
                  Modifier
                </button>
                <button
                  className="btn btn-secondary danger btn-compact"
                  onClick={() => store.deleteMedecin(medecin.id)}
                  type="button"
                >
                  <Trash2 className="h-4 w-4" />
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (activeView === "partenaires") {
      const partnerItems = (
        store.partenaires[store.partnerTab] as unknown as PartnerDraft[]
      ).filter((partner) => JSON.stringify(partner).toLowerCase().includes(deferredSearch.toLowerCase()));

      return (
        <div className="v3-stack">
          <div className="tabs-nav partner-tabs">
            {Object.entries(PARTNER_LABELS).map(([value, label]) => (
              <button
                key={value}
                className={`tab-btn ${store.partnerTab === value ? "active" : ""}`}
                onClick={() => store.setPartnerTab(value as PartnerCategory)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="v3-card-grid partners-grid">
            {partnerItems.map((partner) => (
              <article className="partner-card profile-card" key={String(partner.id)}>
                <div className="profile-card-header">
                  <div className="profile-heading">
                    <p className="eyebrow">{PARTNER_LABELS[store.partnerTab]}</p>
                    <h3>{String(partner.nom ?? "")}</h3>
                    <p className="profile-subheading">
                      {[partner.type, partner.typeVehicule].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  <span className="pill pill-info rating-pill">
                    {partner.evaluation ? Number(partner.evaluation).toFixed(1) : "4.5"}
                  </span>
                </div>
                <p className="profile-card-copy partner-copy">
                  {[partner.ville, partner.pays].filter(Boolean).join(" · ")}
                </p>
                <div className="profile-card-meta meta-stack">
                  <span>
                    <strong>Téléphone</strong>
                    {String(partner.telephone ?? "Téléphone à renseigner")}
                  </span>
                  <span>
                    <strong>Email</strong>
                    {String(partner.email ?? "Email à renseigner")}
                  </span>
                </div>
                <div className="row-actions card-actions">
                  <button
                    className="btn btn-secondary btn-compact"
                    onClick={() =>
                      store.openModal({
                        type: "partner",
                        mode: "edit",
                        id: String(partner.id),
                        partnerCategory: store.partnerTab,
                      })
                    }
                    type="button"
                  >
                    <Pencil className="h-4 w-4" />
                    Modifier
                  </button>
                  <button
                    className="btn btn-secondary danger btn-compact"
                    onClick={() => store.deletePartner(store.partnerTab, String(partner.id))}
                    type="button"
                  >
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (activeView === "documents") {
      const filteredDocuments = store.documents.filter((document) =>
        [document.titre, document.type, document.categorie, document.notes]
          .join(" ")
          .toLowerCase()
          .includes(deferredSearch.toLowerCase()),
      );

      return (
        <TableCard
          title={`Documents (${filteredDocuments.length})`}
          action={
            <button
              className="btn btn-secondary"
              onClick={() =>
                exportTablePdf(
                  "documents-v3",
                  ["Titre", "Patient", "Catégorie", "Statut"],
                  filteredDocuments.map((document) => [
                    document.titre,
                    getPatientNameById(store.patients, document.patientId),
                    document.categorie,
                    document.statut,
                  ]),
                )
              }
              type="button"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </button>
          }
        >
          <div className="table-wrapper">
            <table className="v3-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Patient</th>
                  <th>Catégorie</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocuments.map((document) => (
                  <tr key={document.id}>
                    <td>{document.titre}</td>
                    <td>{getPatientNameById(store.patients, document.patientId)}</td>
                    <td>{document.categorie}</td>
                    <td>{formatDate(document.dateDocument)}</td>
                    <td>
                      <span className={`pill ${document.statut === "Validé" ? "pill-success" : "pill-warning"}`}>
                        {document.statut}
                      </span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          className="icon-button"
                          type="button"
                          onClick={() =>
                            store.openModal({ type: "document", mode: "edit", id: document.id })
                          }
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          className="icon-button danger"
                          type="button"
                          onClick={() => store.deleteDocument(document.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TableCard>
      );
    }

    if (activeView === "templates") {
      const filteredTemplates = store.templates.filter((template) =>
        [template.titre, template.categorie, template.type, template.corps]
          .join(" ")
          .toLowerCase()
          .includes(deferredSearch.toLowerCase()),
      );

      return (
        <div className="v3-card-grid template-grid">
          {filteredTemplates.slice(0, 18).map((template) => (
            <article className="template-card profile-card" key={template.id}>
              <div className="template-card-header">
                <div className="profile-heading">
                  <div className="template-meta-row">
                    <span className="pill pill-neutral pill-outline">{template.categorie}</span>
                    <span className="pill pill-neutral pill-outline">{template.type}</span>
                  </div>
                  <h3>{template.titre}</h3>
                  <p className="profile-subheading">Template {template.langue.toUpperCase()}</p>
                </div>
                <span className="pill pill-info pill-outline">{template.langue.toUpperCase()}</span>
              </div>
              <div className="template-section">
                <p className="template-label">Sujet</p>
                <p className="template-subject">
                  {renderTemplateRichText(templateDisplaySubject(template), 150)}
                </p>
              </div>
              <div className="template-section">
                <p className="template-label">Aperçu</p>
                <p className="template-preview">
                  {renderTemplateRichText(templatePreviewBody(template.corps), 240)}
                </p>
              </div>
              <div className="template-section">
                <div className="template-footer-row">
                  <p className="template-label">Variables</p>
                  <span className="template-count">{(template.variables ?? []).length}</span>
                </div>
                <div className="template-variables">
                  {(template.variables ?? []).slice(0, 6).map((variable) => (
                    <span className="pill pill-info template-variable-pill" key={variable}>
                      {prettifyTemplateVariable(variable)}
                    </span>
                  ))}
                  {(template.variables ?? []).length > 6 ? (
                    <span className="pill pill-neutral template-variable-pill">
                      +{(template.variables ?? []).length - 6}
                    </span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      );
    }

    if (activeView === "calendrier") {
      return (
        <div className="v3-stack">
          <div className="v3-stat-grid">
            <StatCard
              label="Événements"
              value={String(store.evenements.length)}
              meta="Consultations et interventions"
              icon={CalendarDays}
              tone="info"
            />
            <StatCard
              label="Confirmés"
              value={String(store.evenements.filter((event) => event.statut === "confirmé").length)}
              meta="Dossiers actifs"
              icon={CheckCircle2}
              tone="success"
            />
            <StatCard
              label="Rappels à envoyer"
              value={String(store.evenements.filter((event) => !event.rappelEnvoye).length)}
              meta="Synchronisation patient"
              icon={Bell}
              tone="warning"
            />
          </div>
          <div className="v3-calendar-grid">
            <TableCard title="Calendrier des RDV">
              <div className="calendar-shell">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  initialDate={store.evenements[0]?.start?.slice(0, 10)}
                  events={store.evenements.map((event) => ({
                    ...event,
                    color:
                      event.type === "intervention"
                        ? "#ef4444"
                        : event.type === "suivi"
                          ? "#f59e0b"
                          : "#6366f1",
                  }))}
                  height={620}
                  eventClick={(eventClick) => {
                    const eventItem = store.evenements.find((item) => item.id === eventClick.event.id);
                    setSelectedCalendarEvent(eventItem ?? null);
                    if (eventItem?.patientId) {
                      store.openPatient(eventItem.patientId);
                    }
                  }}
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek",
                  }}
                />
              </div>
            </TableCard>
            <TableCard title="Focus rendez-vous">
              {selectedCalendarEvent ? (
                <div className="v3-stack-sm">
                  <h3>{selectedCalendarEvent.title}</h3>
                  <InfoRow label="Patient" value={getPatientNameById(store.patients, selectedCalendarEvent.patientId)} />
                  <InfoRow label="Médecin" value={selectedCalendarEvent.medecin ?? "À assigner"} />
                  <InfoRow label="Lieu" value={selectedCalendarEvent.lieu ?? "À confirmer"} />
                  <InfoRow label="Début" value={formatDateTime(selectedCalendarEvent.start)} />
                  <p className="muted-copy">{selectedCalendarEvent.notes}</p>
                </div>
              ) : (
                <div className="empty-state">
                  <CalendarDays className="h-8 w-8" />
                  <p>Sélectionnez un événement pour voir les détails.</p>
                </div>
              )}
            </TableCard>
          </div>
        </div>
      );
    }

    if (activeView === "alertes") {
      return (
        <div className="v3-stack">
          <div className="v3-stat-grid">
            <StatCard
              label="Total alertes"
              value={String(alerts.length)}
              meta="Toutes priorités"
              icon={Bell}
              tone="warning"
            />
            <StatCard
              label="Critiques"
              value={String(alerts.filter((alert) => alert.priorite === "critique").length)}
              meta="À traiter maintenant"
              icon={AlertTriangle}
              tone="danger"
            />
            <StatCard
              label="Emails en attente"
              value={String(pendingEmails.length)}
              meta="Badge navigation synchronisé"
              icon={Inbox}
              tone="info"
            />
          </div>
          <div className="alert-list">
            {alerts.map((alert) => (
              <article className="alert-card" key={alert.id}>
                <div className="alert-card-head">
                  <div className="alert-card-title">
                    <p className="eyebrow">{alert.type.replace(/_/g, " ")}</p>
                    <h3>{alert.titre}</h3>
                    <p className="alert-description">{alert.description}</p>
                  </div>
                  <span className={`pill ${renderPriorityPill(alert.priorite)}`}>{alert.priorite}</span>
                </div>
                <div className="alert-card-footer">
                  <span>{alert.patientNom ?? "Sans patient"}</span>
                  <span>{formatDateTime(alert.dateCreation)}</span>
                  <button
                    className="btn btn-secondary btn-compact"
                    onClick={() => store.dismissAlert(alert.id)}
                    type="button"
                  >
                    Marquer comme vu
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      );
    }

    if (activeView === "emails") {
      return (
        <div className="v3-stack">
          <div className="v3-stat-grid">
            <StatCard
              label="Total emails"
              value={String(store.emails.length)}
              meta="Historique patient"
              icon={Mail}
              tone="info"
            />
            <StatCard
              label="En attente"
              value={String(pendingEmails.length)}
              meta="Réponses à envoyer"
              icon={Inbox}
              tone="warning"
            />
            <StatCard
              label="Critiques"
              value={String(pendingEmails.filter((email) => email.priorite === "critique").length)}
              meta="Plus de 24h"
              icon={AlertTriangle}
              tone="danger"
            />
          </div>
          <TableCard title="Emails patients">
            <div className="table-wrapper">
              <table className="v3-table">
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Sujet</th>
                    <th>Réception</th>
                    <th>Priorité</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {store.emails
                    .filter((email) =>
                      [email.patientNom, email.sujet, email.contenu]
                        .join(" ")
                        .toLowerCase()
                        .includes(deferredSearch.toLowerCase()),
                    )
                    .map((email) => (
                      <tr key={email.id}>
                        <td>{email.patientNom}</td>
                        <td>{email.sujet}</td>
                        <td>{formatDateTime(email.dateReception)}</td>
                        <td>
                          <span className={`pill ${renderPriorityPill(email.priorite === "normale" ? "basse" : email.priorite)}`}>
                            {email.priorite}
                          </span>
                        </td>
                        <td>
                          <span className={`pill ${email.statut === "traite" ? "pill-success" : "pill-warning"}`}>
                            {email.statut}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            {email.statut === "en_attente" ? (
                              <button
                                className="btn btn-secondary"
                                onClick={() => store.markEmailProcessed(email.id)}
                                type="button"
                              >
                                <CheckCircle2 className="h-4 w-4" />
                                Traiter
                              </button>
                            ) : null}
                            <button
                              className="icon-button danger"
                              onClick={() => store.deleteEmail(email.id)}
                              type="button"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </TableCard>
        </div>
      );
    }

    if (activeView === "financier") {
      return (
        <div className="v3-stack">
          <div className="v3-stat-grid">
            <StatCard
              label="CA total"
              value={formatCurrency(financeTotal)}
              meta="Commissions + services"
              icon={BarChart3}
            />
            <StatCard
              label="Commissions"
              value={formatCurrency(
                store.commissions.reduce((total, commission) => total + commission.montant_commission, 0),
              )}
              meta="Partenaires"
              icon={Handshake}
              tone="success"
            />
            <StatCard
              label="Factures patients"
              value={formatCurrency(
                store.facturesPatients.reduce((total, facture) => total + facture.montant_total, 0),
              )}
              meta="Services & accompagnement"
              icon={FileText}
              tone="info"
            />
            <StatCard
              label="En attente"
              value={String(
                store.facturesPatients.filter((facture) => facture.statut !== "payee").length +
                  store.commissions.filter((commission) => commission.statut !== "payee").length,
              )}
              meta="Encaissements à suivre"
              icon={Clock3}
              tone="warning"
            />
          </div>
          <TableCard title="Évolution des revenus">
            <ChartPanel
              type="bar"
              data={financeRevenueData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: { y: { beginAtZero: true } },
              }}
              height={320}
            />
          </TableCard>
          <div className="tabs-nav">
            {Object.entries(FINANCE_TAB_LABELS).map(([key, label]) => (
              <button
                className={`tab-btn ${store.financeTab === key ? "active" : ""}`}
                key={key}
                onClick={() => store.setFinanceTab(key as FinanceTab)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          {store.financeTab === "commissions" ? (
            <TableCard
              title="Commissions partenaires"
              action={
                <button
                  className="btn btn-primary"
                  onClick={() => store.openModal({ type: "commission", mode: "create" })}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                  Nouvelle commission
                </button>
              }
            >
              <div className="table-wrapper">
                <table className="v3-table">
                  <thead>
                    <tr>
                      <th>Partenaire</th>
                      <th>Patient</th>
                      <th>Service</th>
                      <th>Montant</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.commissions.map((commission) => (
                      <tr key={commission.id}>
                        <td>{commission.partenaire_nom}</td>
                        <td>{commission.patient_nom}</td>
                        <td>{commission.service}</td>
                        <td>{formatCurrency(commission.montant_commission)}</td>
                        <td>
                          <span className={`pill ${commission.statut === "payee" ? "pill-success" : "pill-warning"}`}>
                            {commission.statut}
                          </span>
                        </td>
                        <td>
                          <button
                            className="icon-button"
                            onClick={() =>
                              store.openModal({ type: "commission", mode: "edit", id: commission.id })
                            }
                            type="button"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TableCard>
          ) : null}
          {store.financeTab === "factures" ? (
            <TableCard
              title="Factures patients"
              action={
                <button
                  className="btn btn-primary"
                  onClick={() => store.openModal({ type: "facture", mode: "create" })}
                  type="button"
                >
                  <Plus className="h-4 w-4" />
                  Nouvelle facture
                </button>
              }
            >
              <div className="table-wrapper">
                <table className="v3-table">
                  <thead>
                    <tr>
                      <th>Numéro</th>
                      <th>Patient</th>
                      <th>Montant</th>
                      <th>Statut</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store.facturesPatients.map((facture) => (
                      <tr key={facture.id}>
                        <td>{facture.numero}</td>
                        <td>{facture.patient_nom}</td>
                        <td>{formatCurrency(facture.montant_total)}</td>
                        <td>
                          <span className={`pill ${facture.statut === "payee" ? "pill-success" : "pill-warning"}`}>
                            {facture.statut}
                          </span>
                        </td>
                        <td>
                          <button
                            className="icon-button"
                            onClick={() =>
                              store.openModal({ type: "facture", mode: "edit", id: facture.id })
                            }
                            type="button"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TableCard>
          ) : null}
          {store.financeTab === "services" ? (
            <div className="v3-card-grid">
              {store.services.map((service) => (
                <article className="profile-card" key={service.id}>
                  <div className="profile-card-header">
                    <div>
                      <p className="eyebrow">{service.categorie}</p>
                      <h3>{service.nom}</h3>
                    </div>
                    <span className={`pill ${service.actif ? "pill-success" : "pill-neutral"}`}>
                      {service.actif ? "Actif" : "Inactif"}
                    </span>
                  </div>
                  <p className="profile-card-copy">{service.description}</p>
                  <div className="profile-card-meta">
                    <span>{service.code}</span>
                    <span>{formatCurrency(service.prix_defaut)}</span>
                    <span>{service.unite ?? "forfait"}</span>
                  </div>
                </article>
              ))}
            </div>
          ) : null}
          {store.financeTab === "parametres" ? (
            <div className="v3-card-grid">
              {Object.entries(store.commissionsConfig).map(([key, config]) => (
                <article className="profile-card" key={key}>
                  <div className="profile-card-header">
                    <div>
                      <p className="eyebrow">{key}</p>
                      <h3>{config.taux}%</h3>
                    </div>
                    <span className="pill pill-info">{config.type}</span>
                  </div>
                  <p className="profile-card-copy">{config.description}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      );
    }

    if (activeView === "rapports") {
      return (
        <div className="v3-stack">
          <div className="v3-card-grid">
            <article className="report-card compact-report-card">
              <div>
                <p className="eyebrow">Pilotage</p>
                <h3>Rapport patients actifs</h3>
                <p>Vue PDF du pipeline patient, des statuts et de la provenance.</p>
              </div>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() =>
                  exportTablePdf(
                    "rapport-patients-actifs",
                    ["Patient", "Pays", "Pathologie", "Statut"],
                    store.patients.map((patient) => [
                      patientFullName(patient),
                      patient.pays,
                      patient.pathologie ?? "",
                      patientStatusLabel(patient.statut),
                    ]),
                  )
                }
              >
                Télécharger
              </button>
            </article>
            <article className="report-card compact-report-card">
              <div>
                <p className="eyebrow">Finance</p>
                <h3>Snapshot financier</h3>
                <p>Commissions, factures et catalogue services en un export JSON.</p>
              </div>
              <button className="btn btn-primary" onClick={() => exportJson("finance-v3.json", {
                commissions: store.commissions,
                facturesPatients: store.facturesPatients,
                services: store.services,
              })} type="button">
                Télécharger
              </button>
            </article>
            <article className="report-card compact-report-card">
              <div>
                <p className="eyebrow">Comptabilité</p>
                <h3>Journal comptable</h3>
                <p>Export PDF des écritures et de la balance client-inspired.</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() =>
                  exportTablePdf(
                    "journal-comptable-v3",
                    ["Date", "Journal", "Pièce", "Libellé"],
                    store.ecritures.map((entry) => [
                      formatDate(entry.date),
                      entry.journal,
                      entry.pieceRef,
                      entry.libelle,
                    ]),
                  )
                }
                type="button"
              >
                Télécharger
              </button>
            </article>
          </div>
        </div>
      );
    }

    const accountingTotals = store.ecritures.reduce(
      (accumulator, entry) => {
        entry.lignes.forEach((line) => {
          accumulator.debit += line.debit;
          accumulator.credit += line.credit;
        });
        return accumulator;
      },
      { debit: 0, credit: 0 },
    );

    const ledger = store.ecritures.reduce<Record<string, { intitule: string; debit: number; credit: number }>>(
      (accumulator, entry) => {
        entry.lignes.forEach((line) => {
          if (!accumulator[line.compte]) {
            accumulator[line.compte] = {
              intitule: line.intitule,
              debit: 0,
              credit: 0,
            };
          }

          accumulator[line.compte].debit += line.debit;
          accumulator[line.compte].credit += line.credit;
        });

        return accumulator;
      },
      {},
    );

    return (
      <div className="v3-stack">
        <div className="v3-stat-grid">
          <StatCard
            label="Débit total"
            value={formatCurrency(accountingTotals.debit)}
            meta="Journal général"
            icon={ArrowRight}
            tone="info"
          />
          <StatCard
            label="Crédit total"
            value={formatCurrency(accountingTotals.credit)}
            meta="Journal général"
            icon={ArrowRight}
            tone="success"
          />
          <StatCard
            label="Écritures"
            value={String(store.ecritures.length)}
            meta="Norme marocaine démo"
            icon={Calculator}
            tone="warning"
          />
        </div>
        <div className="tabs-nav">
          {[
            ["ecritures", "Écritures"],
            ["grandLivre", "Grand livre"],
            ["balance", "Balance"],
            ["resultat", "Compte de résultat"],
            ["bilan", "Bilan"],
            ["tva", "TVA"],
          ].map(([key, label]) => (
              <button
                className={`tab-btn ${store.accountingTab === key ? "active" : ""}`}
                key={key}
                onClick={() => store.setAccountingTab(key as AccountingTab)}
                type="button"
              >
                {label}
            </button>
          ))}
        </div>
        {store.accountingTab === "ecritures" ? (
          <TableCard title="Journal des écritures">
            <div className="table-wrapper">
              <table className="v3-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Journal</th>
                    <th>Pièce</th>
                    <th>Libellé</th>
                    <th>Montant</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {store.ecritures.map((entry) => (
                    <tr key={entry.id}>
                      <td>{formatDate(entry.date)}</td>
                      <td>{entry.journal}</td>
                      <td>{entry.pieceRef}</td>
                      <td>{entry.libelle}</td>
                      <td>
                        {formatCurrency(
                          entry.lignes.reduce((sum, line) => sum + line.debit + line.credit, 0) / 2,
                        )}
                      </td>
                      <td>
                        <button
                          className="icon-button"
                          onClick={() => store.openModal({ type: "ecriture", mode: "edit", id: entry.id })}
                          type="button"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableCard>
        ) : null}
        {store.accountingTab === "grandLivre" ? (
          <TableCard title="Grand livre">
            <div className="table-wrapper">
              <table className="v3-table">
                <thead>
                  <tr>
                    <th>Compte</th>
                    <th>Intitulé</th>
                    <th>Débit</th>
                    <th>Crédit</th>
                    <th>Solde</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ledger).map(([account, value]) => (
                    <tr key={account}>
                      <td>{account}</td>
                      <td>{value.intitule}</td>
                      <td>{formatCurrency(value.debit)}</td>
                      <td>{formatCurrency(value.credit)}</td>
                      <td>{formatCurrency(value.debit - value.credit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableCard>
        ) : null}
        {store.accountingTab === "balance" ? (
          <TableCard title="Balance générale">
            <div className="table-wrapper">
              <table className="v3-table">
                <thead>
                  <tr>
                    <th>Compte</th>
                    <th>Débit</th>
                    <th>Crédit</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ledger).map(([account, value]) => (
                    <tr key={account}>
                      <td>{account} · {value.intitule}</td>
                      <td>{formatCurrency(value.debit)}</td>
                      <td>{formatCurrency(value.credit)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TableCard>
        ) : null}
        {store.accountingTab === "resultat" ? (
          <div className="v3-card-grid">
            <article className="report-card">
              <h3>Produits</h3>
              <p>{formatCurrency(
                Object.entries(ledger)
                  .filter(([account]) => account.startsWith("7"))
                  .reduce((total, [, value]) => total + value.credit - value.debit, 0),
              )}</p>
            </article>
            <article className="report-card">
              <h3>Charges</h3>
              <p>{formatCurrency(
                Object.entries(ledger)
                  .filter(([account]) => account.startsWith("6"))
                  .reduce((total, [, value]) => total + value.debit - value.credit, 0),
              )}</p>
            </article>
          </div>
        ) : null}
        {store.accountingTab === "bilan" ? (
          <div className="v3-card-grid">
            <article className="report-card">
              <h3>Actif</h3>
              <p>{formatCurrency(
                Object.entries(ledger)
                  .filter(([account]) => ["1", "2", "3", "4", "5"].includes(account[0] ?? ""))
                  .reduce((total, [, value]) => total + Math.max(value.debit - value.credit, 0), 0),
              )}</p>
            </article>
            <article className="report-card">
              <h3>Passif</h3>
              <p>{formatCurrency(
                Object.entries(ledger)
                  .filter(([account]) => ["1", "4", "5"].includes(account[0] ?? ""))
                  .reduce((total, [, value]) => total + Math.max(value.credit - value.debit, 0), 0),
              )}</p>
            </article>
          </div>
        ) : null}
        {store.accountingTab === "tva" ? (
          <div className="v3-card-grid">
            <article className="report-card">
              <h3>TVA collectée</h3>
              <p>{formatCurrency(ledger["4455"]?.credit ?? 0)}</p>
            </article>
            <article className="report-card">
              <h3>TVA récupérable</h3>
              <p>{formatCurrency(ledger["4456"]?.debit ?? 0)}</p>
            </article>
            <article className="report-card">
              <h3>TVA nette</h3>
              <p>{formatCurrency((ledger["4455"]?.credit ?? 0) - (ledger["4456"]?.debit ?? 0))}</p>
            </article>
          </div>
        ) : null}
      </div>
    );
  }

  const notificationItems = alerts.slice(0, 6);
  const modal = store.modal;

  return (
    <div className="demo-v3-root">
      <div className="v3-shell">
        <aside className={`v3-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="v3-sidebar-header">
            <div className="v3-brand">
              <Image
                src="/demo-v3/logo-wama-med.png"
                alt="WAMA MED"
                width={48}
                height={48}
              />
              <div>
                <strong>WAMA MED</strong>
                <span>Mission Control CRM v3</span>
              </div>
            </div>
            <button
              className="icon-button"
              onClick={() => setSidebarOpen(false)}
              type="button"
              aria-label="Fermer le menu"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="v3-nav">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const badge =
                item.view === "patients"
                  ? activeCases.length
                  : item.view === "alertes"
                    ? alerts.length
                    : item.view === "emails"
                      ? pendingEmails.length
                      : undefined;

              return (
                <button
                  className={`v3-nav-item ${activeView === item.view ? "active" : ""}`}
                  key={item.view}
                  onClick={() =>
                    startTransition(() => {
                      setView(item.view);
                      setSidebarOpen(false);
                    })
                  }
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {badge ? <small>{badge}</small> : null}
                </button>
              );
            })}
          </nav>

          <div className="v3-sidebar-footer">
            <div>
              <strong>Case Manager</strong>
              <span>Coordination internationale</span>
            </div>
            <button className="icon-button" type="button" aria-label="Paramètres">
              <Settings className="h-4 w-4" />
            </button>
            <button className="icon-button" type="button" aria-label="Déconnexion">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </aside>

        {sidebarOpen ? <div className="v3-overlay" onClick={() => setSidebarOpen(false)} /> : null}

        <div className="v3-main">
          <header className="v3-topbar">
            <div className="v3-topbar-left">
              <button
                className="icon-button"
                onClick={() => setSidebarOpen(true)}
                type="button"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-4 w-4" />
              </button>
              <div>
                <p className="eyebrow">Version 3 · Dossier client porté dans Next</p>
                <h1>{pageTitle}</h1>
              </div>
            </div>
            <div className="v3-topbar-right">
              <label className="toolbar-search topbar-search">
                <Search className="h-4 w-4" />
                <input
                  value={store.search}
                  onChange={(event) => store.setSearch(event.target.value)}
                  placeholder="Rechercher dans le CRM..."
                />
              </label>
              <button
                className="icon-button notification-trigger"
                onClick={() => store.setNotificationsOpen(!store.notificationsOpen)}
                type="button"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                {alerts.length ? (
                  <span className="notification-trigger-count">{alerts.length}</span>
                ) : null}
              </button>
              <button className="icon-button" type="button" aria-label="Filtres">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </header>

          <main className="v3-main-content">
            <div className="page-header">
              <div>
                <h2>{pageTitle}</h2>
                <p>
                  Portage fidèle de la structure client, avec les mêmes modules et la même logique
                  de navigation.
                </p>
              </div>
              <div>{headerActions[activeView] ?? null}</div>
            </div>

            {renderView()}
          </main>
        </div>

        <aside className={`v3-notifications ${store.notificationsOpen ? "open" : ""}`}>
          <div className="v3-card-header">
            <div>
              <h3>Notifications</h3>
              <p>{alerts.length} alertes actives</p>
            </div>
            <button
              className="icon-button"
              onClick={() => store.setNotificationsOpen(false)}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="notification-list">
            {notificationItems.map((alert) => (
              <article className="notification-item" key={alert.id}>
                <div className="notification-item-top">
                  <span className={`pill ${renderPriorityPill(alert.priorite)}`}>{alert.priorite}</span>
                  <small>{formatDateTime(alert.dateCreation)}</small>
                </div>
                <strong>{alert.titre}</strong>
                <p>{alert.description}</p>
                <div className="notification-item-bottom">
                  <span>{alert.patientNom ?? "Sans patient"}</span>
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>

      <PatientDrawer
        patient={selectedPatient}
        documents={store.documents}
        evenements={store.evenements}
        emails={store.emails}
        factures={store.facturesPatients}
        onClose={() => store.closePatient()}
      />

      {modal?.type === "patient" ? (
        <PatientModal
          patient={store.patients.find((item) => item.id === modal.id)}
          onClose={() => store.closeModal()}
          onSave={(patient) => store.savePatient(patient)}
          nextId={createPatientId(store.patients.length)}
        />
      ) : null}
      {modal?.type === "medecin" ? (
        <MedecinModal
          medecin={store.medecins.find((item) => item.id === modal.id)}
          onClose={() => store.closeModal()}
          onSave={(medecin) => store.saveMedecin(medecin)}
          nextId={createMedecinId(store.medecins.length)}
        />
      ) : null}
      {modal?.type === "partner" && modal.partnerCategory ? (
        <PartnerModal
          category={modal.partnerCategory}
          partner={store.partenaires[modal.partnerCategory].find((item) => item.id === modal.id) as PartnerDraft | undefined}
          onClose={() => store.closeModal()}
          onSave={(category, partner) => store.savePartner(category, partner)}
          nextId={createPartnerId(modal.partnerCategory, store.partenaires[modal.partnerCategory].length)}
        />
      ) : null}
      {modal?.type === "document" ? (
        <DocumentModal
          documentItem={store.documents.find((item) => item.id === modal.id)}
          patients={store.patients}
          onClose={() => store.closeModal()}
          onSave={(documentItem) => store.saveDocument(documentItem)}
          nextId={createDocumentId(store.documents.length)}
        />
      ) : null}
      {modal?.type === "email" ? (
        <EmailModal
          email={store.emails.find((item) => item.id === modal.id)}
          patients={store.patients}
          onClose={() => store.closeModal()}
          onSave={(email) => store.saveEmail(email)}
        />
      ) : null}
      {modal?.type === "commission" ? (
        <CommissionModal
          commission={store.commissions.find((item) => item.id === modal.id)}
          onClose={() => store.closeModal()}
          onSave={(commission) => store.saveCommission(commission)}
          nextId={createCommissionId(store.commissions.length)}
        />
      ) : null}
      {modal?.type === "facture" ? (
        <FactureModal
          facture={store.facturesPatients.find((item) => item.id === modal.id)}
          onClose={() => store.closeModal()}
          onSave={(facture) => store.saveFacture(facture)}
          nextId={createFactureId(store.facturesPatients.length)}
        />
      ) : null}
      {modal?.type === "ecriture" ? (
        <AccountingModal
          entry={store.ecritures.find((item) => item.id === modal.id)}
          journalCodes={Object.values(store.journalTypes).map((journal) => ({
            code: journal.code,
            intitule: journal.intitule,
          }))}
          onClose={() => store.closeModal()}
          onSave={(entry) => store.saveAccountingEntry(entry)}
          nextId={createAccountingId(store.ecritures.length)}
        />
      ) : null}
    </div>
  );
}
