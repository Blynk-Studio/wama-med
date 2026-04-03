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
  justMoved?: boolean;
}

export function PatientCard({ patient, justMoved }: PatientCardProps) {
  const openPatient = useDemoV2Store((s) => s.openPatient);
  const patientStages = useDemoV2Store((s) => s.patientStages);
  const currentStage = patientStages[patient.id] ?? patient.stage;
  const stageColor = getStageColor(currentStage);
  const stageMeta = STAGE_META[currentStage];

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
      className="relative group cursor-grab active:cursor-grabbing"
      {...(mounted ? attributes : {})}
      {...(mounted ? listeners : {})}
    >
      {justMoved && (
        <div
          className="absolute inset-0 rounded-2xl border-2 pointer-events-none v2-drop-pulse"
          style={{ borderColor: stageColor.color }}
        />
      )}

      <div
        className={cn(
          "v2-card p-6 select-none",
          isDragging && "shadow-none opacity-50",
        )}
        onClick={() => {
          if (!isDragging) openPatient(patient.id);
        }}
      >
        {/* Drag grip indicator */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-60 transition-opacity text-ink-soft/50 pointer-events-none">
          <GripVertical className="w-4 h-4" strokeWidth={1.5} />
        </div>

        {/* Name + flag */}
        <div className="flex items-center gap-2.5 mb-3 pr-8">
          <span className="text-lg leading-none">{patient.countryFlag}</span>
          <h4 className="text-base font-semibold text-ink truncate">
            {patient.name}
          </h4>
        </div>

        {/* Summary */}
        <p className="text-[15px] text-ink-soft/80 leading-relaxed mb-4 line-clamp-2">
          {patient.summary}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 text-sm text-ink-soft/70">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
            {patient.nextDate}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" strokeWidth={1.5} />
            {patient.assignedTo}
          </span>
        </div>

        {/* Value + stage */}
        <div className="mt-4 pt-4 border-t border-[rgba(28,20,16,0.06)] flex items-center justify-between">
          <span className="text-sm font-semibold text-ink-soft/70">
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

export function PatientCardOverlay({ patient }: { patient: Patient }) {
  const patientStages = useDemoV2Store((s) => s.patientStages);
  const currentStage = patientStages[patient.id] ?? patient.stage;
  const stageColor = getStageColor(currentStage);
  const stageMeta = STAGE_META[currentStage];

  return (
    <div className="v2-drag-overlay p-6 w-full max-w-[300px]">
      <div className="flex items-center gap-2.5 mb-3">
        <span className="text-lg leading-none">{patient.countryFlag}</span>
        <h4 className="text-base font-semibold text-ink truncate">
          {patient.name}
        </h4>
      </div>
      <p className="text-[15px] text-ink-soft/80 leading-relaxed mb-4 line-clamp-2">
        {patient.summary}
      </p>
      <div className="flex items-center gap-4 text-sm text-ink-soft/70">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
          {patient.nextDate}
        </span>
        <span className="flex items-center gap-1.5">
          <User className="w-3.5 h-3.5" strokeWidth={1.5} />
          {patient.assignedTo}
        </span>
      </div>
      <div className="mt-4 pt-4 border-t border-[rgba(28,20,16,0.06)] flex items-center justify-between">
        <span className="text-sm font-semibold text-ink-soft/70">
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
