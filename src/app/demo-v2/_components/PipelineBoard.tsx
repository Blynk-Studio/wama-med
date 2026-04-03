"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  useDroppable,
  closestCenter,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { motion } from "framer-motion";
import type { Patient, PipelineStage } from "../_lib/types";
import { PIPELINE_STAGES } from "../_lib/types";
import { STAGE_META } from "../_lib/data";
import { useDemoV2Store } from "../_lib/store";
import { useV2Data } from "../_hooks/use-v2-data";
import { useToast } from "./Toast";
import { PatientCard, PatientCardOverlay } from "./PatientCard";
import { cn } from "../_lib/utils";

/* ─── Stagger variants for card list ─── */
const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function PipelineBoard() {
  const { patients, patientsByStage } = useV2Data();
  const movePatient = useDemoV2Store((s) => s.movePatient);
  const { showToast } = useToast();

  /* Defer DndContext to client to avoid aria-describedby hydration mismatch */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<PipelineStage | null>(null);
  const [justMovedId, setJustMovedId] = useState<string | null>(null);

  const activePatient = useMemo(
    () => patients.find((p) => p.id === activeId) ?? null,
    [patients, activeId],
  );

  /* Sensors: mouse + touch (8px activation) + keyboard for a11y */
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setJustMovedId(null);
  }, []);

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const overId = event.over?.id as string | undefined;
    if (overId && PIPELINE_STAGES.includes(overId as PipelineStage)) {
      setOverColumn(overId as PipelineStage);
    } else {
      setOverColumn(null);
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveId(null);
      setOverColumn(null);

      if (!over) return;

      const patientId = active.id as string;
      let targetStage: PipelineStage | null = null;

      // Dropped on a column droppable
      const overId = over.id as string;
      if (PIPELINE_STAGES.includes(overId as PipelineStage)) {
        targetStage = overId as PipelineStage;
      }

      if (!targetStage) return;

      const patient = patients.find((p) => p.id === patientId);
      if (!patient) return;

      const currentStage =
        useDemoV2Store.getState().patientStages[patientId] ?? patient.stage;
      if (currentStage === targetStage) return;

      movePatient(patientId, targetStage);
      setJustMovedId(patientId);

      const fromLabel = STAGE_META[currentStage].label;
      const toLabel = STAGE_META[targetStage].label;
      showToast(`${patient.name} moved to ${toLabel}`);

      // Clear the pulse after animation
      setTimeout(() => setJustMovedId(null), 700);
    },
    [patients, movePatient, showToast],
  );

  return (
    <div>
      {/* Page header */}
      <div className="mb-6">
        <h1 className="font-fraunces text-2xl md:text-3xl font-bold text-ink tracking-tight mb-1">
          Patient Pipeline
        </h1>
        <p className="text-sm text-ink-soft/50">
          Drag patients between stages to update their journey
        </p>
      </div>

      {/* Kanban board — only render after mount to avoid dnd-kit hydration mismatch */}
      {mounted && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="v2-pipeline-grid">
            {PIPELINE_STAGES.map((stage) => (
              <StageColumn
                key={stage}
                stage={stage}
                patients={patientsByStage[stage]}
                isOverTarget={overColumn === stage}
                justMovedId={justMovedId}
              />
            ))}
          </div>

          <DragOverlay dropAnimation={null}>
            {activePatient ? (
              <PatientCardOverlay patient={activePatient} />
            ) : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}

/* ─── Individual stage column ─── */
function StageColumn({
  stage,
  patients,
  isOverTarget,
  justMovedId,
}: {
  stage: PipelineStage;
  patients: Patient[];
  isOverTarget: boolean;
  justMovedId: string | null;
}) {
  const meta = STAGE_META[stage];
  const { setNodeRef } = useDroppable({ id: stage });

  const patientIds = useMemo(() => patients.map((p) => p.id), [patients]);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-col min-h-[200px] rounded-[20px] p-3 transition-colors duration-150",
        isOverTarget && "v2-drop-active",
      )}
    >
      {/* Column header */}
      <div className="flex items-center gap-2 px-2 py-2.5 mb-1">
        <span
          className="v2-stage-dot"
          style={{ backgroundColor: meta.color }}
        />
        <span className="text-sm font-semibold text-ink">{meta.label}</span>
        <span
          className="ml-auto text-xs font-semibold rounded-full px-2 py-0.5"
          style={{
            backgroundColor: meta.bgTint,
            color: meta.color,
          }}
        >
          {patients.length}
        </span>
      </div>

      {/* Card list */}
      <SortableContext items={patientIds} strategy={verticalListSortingStrategy}>
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 flex-1"
        >
          {patients.map((patient, i) => (
            <motion.div
              key={patient.id}
              variants={i < 8 ? cardVariants : undefined}
            >
              <PatientCard
                patient={patient}
                justMoved={justMovedId === patient.id}
              />
            </motion.div>
          ))}
        </motion.div>
      </SortableContext>
    </div>
  );
}
