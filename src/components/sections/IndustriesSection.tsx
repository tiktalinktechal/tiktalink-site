import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { industryPages } from "@/data/industryPages";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function IndustriesSection({
  content,
  locale,
  labels,
}: {
  content: Dictionary["industries"];
  locale: Locale;
  labels: Dictionary["industryPage"];
}) {
  return (
    <Section id="industries">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <Badge tone="earth">{content.badge}</Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl">
            {content.title}
          </h2>
        </div>
        <p className="text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.description}
        </p>
      </div>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {industryPages.map((industry, index) => {
          const localizedTitle = content.items[index] ?? industry.content.en.title;
          const localized = industry.content[locale];
          const description =
            localized?.cardDescription ??
            labels.fallbackCard;

          return (
          <Link
            key={industry.slug}
            href={`/${locale}/industries/${industry.slug}`}
            aria-label={`${labels.secondaryCta}: ${localizedTitle}`}
            className="group relative overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-white p-5 shadow-[0_14px_42px_rgba(15,23,42,0.06)] transition duration-300 [transition-timing-function:var(--ease-premium)] hover:-translate-y-1 hover:border-[var(--color-water)] hover:bg-[var(--color-water-soft)] hover:shadow-[0_24px_70px_rgba(111,211,255,0.16)]"
          >
            <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] text-[0.68rem] font-bold tracking-[0.12em] text-[var(--color-earth-dark)] transition group-hover:border-[var(--color-water)] group-hover:bg-white">
              {industry.icon}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-earth)]">
              {localized?.badge ?? labels.badge}
            </span>
            <h3 className="mt-5 max-w-[13rem] text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
              {localizedTitle}
            </h3>
            <p className="mt-3 min-h-[4.5rem] text-sm leading-6 text-[var(--color-text-secondary)]">
              {description}
            </p>
            <span className="mt-5 inline-flex text-sm font-semibold text-[var(--color-water-dark)]">
              {labels.secondaryCta}
            </span>
          </Link>
          );
        })}
      </div>
    </Section>
  );
}
