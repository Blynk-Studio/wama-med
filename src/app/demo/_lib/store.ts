import { create } from "zustand";
import type { Role, Scenario, QueueFilter } from "./types";

interface DemoState {
  /* ─── State ─── */
  role: Role;
  scenario: Scenario;
  selectedCaseId: string | null;
  queueFilter: QueueFilter;
  dayOffset: number;
  search: string;
  drawerOpen: boolean;

  /* ─── Actions ─── */
  setRole: (role: Role) => void;
  setScenario: (scenario: Scenario) => void;
  openCase: (caseId: string) => void;
  closeDrawer: () => void;
  setFilter: (filter: QueueFilter) => void;
  setDayOffset: (offset: number) => void;
  setSearch: (query: string) => void;
}

export const useDemoStore = create<DemoState>((set) => ({
  role: "coordinator",
  scenario: "baseline",
  selectedCaseId: null,
  queueFilter: "all",
  dayOffset: 0,
  search: "",
  drawerOpen: false,

  setRole: (role) => set({ role }),

  setScenario: (scenario) => {
    // Intake scenario auto-opens the new urgent case
    if (scenario === "intake") {
      set({ scenario, selectedCaseId: "CASE-7410", drawerOpen: true });
    } else {
      set({ scenario });
    }
  },

  openCase: (caseId) => set({ selectedCaseId: caseId, drawerOpen: true }),

  closeDrawer: () => set({ drawerOpen: false }),

  setFilter: (queueFilter) => set({ queueFilter }),

  setDayOffset: (dayOffset) => set({ dayOffset }),

  setSearch: (search) => set({ search }),
}));
