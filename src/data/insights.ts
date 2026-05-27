export const insights = [
  {
    slug: "ai-ready-website",
    title: "Why Every Business Needs an AI-Ready Website",
    category: "AI Readiness",
    excerpt:
      "A modern website must be structured for search, trust, automation, and the next generation of AI discovery.",
    date: "2026-05-26",
    readingTime: "4 min read",
  },
  {
    slug: "website-vs-digital-infrastructure",
    title: "The Difference Between a Website and Digital Infrastructure",
    category: "Digital Infrastructure",
    excerpt:
      "A website is a surface. Digital infrastructure connects visibility, conversion, operations, data, and intelligence.",
    date: "2026-05-26",
    readingTime: "5 min read",
  },
  {
    slug: "local-seo-growth",
    title: "How Local SEO Helps Clinics, Restaurants, and Service Businesses Grow",
    category: "Google Visibility",
    excerpt:
      "Local discovery depends on technical foundations, Google Business quality, trust signals, and conversion paths.",
    date: "2026-05-26",
    readingTime: "4 min read",
  },
  {
    slug: "manual-to-intelligent-systems",
    title: "From Manual Operations to Intelligent Business Systems",
    category: "Automation",
    excerpt:
      "Connected workflows reduce repetitive work and prepare the business for practical AI-enabled operations.",
    date: "2026-05-26",
    readingTime: "5 min read",
  },
] as const;

export type InsightSlug = (typeof insights)[number]["slug"];

export function getInsight(slug: string) {
  return insights.find((insight) => insight.slug === slug);
}

