import { cache } from "react";
import {
  generatedCommissions,
  generatedCommissionsConfig,
  generatedDocuments,
  generatedEcritures,
  generatedEvenements,
  generatedFacturesPatients,
  generatedJournalTypes,
  generatedMedecins,
  generatedPartners,
  generatedPatients,
  generatedServices,
  generatedTemplates,
} from "./generated-seed";
import type { DemoV3Seed, EmailItem, Patient } from "./types";

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
  return {
    patients: generatedPatients,
    medecins: generatedMedecins,
    partenaires: generatedPartners,
    templates: generatedTemplates,
    documents: generatedDocuments,
    evenements: generatedEvenements,
    emails: seedEmails(generatedPatients),
    services: generatedServices,
    commissions: generatedCommissions,
    facturesPatients: generatedFacturesPatients,
    ecritures: generatedEcritures,
    commissionsConfig: generatedCommissionsConfig,
    journalTypes: generatedJournalTypes,
  };
});
