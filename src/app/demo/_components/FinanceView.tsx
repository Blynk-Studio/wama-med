"use client";

import { Wallet, ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useSearchScopedData } from "../_hooks/use-search-scoped-data";
import { useDemoStore } from "../_lib/store";
import { KpiCard } from "./KpiCard";
import { SupportStrip } from "./SupportStrip";
import { Badge } from "./Badge";
import { formatMoney, getCommissionStatusColor } from "../_lib/utils";
import { FocusPanel } from "./FocusPanel";
import { EmptyState } from "./EmptyState";

export function FinanceView() {
  const { data, searchActive } = useSearchScopedData();
  const openCase = useDemoStore((s) => s.openCase);

  const totalInvoiced = data.invoices.reduce((s, i) => s + i.amountMad, 0);
  const confirmed = data.invoices
    .filter((i) => i.status === "confirme")
    .reduce((s, i) => s + i.amountMad, 0);
  const pending = data.invoices
    .filter((i) => i.status !== "confirme")
    .reduce((s, i) => s + i.amountMad, 0);
  const totalCommissions = data.commissions.reduce((s, c) => s + c.amountMad, 0);

  return (
    <div className="space-y-5">
      <SupportStrip
        items={[
          { label: "Facturation visible", value: formatMoney(totalInvoiced), icon: <Wallet size={18} className="text-teal" />, accent: "var(--color-stone)" },
          { label: "Encaissé", value: formatMoney(confirmed), icon: <ArrowDownCircle size={18} className="text-emerald-600" />, accent: "#ecfdf5" },
          { label: "Commissions", value: formatMoney(totalCommissions), icon: <ArrowUpCircle size={18} className="text-brass" />, accent: "#fef3c7" },
        ]}
      />

      {/* KPI trio */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <KpiCard label="Encaissé" value={formatMoney(confirmed)} accentColor="var(--demo-success)" />
        <KpiCard label="En attente" value={formatMoney(pending)} accentColor="var(--demo-warning)" />
        <KpiCard label="Commissions dues" value={formatMoney(totalCommissions)} accentColor="var(--color-brass)" />
      </div>

      <FocusPanel panelId="financePanel" className="p-4 md:p-5">
        <h3 className="text-base font-semibold text-ink mb-4">Factures</h3>
        <div className="space-y-3">
          {data.invoices.length === 0 ? (
            <EmptyState message={searchActive ? "Aucune facture ne correspond à cette recherche." : "Aucune facture."} />
          ) : (
            data.invoices.map((inv) => {
              const linkedCase = data.cases.find((c) => c.id === inv.caseId);
              return (
                <button
                  key={inv.id}
                  onClick={() => openCase(inv.caseId)}
                  className="demo-card w-full text-left bg-white rounded-2xl p-4 md:p-5 border border-[var(--demo-border)] flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-brass"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone/60 flex items-center justify-center shrink-0">
                    <Wallet size={18} className="text-ink-soft" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[15px] font-semibold text-ink truncate">{inv.title}</span>
                      <Badge variant="invoiceStatus" value={inv.status} />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap text-[13px] text-[var(--demo-muted)]">
                      <span>{inv.id}</span>
                      <span>·</span>
                      <span>{inv.age}</span>
                      {linkedCase && (
                        <>
                          <span>·</span>
                          <span className="text-teal font-medium">{linkedCase.patient}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <span className="text-[15px] font-semibold text-ink tabular-nums whitespace-nowrap">
                    {formatMoney(inv.amountMad)}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </FocusPanel>

      <FocusPanel panelId="financePanel" className="p-4 md:p-5">
        <h3 className="text-base font-semibold text-ink mb-4">Commissions</h3>
        <div className="space-y-3">
          {data.commissions.length === 0 ? (
            <EmptyState message={searchActive ? "Aucune commission ne correspond à cette recherche." : "Aucune commission."} />
          ) : (
            data.commissions.map((comm) => {
              const partner = data.partners.find((p) => p.id === comm.partnerId);
              const colors = getCommissionStatusColor(comm.status);
              return (
                <div
                  key={comm.id}
                  className="bg-white rounded-2xl p-4 md:p-5 border border-[var(--demo-border)] flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-stone/60 flex items-center justify-center shrink-0">
                    <ArrowUpCircle size={18} className="text-brass" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[15px] font-semibold text-ink truncate block">{comm.title}</span>
                    <span className="text-[13px] text-[var(--demo-muted)]">
                      {partner?.name || comm.partnerId}
                    </span>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-lg ${colors.bg} ${colors.text}`}>
                    {comm.status === "confirmee" ? "Confirmée" : "A recevoir"}
                  </span>
                  <span className="text-[15px] font-semibold text-ink tabular-nums whitespace-nowrap">
                    {formatMoney(comm.amountMad)}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </FocusPanel>
    </div>
  );
}
