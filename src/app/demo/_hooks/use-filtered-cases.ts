import { useMemo } from "react";
import { useDemoStore } from "../_lib/store";
import { useSearchScopedData } from "./use-search-scoped-data";
import { priorityWeight } from "../_lib/utils";
import type { PatientCase } from "../_lib/types";

/** Returns cases filtered by queueFilter + search, sorted by priority. */
export function useFilteredCases(): PatientCase[] {
  const {
    data: { cases },
  } = useSearchScopedData();
  const filter = useDemoStore((s) => s.queueFilter);

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

    // Sort by priority (most urgent first)
    return [...filtered].sort(
      (a, b) => priorityWeight(b.priority) - priorityWeight(a.priority)
    );
  }, [cases, filter]);
}
