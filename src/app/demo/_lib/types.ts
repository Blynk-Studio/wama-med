/* ─── Domain Types ─── */

export type CaseStage =
  | "Nouveau"
  | "Qualification"
  | "Validation"
  | "Planification"
  | "Sur place"
  | "Cloture";

export type CasePriority = "critique" | "haute" | "moyenne" | "standard";

export type BlockerType = "docs" | "finance" | "partner" | "medical" | null;

export interface StageHistoryEntry {
  stage: CaseStage;
  enteredAt: string;
  exitedAt?: string;
  duration?: string;
  owner?: string;
}

export interface TimelineEntry {
  label: string;
  time: string;
}

export interface Task {
  label: string;
  status: "A faire" | "En cours";
  owner: string;
  due: string;
}

export interface PatientCase {
  id: string;
  patient: string;
  country: string;
  program: string;
  stage: CaseStage;
  priority: CasePriority;
  owner: string;
  cityPath: string;
  nextAction: string;
  slaHours: number;
  wait: string;
  unread: number;
  docsPending: number;
  partnerIds: string[];
  blocked: boolean;
  blockerType: BlockerType;
  progressPercent: number;
  valueMad: number;
  dueLabel: string;
  stageHistory: StageHistoryEntry[];
  timeline: TimelineEntry[];
  tasks: Task[];
  notes: string[];
}

export type EventType = "consultation" | "finance" | "meeting" | "followup";
export type EventStatus = "normal" | "attention" | "chaud" | "critique";

export interface CalendarEvent {
  id: string;
  caseId: string;
  title: string;
  type: EventType;
  dayOffset: number;
  time: string;
  owner: string;
  location: string;
  status: EventStatus;
}

export type CommChannel = "WhatsApp" | "Email" | "SMS" | "Meeting";
export type CommStatus =
  | "nouveau"
  | "attente-reponse"
  | "attente-piece"
  | "planifie"
  | "envoye";

export interface Communication {
  id: string;
  caseId: string;
  title: string;
  channel: CommChannel;
  status: CommStatus;
  summary: string;
  age: string;
  priority: CasePriority;
}

export type DocStatus =
  | "valide"
  | "incomplet"
  | "manquant"
  | "a verifier"
  | "a obtenir";

export interface Document {
  id: string;
  caseId: string;
  title: string;
  category: string;
  status: DocStatus;
  owner: string;
  note: string;
  priority: CasePriority;
}

export type PartnerType = "Clinique" | "Hebergement" | "Transport" | "Assureur";
export type PartnerHealth = "solide" | "vigilance" | "attention";

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  city: string;
  health: PartnerHealth;
  note: string;
  score: string;
  load: string;
}

export type InvoiceStatus = "confirme" | "en_attente" | "a_envoyer" | "en_retard";

export interface Invoice {
  id: string;
  caseId: string;
  title: string;
  amountMad: number;
  status: InvoiceStatus;
  age: string;
}

export type CommissionStatus = "confirmee" | "a_recevoir";

export interface Commission {
  id: string;
  partnerId: string;
  title: string;
  amountMad: number;
  status: CommissionStatus;
}

/* ─── App State Types ─── */

export type Role = "coordinator" | "manager" | "finance" | "leadership";
export type Scenario = "baseline" | "intake" | "docs" | "rendezvous" | "partner" | "payment";
export type DemoView =
  | "overview"
  | "journeys"
  | "communications"
  | "calendar"
  | "documents"
  | "partners"
  | "finance";
export type QueueFilter = "all" | "hot" | "blocked" | "today";

export interface RoleMeta {
  key: Role;
  label: string;
  narrative: string;
  queueNarrative: string;
  story: string;
  focusPanels: string[];
}

export interface ViewMeta {
  key: DemoView;
  eyebrow: string;
  title: string;
  subtitle: string;
}

export interface ScenarioMeta {
  key: Scenario;
  label: string;
  description: string;
}

/* ─── Aggregate Data Shape ─── */

export interface DemoData {
  cases: PatientCase[];
  events: CalendarEvent[];
  communications: Communication[];
  documents: Document[];
  partners: Partner[];
  invoices: Invoice[];
  commissions: Commission[];
}
