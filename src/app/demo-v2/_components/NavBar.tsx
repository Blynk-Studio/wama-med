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
      <div className="max-w-[1440px] mx-auto w-full px-4 md:px-6 lg:px-8 flex items-center h-16">
        {/* Wordmark */}
        <div className="flex items-center gap-2.5 mr-8">
          <div className="w-8 h-8 rounded-xl bg-teal flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-cream" strokeWidth={1.5} />
          </div>
          <span className="font-fraunces text-lg font-semibold text-ink tracking-tight hidden sm:block">
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
                  "relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-150",
                  isActive
                    ? "text-teal"
                    : "text-ink-soft/60 hover:text-ink-soft hover:bg-stone/40",
                )}
              >
                <Icon className="w-4 h-4" strokeWidth={isActive ? 2 : 1.5} />
                <span className="hidden sm:inline">{label}</span>

                {/* Animated underline indicator */}
                {isActive && (
                  <motion.div
                    layoutId="v2-nav-indicator"
                    className="absolute -bottom-[1px] left-2 right-2 h-0.5 rounded-full bg-teal"
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

        {/* Right side — minimal */}
        <div className="ml-auto flex items-center gap-3">
          <div className="text-xs text-ink-soft/50 font-medium hidden md:block">
            Demo Mode
          </div>
          <div className="w-8 h-8 rounded-full bg-teal/10 flex items-center justify-center">
            <span className="text-xs font-semibold text-teal">FB</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
