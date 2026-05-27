"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  getPathWithoutLocale,
  localeCookieName,
  localeMeta,
  locales,
  localizedPath,
  type Locale,
} from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  locale,
  label,
  ariaLabel,
}: {
  locale: Locale;
  label: string;
  ariaLabel: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const active = localeMeta[locale];
  const pathWithoutLocale = getPathWithoutLocale(pathname || "/");

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function persist(nextLocale: Locale) {
    window.localStorage.setItem(localeCookieName, nextLocale);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-border-soft)] bg-white/72 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-primary)] shadow-[0_10px_30px_rgba(11,16,32,0.06)] transition hover:border-[var(--color-water)] hover:bg-[var(--color-water-soft)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-water)]"
        aria-label={ariaLabel}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="h-2 w-2 rounded-full bg-[var(--color-water)] shadow-[0_0_14px_rgba(0,217,255,0.55)]" />
        {active.label}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label={label}
          className={cn(
            "absolute top-12 z-50 w-56 overflow-hidden rounded-2xl border border-[var(--color-border-soft)] bg-white/94 p-2 shadow-[0_24px_80px_rgba(11,16,32,0.16)] backdrop-blur-2xl",
            localeMeta[locale].dir === "rtl" ? "left-0" : "right-0"
          )}
        >
          {locales.map((item) => {
            const meta = localeMeta[item];
            const href = localizedPath(item, pathWithoutLocale || "/");
            const selected = item === locale;

            return (
              <Link
                key={item}
                href={href}
                role="menuitem"
                hrefLang={meta.hreflang}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-water)]",
                  selected
                    ? "bg-[var(--color-water-soft)] text-[var(--color-text-primary)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-background-soft)] hover:text-[var(--color-text-primary)]"
                )}
                onClick={() => persist(item)}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-border-soft)] bg-white text-[0.65rem] font-bold text-[var(--color-text-muted)]">
                    {meta.flag}
                  </span>
                  <span>{meta.nativeName}</span>
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                  {meta.label}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
