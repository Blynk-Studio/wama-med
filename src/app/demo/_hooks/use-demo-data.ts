import { useMemo } from "react";
import { useDemoStore } from "../_lib/store";
import { baseData } from "../_lib/data";
import { applyScenario } from "../_lib/scenarios";
import type { DemoData } from "../_lib/types";

/** Returns the current dataset with scenario mutations applied. */
export function useDemoData(): DemoData {
  const scenario = useDemoStore((s) => s.scenario);
  return useMemo(() => applyScenario(baseData, scenario), [scenario]);
}
