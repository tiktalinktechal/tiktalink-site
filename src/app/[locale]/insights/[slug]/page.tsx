import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getInsight, insights } from "@/data/insights";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) => insights.map((insight) => ({ locale, slug: insight.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const insight = getInsight(slug);
  if (!insight) notFound();
  const dictionary = await getDictionary(locale);
  const index = insights.findIndex((item) => item.slug === slug);
  const translated = dictionary.insights.items[index];

  return {
    title: `${translated.title} | ${dictionary.insights.pageTitle}`,
    description: translated.excerpt,
    alternates: {
      canonical: `https://tiktalink.com/${locale}/insights/${slug}`,
    },
    openGraph: {
      title: translated.title,
      description: translated.excerpt,
      url: `https://tiktalink.com/${locale}/insights/${slug}`,
      siteName: "Tiktalink",
      type: "article",
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: translated.title }],
    },
  };
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const insight = getInsight(slug);
  if (!insight) notFound();
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const index = insights.findIndex((item) => item.slug === slug);
  const translated = dictionary.insights.items[index];
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: translated.title,
    description: translated.excerpt,
    datePublished: insight.date,
    dateModified: insight.date,
    author: {
      "@type": "Organization",
      name: "Tiktalink",
    },
    publisher: {
      "@type": "Organization",
      name: "Tiktalink",
      url: "https://tiktalink.com",
    },
    mainEntityOfPage: `https://tiktalink.com/${locale}/insights/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navbar dictionary={dictionary} locale={typedLocale} />
      <main id="main-content" className="bg-[var(--color-background-soft)] px-5 py-28 sm:px-8">
        <article className="mx-auto max-w-3xl rounded-3xl border border-[var(--color-border)] bg-white p-7 shadow-[0_24px_90px_rgba(11,16,32,0.08)] sm:p-10">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-water-dark)]">
            {translated.category}
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] sm:text-5xl">
            {translated.title}
          </h1>
          <p className="mt-5 text-sm text-[var(--color-text-muted)]">
            {insight.date} <span aria-hidden="true">/</span> {translated.readingTime}
          </p>
          <p className="mt-8 text-xl leading-9 text-[var(--color-text-secondary)]">
            {translated.excerpt}
          </p>
        </article>
      </main>
      <Footer dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
