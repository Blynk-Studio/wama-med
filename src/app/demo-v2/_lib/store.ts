import { create } from "zustand";
import type { PipelineStage, DemoV2View, RevenuePeriod } from "./types";
import { patients } from "./data";

/* ─── Build initial stage map from base data ─── */
const initialStages: Record<string, PipelineStage> = {};
for (const p of patients) {
  initialStages[p.id] = p.stage;
}

/* ─── Store shape ─── */
interface DemoV2State {
  /* View */
  activeView: DemoV2View;
  setView: (view: DemoV2View) => void;

  /* Pipeline drag-and-drop */
  patientStages: Record<string, PipelineStage>;
  movePatient: (patientId: string, toStage: PipelineStage) => void;

  /* Patient drawer */
  selectedPatientId: string | null;
  drawerOpen: boolean;
  openPatient: (id: string) => void;
  closeDrawer: () => void;

  /* Finances */
  activePeriod: RevenuePeriod;
  setPeriod: (period: RevenuePeriod) => void;
}

export const useDemoV2Store = create<DemoV2State>((set) => ({
  /* View */
  activeView: "pipeline",
  setView: (view) => set({ activeView: view }),

  /* Pipeline */
  patientStages: initialStages,
  movePatient: (patientId, toStage) =>
    set((state) => ({
      patientStages: { ...state.patientStages, [patientId]: toStage },
    })),

  /* Drawer */
  selectedPatientId: null,
  drawerOpen: false,
  openPatient: (id) => set({ selectedPatientId: id, drawerOpen: true }),
  closeDrawer: () => set({ drawerOpen: false }),

  /* Finances */
  activePeriod: "monthly",
  setPeriod: (period) => set({ activePeriod: period }),
}));
