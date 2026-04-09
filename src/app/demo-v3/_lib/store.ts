"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  AccountingEntry,
  AccountingTab,
  CommissionItem,
  DemoV3Partners,
  DemoV3Seed,
  DemoV3View,
  EmailItem,
  FacturePatient,
  FinanceTab,
  JournalTypes,
  MedicalDocument,
  Medecin,
  PartnerCategory,
  Patient,
} from "./types";

interface DemoV3Modal {
  type:
    | "patient"
    | "medecin"
    | "partner"
    | "document"
    | "email"
    | "commission"
    | "facture"
    | "ecriture";
  mode: "create" | "edit";
  id?: string;
  partnerCategory?: PartnerCategory;
}

interface DemoV3State extends DemoV3Seed {
  activeView: DemoV3View;
  search: string;
  notificationsOpen: boolean;
  partnerTab: PartnerCategory;
  financeTab: FinanceTab;
  accountingTab: AccountingTab;
  selectedPatientId: string | null;
  modal: DemoV3Modal | null;
  dismissedAlertIds: string[];
  bootstrap: (seed: DemoV3Seed) => void;
  setView: (view: DemoV3View) => void;
  setSearch: (value: string) => void;
  setNotificationsOpen: (open: boolean) => void;
  setPartnerTab: (tab: PartnerCategory) => void;
  setFinanceTab: (tab: FinanceTab) => void;
  setAccountingTab: (tab: AccountingTab) => void;
  openPatient: (id: string) => void;
  closePatient: () => void;
  openModal: (modal: DemoV3Modal) => void;
  closeModal: () => void;
  savePatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;
  saveMedecin: (medecin: Medecin) => void;
  deleteMedecin: (id: string) => void;
  savePartner: (category: PartnerCategory, partner: Record<string, unknown>) => void;
  deletePartner: (category: PartnerCategory, id: string) => void;
  saveDocument: (document: MedicalDocument) => void;
  deleteDocument: (id: string) => void;
  saveEmail: (email: EmailItem) => void;
  markEmailProcessed: (id: string) => void;
  deleteEmail: (id: string) => void;
  saveCommission: (commission: CommissionItem) => void;
  saveFacture: (facture: FacturePatient) => void;
  saveAccountingEntry: (entry: AccountingEntry) => void;
  dismissAlert: (id: string) => void;
  clearDismissedAlerts: () => void;
}

const emptySeed: DemoV3Seed = {
  patients: [],
  medecins: [],
  partenaires: {
    cliniques: [],
    hebergements: [],
    chauffeurs: [],
    assurances: [],
  },
  templates: [],
  documents: [],
  evenements: [],
  emails: [],
  services: [],
  commissions: [],
  facturesPatients: [],
  ecritures: [],
  commissionsConfig: {},
  journalTypes: {} as JournalTypes,
};

function upsert<T extends { id: string }>(items: T[], next: T) {
  const index = items.findIndex((item) => item.id === next.id);
  if (index === -1) {
    return [next, ...items];
  }

  return items.map((item) => (item.id === next.id ? next : item));
}

export const useDemoV3Store = create<DemoV3State>()(
  persist(
    (set) => ({
      ...emptySeed,
      activeView: "dashboard",
      search: "",
      notificationsOpen: false,
      partnerTab: "cliniques",
      financeTab: "commissions",
      accountingTab: "ecritures",
      selectedPatientId: null,
      modal: null,
      dismissedAlertIds: [],
      bootstrap: (seed) =>
        set((state) => {
          if (state.patients.length > 0 || state.templates.length > 0) {
            return {};
          }
          return {
            ...seed,
          };
        }),
      setView: (activeView) => set({ activeView }),
      setSearch: (search) => set({ search }),
      setNotificationsOpen: (notificationsOpen) => set({ notificationsOpen }),
      setPartnerTab: (partnerTab) => set({ partnerTab }),
      setFinanceTab: (financeTab) => set({ financeTab }),
      setAccountingTab: (accountingTab) => set({ accountingTab }),
      openPatient: (selectedPatientId) => set({ selectedPatientId }),
      closePatient: () => set({ selectedPatientId: null }),
      openModal: (modal) => set({ modal }),
      closeModal: () => set({ modal: null }),
      savePatient: (patient) =>
        set((state) => ({ patients: upsert(state.patients, patient), modal: null })),
      deletePatient: (id) =>
        set((state) => ({
          patients: state.patients.filter((patient) => patient.id !== id),
          selectedPatientId:
            state.selectedPatientId === id ? null : state.selectedPatientId,
        })),
      saveMedecin: (medecin) =>
        set((state) => ({ medecins: upsert(state.medecins, medecin), modal: null })),
      deleteMedecin: (id) =>
        set((state) => ({ medecins: state.medecins.filter((item) => item.id !== id) })),
      savePartner: (category, partner) =>
        set((state) => ({
          partenaires: {
            ...state.partenaires,
            [category]: upsert(
              state.partenaires[category] as unknown as Array<
                Record<string, unknown> & { id: string }
              >,
              partner as Record<string, unknown> & { id: string },
            ) as unknown as DemoV3Partners[typeof category],
          },
          modal: null,
        })),
      deletePartner: (category, id) =>
        set((state) => ({
          partenaires: {
            ...state.partenaires,
            [category]: state.partenaires[category].filter((item) => item.id !== id),
          },
        })),
      saveDocument: (document) =>
        set((state) => ({ documents: upsert(state.documents, document), modal: null })),
      deleteDocument: (id) =>
        set((state) => ({ documents: state.documents.filter((item) => item.id !== id) })),
      saveEmail: (email) =>
        set((state) => ({ emails: upsert(state.emails, email), modal: null })),
      markEmailProcessed: (id) =>
        set((state) => ({
          emails: state.emails.map((email) =>
            email.id === id
              ? {
                  ...email,
                  statut: "traite",
                  dateReponse: new Date().toISOString(),
                  tempsReponse: Math.max(
                    1,
                    Math.round(
                      (Date.now() - new Date(email.dateReception).getTime()) /
                        (1000 * 60 * 60),
                    ),
                  ),
                }
              : email,
          ),
        })),
      deleteEmail: (id) =>
        set((state) => ({ emails: state.emails.filter((item) => item.id !== id) })),
      saveCommission: (commission) =>
        set((state) => ({
          commissions: upsert(state.commissions, commission),
          modal: null,
        })),
      saveFacture: (facture) =>
        set((state) => ({
          facturesPatients: upsert(state.facturesPatients, facture),
          modal: null,
        })),
      saveAccountingEntry: (entry) =>
        set((state) => ({ ecritures: upsert(state.ecritures, entry), modal: null })),
      dismissAlert: (id) =>
        set((state) => ({
          dismissedAlertIds: state.dismissedAlertIds.includes(id)
            ? state.dismissedAlertIds
            : [...state.dismissedAlertIds, id],
        })),
      clearDismissedAlerts: () => set({ dismissedAlertIds: [] }),
    }),
    {
      name: "wamamed-demo-v3",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        patients: state.patients,
        medecins: state.medecins,
        partenaires: state.partenaires,
        templates: state.templates,
        documents: state.documents,
        evenements: state.evenements,
        emails: state.emails,
        services: state.services,
        commissions: state.commissions,
        facturesPatients: state.facturesPatients,
        ecritures: state.ecritures,
        commissionsConfig: state.commissionsConfig,
        journalTypes: state.journalTypes,
        partnerTab: state.partnerTab,
        financeTab: state.financeTab,
        accountingTab: state.accountingTab,
        dismissedAlertIds: state.dismissedAlertIds,
      }),
    },
  ),
);
