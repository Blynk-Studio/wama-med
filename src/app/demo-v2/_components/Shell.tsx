"use client";

import { useDemoV2Store } from "../_lib/store";
import { NavBar } from "./NavBar";
import { PipelineBoard } from "./PipelineBoard";
import { FinancesView } from "./FinancesView";
import { PartnersView } from "./PartnersView";
import { PatientDrawer } from "./PatientDrawer";

const VIEW_COMPONENTS = {
  pipeline: PipelineBoard,
  finances: FinancesView,
  partners: PartnersView,
} as const;

export function Shell() {
  const activeView = useDemoV2Store((s) => s.activeView);
  const ViewComponent = VIEW_COMPONENTS[activeView];

  return (
    <div className="flex flex-col min-h-dvh">
      {/* Sticky navigation */}
      <NavBar />

      {/* Content area */}
      <main className="flex-1 px-4 pb-8 pt-4 md:px-6 md:pt-6 lg:px-8 max-w-[1440px] mx-auto w-full">
        <ViewComponent />
      </main>

      {/* Patient detail drawer */}
      <PatientDrawer />
    </div>
  );
}
