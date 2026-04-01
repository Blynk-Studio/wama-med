"use client";

import {
  LayoutDashboard,
  Route,
  MessageSquare,
  CalendarDays,
  FileText,
  Handshake,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { useDemoStore } from "../_lib/store";
import { roles } from "../_lib/data";
import { cn } from "../_lib/utils";
import type { DemoView, Role } from "../_lib/types";
import { useState } from "react";

const NAV_ITEMS: { key: DemoView; label: string; icon: typeof LayoutDashboard }[] = [
  { key: "overview", label: "Vue centrale", icon: LayoutDashboard },
  { key: "journeys", label: "Parcours", icon: Route },
  { key: "communications", label: "Communication", icon: MessageSquare },
  { key: "calendar", label: "Agenda", icon: CalendarDays },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "partners", label: "Partenaires", icon: Handshake },
  { key: "finance", label: "Finance", icon: Wallet },
];

export function Sidebar({ collapsed }: { collapsed: boolean }) {
  const activeView = useDemoStore((s) => s.activeView);
  const setView = useDemoStore((s) => s.setView);
  const role = useDemoStore((s) => s.role);
  const setRole = useDemoStore((s) => s.setRole);
  const [roleOpen, setRoleOpen] = useState(false);

  const currentRole = roles.find((r) => r.key === role)!;

  return (
    <aside
      className={cn(
        "demo-sidebar flex flex-col h-full text-cream/90 transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center gap-2 px-4 pt-5 pb-4", collapsed && "justify-center px-2")}>
        <div className="w-8 h-8 rounded-lg bg-brass/20 flex items-center justify-center text-brass font-bold text-sm shrink-0">
          W
        </div>
        {!collapsed && (
          <span className="font-fraunces font-bold text-sm tracking-wide text-cream">
            WAMA MED
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 space-y-0.5">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const active = activeView === key;
          return (
            <button
              key={key}
              onClick={() => setView(key)}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl text-sm transition-all duration-150",
                collapsed ? "justify-center p-3" : "px-3 py-2.5",
                active
                  ? "bg-white/12 text-cream font-medium shadow-sm"
                  : "text-cream/60 hover:text-cream/90 hover:bg-white/6"
              )}
              title={collapsed ? label : undefined}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Role Selector */}
      <div className={cn("px-2 pb-4", collapsed && "px-1")}>
        <div className="relative">
          <button
            onClick={() => setRoleOpen(!roleOpen)}
            className={cn(
              "w-full flex items-center gap-2 rounded-xl text-xs transition-colors",
              collapsed ? "justify-center p-3" : "px-3 py-2.5",
              "bg-white/6 hover:bg-white/10 text-cream/70"
            )}
          >
            <div className="w-6 h-6 rounded-full bg-brass/30 flex items-center justify-center text-brass text-[10px] font-bold shrink-0">
              {role[0].toUpperCase()}
            </div>
            {!collapsed && (
              <>
                <span className="flex-1 text-left truncate">{currentRole.label}</span>
                <ChevronDown size={14} className={cn("transition-transform", roleOpen && "rotate-180")} />
              </>
            )}
          </button>

          {roleOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-teal-dark border border-white/10 rounded-xl overflow-hidden shadow-xl z-50">
              {roles.map((r) => (
                <button
                  key={r.key}
                  onClick={() => {
                    setRole(r.key as Role);
                    setRoleOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-2 text-xs transition-colors",
                    r.key === role
                      ? "bg-white/10 text-cream font-medium"
                      : "text-cream/60 hover:bg-white/6 hover:text-cream/80"
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
