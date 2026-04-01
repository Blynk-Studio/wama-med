"use client";

import { Handshake, Building2, Hotel, Car, Shield, Star } from "lucide-react";
import { useDemoData } from "../_hooks/use-demo-data";
import { SupportStrip } from "./SupportStrip";
import { Badge } from "./Badge";
import { cn, getPartnerHealthColor } from "../_lib/utils";
import type { PartnerType } from "../_lib/types";

const TYPE_ICONS: Record<PartnerType, typeof Building2> = {
  Clinique: Building2,
  Hebergement: Hotel,
  Transport: Car,
  Assureur: Shield,
};

export function PartnersView() {
  const data = useDemoData();

  const solide = data.partners.filter((p) => p.health === "solide").length;
  const attention = data.partners.filter((p) => p.health !== "solide").length;

  // Top 4 featured partners (highest score)
  const top4 = [...data.partners]
    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
    .slice(0, 4);
  const rest = data.partners.filter((p) => !top4.includes(p));

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Reseau actif", value: data.partners.length, icon: <Handshake size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "Fiables", value: solide, icon: <Star size={18} className="text-emerald-600" />, accent: "#ecfdf5" },
          { label: "A surveiller", value: attention, icon: <Shield size={18} className="text-amber-600" />, accent: "#fef3c7" },
        ]}
      />

      {/* Top 4 — Featured grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {top4.map((p) => {
          const Icon = TYPE_ICONS[p.type];
          const healthColor = getPartnerHealthColor(p.health);
          return (
            <div
              key={p.id}
              className="demo-card bg-white rounded-xl p-5 border border-[var(--demo-border)]"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-stone/60 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-ink-soft" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-ink truncate">{p.name}</h3>
                  <p className="text-[11px] text-[var(--demo-muted)]">{p.type} · {p.city}</p>
                </div>
                <Badge variant="partnerHealth" value={p.health} />
              </div>
              <p className="text-xs text-[var(--demo-muted)] leading-snug mb-3">{p.note}</p>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-brass" />
                  <span className="font-medium text-ink">{p.score}</span>
                </span>
                <span className="text-[var(--demo-muted)]">{p.load}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Remaining — Compact list */}
      {rest.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-semibold text-ink">Autres partenaires</h3>
          {rest.map((p) => {
            const Icon = TYPE_ICONS[p.type];
            return (
              <div
                key={p.id}
                className="bg-white rounded-xl p-3 border border-[var(--demo-border)] flex items-center gap-3"
              >
                <div className="w-8 h-8 rounded-lg bg-stone/60 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-ink-soft" />
                </div>
                <span className="text-xs font-medium text-ink truncate flex-1">{p.name}</span>
                <span className="text-[11px] text-[var(--demo-muted)]">{p.city}</span>
                <Badge variant="partnerHealth" value={p.health} />
                <span className="text-[11px] font-medium text-ink">{p.score}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
