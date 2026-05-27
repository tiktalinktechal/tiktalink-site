"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { Logo } from "@/components/ui/Logo";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";

export function Navbar({
  dictionary,
  locale,
}: {
  dictionary: Dictionary;
  locale: Locale;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const navigationItems = [
    { label: dictionary.nav.services, href: `/${locale}#services` },
    { label: dictionary.nav.industries, href: `/${locale}#industries` },
    { label: dictionary.nav.aiSystems, href: `/${locale}#ai-systems` },
    { label: dictionary.nav.process, href: `/${locale}#process` },
    { label: dictionary.nav.insights, href: `/${locale}/insights` },
    { label: dictionary.nav.contact, href: `/${locale}#contact` },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <a href="#main-content" className="skip-link">
        {dictionary.nav.skip}
      </a>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/72 px-4 py-3 shadow-[0_20px_90px_rgba(11,16,32,0.11),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-[var(--color-water)]/10 backdrop-blur-2xl"
        aria-label={dictionary.nav.home}
      >
        <a href={`/${locale}#top`} className="shrink-0" aria-label={dictionary.nav.home}>
          <Logo compact />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--color-text-secondary)] transition hover:text-[var(--color-water-dark)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher
            locale={locale}
            label={dictionary.language.label}
            ariaLabel={dictionary.language.aria}
          />
          <Button href={`/${locale}#contact`} className="min-h-10 px-5 shadow-[0_10px_30px_rgba(0,217,255,0.18)]">
            {dictionary.nav.start}
          </Button>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border-soft)] text-[var(--color-text-primary)] lg:hidden"
          type="button"
          aria-label={dictionary.nav.toggle}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          <span className="relative h-4 w-5">
            <span className="absolute left-0 top-0 h-px w-5 bg-[var(--color-text-primary)]" />
            <span className="absolute left-0 top-2 h-px w-5 bg-[var(--color-text-primary)]" />
            <span className="absolute left-0 top-4 h-px w-5 bg-[var(--color-text-primary)]" />
          </span>
        </button>
      </nav>

      {isOpen && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-[var(--color-border-soft)] bg-white/95 p-4 shadow-2xl backdrop-blur-xl lg:hidden">
          <div className="grid gap-2">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-water-soft)] hover:text-[var(--color-text-primary)]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <LanguageSwitcher
              locale={locale}
              label={dictionary.language.label}
              ariaLabel={dictionary.language.aria}
            />
            <Button href={`/${locale}#contact`} className="flex-1" onClick={() => setIsOpen(false)}>
              {dictionary.nav.start}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
