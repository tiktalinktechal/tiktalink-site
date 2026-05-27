import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AITransformationSection } from "@/components/sections/AITransformationSection";
import { CTASection } from "@/components/sections/CTASection";
import { ContactSection } from "@/components/sections/ContactSection";
import { DigitalInfrastructureSection } from "@/components/sections/DigitalInfrastructureSection";
import { DigitalSystemsSection } from "@/components/sections/DigitalSystemsSection";
import { EvolutionStorySection } from "@/components/sections/EvolutionStorySection";
import { HeroSection } from "@/components/sections/HeroSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { InfrastructurePrinciplesSection } from "@/components/sections/InfrastructurePrinciplesSection";
import { InsightsPreviewSection } from "@/components/sections/InsightsPreviewSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TransformationScenariosSection } from "@/components/sections/TransformationScenariosSection";
import { WhyTiktalinkSection } from "@/components/sections/WhyTiktalinkSection";
import { socialLinks } from "@/data/socialLinks";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, localeMeta, locales, localizedPath, type Locale } from "@/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale);
  const alternates = Object.fromEntries(
    locales.map((item) => [localeMeta[item].hreflang, `https://tiktalink.com/${item}`])
  );

  return {
    metadataBase: new URL("https://tiktalink.com"),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: {
      canonical: `https://tiktalink.com/${locale}`,
      languages: {
        ...alternates,
        "x-default": "https://tiktalink.com/en",
      },
    },
    openGraph: {
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      url: `https://tiktalink.com/${locale}`,
      siteName: "Tiktalink",
      type: "website",
      locale,
      images: [
        {
          url: `/${locale}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: dictionary.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dictionary.meta.title,
      description: dictionary.meta.description,
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dictionary = await getDictionary(typedLocale);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Tiktalink",
    alternateName: "Tiktalink TechAl",
    url: "https://tiktalink.com",
    email: "techal@tiktalink.com",
    description: dictionary.meta.description,
    foundingDate: "2026",
    areaServed: dictionary.why.items[3].title,
    knowsAbout: [
      dictionary.services.items[0].title,
      dictionary.services.items[1].title,
      dictionary.services.items[2].title,
      dictionary.services.items[4].title,
      dictionary.services.items[5].title,
      dictionary.systems.title,
    ],
    sameAs: socialLinks.map((link) => link.url),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Tiktalink",
    url: localizedPath(typedLocale),
    publisher: {
      "@type": "Organization",
      name: "Tiktalink",
    },
    inLanguage: localeMeta[typedLocale].hreflang,
  };

  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Tiktalink",
    alternateName: "Tiktalink TechAl",
    url: "https://tiktalink.com",
    email: "techal@tiktalink.com",
    areaServed: dictionary.why.items[3].title,
    serviceType: dictionary.services.items.map((service) => service.title),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, websiteSchema, professionalServiceSchema]),
        }}
      />
      <Navbar dictionary={dictionary} locale={typedLocale} />
      <main id="main-content">
        <HeroSection content={dictionary.hero} />
        <EvolutionStorySection content={dictionary.evolution} />
        <DigitalInfrastructureSection content={dictionary.infrastructure} />
        <ServicesSection content={dictionary.services} />
        <AITransformationSection content={dictionary.ai} />
        <IndustriesSection content={dictionary.industries} locale={typedLocale} labels={dictionary.industryPage} />
        <ProcessSection content={dictionary.process} />
        <WhyTiktalinkSection content={dictionary.why} />
        <InfrastructurePrinciplesSection content={dictionary.principles} />
        <TransformationScenariosSection content={dictionary.scenarios} />
        <InsightsPreviewSection content={dictionary.insights} locale={typedLocale} />
        <DigitalSystemsSection content={dictionary.systems} />
        <CTASection content={dictionary.cta} />
        <ContactSection content={dictionary.contact} />
      </main>
      <Footer dictionary={dictionary} locale={typedLocale} />
    </>
  );
}
