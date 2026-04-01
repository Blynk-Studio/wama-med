import { useMemo } from "react";
import { useDemoStore } from "../_lib/store";
import { caseMatchesSearch, normalizeSearchQuery, scopeDataToCaseIds } from "../_lib/utils";
import { useDemoData } from "./use-demo-data";

export function useSearchScopedData() {
  const data = useDemoData();
  const search = useDemoStore((s) => s.search);

  return useMemo(() => {
    const query = normalizeSearchQuery(search);

    if (!query) {
      return {
        data,
        searchActive: false,
        visibleCaseIds: new Set(data.cases.map((c) => c.id)),
      };
    }

    const matchingCases = data.cases.filter((c) => caseMatchesSearch(c, query));
    const visibleCaseIds = new Set(matchingCases.map((c) => c.id));

    return {
      data: scopeDataToCaseIds(data, visibleCaseIds),
      searchActive: true,
      visibleCaseIds,
    };
  }, [data, search]);
}
