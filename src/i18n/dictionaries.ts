import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  en: () => import("../../messages/en.json").then((module) => module.default),
  fr: () => import("../../messages/fr.json").then((module) => module.default),
  de: () => import("../../messages/de.json").then((module) => module.default),
  es: () => import("../../messages/es.json").then((module) => module.default),
  pt: () => import("../../messages/pt.json").then((module) => module.default),
  sv: () => import("../../messages/sv.json").then((module) => module.default),
  tr: () => import("../../messages/tr.json").then((module) => module.default),
  ar: () => import("../../messages/ar.json").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;

