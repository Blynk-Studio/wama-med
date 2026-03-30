export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return value === "fr" || value === "en";
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : "fr";
}

function stripLocalePrefix(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return "";
  if (!isLocale(segments[0])) return pathname === "/" ? "" : pathname;

  const rest = segments.slice(1).join("/");
  return rest ? `/${rest}` : "";
}

export function localizePath(locale: Locale, href: string) {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/") return `/${locale}`;

  const path = stripLocalePrefix(href);
  return path ? `/${locale}${path}` : `/${locale}`;
}

export function swapLocaleInPathname(pathname: string, locale: Locale) {
  const path = stripLocalePrefix(pathname);
  return path ? `/${locale}${path}` : `/${locale}`;
}

export function localeOpenGraph(locale: Locale) {
  return locale === "fr" ? "fr_MA" : "en_US";
}
