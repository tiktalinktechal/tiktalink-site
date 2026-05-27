import type { Metadata } from "next";
import "./globals.css";
import { siteMetadata } from "./metadata";
import { defaultLocale, isLocale, localeMeta, type Locale } from "@/i18n/config";

export const metadata: Metadata = siteMetadata;

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
}>) {
  const resolvedParams = await params;
  const locale = isLocale(resolvedParams?.locale) ? resolvedParams.locale : defaultLocale;
  const typedLocale = locale as Locale;

  return (
    <html lang={typedLocale} dir={localeMeta[typedLocale].dir}>
      <body>{children}</body>
    </html>
  );
}
