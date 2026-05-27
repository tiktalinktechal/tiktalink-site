"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { GlowCard } from "@/components/ui/GlowCard";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

export function ServicesSection({
  content,
}: {
  content: Dictionary["services"];
}) {
  return (
    <Section id="services">
      <div className="max-w-3xl">
        <Badge>{content.badge}</Badge>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)] sm:text-5xl">
          {content.title}
        </h2>
        <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.description}
        </p>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {content.items.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: index * 0.04 }}
          >
            <GlowCard className="h-full min-h-[285px]" tone={index === 2 ? "ai" : index === 4 || index === 6 ? "earth" : "white"}>
              <div className="mb-10 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-water)]/25 bg-[var(--color-water-soft)] text-sm font-semibold text-[var(--color-water-dark)]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)]">{service.title}</h3>
              <p className="mt-4 leading-7 text-[var(--color-text-secondary)]">{service.description}</p>
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
