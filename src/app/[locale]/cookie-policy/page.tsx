import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { LegalPage } from "@/components/legal/LegalPage";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export default async function CookiePolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = await getDictionary(locale as Locale);
  return (
    <>
      <Navbar dictionary={dictionary} locale={locale as Locale} />
      <LegalPage content={dictionary.legal.cookies} disclaimer={dictionary.legal.disclaimer} />
      <Footer dictionary={dictionary} locale={locale as Locale} />
    </>
  );
}
