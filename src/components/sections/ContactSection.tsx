import { ContactForm } from "@/components/contact/ContactForm";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { primarySocialLinks } from "@/data/socialLinks";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import type { Dictionary } from "@/i18n/dictionaries";

export function ContactSection({
  content,
}: {
  content: Dictionary["contact"];
}) {
  return (
    <div id="contact" className="bg-[var(--color-background-soft)]">
      <Section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="lg:sticky lg:top-28">
          <Badge>{content.badge}</Badge>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
          <a
            href="mailto:techal@tiktalink.com"
            className="mt-6 inline-flex font-semibold text-[var(--color-water-dark)] hover:text-[var(--color-text-primary)]"
          >
            techal@tiktalink.com
          </a>
          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--color-earth)]">
              {content.socialTitle}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {primarySocialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${content.socialAria} ${link.name}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-text-primary)] shadow-[0_10px_30px_rgba(11,16,32,0.06)] transition hover:-translate-y-0.5 hover:border-[var(--color-water)] hover:text-[var(--color-water-dark)]"
                >
                  <SocialIcon name={link.name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_90px_rgba(11,16,32,0.08)] sm:p-8">
          <ContactForm labels={content.form} />
        </div>
      </Section>
    </div>
  );
}
