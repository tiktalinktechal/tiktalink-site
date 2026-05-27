import type { MetadataRoute } from "next";
import { industryPages } from "@/data/industryPages";
import { insights } from "@/data/insights";
import { localeMeta, locales } from "@/i18n/config";

const baseUrl = "https://tiktalink.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/insights",
    "/digital-evolution-engine",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
  ];
  const routes = locales.flatMap((locale) => [
    ...staticPaths.map((path) => `/${locale}${path}`),
    ...insights.map((insight) => `/${locale}/insights/${insight.slug}`),
    ...industryPages.map((industry) => `/${locale}/industries/${industry.slug}`),
  ]);

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date("2026-05-27"),
    changeFrequency: route.includes("/insights/") ? "monthly" : "weekly",
    priority: route === "/en" ? 1 : route.includes("privacy") || route.includes("terms") || route.includes("cookie") ? 0.3 : 0.7,
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [
          localeMeta[locale].hreflang,
          `${baseUrl}/${locale}${route.replace(/^\/(en|fr|de|es|pt|sv|tr|ar)/, "")}`,
        ])
      ),
    },
  }));
}
