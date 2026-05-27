import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.engine.metaTitle,
    description: dictionary.engine.metaDescription,
    alternates: {
      canonical: `https://tiktalink.com/${locale}/digital-evolution-engine`,
    },
    openGraph: {
      title: dictionary.engine.metaTitle,
      description: dictionary.engine.metaDescription,
      url: `https://tiktalink.com/${locale}/digital-evolution-engine`,
      siteName: "Tiktalink",
      type: "website",
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: dictionary.engine.metaTitle }],
    },
  };
}

export default async function DigitalEvolutionEnginePage({ params }: PageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const content = dictionary.engine;

  return (
    <>
      <Navbar dictionary={dictionary} locale={typedLocale} />
      <main id="main-content" className="bg-[var(--color-background)]">
        <section className="relative overflow-hidden px-5 pb-24 pt-32 sm:px-8">
          <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(0,217,255,0.18),transparent_58%)]" />
          <div className="relative mx-auto max-w-6xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-water-dark)]">
              {content.badge}
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-[-0.055em] text-[var(--color-text-primary)] sm:text-7xl">
              {content.title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">
              {content.description}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href={`mailto:techal@tiktalink.com?subject=${encodeURIComponent(content.primary)}`}>
                {content.primary}
              </Button>
              <Button href={`/${locale}#contact`} variant="secondary">
                {content.secondary}
              </Button>
            </div>
          </div>
        </section>

        <section className="border-y border-[var(--color-border)] bg-[var(--color-background-soft)] px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2 lg:grid-cols-4">
            {content.dimensions.map((dimension, index) => (
              <div
                key={dimension}
                className="rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 shadow-[0_18px_55px_rgba(11,16,32,0.06)]"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-earth)]">
                  0{index + 1}
                </span>
                <h2 className="mt-4 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                  {dimension}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                  {content.cardDescription}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
