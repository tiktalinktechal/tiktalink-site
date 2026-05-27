"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

const stepStyles = [
  {
    bg: "bg-[var(--color-water-soft)]",
    border: "border-[var(--color-water)]/25",
    dot: "bg-[var(--color-water)]",
    text: "text-[var(--color-water-dark)]",
  },
  {
    bg: "bg-[var(--color-earth-soft)]",
    border: "border-[var(--color-earth-light)]",
    dot: "bg-[var(--color-earth)]",
    text: "text-[var(--color-earth)]",
  },
  {
    bg: "bg-white",
    border: "border-[var(--color-border-soft)]",
    dot: "bg-[var(--color-water)]",
    text: "text-[var(--color-water-dark)]",
  },
  {
    bg: "bg-[var(--color-background-soft)]",
    border: "border-[var(--color-border)]",
    dot: "bg-[var(--color-text-primary)]",
    text: "text-[var(--color-text-primary)]",
  },
  {
    bg: "bg-[var(--color-ai-soft)]",
    border: "border-[var(--color-ai-light)]",
    dot: "bg-[var(--color-ai)]",
    text: "text-[var(--color-ai)]",
  },
];

export function ProcessSection({
  content,
}: {
  content: Dictionary["process"];
}) {
  return (
    <div className="bg-[var(--color-section-soft)]">
      <Section id="process">
        <div className="max-w-3xl">
          <Badge tone="earth">{content.badge}</Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-5">
          {content.steps.map((step, index) => {
            const style = stepStyles[index];

            return (
              <motion.div
                key={step.title}
                className={`relative rounded-2xl border p-6 shadow-[0_18px_56px_rgba(11,16,32,0.06)] ${style.bg} ${style.border}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-sm font-semibold ${style.text}`}>{step.step}</span>
                  <span className={`rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] ${style.text}`}>
                    {step.label}
                  </span>
                </div>
                <span className={`mt-8 block h-2 w-2 rounded-full ${style.dot}`} />
                <h3 className="mt-5 text-xl font-semibold text-[var(--color-text-primary)]">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-text-secondary)]">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
