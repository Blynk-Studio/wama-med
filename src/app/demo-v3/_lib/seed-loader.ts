import { cache } from "react";
import { readFile } from "node:fs/promises";
import path from "node:path";
import type {
  AccountingEntry,
  CalendarEventItem,
  CommissionItem,
  CommissionsConfig,
  DemoV3Partners,
  DemoV3Seed,
  EmailItem,
  FacturePatient,
  JournalTypes,
  MedicalDocument,
  Medecin,
  Patient,
  ServiceItem,
  TemplateItem,
} from "./types";

function extractLiteral(source: string, name: string) {
  const start = source.indexOf(`const ${name} =`);
  if (start === -1) {
    throw new Error(`Unable to find "${name}" in seed source.`);
  }

  const equalIndex = source.indexOf("=", start);
  let index = equalIndex + 1;

  while (index < source.length && /\s/.test(source[index])) {
    index += 1;
  }

  const opening = source[index];
  const closing = opening === "[" ? "]" : "}";
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let cursor = index; cursor < source.length; cursor += 1) {
    const character = source[cursor];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (character === "\\") {
        escaped = true;
      } else if (character === quote) {
        inString = false;
      }
      continue;
    }

    if (character === "'" || character === '"' || character === "`") {
      inString = true;
      quote = character;
      continue;
    }

    if (character === opening) {
      depth += 1;
    } else if (character === closing) {
      depth -= 1;
      if (depth === 0) {
        return source.slice(index, cursor + 1);
      }
    }
  }

  throw new Error(`Unable to parse literal "${name}".`);
}

function parseLiteral<T>(literal: string): T {
  return Function(`"use strict"; return (${literal});`)() as T;
}

function seedEmails(patients: Patient[]): EmailItem[] {
  const [first, second, third] = patients;
  const now = Date.now();
  return [
    {
      id: "EMAIL-SEED-001",
      patientId: first?.id ?? "WM-2025-001",
      patientNom: `${first?.prenom ?? "Hassan"} ${first?.nom ?? "Ibrahim"}`,
      sujet: "Confirmation devis et détails d'arrivée",
      contenu:
        "Bonjour WAMA MED, merci de me confirmer la date de consultation et l'hôtel recommandé pour mon séjour.",
      dateReception: new Date(now - 1000 * 60 * 60 * 30).toISOString(),
      dateReponse: null,
      statut: "en_attente",
      priorite: "critique",
      tempsReponse: null,
    },
    {
      id: "EMAIL-SEED-002",
      patientId: second?.id ?? "WM-2025-002",
      patientNom: `${second?.prenom ?? "Aïcha"} ${second?.nom ?? "Diop"}`,
      sujet: "Documents FIV envoyés",
      contenu:
        "Je viens d'envoyer mes derniers examens. Pouvez-vous me confirmer qu'ils sont suffisants pour lancer la suite ?",
      dateReception: new Date(now - 1000 * 60 * 60 * 9).toISOString(),
      dateReponse: null,
      statut: "en_attente",
      priorite: "moyenne",
      tempsReponse: null,
    },
    {
      id: "EMAIL-SEED-003",
      patientId: third?.id ?? "WM-2025-003",
      patientNom: `${third?.prenom ?? "Chen"} ${third?.nom ?? "Wei"}`,
      sujet: "Suivi post-op confirmé",
      contenu:
        "Merci pour l'organisation. Le rendez-vous de contrôle est bien confirmé et le patient est soulagé.",
      dateReception: new Date(now - 1000 * 60 * 60 * 52).toISOString(),
      dateReponse: new Date(now - 1000 * 60 * 60 * 44).toISOString(),
      statut: "traite",
      priorite: "normale",
      tempsReponse: 8,
    },
  ];
}

export const loadDemoV3Seed = cache(async (): Promise<DemoV3Seed> => {
  const root = path.join(process.cwd(), "client-file-1", "js");

  const [dataJs, documentsJs, calendrierJs, financierJs, comptabiliteJs] =
    await Promise.all([
      readFile(path.join(root, "data.js"), "utf8"),
      readFile(path.join(root, "documents.js"), "utf8"),
      readFile(path.join(root, "calendrier.js"), "utf8"),
      readFile(path.join(root, "financier.js"), "utf8"),
      readFile(path.join(root, "comptabilite.js"), "utf8"),
    ]);

  const patients = parseLiteral<Patient[]>(extractLiteral(dataJs, "samplePatients"));
  const medecins = parseLiteral<Medecin[]>(extractLiteral(dataJs, "sampleMedecins"));
  const partenaires: DemoV3Partners = {
    cliniques: parseLiteral(extractLiteral(dataJs, "sampleCliniques")),
    hebergements: parseLiteral(extractLiteral(dataJs, "sampleHebergements")),
    chauffeurs: parseLiteral(extractLiteral(dataJs, "sampleChauffeurs")),
    assurances: parseLiteral(extractLiteral(dataJs, "sampleAssurances")),
  };

  return {
    patients,
    medecins,
    partenaires,
    templates: parseLiteral<TemplateItem[]>(extractLiteral(dataJs, "sampleTemplates")),
    documents: parseLiteral<MedicalDocument[]>(
      extractLiteral(documentsJs, "sampleDocuments"),
    ),
    evenements: parseLiteral<CalendarEventItem[]>(
      extractLiteral(calendrierJs, "sampleEvenements"),
    ),
    emails: seedEmails(patients),
    services: parseLiteral<ServiceItem[]>(extractLiteral(financierJs, "catalogueServices")),
    commissions: parseLiteral<CommissionItem[]>(
      extractLiteral(financierJs, "sampleCommissions"),
    ),
    facturesPatients: parseLiteral<FacturePatient[]>(
      extractLiteral(financierJs, "sampleFacturesPatients"),
    ),
    ecritures: parseLiteral<AccountingEntry[]>(
      extractLiteral(comptabiliteJs, "sampleEcritures"),
    ),
    commissionsConfig: parseLiteral<CommissionsConfig>(
      extractLiteral(financierJs, "commissionsConfig"),
    ),
    journalTypes: parseLiteral<JournalTypes>(extractLiteral(comptabiliteJs, "typesJournaux")),
  };
});
