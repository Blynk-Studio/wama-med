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
import { motion, AnimatePresence } from "framer-motion";
import { GripVertical } from "lucide-react";
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
      <div className="mb-8">
        <h1 className="font-fraunces text-3xl md:text-4xl font-bold text-ink tracking-tight mb-2">
          Patient Pipeline
        </h1>
        <div className="flex items-center gap-2.5 text-base text-ink-soft/60">
          <span>Drag patients between stages to update their journey</span>
          <AnimatePresence>
            {!activeId && (
              <motion.span
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5 bg-teal/8 text-teal rounded-full px-3 py-1 text-sm font-medium"
              >
                <GripVertical className="w-3.5 h-3.5" strokeWidth={2} />
                Try it — grab any card
              </motion.span>
            )}
          </AnimatePresence>
        </div>
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
        "flex flex-col min-h-[200px] rounded-2xl p-3 transition-colors duration-150 bg-stone/30 border border-[rgba(28,20,16,0.04)]",
        isOverTarget && "v2-drop-active bg-brass/5 border-brass/20",
      )}
    >
      {/* Column header */}
      <div
        className="flex items-center gap-2.5 px-3 py-3 mb-3 rounded-xl"
        style={{ backgroundColor: meta.bgTint }}
      >
        <span
          className="v2-stage-dot"
          style={{ backgroundColor: meta.color }}
        />
        <span className="text-base font-semibold text-ink">{meta.label}</span>
        <span
          className="ml-auto text-sm font-bold rounded-full px-2.5 py-0.5 bg-white/60"
          style={{ color: meta.color }}
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
