"use client";

import { Handshake, Building2, Hotel, Car, Shield, Star } from "lucide-react";
import { useSearchScopedData } from "../_hooks/use-search-scoped-data";
import { SupportStrip } from "./SupportStrip";
import { Badge } from "./Badge";
import { EmptyState } from "./EmptyState";
import { FocusPanel } from "./FocusPanel";
import type { PartnerType } from "../_lib/types";

const TYPE_ICONS: Record<PartnerType, typeof Building2> = {
  Clinique: Building2,
  Hebergement: Hotel,
  Transport: Car,
  Assureur: Shield,
};

export function PartnersView() {
  const { data, searchActive } = useSearchScopedData();

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
          { label: "Réseau actif", value: data.partners.length, icon: <Handshake size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "Fiables", value: solide, icon: <Star size={18} className="text-emerald-600" />, accent: "#ecfdf5" },
          { label: "A surveiller", value: attention, icon: <Shield size={18} className="text-amber-600" />, accent: "#fef3c7" },
        ]}
      />

      {/* Top 4 — Featured grid */}
      <FocusPanel panelId="partnerPanel" className="p-4 md:p-5">
        {data.partners.length === 0 ? (
          <EmptyState message={searchActive ? "Aucun partenaire ne correspond à cette recherche." : "Aucun partenaire visible."} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {top4.map((p) => {
              const Icon = TYPE_ICONS[p.type];
              return (
                <div
                  key={p.id}
                  className="demo-card bg-white rounded-2xl p-4 md:p-5 border border-[var(--demo-border)]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-stone/60 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-ink-soft" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-ink truncate">{p.name}</h3>
                      <p className="text-[13px] text-[var(--demo-muted)] mt-0.5">{p.type} · {p.city}</p>
                    </div>
                    <Badge variant="partnerHealth" value={p.health} />
                  </div>
                  <p className="text-[13px] text-[var(--demo-muted)] leading-relaxed mb-3">{p.note}</p>
                  <div className="flex items-center gap-3 text-[13px] flex-wrap">
                    <span className="flex items-center gap-1 text-ink">
                      <Star size={13} className="text-brass" />
                      <span className="font-medium">{p.score}</span>
                    </span>
                    <span className="text-[var(--demo-muted)]">{p.load}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </FocusPanel>

      {/* Remaining — Compact list */}
      {rest.length > 0 && (
        <FocusPanel panelId="partnerPanel" className="p-4 md:p-5">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-ink">Autres partenaires</h3>
            {rest.map((p) => {
              const Icon = TYPE_ICONS[p.type];
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl p-4 border border-[var(--demo-border)] flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-xl bg-stone/60 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-ink-soft" />
                  </div>
                  <span className="text-sm font-medium text-ink truncate flex-1">{p.name}</span>
                  <span className="text-[13px] text-[var(--demo-muted)]">{p.city}</span>
                  <Badge variant="partnerHealth" value={p.health} />
                  <span className="text-[13px] font-medium text-ink">{p.score}</span>
                </div>
              );
            })}
          </div>
        </FocusPanel>
      )}
    </div>
  );
}
