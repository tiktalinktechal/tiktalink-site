import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

export function EvolutionStorySection({
  content,
}: {
  content: Dictionary["evolution"];
}) {
  return (
    <div className="bg-[var(--color-earth-soft)]">
      <Section className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <Badge tone="earth">{content.badge}</Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl">
            {content.title}
          </h2>
        </div>
        <div className="rounded-3xl border border-[var(--color-earth-light)] bg-white/78 p-7 shadow-[0_20px_70px_rgba(139,106,74,0.11)] backdrop-blur md:p-10">
          <div className="mb-7 h-1.5 w-full rounded-full bg-[linear-gradient(90deg,#00D9FF_0%,#8B6A4A_55%,#7C3AED_100%)]" />
          <p className="text-xl leading-9 text-[var(--color-text-primary)]">
            {content.paragraph1}
          </p>
          <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.paragraph2}
          </p>
        </div>
      </Section>
    </div>
  );
}
