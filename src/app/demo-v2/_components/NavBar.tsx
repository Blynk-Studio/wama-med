"use client";

import { motion } from "framer-motion";
import { Stethoscope, BarChart3, Users } from "lucide-react";
import { useDemoV2Store } from "../_lib/store";
import type { DemoV2View } from "../_lib/types";
import { cn } from "../_lib/utils";

const TABS: { key: DemoV2View; label: string; icon: typeof Stethoscope }[] = [
  { key: "pipeline", label: "Pipeline", icon: Stethoscope },
  { key: "finances", label: "Finances", icon: BarChart3 },
  { key: "partners", label: "Partners", icon: Users },
];

export function NavBar() {
  const activeView = useDemoV2Store((s) => s.activeView);
  const setActiveView = useDemoV2Store((s) => s.setView);

  return (
    <nav className="v2-nav-glass sticky top-0 z-30">
      <div className="max-w-[1440px] mx-auto w-full px-5 md:px-8 lg:px-10 flex items-center h-[72px]">
        {/* Wordmark */}
        <div className="flex items-center gap-3 mr-10">
          <div className="w-10 h-10 rounded-xl bg-teal flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-cream" strokeWidth={1.5} />
          </div>
          <span className="font-fraunces text-xl font-semibold text-ink tracking-tight hidden sm:block">
            WAMA MED
          </span>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-1 relative">
          {TABS.map(({ key, label, icon: Icon }) => {
            const isActive = activeView === key;
            return (
              <button
                key={key}
                onClick={() => setActiveView(key)}
                className={cn(
                  "relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-[15px] font-medium transition-colors duration-150",
                  isActive
                    ? "text-teal"
                    : "text-ink-soft/80 hover:text-ink hover:bg-stone/40",
                )}
              >
                <Icon className="w-[18px] h-[18px]" strokeWidth={isActive ? 2 : 1.5} />
                <span className="hidden sm:inline">{label}</span>

                {isActive && (
                  <motion.div
                    layoutId="v2-nav-indicator"
                    className="absolute -bottom-[1px] left-3 right-3 h-0.5 rounded-full bg-teal"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <div className="text-sm text-ink-soft/70 font-medium hidden md:block">
            Demo Mode
          </div>
          <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-teal">FB</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
