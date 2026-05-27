import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://tiktalink.com/sitemap.xml",
    host: "https://tiktalink.com",
  };
}
