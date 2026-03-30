"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

const LocaleContext = createContext<{
  locale: Locale;
  dictionary: Dictionary;
} | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocaleDictionary() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error("useLocaleDictionary must be used within LocaleProvider.");
  }

  return context;
}
