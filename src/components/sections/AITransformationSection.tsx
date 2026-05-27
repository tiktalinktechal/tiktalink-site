import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

export function AITransformationSection({
  content,
}: {
  content: Dictionary["ai"];
}) {
  return (
    <Section id="ai-systems" className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
      <div className="lg:sticky lg:top-28">
        <Badge tone="ai">{content.badge}</Badge>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl">
          <span className="text-[var(--color-ai)]">{content.titleBefore}</span> {content.titleAfter}
        </h2>
        <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.description}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {content.items.map((feature) => (
          <GlowCard key={feature.title} tone="ai">
            <div className="mb-8 h-12 w-12 rounded-2xl border border-[var(--color-ai-light)] bg-white shadow-[0_0_40px_rgba(124,58,237,0.12)]" />
            <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{feature.title}</h3>
            <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">
              {feature.description}
            </p>
          </GlowCard>
        ))}
      </div>
    </Section>
  );
}
