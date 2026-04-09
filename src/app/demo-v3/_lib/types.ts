export const DEMO_V3_VIEWS = [
  "dashboard",
  "patients",
  "medecins",
  "partenaires",
  "documents",
  "templates",
  "calendrier",
  "alertes",
  "emails",
  "financier",
  "rapports",
  "comptabilite",
] as const;

export type DemoV3View = (typeof DEMO_V3_VIEWS)[number];

export const PARTNER_TABS = [
  "cliniques",
  "hebergements",
  "chauffeurs",
  "assurances",
] as const;

export type PartnerCategory = (typeof PARTNER_TABS)[number];

export const FINANCE_TABS = [
  "commissions",
  "factures",
  "services",
  "parametres",
] as const;

export type FinanceTab = (typeof FINANCE_TABS)[number];

export const ACCOUNTING_TABS = [
  "ecritures",
  "grandLivre",
  "balance",
  "resultat",
  "bilan",
  "tva",
] as const;

export type AccountingTab = (typeof ACCOUNTING_TABS)[number];

export interface Patient {
  id: string;
  nom: string;
  prenom: string;
  civilite: string;
  dateNaissance?: string;
  pays: string;
  ville?: string;
  telephone?: string;
  email?: string;
  pathologie?: string;
  specialite?: string;
  statut: number;
  phase: string;
  urgence: string;
  dateCreation: string;
  medecinReferent?: string;
  clinique?: string;
  dateConsultation?: string;
  dateIntervention?: string;
  dateArrivee?: string;
  dateDepart?: string;
  montantDevis?: number;
  assurance?: string;
  pecValidee?: boolean;
  hebergement?: string;
  chauffeur?: string;
  notes?: string;
}

export interface Medecin {
  id: string;
  nom: string;
  prenom: string;
  civilite: string;
  specialite: string;
  sousSpecialite?: string;
  pays: string;
  ville: string;
  clinique?: string;
  telephone?: string;
  email?: string;
  experience?: number;
  diplomes?: string;
  langues?: string[];
  tarifConsultation?: number;
  disponibilite?: string;
  urgences?: boolean;
  conventionWama?: boolean;
  evaluation?: number;
}

export interface CliniquePartner {
  id: string;
  nom: string;
  type: string;
  pays: string;
  ville: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  specialites?: string[];
  accreditations?: string[];
  litCapacite?: number;
  conventionWama?: boolean;
  tarifMoyenJour?: number;
  services?: string[];
  evaluation?: number;
}

export interface HebergementPartner {
  id: string;
  nom: string;
  type: string;
  pays: string;
  ville: string;
  quartier?: string;
  adresse?: string;
  telephone?: string;
  email?: string;
  tarifNuitSimple?: number;
  tarifNuitDouble?: number;
  petitDejeuner?: boolean;
  services?: string[];
  distanceCliníque?: string;
  conventionWama?: boolean;
  capacite?: number;
  evaluation?: number;
}

export interface ChauffeurPartner {
  id: string;
  nom: string;
  prenom: string;
  civilite: string;
  pays: string;
  ville: string;
  telephone?: string;
  email?: string;
  typeVehicule?: string;
  marqueModele?: string;
  capacite?: number;
  climatisation?: boolean;
  langues?: string[];
  experience?: number;
  disponibilite24?: boolean;
  formationMedicale?: boolean;
  conventionWama?: boolean;
  tarifAeroport?: number;
  tarifHeure?: number;
  evaluation?: number;
}

export interface AssurancePartner {
  id: string;
  nom: string;
  type: string;
  pays: string;
  telephone?: string;
  email?: string;
  couverture?: string[];
  plafondAnnuel?: number;
  franchise?: number;
  delaiPEC?: string;
  contactUrgence?: string;
  conventionWama?: boolean;
  evaluation?: number;
}

export interface DemoV3Partners {
  cliniques: CliniquePartner[];
  hebergements: HebergementPartner[];
  chauffeurs: ChauffeurPartner[];
  assurances: AssurancePartner[];
}

export interface TemplateItem {
  id: string;
  titre: string;
  categorie: string;
  type: string;
  langue: string;
  statut: number;
  sujet: string;
  corps: string;
  variables?: string[];
  utilisations?: number;
  dateCreation?: string;
}

export interface MedicalDocument {
  id: string;
  patientId: string;
  titre: string;
  categorie: string;
  type: string;
  dateDocument: string;
  dateUpload: string;
  taille?: string;
  format?: string;
  lienStockage?: string;
  uploadePar?: string;
  notes?: string;
  statut: string;
  urgent?: boolean;
}

export interface CalendarEventItem {
  id: string;
  title: string;
  start: string;
  end?: string;
  patientId: string;
  type: string;
  medecinId?: string;
  medecin?: string;
  clinique?: string;
  lieu?: string;
  notes?: string;
  statut: string;
  rappelEnvoye?: boolean;
}

export interface EmailItem {
  id: string;
  patientId: string;
  patientNom: string;
  sujet: string;
  contenu: string;
  dateReception: string;
  dateReponse: string | null;
  statut: "en_attente" | "traite";
  priorite: "normale" | "moyenne" | "haute" | "critique";
  tempsReponse: number | null;
}

export interface ServiceItem {
  id: string;
  code: string;
  nom: string;
  description: string;
  prix_defaut: number;
  devise: string;
  categorie: string;
  unite?: string;
  facturable: boolean;
  actif: boolean;
}

export interface CommissionConfigItem {
  type: string;
  taux: number;
  description: string;
}

export type CommissionsConfig = Record<string, CommissionConfigItem>;

export interface CommissionItem {
  id: string;
  date: string;
  patient_id: string;
  patient_nom: string;
  partenaire_type: string;
  partenaire_id: string;
  partenaire_nom: string;
  service: string;
  montant_base: number;
  taux_commission: number;
  montant_commission: number;
  devise: string;
  statut: string;
  date_facture: string | null;
  date_paiement: string | null;
  notes?: string;
}

export interface InvoiceLine {
  service_id: string;
  nom: string;
  quantite: number;
  prix_unitaire: number;
  total: number;
}

export interface FacturePatient {
  id: string;
  numero: string;
  date_emission: string;
  patient_id: string;
  patient_nom: string;
  patient_email?: string;
  lignes: InvoiceLine[];
  montant_total: number;
  devise: string;
  statut: string;
  montant_paye: number;
  date_paiement: string | null;
  mode_paiement: string | null;
  notes?: string;
}

export interface AccountingLine {
  compte: string;
  intitule: string;
  debit: number;
  credit: number;
}

export interface AccountingEntry {
  id: string;
  date: string;
  journal: string;
  pieceRef: string;
  libelle: string;
  lignes: AccountingLine[];
}

export interface JournalType {
  code: string;
  intitule: string;
  type: string;
  icon: string;
  color: string;
}

export type JournalTypes = Record<string, JournalType>;

export interface AlertItem {
  id: string;
  type: string;
  priorite: "critique" | "haute" | "moyenne" | "basse";
  titre: string;
  description: string;
  action: string;
  patientId?: string;
  patientNom?: string;
  dateCreation: string;
}

export interface DemoV3Seed {
  patients: Patient[];
  medecins: Medecin[];
  partenaires: DemoV3Partners;
  templates: TemplateItem[];
  documents: MedicalDocument[];
  evenements: CalendarEventItem[];
  emails: EmailItem[];
  services: ServiceItem[];
  commissions: CommissionItem[];
  facturesPatients: FacturePatient[];
  ecritures: AccountingEntry[];
  commissionsConfig: CommissionsConfig;
  journalTypes: JournalTypes;
}

export interface DemoLink {
  href: string;
  label: string;
  ariaLabel: string;
  variant: "primary" | "secondary" | "tertiary";
}
