import type {
  PatientCase, CalendarEvent, Communication, Document, Partner,
  Invoice, Commission, RoleMeta, ViewMeta, ScenarioMeta, DemoData,
} from "./types";

/* ═══════════════════════════════════════════════════════════
   PATIENT CASES — 6 active dossiers
   ═══════════════════════════════════════════════════════════ */

export const cases: PatientCase[] = [
  {
    id: "CASE-7401",
    patient: "Mariama Ndiaye",
    country: "Senegal",
    program: "Cardiologie interventionnelle",
    stage: "Qualification",
    priority: "haute",
    owner: "Aissatou Faye",
    cityPath: "Dakar → Tunis",
    nextAction: "Valider le bilan cardio et relancer l'assureur",
    slaHours: 9,
    wait: "Docs partiels depuis 14h",
    unread: 2,
    docsPending: 1,
    partnerIds: ["P-CLINIC-01", "P-INS-01"],
    blocked: true,
    valueMad: 118000,
    dueLabel: "Aujourd'hui · 16:00",
    timeline: [
      { label: "Demande qualifiee", time: "08:20" },
      { label: "Bilan recu partiellement", time: "10:40" },
      { label: "Relance assurance", time: "13:10" },
    ],
    tasks: [
      { label: "Obtenir troponine + CR", status: "A faire", owner: "Aissatou", due: "11:30" },
      { label: "Confirmer slot cardio Hannibal", status: "En cours", owner: "Karim", due: "15:00" },
    ],
    notes: [
      "Le dossier devient fluide des que la piece manquante entre.",
      "La famille prefere les confirmations par WhatsApp.",
    ],
  },
  {
    id: "CASE-7402",
    patient: "Idriss Ben Youssef",
    country: "Maroc",
    program: "Parcours FIV",
    stage: "Validation",
    priority: "moyenne",
    owner: "Salma Rhazi",
    cityPath: "Casablanca → Tunis",
    nextAction: "Obtenir confirmation clinique et verrouiller l'hebergement",
    slaHours: 18,
    wait: "Attente partenaire clinique",
    unread: 1,
    docsPending: 0,
    partnerIds: ["P-CLINIC-02", "P-HOTEL-01"],
    blocked: false,
    valueMad: 74200,
    dueLabel: "Demain · 09:00",
    timeline: [
      { label: "Avis favorable", time: "Hier · 15:45" },
      { label: "Devis partage", time: "Hier · 17:10" },
    ],
    tasks: [
      { label: "Bloquer chambre 5 nuits", status: "A faire", owner: "Nora", due: "Aujourd'hui" },
      { label: "Appel consentements", status: "A faire", owner: "Salma", due: "18:00" },
    ],
    notes: [
      "Le couple veut une experience sans friction et une seule feuille de route.",
    ],
  },
  {
    id: "CASE-7403",
    patient: "Amina Bako",
    country: "Cote d'Ivoire",
    program: "Chirurgie orthopedique",
    stage: "Planification",
    priority: "haute",
    owner: "Karim Diop",
    cityPath: "Abidjan → Casablanca",
    nextAction: "Confirmer acompte et transport aeroport",
    slaHours: 6,
    wait: "Acompte attendu",
    unread: 0,
    docsPending: 0,
    partnerIds: ["P-CLINIC-03", "P-DRIVER-01"],
    blocked: false,
    valueMad: 136500,
    dueLabel: "Aujourd'hui · 14:30",
    timeline: [
      { label: "Date operatoire verrouillee", time: "Aujourd'hui · 08:00" },
      { label: "Simulation transport", time: "Aujourd'hui · 09:10" },
    ],
    tasks: [
      { label: "Verifier recu acompte", status: "En cours", owner: "Finance", due: "14:00" },
      { label: "Envoyer details chauffeur", status: "A faire", owner: "Karim", due: "15:15" },
    ],
    notes: [
      "La famille veut un parcours simple, rassurant et parfaitement orchestre.",
    ],
  },
  {
    id: "CASE-7404",
    patient: "Jean-Pierre Kone",
    country: "Mali",
    program: "Oncologie de seconde opinion",
    stage: "Sur place",
    priority: "critique",
    owner: "Aissatou Faye",
    cityPath: "Bamako → Tunis",
    nextAction: "Coordonner staff medecin + interprete + navette clinique",
    slaHours: 2,
    wait: "Consultation majeure cet apres-midi",
    unread: 3,
    docsPending: 0,
    partnerIds: ["P-CLINIC-01", "P-DRIVER-02", "P-HOTEL-02"],
    blocked: false,
    valueMad: 154000,
    dueLabel: "Aujourd'hui · 13:30",
    timeline: [
      { label: "Patient arrive a Tunis", time: "07:50" },
      { label: "Pieces scannees", time: "08:25" },
      { label: "Briefing famille", time: "10:05" },
    ],
    tasks: [
      { label: "Confirmer interprete francais/arabe", status: "En cours", owner: "Nora", due: "11:00" },
      { label: "Preparer note de staff", status: "A faire", owner: "Aissatou", due: "12:15" },
    ],
    notes: [
      "Cas vitrine pour la promesse de coordination haut de gamme.",
    ],
  },
  {
    id: "CASE-7405",
    patient: "Salma Rahmani",
    country: "France",
    program: "Suivi post-op digestive",
    stage: "Cloture",
    priority: "standard",
    owner: "Nora Ben Salem",
    cityPath: "Paris → Tunis",
    nextAction: "Verifier satisfaction et cloturer le dossier",
    slaHours: 36,
    wait: "Suivi J+30 a confirmer",
    unread: 0,
    docsPending: 0,
    partnerIds: ["P-CLINIC-04"],
    blocked: false,
    valueMad: 45800,
    dueLabel: "Vendredi · 10:00",
    timeline: [
      { label: "Sortie clinique", time: "Il y a 6 jours" },
      { label: "Appel J+7 realise", time: "Il y a 2 jours" },
    ],
    tasks: [
      { label: "Envoyer questionnaire satisfaction", status: "A faire", owner: "Nora", due: "Vendredi" },
    ],
    notes: [
      "Bonne candidate pour un temoignage si satisfaction confirmee.",
    ],
  },
  {
    id: "CASE-7406",
    patient: "Noura El Idrissi",
    country: "Maroc",
    program: "Bilan fertilite premium",
    stage: "Nouveau",
    priority: "moyenne",
    owner: "Salma Rhazi",
    cityPath: "Rabat → Tunis",
    nextAction: "Qualifier le lead et programmer l'appel medical",
    slaHours: 20,
    wait: "Nouveau lead digital",
    unread: 1,
    docsPending: 0,
    partnerIds: ["P-CLINIC-02"],
    blocked: false,
    valueMad: 36800,
    dueLabel: "Demain · 11:00",
    timeline: [
      { label: "Lead capture", time: "Aujourd'hui · 09:55" },
    ],
    tasks: [
      { label: "Appel de qualification", status: "A faire", owner: "Salma", due: "Demain" },
    ],
    notes: [
      "Cherche une prise en charge tres concierge.",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════
   CALENDAR EVENTS
   ═══════════════════════════════════════════════════════════ */

export const events: CalendarEvent[] = [
  { id: "EV-100", caseId: "CASE-7404", title: "Staff oncologie", type: "consultation", dayOffset: 0, time: "13:30", owner: "Aissatou", location: "Clinique Hannibal", status: "chaud" },
  { id: "EV-101", caseId: "CASE-7403", title: "Confirmation acompte", type: "finance", dayOffset: 0, time: "14:30", owner: "Finance", location: "Validation a distance", status: "normal" },
  { id: "EV-102", caseId: "CASE-7402", title: "Call consentements", type: "meeting", dayOffset: 1, time: "09:00", owner: "Salma", location: "Visio patient", status: "normal" },
  { id: "EV-103", caseId: "CASE-7401", title: "Fenetre cardiologie", type: "consultation", dayOffset: 1, time: "16:00", owner: "Karim", location: "Clinique Hannibal", status: "attention" },
  { id: "EV-104", caseId: "CASE-7405", title: "Suivi J+30", type: "followup", dayOffset: 2, time: "10:00", owner: "Nora", location: "Appel patient", status: "normal" },
];

/* ═══════════════════════════════════════════════════════════
   COMMUNICATIONS
   ═══════════════════════════════════════════════════════════ */

export const communications: Communication[] = [
  { id: "COM-1", caseId: "CASE-7404", title: "WhatsApp famille", channel: "WhatsApp", status: "attente-reponse", summary: "La soeur demande le resume du staff avant 15h.", age: "Il y a 18 min", priority: "haute" },
  { id: "COM-2", caseId: "CASE-7401", title: "Email Allianz Care", channel: "Email", status: "attente-piece", summary: "L'assureur attend le rapport sanguin complet.", age: "Il y a 42 min", priority: "haute" },
  { id: "COM-3", caseId: "CASE-7402", title: "Call couple FIV", channel: "Meeting", status: "planifie", summary: "Appel pour valider protocole et hebergement.", age: "Demain 09:00", priority: "moyenne" },
  { id: "COM-4", caseId: "CASE-7403", title: "SMS banque", channel: "SMS", status: "envoye", summary: "Lien de paiement d'acompte emis.", age: "Il y a 1 h", priority: "moyenne" },
  { id: "COM-5", caseId: "CASE-7406", title: "Formulaire entrant", channel: "Email", status: "nouveau", summary: "Lead premium demande un rappel rapide.", age: "Il y a 2 h", priority: "standard" },
];

/* ═══════════════════════════════════════════════════════════
   DOCUMENTS
   ═══════════════════════════════════════════════════════════ */

export const documents: Document[] = [
  { id: "DOC-1", caseId: "CASE-7401", title: "Bilan cardiaque", category: "Medical", status: "incomplet", owner: "Aissatou", note: "Troponine manquante", priority: "haute" },
  { id: "DOC-2", caseId: "CASE-7404", title: "Imagerie thoracique", category: "Imagerie", status: "valide", owner: "Nora", note: "Archivee dans le coffre", priority: "standard" },
  { id: "DOC-3", caseId: "CASE-7403", title: "Ordre de virement", category: "Finance", status: "a verifier", owner: "Finance", note: "Montant a comparer au devis", priority: "moyenne" },
  { id: "DOC-4", caseId: "CASE-7402", title: "Consentements PMA", category: "Consentement", status: "a obtenir", owner: "Salma", note: "Signature patient requise", priority: "moyenne" },
  { id: "DOC-5", caseId: "CASE-7405", title: "Compte-rendu operatoire", category: "Medical", status: "valide", owner: "Nora", note: "Pret pour cloture", priority: "standard" },
];

/* ═══════════════════════════════════════════════════════════
   PARTNERS
   ═══════════════════════════════════════════════════════════ */

export const partners: Partner[] = [
  { id: "P-CLINIC-01", name: "Clinique Hannibal", type: "Clinique", city: "Tunis", health: "solide", note: "Temps de reponse 18 min", score: "4.9/5", load: "3 dossiers actifs" },
  { id: "P-CLINIC-02", name: "Centre FIV Tunis", type: "Clinique", city: "Tunis", health: "solide", note: "Parcours premium tres fluide", score: "4.8/5", load: "2 dossiers actifs" },
  { id: "P-CLINIC-03", name: "Avicenne Ortho", type: "Clinique", city: "Casablanca", health: "vigilance", note: "Bloc confirme, acompte manquant", score: "4.7/5", load: "1 dossier chaud" },
  { id: "P-CLINIC-04", name: "Clinique Pasteur", type: "Clinique", city: "Tunis", health: "solide", note: "Suivi post-op exemplaire", score: "4.8/5", load: "1 dossier cloture" },
  { id: "P-HOTEL-01", name: "Residence Carthage Care", type: "Hebergement", city: "Tunis", health: "solide", note: "Disponibilite medicalisee OK", score: "4.6/5", load: "4 nuits optionnees" },
  { id: "P-HOTEL-02", name: "Maison Clinique Lac", type: "Hebergement", city: "Tunis", health: "solide", note: "Check-in garanti 24/7", score: "4.9/5", load: "1 chambre reservee" },
  { id: "P-DRIVER-01", name: "Karim Mobility", type: "Transport", city: "Casablanca", health: "attention", note: "Attente validation paiement", score: "4.5/5", load: "2 transferts prevus" },
  { id: "P-DRIVER-02", name: "Elite Med Transfer", type: "Transport", city: "Tunis", health: "solide", note: "Equipee interprete aeroport", score: "4.9/5", load: "Service en cours" },
  { id: "P-INS-01", name: "Allianz Care", type: "Assureur", city: "International", health: "vigilance", note: "Exige pieces completes avant GO", score: "4.4/5", load: "1 dossier bloque" },
];

/* ═══════════════════════════════════════════════════════════
   FINANCE — Invoices & Commissions
   ═══════════════════════════════════════════════════════════ */

export const invoices: Invoice[] = [
  { id: "INV-203", caseId: "CASE-7403", title: "Acompte chirurgie", amountMad: 45000, status: "en_attente", age: "Echeance aujourd'hui" },
  { id: "INV-204", caseId: "CASE-7404", title: "Pack coordination premium", amountMad: 18000, status: "confirme", age: "Payee ce matin" },
  { id: "INV-205", caseId: "CASE-7402", title: "Reservation hebergement", amountMad: 7200, status: "a_envoyer", age: "Emission prevue 17:00" },
];

export const commissions: Commission[] = [
  { id: "COMMISSION-1", partnerId: "P-CLINIC-01", title: "Commission cardiologie", amountMad: 9600, status: "a_recevoir" },
  { id: "COMMISSION-2", partnerId: "P-HOTEL-02", title: "Commission hebergement", amountMad: 1800, status: "confirmee" },
  { id: "COMMISSION-3", partnerId: "P-DRIVER-01", title: "Commission transport", amountMad: 950, status: "a_recevoir" },
];

/* ═══════════════════════════════════════════════════════════
   ROLE METADATA
   ═══════════════════════════════════════════════════════════ */

export const roles: RoleMeta[] = [
  {
    key: "coordinator",
    label: "Mode coordination",
    narrative: "Le coordinateur voit d'abord les blocages, les urgences, les rendez-vous et les reponses qui ne peuvent pas attendre.",
    queueNarrative: "Monter d'abord ce qui menace le prochain pas concret du dossier.",
    story: "Une equipe qui priorise sans friction et qui garde toujours la prochaine action visible.",
    focusPanels: ["contextBar", "queuePanel", "agendaPanel", "communicationPanel"],
  },
  {
    key: "manager",
    label: "Mode management",
    narrative: "Le manager pilote la sante globale du pipeline, les goulets d'etranglement et la charge de l'equipe sans perdre la lisibilite du terrain.",
    queueNarrative: "Remonter les dossiers bloques, les files surchargees et les dependances partenaires.",
    story: "Une machine operationnelle qui rend visible les points de congestion avant qu'ils ne coutent du temps.",
    focusPanels: ["contextBar", "journeyPanel", "queuePanel", "partnerPanel"],
  },
  {
    key: "finance",
    label: "Mode finance",
    narrative: "La vue finance relie chaque dossier a ses acomptes, ses justificatifs, ses commissions et son risque d'encaissement.",
    queueNarrative: "Remonter les dossiers a impact cash, pas seulement les urgences cliniques.",
    story: "Une lecture immediate de l'exposition sans sortir du contexte client.",
    focusPanels: ["contextBar", "financePanel", "documentPanel", "queuePanel"],
  },
  {
    key: "leadership",
    label: "Mode direction",
    narrative: "La direction voit l'ensemble : pipeline, vitesse, experience client, dependances reseau et impact financier sur une seule surface.",
    queueNarrative: "Remonter ce qui menace la promesse globale de la marque ou la marge d'execution.",
    story: "Un cockpit qui permet d'arbitrer sans demander cinq exports ni trois comptes rendus.",
    focusPanels: ["contextBar", "overviewHero", "financePanel", "journeyPanel"],
  },
];

/* ═══════════════════════════════════════════════════════════
   VIEW METADATA
   ═══════════════════════════════════════════════════════════ */

export const views: ViewMeta[] = [
  { key: "overview", eyebrow: "Vue centrale", title: "Le cockpit complet, sans mur de texte.", subtitle: "Une vue compacte qui synthetise la file, le parcours, l'agenda et l'exposition active." },
  { key: "journeys", eyebrow: "Parcours", title: "Chaque dossier avance dans une vraie sequence.", subtitle: "Le pipeline devient un outil de pilotage, pas un decor de presentation." },
  { key: "communications", eyebrow: "Communication", title: "Chaque echange sait ce qu'il bloque.", subtitle: "On ne suit plus des messages, on pilote des engagements lies a un dossier vivant." },
  { key: "calendar", eyebrow: "Agenda", title: "Le jour se pilote en contexte.", subtitle: "Rendez-vous, meetings et logistique restent relies au dossier sans changer d'espace." },
  { key: "documents", eyebrow: "Documents", title: "Les pieces critiques deviennent lisibles.", subtitle: "Ce qui est valide, manquant ou a regulariser remonte immediatement." },
  { key: "partners", eyebrow: "Partenaires", title: "Le reseau devient un levier visible.", subtitle: "Clinique, hebergement, transport et assurance prennent leur place dans l'execution." },
  { key: "finance", eyebrow: "Finance", title: "La marge et le cash restent dans le contexte client.", subtitle: "Acomptes, factures et commissions se lisent avec un niveau d'effort minimal." },
];

/* ═══════════════════════════════════════════════════════════
   SCENARIO METADATA
   ═══════════════════════════════════════════════════════════ */

export const scenariosMeta: ScenarioMeta[] = [
  { key: "baseline", label: "Vue nominale", description: "Etat par defaut" },
  { key: "intake", label: "Nouvelle demande", description: "Cas urgent entrant" },
  { key: "docs", label: "Document manquant", description: "Escalade documentaire" },
  { key: "rendezvous", label: "RDV critique", description: "Consultation avancee" },
  { key: "partner", label: "Partenaire confirme", description: "Confirmation clinique" },
  { key: "payment", label: "Paiement en retard", description: "Retard financier" },
];

/* ═══════════════════════════════════════════════════════════
   AGGREGATED BASE DATA
   ═══════════════════════════════════════════════════════════ */

export const baseData: DemoData = {
  cases,
  events,
  communications,
  documents,
  partners,
  invoices,
  commissions,
};
