import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

export function DigitalSystemsSection({
  content,
}: {
  content: Dictionary["systems"];
}) {
  return (
    <Section id="systems">
      <div className="mx-auto max-w-4xl text-center">
        <Badge>{content.badge}</Badge>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl">
          {content.title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.description}
        </p>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {content.items.map((layer, index) => (
          <div
            key={layer}
            className="group min-h-40 rounded-2xl border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_58px_rgba(11,16,32,0.06)] transition hover:-translate-y-1 hover:border-[var(--color-water)] hover:bg-[var(--color-water-soft)]"
          >
            <div
              className={
                index === 4
                  ? "mb-8 h-2 w-16 rounded-full bg-[var(--color-ai)] opacity-80 transition group-hover:opacity-100"
                  : index === 5
                    ? "mb-8 h-2 w-16 rounded-full bg-[var(--color-earth)] opacity-80 transition group-hover:opacity-100"
                    : "mb-8 h-2 w-16 rounded-full bg-[var(--color-water)] opacity-80 transition group-hover:opacity-100"
              }
            />
            <h3 className="text-2xl font-semibold text-[var(--color-text-primary)]">{layer}</h3>
            <p className="mt-4 text-sm leading-6 text-[var(--color-text-secondary)]">
              {content.cardDescription}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
