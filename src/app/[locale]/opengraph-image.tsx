import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, type Locale } from "@/i18n/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale: Locale = isLocale(locale) ? locale : "en";
  const dictionary = await getDictionary(typedLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#ffffff",
          color: "#0B1020",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px",
          fontFamily: "Arial",
          direction: typedLocale === "ar" ? "rtl" : "ltr",
        }}
      >
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: 12 }}>TIKTALINK</div>
        <div style={{ marginTop: 26, fontSize: 34, maxWidth: 920 }}>{dictionary.meta.title}</div>
        <div
          style={{
            marginTop: 44,
            width: 680,
            height: 12,
            borderRadius: 999,
            background: "linear-gradient(90deg,#00D9FF,#8B6A4A,#7C3AED)",
          }}
        />
        <div style={{ marginTop: 34, fontSize: 26, color: "#4B5563", maxWidth: 920 }}>
          {dictionary.evolution.paragraph2}
        </div>
      </div>
    ),
    size
  );
}
