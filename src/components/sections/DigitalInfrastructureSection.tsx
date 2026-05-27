import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import type { Dictionary } from "@/i18n/dictionaries";

export function DigitalInfrastructureSection({
  content,
}: {
  content: Dictionary["infrastructure"];
}) {
  return (
    <div className="bg-[var(--color-section-soft)]">
      <Section className="py-12 lg:py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-7 shadow-[0_24px_90px_rgba(11,16,32,0.07)] sm:p-10 lg:p-14">
          <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-[var(--color-water)]/14 blur-[110px]" />
          <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[var(--color-earth)]/10 blur-[120px]" />
          <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <Badge>{content.badge}</Badge>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl">
                {content.title}
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
                {content.description}
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {content.pillars.map((pillar, index) => (
                <div
                  key={pillar}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-soft)] p-5 text-sm font-medium text-[var(--color-text-primary)]"
                >
                  <span
                    className={
                      index === 3
                        ? "mb-4 block h-1 w-10 rounded-full bg-[var(--color-earth)]"
                        : index === 4
                          ? "mb-4 block h-1 w-10 rounded-full bg-[var(--color-ai)]"
                          : "mb-4 block h-1 w-10 rounded-full bg-[var(--color-water)]"
                    }
                  />
                  {pillar}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
