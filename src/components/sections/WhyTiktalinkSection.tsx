import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

export function WhyTiktalinkSection({
  content,
}: {
  content: Dictionary["why"];
}) {
  return (
    <Section className="py-16 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Badge tone="neutral">{content.badge}</Badge>
          <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
        </div>

        <div className="grid gap-4">
          {content.items.map((item, index) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_64px_rgba(11,16,32,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-water)] hover:shadow-[0_24px_80px_rgba(0,217,255,0.12)] sm:p-8"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--color-water)]/0 blur-3xl transition group-hover:bg-[var(--color-water)]/12" />
              <div className="relative flex gap-5">
                <span
                  className={
                    index === 1
                      ? "mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--color-earth)] shadow-[0_0_18px_rgba(139,106,74,0.2)]"
                      : index === 2
                        ? "mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--color-ai)] shadow-[0_0_18px_rgba(124,58,237,0.2)]"
                        : "mt-1 h-3 w-3 shrink-0 rounded-full bg-[var(--color-water)] shadow-[0_0_18px_rgba(0,217,255,0.36)]"
                  }
                />
                <div>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
