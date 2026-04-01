"use client";

import { Search, Menu } from "lucide-react";
import { useDemoStore } from "../_lib/store";
import { cn, getInitials } from "../_lib/utils";
import { useState, useEffect } from "react";

export function Topbar({ onMenuToggle }: { onMenuToggle?: () => void }) {
  const search = useDemoStore((s) => s.search);
  const setSearch = useDemoStore((s) => s.setSearch);
  const role = useDemoStore((s) => s.role);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () => {
      setClock(
        new Date().toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const ownerName =
    role === "coordinator" ? "Aissatou Faye" :
    role === "manager" ? "Driss Tazi" :
    role === "finance" ? "Youssef Alami" :
    "Driss Tazi";

  return (
    <div className="flex items-center gap-3 px-5 py-3 border-b border-[var(--demo-border)]">
      {/* Mobile hamburger */}
      {onMenuToggle && (
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-stone/60 transition-colors"
          aria-label="Menu"
        >
          <Menu size={20} className="text-ink-soft" />
        </button>
      )}

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--demo-muted)]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un dossier..."
          className="w-full pl-9 pr-4 py-2 text-sm bg-stone/40 border border-transparent rounded-xl focus:outline-none focus:border-brass/30 focus:bg-white transition-all placeholder:text-[var(--demo-muted)]"
        />
      </div>

      <div className="flex-1" />

      {/* Clock */}
      <span className="text-xs text-[var(--demo-muted)] font-medium tabular-nums hidden sm:block">
        {clock}
      </span>

      {/* Date */}
      <span className="text-xs text-[var(--demo-muted)] hidden md:block">
        {new Date().toLocaleDateString("fr-FR", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })}
      </span>

      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0",
        "bg-teal text-cream"
      )}>
        {getInitials(ownerName)}
      </div>
    </div>
  );
}
