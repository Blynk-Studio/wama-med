"use client";

import { useMemo } from "react";
import { useDemoV2Store } from "../_lib/store";
import { patients, invoices, partners, revenueSnapshots } from "../_lib/data";
import type { Patient, PipelineStage } from "../_lib/types";

/**
 * Returns demo data with live stage overrides from the store.
 * Patients get their `stage` field patched to reflect drag-and-drop moves.
 */
export function useV2Data() {
  const patientStages = useDemoV2Store((s) => s.patientStages);

  const livePatients = useMemo(
    () =>
      patients.map((p): Patient => {
        const overrideStage = patientStages[p.id];
        return overrideStage && overrideStage !== p.stage
          ? { ...p, stage: overrideStage }
          : p;
      }),
    [patientStages],
  );

  const patientsByStage = useMemo(() => {
    const map: Record<PipelineStage, Patient[]> = {
      inquiry: [],
      coordination: [],
      treatment: [],
      recovery: [],
      billing: [],
    };
    for (const p of livePatients) {
      map[p.stage].push(p);
    }
    return map;
  }, [livePatients]);

  return {
    patients: livePatients,
    patientsByStage,
    invoices,
    partners,
    revenueSnapshots,
  };
}
