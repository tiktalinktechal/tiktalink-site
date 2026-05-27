import { notFound } from "next/navigation";
import { isLocale, localeMeta, type Locale } from "@/i18n/config";

export function generateStaticParams() {
  return Object.keys(localeMeta).map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const direction = localeMeta[typedLocale].dir;

  return (
    <div lang={typedLocale} dir={direction}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(typedLocale)};document.documentElement.dir=${JSON.stringify(direction)};`,
        }}
      />
      {children}
    </div>
  );
}
