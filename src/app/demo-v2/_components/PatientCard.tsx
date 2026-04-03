"use client";

import { useState, useEffect } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Calendar, User, GripVertical } from "lucide-react";
import type { Patient } from "../_lib/types";
import { cn, formatMoney, getStageColor } from "../_lib/utils";
import { STAGE_META } from "../_lib/data";
import { useDemoV2Store } from "../_lib/store";
import { Badge } from "./Badge";

interface PatientCardProps {
  patient: Patient;
  /** True when this card was just dropped into a new column */
  justMoved?: boolean;
}

export function PatientCard({ patient, justMoved }: PatientCardProps) {
  const openPatient = useDemoV2Store((s) => s.openPatient);
  const patientStages = useDemoV2Store((s) => s.patientStages);
  const currentStage = patientStages[patient.id] ?? patient.stage;
  const stageColor = getStageColor(currentStage);
  const stageMeta = STAGE_META[currentStage];

  /* Avoid dnd-kit aria-describedby SSR/client mismatch */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: patient.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 50 : ("auto" as const),
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout={!isDragging}
      transition={
        !isDragging
          ? { layout: { type: "spring", stiffness: 400, damping: 28 } }
          : undefined
      }
      className="relative group"
    >
      {/* Drop confirmation pulse ring */}
      {justMoved && (
        <div
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none v2-drop-pulse"
          style={{ borderColor: stageColor.color }}
        />
      )}

      {/* Clickable card body */}
      <div
        className={cn(
          "v2-card p-4 cursor-pointer select-none",
          isDragging && "shadow-none",
        )}
        onClick={() => openPatient(patient.id)}
      >
        {/* Drag handle — top-right grip, only visible on hover */}
        <div
          className="absolute top-2.5 right-2.5 w-6 h-6 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-ink-soft/30 hover:text-ink-soft/50 hover:bg-stone/50 z-10"
          {...(mounted ? attributes : {})}
          {...(mounted ? listeners : {})}
          onClick={(e) => e.stopPropagation()}
        >
          <GripVertical className="w-3.5 h-3.5" strokeWidth={1.5} />
        </div>

        {/* Header: name + flag */}
        <div className="flex items-start justify-between mb-2.5">
          <div className="flex items-center gap-2 min-w-0 pr-6">
            <span className="text-base leading-none">{patient.countryFlag}</span>
            <h4 className="text-[15px] font-semibold text-ink truncate">
              {patient.name}
            </h4>
          </div>
        </div>

        {/* Summary */}
        <p className="text-[13px] text-ink-soft/70 leading-relaxed mb-3 line-clamp-2">
          {patient.summary}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-xs text-ink-soft/50">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" strokeWidth={1.5} />
            {patient.nextDate}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3 h-3" strokeWidth={1.5} />
            {patient.assignedTo}
          </span>
        </div>

        {/* Value */}
        <div className="mt-3 pt-3 border-t border-[rgba(28,20,16,0.05)] flex items-center justify-between">
          <span className="text-xs font-semibold text-ink-soft/50">
            {formatMoney(patient.valueMad)}
          </span>
          <Badge
            label={stageMeta.label}
            color={stageColor.text}
            bg={stageColor.bg}
          />
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Static version for the DragOverlay — no sortable hooks, just visual.
 */
export function PatientCardOverlay({ patient }: { patient: Patient }) {
  const patientStages = useDemoV2Store((s) => s.patientStages);
  const currentStage = patientStages[patient.id] ?? patient.stage;
  const stageColor = getStageColor(currentStage);
  const stageMeta = STAGE_META[currentStage];

  return (
    <div className="v2-drag-overlay p-4 w-full max-w-[280px]">
      <div className="flex items-start justify-between mb-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-base leading-none">{patient.countryFlag}</span>
          <h4 className="text-[15px] font-semibold text-ink truncate">
            {patient.name}
          </h4>
        </div>
      </div>
      <p className="text-[13px] text-ink-soft/70 leading-relaxed mb-3 line-clamp-2">
        {patient.summary}
      </p>
      <div className="flex items-center gap-3 text-xs text-ink-soft/50">
        <span className="flex items-center gap-1">
          <Calendar className="w-3 h-3" strokeWidth={1.5} />
          {patient.nextDate}
        </span>
        <span className="flex items-center gap-1">
          <User className="w-3 h-3" strokeWidth={1.5} />
          {patient.assignedTo}
        </span>
      </div>
      <div className="mt-3 pt-3 border-t border-[rgba(28,20,16,0.05)] flex items-center justify-between">
        <span className="text-xs font-semibold text-ink-soft/50">
          {formatMoney(patient.valueMad)}
        </span>
        <Badge
          label={stageMeta.label}
          color={stageColor.text}
          bg={stageColor.bg}
        />
      </div>
    </div>
  );
}
