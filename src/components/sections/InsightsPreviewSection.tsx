import Link from "next/link";
import { insights } from "@/data/insights";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function InsightsPreviewSection({
  content,
  locale,
}: {
  content: Dictionary["insights"];
  locale: Locale;
}) {
  return (
    <Section>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Badge>{content.badge}</Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
        </div>
        <Button href={`/${locale}/insights`} variant="secondary">
          {content.viewAll}
        </Button>
      </div>
      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {insights.map((insight, index) => {
          const translated = content.items[index];
          return (
            <Link
              key={insight.slug}
              href={`/${locale}/insights/${insight.slug}`}
              className="group flex min-h-[280px] flex-col rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_58px_rgba(11,16,32,0.06)] transition hover:-translate-y-1 hover:border-[var(--color-water)] hover:bg-[var(--color-water-soft)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-water-dark)]">
                {translated.category}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
                {translated.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color-text-secondary)]">
                {translated.excerpt}
              </p>
              <span className="mt-6 text-xs font-semibold text-[var(--color-text-muted)]">
                {insight.date} <span aria-hidden="true">/</span> {translated.readingTime}
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
