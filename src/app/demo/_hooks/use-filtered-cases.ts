import { useMemo } from "react";
import { useDemoStore } from "../_lib/store";
import { useDemoData } from "./use-demo-data";
import { priorityWeight } from "../_lib/utils";
import type { PatientCase } from "../_lib/types";

/** Returns cases filtered by queueFilter + search, sorted by priority. */
export function useFilteredCases(): PatientCase[] {
  const { cases } = useDemoData();
  const filter = useDemoStore((s) => s.queueFilter);
  const search = useDemoStore((s) => s.search);

  return useMemo(() => {
    let filtered = cases;

    // Apply queue filter
    switch (filter) {
      case "hot":
        filtered = filtered.filter(
          (c) => c.priority === "critique" || c.priority === "haute"
        );
        break;
      case "blocked":
        filtered = filtered.filter((c) => c.blocked);
        break;
      case "today":
        filtered = filtered.filter((c) => c.dueLabel.includes("Aujourd'hui"));
        break;
    }

    // Apply search
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.patient.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.program.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q)
      );
    }

    // Sort by priority (most urgent first)
    return [...filtered].sort(
      (a, b) => priorityWeight(b.priority) - priorityWeight(a.priority)
    );
  }, [cases, filter, search]);
}
