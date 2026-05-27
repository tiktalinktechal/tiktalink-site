import type { Dictionary } from "@/i18n/dictionaries";

type LegalContent = Dictionary["legal"]["privacy"];

export function LegalPage({
  content,
  disclaimer,
}: {
  content: LegalContent;
  disclaimer: string;
}) {
  return (
    <main id="main-content" className="bg-[var(--color-background-soft)] px-5 py-28 sm:px-8">
      <article className="mx-auto max-w-4xl rounded-3xl border border-[var(--color-border)] bg-white p-7 shadow-[0_24px_90px_rgba(11,16,32,0.08)] sm:p-10">
        <h1 className="text-4xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)] sm:text-5xl">
          {content.title}
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.intro}
        </p>
        <div className="mt-10 grid gap-6">
          {content.sections.map((section) => (
            <section key={section.title} className="border-t border-[var(--color-border)] pt-6">
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
                {section.title}
              </h2>
              <p className="mt-3 leading-7 text-[var(--color-text-secondary)]">
                {section.body}
              </p>
            </section>
          ))}
        </div>
        <p className="mt-10 rounded-2xl border border-[var(--color-earth-light)] bg-[var(--color-earth-soft)] p-4 text-sm leading-6 text-[var(--color-earth-dark)]">
          {disclaimer}
        </p>
      </article>
    </main>
  );
}
