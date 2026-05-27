import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { insights } from "@/data/insights";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.insights.pageTitle,
    description: dictionary.insights.description,
    alternates: {
      canonical: `https://tiktalink.com/${locale}/insights`,
    },
    openGraph: {
      title: dictionary.insights.pageTitle,
      description: dictionary.insights.description,
      url: `https://tiktalink.com/${locale}/insights`,
      siteName: "Tiktalink",
      type: "website",
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: dictionary.insights.pageTitle }],
    },
  };
}

export default async function InsightsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  return (
    <>
      <Navbar dictionary={dictionary} locale={typedLocale} />
      <main id="main-content" className="bg-[var(--color-background-soft)] px-5 py-28 sm:px-8">
        <section className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-semibold tracking-[-0.045em] text-[var(--color-text-primary)]">
              {dictionary.insights.title}
            </h1>
            <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
              {dictionary.insights.description}
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {insights.map((insight, index) => {
              const translated = dictionary.insights.items[index];
              return (
                <Link
                  key={insight.slug}
                  href={`/${typedLocale}/insights/${insight.slug}`}
                  className="rounded-3xl border border-[var(--color-border)] bg-white p-7 shadow-[0_18px_58px_rgba(11,16,32,0.06)] transition hover:-translate-y-1 hover:border-[var(--color-water)]"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-water-dark)]">
                    {translated.category}
                  </span>
                  <h2 className="mt-5 text-2xl font-semibold text-[var(--color-text-primary)]">
                    {translated.title}
                  </h2>
                  <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
                    {translated.excerpt}
                  </p>
                  <p className="mt-6 text-sm text-[var(--color-text-muted)]">
                    {insight.date} <span aria-hidden="true">/</span> {translated.readingTime}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
