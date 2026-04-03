"use client";

import { useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Calendar,
  User,
  DollarSign,
} from "lucide-react";
import { useDemoV2Store } from "../_lib/store";
import { patients, STAGE_META } from "../_lib/data";
import { formatMoney, getStageColor } from "../_lib/utils";
import { Badge } from "./Badge";
import type { PipelineStage } from "../_lib/types";
import { PIPELINE_STAGES } from "../_lib/types";

export function PatientDrawer() {
  const selectedId = useDemoV2Store((s) => s.selectedPatientId);
  const drawerOpen = useDemoV2Store((s) => s.drawerOpen);
  const closeDrawer = useDemoV2Store((s) => s.closeDrawer);
  const patientStages = useDemoV2Store((s) => s.patientStages);

  const patient = useMemo(
    () => patients.find((p) => p.id === selectedId) ?? null,
    [selectedId],
  );

  const currentStage: PipelineStage | null = patient
    ? patientStages[patient.id] ?? patient.stage
    : null;

  /* Close on Escape key */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    },
    [closeDrawer],
  );

  useEffect(() => {
    if (drawerOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    }
  }, [drawerOpen, handleKeyDown]);

  return (
    <AnimatePresence>
      {drawerOpen && patient && currentStage && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="v2-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-ink/10 backdrop-blur-[6px] z-40"
            onClick={closeDrawer}
          />

          {/* Drawer panel */}
          <motion.div
            key="v2-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white border-l border-[rgba(28,20,16,0.06)] shadow-[-4px_0_24px_rgba(53,31,22,0.08)] z-50 flex flex-col overflow-hidden v2-drawer-slide"
            role="dialog"
            aria-modal="true"
            aria-label={`Patient details: ${patient.name}`}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-5 pb-4 border-b border-[rgba(28,20,16,0.06)]">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg leading-none">
                    {patient.countryFlag}
                  </span>
                  <h2 className="text-lg font-bold text-ink truncate">
                    {patient.name}
                  </h2>
                </div>
                <p className="text-sm text-ink-soft/60">
                  {patient.country} &middot; {patient.id}
                </p>
              </div>
              <button
                onClick={closeDrawer}
                className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-stone/50 transition-colors text-ink-soft/40 hover:text-ink-soft"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body — scrollable */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {/* Stage badge */}
              <div>
                <SectionLabel>Current Stage</SectionLabel>
                <Badge
                  label={STAGE_META[currentStage].label}
                  color={getStageColor(currentStage).text}
                  bg={getStageColor(currentStage).bg}
                  dot
                />
              </div>

              {/* Stage progress bar */}
              <div>
                <SectionLabel>Journey Progress</SectionLabel>
                <div className="flex gap-1.5 mt-2">
                  {PIPELINE_STAGES.map((s) => {
                    const stageIdx = PIPELINE_STAGES.indexOf(s);
                    const currentIdx = PIPELINE_STAGES.indexOf(currentStage);
                    const isComplete = stageIdx <= currentIdx;
                    const meta = STAGE_META[s];
                    return (
                      <div
                        key={s}
                        className="flex-1 h-2 rounded-full transition-colors duration-300"
                        style={{
                          backgroundColor: isComplete
                            ? meta.color
                            : "rgba(28,20,16,0.06)",
                        }}
                        title={meta.label}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between mt-1.5">
                  {PIPELINE_STAGES.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] text-ink-soft/40 font-medium"
                    >
                      {STAGE_META[s].label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div>
                <SectionLabel>Summary</SectionLabel>
                <p className="text-sm text-ink-soft/80 leading-relaxed">
                  {patient.summary}
                </p>
              </div>

              {/* Details grid */}
              <div className="grid grid-cols-2 gap-3">
                <DetailItem
                  icon={<MapPin className="w-3.5 h-3.5" />}
                  label="Country"
                  value={patient.country}
                />
                <DetailItem
                  icon={<Calendar className="w-3.5 h-3.5" />}
                  label="Next Date"
                  value={patient.nextDate}
                />
                <DetailItem
                  icon={<User className="w-3.5 h-3.5" />}
                  label="Coordinator"
                  value={patient.assignedTo}
                />
                <DetailItem
                  icon={<DollarSign className="w-3.5 h-3.5" />}
                  label="Case Value"
                  value={formatMoney(patient.valueMad)}
                />
              </div>

              {/* Notes */}
              <div>
                <SectionLabel>Notes</SectionLabel>
                <div className="bg-stone/40 rounded-2xl p-4">
                  <p className="text-sm text-ink-soft/70 leading-relaxed whitespace-pre-wrap">
                    {patient.notes}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Helpers ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold text-ink-soft/50 uppercase tracking-wide mb-2">
      {children}
    </h3>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-stone/30 rounded-xl p-3">
      <div className="flex items-center gap-1.5 text-ink-soft/40 mb-1">
        {icon}
        <span className="text-[11px] font-medium uppercase tracking-wide">
          {label}
        </span>
      </div>
      <span className="text-sm font-semibold text-ink">{value}</span>
    </div>
  );
}
