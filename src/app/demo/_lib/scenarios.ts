import type { DemoData, Scenario, PatientCase, Communication, Document, Invoice } from "./types";

/**
 * Pure function: base data + scenario key → mutated copy.
 * All transforms are immutable — they return new arrays/objects.
 */
export function applyScenario(base: DemoData, scenario: Scenario): DemoData {
  switch (scenario) {
    case "baseline":
      return base;
    case "intake":
      return applyIntake(base);
    case "docs":
      return applyDocs(base);
    case "rendezvous":
      return applyRendezvous(base);
    case "partner":
      return applyPartner(base);
    case "payment":
      return applyPayment(base);
    default:
      return base;
  }
}

/* ─── Nouvelle demande ─── */
function applyIntake(base: DemoData): DemoData {
  const newCase: PatientCase = {
    id: "CASE-7410",
    patient: "Moussa Traore",
    country: "Guinee",
    program: "Neurochirurgie urgente",
    stage: "Nouveau",
    priority: "critique",
    owner: "Aissatou Faye",
    cityPath: "Conakry → Tunis",
    nextAction: "Qualifier en urgence et contacter neurochirurgien de garde",
    slaHours: 3,
    wait: "Demande entrante urgente",
    unread: 1,
    docsPending: 0,
    partnerIds: ["P-CLINIC-01"],
    blocked: false,
    blockerType: null,
    watchType: "medical",
    progressPercent: 2,
    valueMad: 210000,
    dueLabel: "Aujourd'hui · URGENT",
    stageHistory: [
      { stage: "Nouveau", enteredAt: "Maintenant", owner: "Aissatou Faye" },
    ],
    timeline: [
      { label: "Demande recue par formulaire", time: "Maintenant" },
    ],
    tasks: [
      { label: "Appel qualification urgente", status: "A faire", owner: "Aissatou", due: "Immediatement" },
    ],
    notes: [
      "Famille en detresse — reponse attendue dans l'heure.",
    ],
  };

  const newComm: Communication = {
    id: "COM-INTAKE",
    caseId: "CASE-7410",
    title: "Formulaire urgence",
    channel: "Email",
    status: "nouveau",
    summary: "Famille signale une urgence neurochirurgicale. Demande de prise en charge immediate.",
    age: "A l'instant",
    priority: "critique",
  };

  return {
    ...base,
    cases: [newCase, ...base.cases],
    communications: [newComm, ...base.communications],
  };
}

/* ─── Document manquant ─── */
function applyDocs(base: DemoData): DemoData {
  const cases = base.cases.map((c) =>
    c.id === "CASE-7401"
      ? { ...c, priority: "critique" as const, docsPending: 2, wait: "Document critique manquant depuis 18h" }
      : c
  );

  const newDoc: Document = {
    id: "DOC-ESCALATED",
    caseId: "CASE-7401",
    title: "Rapport sanguin complet",
    category: "Medical",
    status: "manquant",
    owner: "Aissatou",
    note: "Bloque la validation assurance — escalade immediate",
    priority: "critique",
  };

  return { ...base, cases, documents: [newDoc, ...base.documents] };
}

/* ─── RDV critique ─── */
function applyRendezvous(base: DemoData): DemoData {
  const cases = base.cases.map((c) =>
    c.id === "CASE-7404"
      ? { ...c, priority: "critique" as const, slaHours: 1, nextAction: "Staff avance a 12:00 — coordination immediate requise" }
      : c
  );

  const events = base.events.map((e) =>
    e.id === "EV-100"
      ? { ...e, time: "12:00", status: "critique" as const }
      : e
  );

  return { ...base, cases, events };
}

/* ─── Partenaire confirme ─── */
function applyPartner(base: DemoData): DemoData {
  const cases = base.cases.map((c) =>
    c.id === "CASE-7402"
      ? {
          ...c,
          stage: "Planification" as const,
          nextAction: "Hebergement et transport a verrouiller",
          wait: "Confirmation clinique recue",
          watchType: null,
        }
      : c
  );

  return { ...base, cases };
}

/* ─── Paiement en retard ─── */
function applyPayment(base: DemoData): DemoData {
  const cases = base.cases.map((c) =>
    c.id === "CASE-7403"
      ? {
          ...c,
          priority: "critique" as const,
          blocked: true,
          blockerType: "finance" as const,
          watchType: null,
          wait: "Acompte en retard — bloc operatoire menace",
        }
      : c
  );

  const invoices: Invoice[] = base.invoices.map((inv) =>
    inv.id === "INV-203"
      ? { ...inv, status: "en_retard" as const, age: "En retard depuis 4h" }
      : inv
  );

  return { ...base, cases, invoices };
}
