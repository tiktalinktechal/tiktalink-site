import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

export function TransformationScenariosSection({
  content,
}: {
  content: Dictionary["scenarios"];
}) {
  return (
    <div className="bg-[var(--color-background-soft)]">
      <Section>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <Badge tone="earth">{content.badge}</Badge>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)] sm:text-5xl">
              {content.title}
            </h2>
          </div>
          <p className="text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {content.items.map((translated) => {
            return (
              <article
                key={translated.title}
                className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_60px_rgba(11,16,32,0.06)] transition hover:-translate-y-1 hover:border-[var(--color-water)] sm:p-8"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-earth)]">
                  {translated.label}
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
                  {translated.title}
                </h3>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {translated.points.map((point) => (
                    <span
                      key={point}
                      className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] px-4 py-3 text-sm text-[var(--color-text-secondary)]"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
