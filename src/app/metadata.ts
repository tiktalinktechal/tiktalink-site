import type { Metadata } from "next";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://tiktalink.com"),
  title: "Tiktalink | Digital Evolution Systems for Modern Businesses",
  description:
    "Tiktalink builds websites, SEO infrastructure, AI systems, automation, software, and digital transformation systems for businesses across every industry.",
  keywords: [
    "digital transformation",
    "AI business systems",
    "website development",
    "SEO infrastructure",
    "Google SEO",
    "business automation",
    "AI chatbot",
    "local business website",
    "business software",
    "digital evolution systems",
    "Google Business optimization",
    "digital infrastructure company",
    "Tiktalink",
    "Tiktalink TechAl",
  ],
  openGraph: {
    title: "Tiktalink | Digital Evolution Systems for Modern Businesses",
    description:
      "Tiktalink builds websites, SEO infrastructure, AI systems, automation, software, and digital transformation systems for businesses across every industry.",
    url: "https://tiktalink.com",
    siteName: "Tiktalink",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Tiktalink Digital Evolution Systems" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiktalink | Digital Evolution Systems for Modern Businesses",
    description:
      "Tiktalink builds websites, SEO infrastructure, AI systems, automation, software, and digital transformation systems for businesses across every industry.",
  },
  alternates: {
    canonical: "https://tiktalink.com",
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};
