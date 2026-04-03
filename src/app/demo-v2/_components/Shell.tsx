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
      <main className="flex-1 px-5 pb-10 pt-6 md:px-8 md:pt-8 lg:px-10 max-w-[1440px] mx-auto w-full">
        <ViewComponent />
      </main>

      {/* Patient detail drawer */}
      <PatientDrawer />
    </div>
  );
}
