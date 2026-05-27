import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

export function CTASection({
  content,
}: {
  content: Dictionary["cta"];
}) {
  return (
    <div className="bg-[var(--color-background-soft)]">
      <Section className="py-16 lg:py-24">
        <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-white p-8 shadow-[0_28px_100px_rgba(11,16,32,0.08)] sm:p-12 lg:p-16">
          <div className="absolute -right-16 -top-20 h-72 w-72 rounded-full bg-[var(--color-water)]/22 blur-[90px]" />
          <div className="absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-[var(--color-ai)]/8 blur-[100px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-7 h-1.5 w-48 rounded-full bg-[linear-gradient(90deg,#00D9FF_0%,#8B6A4A_55%,#7C3AED_100%)]" />
              <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)] sm:text-5xl">
                {content.title}
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
                {content.description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button href="mailto:techal@tiktalink.com">
                {content.primary}
              </Button>
              <Button href="mailto:techal@tiktalink.com" variant="secondary">
                {content.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
