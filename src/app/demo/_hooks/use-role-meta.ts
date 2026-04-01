"use client";

import { roles } from "../_lib/data";
import { useDemoStore } from "../_lib/store";
import type { PanelId, RoleMeta } from "../_lib/types";

export function useRoleMeta(): RoleMeta {
  const role = useDemoStore((s) => s.role);
  return roles.find((item) => item.key === role)!;
}

export function useRoleFocus(panelId: PanelId): boolean {
  const roleMeta = useRoleMeta();
  return roleMeta.focusPanels.includes(panelId);
}
