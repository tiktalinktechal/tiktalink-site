import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IndustryExperience } from "@/components/industry/IndustryExperience";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { getIndustryPage, industryPages, type IndustryContent, type IndustryPage } from "@/data/industryPages";
import { getDictionary, type Dictionary } from "@/i18n/dictionaries";
import { isLocale, locales, type Locale } from "@/i18n/config";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return locales.flatMap((locale) => industryPages.map((industry) => ({ locale, slug: industry.slug })));
}

function fallbackIndustryContent(
  industry: IndustryPage,
  locale: Locale,
  dictionary: Dictionary
): IndustryContent {
  const index = industryPages.findIndex((item) => item.slug === industry.slug);
  const title = dictionary.industries.items[index] ?? industry.content.en.title;
  const labels = dictionary.industryPage;

  return {
    title,
    shortTitle: title,
    metaTitle: `${title} | ${labels.metaSuffix}`,
    metaDescription: labels.metaDescriptionTemplate.replace("{industry}", title),
    heroHeadline: labels.headlineTemplate.replace("{industry}", title),
    heroSubheadline: labels.metaDescriptionTemplate.replace("{industry}", title),
    badge: labels.badge,
    overview: labels.fallbackCard,
    mainPainPoints: labels.painPoints,
    tiktalinkSolutions: labels.solutions,
    exampleWebsiteSections: [
      dictionary.nav.services,
      dictionary.industryPage.trustTitle,
      dictionary.ai.badge,
      dictionary.insights.badge,
      dictionary.nav.contact,
    ],
    digitalSystems: labels.services,
    aiSystems: labels.services,
    seoStrategy: labels.solutions,
    googleVisibility: labels.solutions,
    socialMediaSystem: labels.solutions,
    automationOpportunities: labels.solutions,
    conversionFlow: labels.painPoints,
    trustElements: labels.solutions,
    sampleJourney: labels.painPoints,
    websitePreview: {
      label: labels.experienceBadge,
      headline: labels.headlineTemplate.replace("{industry}", title),
      subheadline: labels.experienceDescription,
      primaryAction: labels.buildCta,
      secondaryAction: labels.secondaryCta,
      highlights: labels.services,
    },
    navigationTabs: [
      dictionary.nav.services,
      dictionary.industryPage.trustTitle,
      dictionary.ai.badge,
      dictionary.insights.badge,
      dictionary.nav.contact,
    ],
    exampleModules: labels.services,
    customerJourney: labels.painPoints,
    aiConversation: [
      {
        user: labels.aiQuestion,
        assistant: labels.aiAnswer,
      },
    ],
    beforeAfter: {
      before: labels.painPoints,
      after: labels.solutions,
    },
    mobilePreview: labels.mobileItems,
    conversionElements: labels.solutions,
    ctaTitle: labels.buildCta,
    ctaText: labels.ctaTemplate.replace("{industry}", title),
    cardDescription: labels.fallbackCard,
  };
}

function getLocalizedIndustry(industry: IndustryPage, locale: Locale, dictionary: Dictionary) {
  return industry.content[locale] ?? fallbackIndustryContent(industry, locale, dictionary);
}

function ListCard({
  title,
  items,
  tone = "water",
}: {
  title: string;
  items: string[];
  tone?: "water" | "earth" | "ai" | "white";
}) {
  const toneClass = {
    water: "bg-[var(--color-water-soft)] border-[var(--color-water)]/25",
    earth: "bg-[var(--color-earth-soft)] border-[var(--color-earth-light)]",
    ai: "bg-[var(--color-ai-soft)] border-[var(--color-ai-light)]",
    white: "bg-white border-[var(--color-border)]",
  }[tone];

  return (
    <section className={`rounded-[1.75rem] border p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] ${toneClass}`}>
      <h2 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)]">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li key={item} className="rounded-2xl border border-white/70 bg-white/72 px-4 py-3 text-sm leading-6 text-[var(--color-text-secondary)] shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const industry = getIndustryPage(slug);
  if (!industry) notFound();
  const dictionary = await getDictionary(locale);
  const content = getLocalizedIndustry(industry, locale, dictionary);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `https://tiktalink.com/${locale}/industries/${slug}`,
      languages: Object.fromEntries(locales.map((item) => [item, `https://tiktalink.com/${item}/industries/${slug}`])),
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `https://tiktalink.com/${locale}/industries/${slug}`,
      siteName: "Tiktalink",
      type: "website",
      images: [{ url: `/${locale}/opengraph-image`, width: 1200, height: 630, alt: content.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function IndustryPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const industry = getIndustryPage(slug);
  if (!industry) notFound();

  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);
  const content = getLocalizedIndustry(industry, typedLocale, dictionary);
  const related = industryPages.filter((item) => item.slug !== slug).slice(0, 3);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Tiktalink", item: `https://tiktalink.com/${locale}` },
      { "@type": "ListItem", position: 2, name: dictionary.nav.industries, item: `https://tiktalink.com/${locale}#industries` },
      { "@type": "ListItem", position: 3, name: content.title, item: `https://tiktalink.com/${locale}/industries/${slug}` },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.metaTitle,
    description: content.metaDescription,
    provider: {
      "@type": "Organization",
      name: "Tiktalink",
      url: "https://tiktalink.com",
    },
    serviceType: content.digitalSystems,
    areaServed: dictionary.why.items[3].title,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbSchema, serviceSchema]) }}
      />
      <Navbar dictionary={dictionary} locale={typedLocale} />
      <main id="main-content" className="bg-[var(--color-background)]">
        <section className="relative overflow-hidden px-5 pb-20 pt-32 sm:px-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(111,211,255,0.18),transparent_62%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center 2xl:max-w-[88rem]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-water-dark)]">
                {content.badge}
              </p>
              <h1 className="text-balance mt-5 text-5xl font-semibold tracking-[-0.055em] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl">
                {content.heroHeadline}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)]">
                {content.heroSubheadline}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={`mailto:techal@tiktalink.com?subject=${encodeURIComponent(content.ctaTitle)}`}>
                  {content.ctaTitle}
                </Button>
                <Button href={`/${locale}#industries`} variant="secondary">
                  {dictionary.industryPage.backToIndustries}
                </Button>
              </div>
            </div>

            <aside className="surface-premium rounded-[2rem] p-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-earth)]">
                    {dictionary.industryPage.focusTitle}
                  </p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">
                    {content.shortTitle}
                  </h2>
                </div>
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--color-border-soft)] bg-white text-sm font-bold tracking-[0.16em] text-[var(--color-water-dark)]">
                  {industry.icon}
                </span>
              </div>
              <p className="mt-6 text-base leading-8 text-[var(--color-text-secondary)]">
                {content.overview}
              </p>
              <div className="mt-7 grid gap-3">
                {content.digitalSystems.slice(0, 4).map((system) => (
                  <span key={system} className="rounded-2xl border border-[var(--color-border-soft)] bg-white/80 px-4 py-3 text-sm font-medium text-[var(--color-text-primary)]">
                    {system}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <IndustryExperience content={content} labels={dictionary.industryPage} />

        <section className="border-y border-[var(--color-border)] bg-[var(--color-section-soft)] px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3 2xl:max-w-[88rem]">
            <ListCard title={dictionary.industryPage.overviewTitle} items={[content.overview]} tone="white" />
            <ListCard title={dictionary.industryPage.gapsTitle} items={content.mainPainPoints} tone="earth" />
            <ListCard title={dictionary.industryPage.responseTitle} items={content.tiktalinkSolutions} tone="water" />
          </div>
        </section>

        <section className="px-5 py-20 sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2 2xl:max-w-[88rem]">
            <ListCard title={dictionary.industryPage.websiteTitle} items={content.exampleWebsiteSections} tone="white" />
            <ListCard title={dictionary.industryPage.systemsTitle} items={content.digitalSystems} tone="water" />
            <ListCard title={dictionary.industryPage.seoTitle} items={[...content.seoStrategy, ...content.googleVisibility]} tone="earth" />
            <ListCard title={dictionary.industryPage.aiTitle} items={[...content.aiSystems, ...content.automationOpportunities]} tone="ai" />
            <ListCard title={dictionary.industryPage.trustTitle} items={[...content.trustElements, ...content.conversionFlow]} tone="white" />
            <ListCard title={dictionary.industryPage.journeyTitle} items={content.sampleJourney} tone="water" />
          </div>
        </section>

        <section className="bg-[var(--color-deep)] px-5 py-20 text-white sm:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center 2xl:max-w-[88rem]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-water)]">
                {dictionary.industryPage.buildCta}
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl">
                {content.ctaTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
                {content.ctaText}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button href={`mailto:techal@tiktalink.com?subject=${encodeURIComponent(content.ctaTitle)}`}>
                {content.ctaTitle}
              </Button>
              <Button href={`/${locale}#contact`} variant="secondary">
                {dictionary.nav.contact}
              </Button>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-7xl 2xl:max-w-[88rem]">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">
              {dictionary.industryPage.relatedTitle}
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {related.map((item) => {
                const relatedContent = getLocalizedIndustry(item, typedLocale, dictionary);
                return (
                  <Link
                    key={item.slug}
                    href={`/${locale}/industries/${item.slug}`}
                    className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[0_14px_44px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:border-[var(--color-water)] hover:bg-[var(--color-water-soft)]"
                  >
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-earth)]">
                      {relatedContent.badge}
                    </span>
                    <h3 className="mt-4 text-xl font-semibold text-[var(--color-text-primary)]">
                      {relatedContent.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                      {relatedContent.cardDescription}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
