"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDemoStore } from "../_lib/store";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ContextBar } from "./ContextBar";
import { CaseDrawer } from "./CaseDrawer";
import { OverviewView } from "./OverviewView";
import { JourneysView } from "./JourneysView";
import { CommsView } from "./CommsView";
import { CalendarView } from "./CalendarView";
import { DocumentsView } from "./DocumentsView";
import { PartnersView } from "./PartnersView";
import { FinanceView } from "./FinanceView";
import type { DemoView } from "../_lib/types";

const VIEW_COMPONENTS: Record<DemoView, React.ComponentType> = {
  overview: OverviewView,
  journeys: JourneysView,
  communications: CommsView,
  calendar: CalendarView,
  documents: DocumentsView,
  partners: PartnersView,
  finance: FinanceView,
};

export function Workspace() {
  const activeView = useDemoStore((s) => s.activeView);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const ViewComponent = VIEW_COMPONENTS[activeView];

  return (
    <div className="demo-workspace w-full min-h-dvh md:h-full rounded-none md:rounded-[28px] overflow-visible md:overflow-hidden flex flex-col md:flex-row">
      {/* Sidebar — tablet icon rail */}
      <div className="hidden md:flex xl:hidden">
        <Sidebar collapsed />
      </div>

      {/* Sidebar — desktop full nav */}
      <div className="hidden xl:flex">
        <Sidebar collapsed={false} />
      </div>

      {/* Mobile nav overlay */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative w-60 h-full">
            <Sidebar collapsed={false} onNavigate={() => setMobileNavOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 bg-white/60 min-h-dvh md:min-h-0">
        <Topbar onMenuToggle={() => setMobileNavOpen(!mobileNavOpen)} />
        <ContextBar />

        {/* View content */}
        <div className="flex-1 overflow-visible md:overflow-y-auto demo-scroll">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="p-4 pb-8 md:p-5 lg:p-6"
            >
              <ViewComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Case Drawer */}
      <CaseDrawer />
    </div>
  );
}
