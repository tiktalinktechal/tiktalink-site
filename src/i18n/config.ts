export const locales = ["en", "fr", "de", "es", "pt", "sv", "tr", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookieName = "TIKTALINK_LOCALE";

export const localeMeta: Record<
  Locale,
  {
    label: string;
    nativeName: string;
    flag: string;
    dir: "ltr" | "rtl";
    hreflang: string;
  }
> = {
  en: { label: "EN", nativeName: "English", flag: "EN", dir: "ltr", hreflang: "en" },
  fr: { label: "FR", nativeName: "Français", flag: "FR", dir: "ltr", hreflang: "fr" },
  de: { label: "DE", nativeName: "Deutsch", flag: "DE", dir: "ltr", hreflang: "de" },
  es: { label: "ES", nativeName: "Español", flag: "ES", dir: "ltr", hreflang: "es" },
  pt: { label: "PT", nativeName: "Português", flag: "PT", dir: "ltr", hreflang: "pt" },
  sv: { label: "SV", nativeName: "Svenska", flag: "SV", dir: "ltr", hreflang: "sv" },
  tr: { label: "TR", nativeName: "Türkçe", flag: "TR", dir: "ltr", hreflang: "tr" },
  ar: { label: "AR", nativeName: "العربية", flag: "AR", dir: "rtl", hreflang: "ar" },
};

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(value && locales.includes(value as Locale));
}

export function localizedPath(locale: Locale, pathname = "") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`;
}

export function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split("/");
  if (isLocale(segments[1])) {
    const rest = `/${segments.slice(2).join("/")}`;
    return rest === "/" ? "" : rest;
  }

  return pathname === "/" ? "" : pathname;
}
