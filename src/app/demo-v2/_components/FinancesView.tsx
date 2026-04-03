"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  FileText,
} from "lucide-react";
import { useDemoV2Store } from "../_lib/store";
import { useV2Data } from "../_hooks/use-v2-data";
import type { RevenuePeriod, InvoiceStatus } from "../_lib/types";
import { cn, formatMoney, getInvoiceColor } from "../_lib/utils";
import { StatCard } from "./StatCard";
import { Badge } from "./Badge";

const PERIODS: { key: RevenuePeriod; label: string }[] = [
  { key: "daily", label: "Today" },
  { key: "weekly", label: "Week" },
  { key: "monthly", label: "Month" },
  { key: "yearly", label: "Year" },
];

const STATUS_LABELS: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
};

/* ─── Stagger variants ─── */
const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function FinancesView() {
  const activePeriod = useDemoV2Store((s) => s.activePeriod);
  const setPeriod = useDemoV2Store((s) => s.setPeriod);
  const { invoices, revenueSnapshots } = useV2Data();

  const snapshot = revenueSnapshots[activePeriod];

  return (
    <div>
      {/* Page header + period toggle */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="font-fraunces text-2xl md:text-3xl font-bold text-ink tracking-tight mb-1">
            Finances
          </h1>
          <p className="text-sm text-ink-soft/50">
            Revenue overview and invoice tracking
          </p>
        </div>

        {/* Period toggle */}
        <div className="flex items-center gap-1 bg-stone/50 rounded-xl p-1">
          {PERIODS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setPeriod(key)}
              className={cn(
                "relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-150",
                activePeriod === key
                  ? "text-teal"
                  : "text-ink-soft/50 hover:text-ink-soft",
              )}
            >
              {activePeriod === key && (
                <motion.div
                  layoutId="v2-period-indicator"
                  className="absolute inset-0 bg-white rounded-lg shadow-[0_1px_3px_rgba(53,31,22,0.06)]"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Revenue"
          value={snapshot.revenue}
          accent="#2D8659"
          icon={<TrendingUp className="w-4 h-4" />}
        />
        <StatCard
          label="Expenses"
          value={snapshot.expenses}
          accent="#C24A4A"
          icon={<TrendingDown className="w-4 h-4" />}
        />
        <StatCard
          label="Profit"
          value={snapshot.profit}
          accent="#0B4042"
          icon={<Wallet className="w-4 h-4" />}
        />
        <StatCard
          label="Invoices"
          value={snapshot.invoiceCount}
          format="number"
          accent="#B8903A"
          icon={<FileText className="w-4 h-4" />}
        />
      </div>

      {/* Invoice list */}
      <div>
        <h2 className="text-lg font-semibold text-ink mb-4">
          Recent Invoices
        </h2>
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3"
        >
          {invoices.map((inv, i) => {
            const statusColor = getInvoiceColor(inv.status);
            return (
              <motion.div
                key={inv.id}
                variants={i < 8 ? itemVariants : undefined}
                className="v2-card-static p-4 flex items-center gap-4"
              >
                {/* Invoice info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[15px] font-semibold text-ink truncate">
                      {inv.patientName}
                    </span>
                    <span className="text-xs text-ink-soft/40 font-medium">
                      {inv.id}
                    </span>
                  </div>
                  <p className="text-[13px] text-ink-soft/60 truncate">
                    {inv.description}
                  </p>
                </div>

                {/* Date */}
                <span className="text-xs text-ink-soft/40 font-medium hidden sm:block whitespace-nowrap">
                  {inv.date}
                </span>

                {/* Amount */}
                <span className="text-sm font-bold text-ink whitespace-nowrap">
                  {formatMoney(inv.amountMad)}
                </span>

                {/* Status badge */}
                <Badge
                  label={STATUS_LABELS[inv.status]}
                  color={statusColor.text}
                  bg={statusColor.bg}
                  dot
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
