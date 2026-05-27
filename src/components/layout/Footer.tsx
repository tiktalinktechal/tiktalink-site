import { Logo } from "@/components/ui/Logo";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { industryPages } from "@/data/industryPages";
import { socialLinks } from "@/data/socialLinks";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function Footer({ dictionary, locale }: { dictionary: Dictionary; locale: Locale }) {
  const companyHref = [
    `/${locale}#top`,
    `/${locale}#process`,
    `/${locale}/insights`,
    `/${locale}#contact`,
  ];
  const legalHref = ["privacy-policy", "terms-of-service", "cookie-policy"];

  return (
    <footer className="border-t border-white/10 bg-[var(--color-deep)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Logo dark />
          <p className="mt-5 max-w-md text-sm leading-7 text-zinc-400">
            {dictionary.footer.description}
          </p>
          <a
            href="mailto:techal@tiktalink.com"
            className="mt-5 inline-flex text-sm font-semibold text-[var(--color-water)] hover:text-white"
          >
            techal@tiktalink.com
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
            {dictionary.footer.services}
          </h2>
          <div className="mt-4 grid gap-3">
            {dictionary.services.items.slice(0, 6).map((service) => (
              <a key={service.title} href={`/${locale}#services`} className="text-sm text-zinc-400 hover:text-[var(--color-water)]">
                {service.title}
              </a>
            ))}
          </div>
          <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white">
            {dictionary.nav.industries}
          </h2>
          <div className="mt-4 grid gap-3">
            {industryPages.slice(0, 5).map((industry, index) => (
              <a
                key={industry.slug}
                href={`/${locale}/industries/${industry.slug}`}
                className="text-sm text-zinc-400 hover:text-[var(--color-water)]"
              >
                {dictionary.industries.items[index] ?? industry.content.en.title}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
            {dictionary.footer.company}
          </h2>
          <div className="mt-4 grid gap-3">
            {dictionary.footer.companyLinks.map((link, index) => (
              <a
                key={link}
                href={companyHref[index]}
                className="text-sm text-zinc-400 hover:text-[var(--color-water)]"
              >
                {link}
              </a>
            ))}
          </div>
          <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white">
            {dictionary.footer.legal}
          </h2>
          <div className="mt-4 grid gap-3">
            {dictionary.footer.legalLinks.map((link, index) => (
              <a
                key={link}
                href={`/${locale}/${legalHref[index]}`}
                className="text-sm text-zinc-400 hover:text-[var(--color-water)]"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
            {dictionary.footer.social}
          </h2>
          <div className="mt-4 grid gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${dictionary.footer.socialAria} ${link.name}`}
                className="group flex items-center gap-3 text-sm text-zinc-400 transition hover:text-[var(--color-water)]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-300 transition group-hover:border-[var(--color-water)]/40 group-hover:text-[var(--color-water)]">
                  <SocialIcon name={link.name} className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-white/85">{link.name}</span>
                  <span className="text-xs text-zinc-500">{link.handle}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 py-6 text-xs text-zinc-500 sm:px-8 md:flex-row md:items-center md:justify-between">
        <p>{dictionary.footer.copyright}</p>
        <p>
          <span className="text-[var(--color-water)]">{dictionary.footer.taglineA}</span>{" "}
          <span className="text-[var(--color-ai)]">{dictionary.footer.taglineB}</span> - tiktalink.com
        </p>
      </div>
    </footer>
  );
}
