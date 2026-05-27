import type { Dictionary } from "@/i18n/dictionaries";

export function InfrastructurePrinciplesSection({
  content,
}: {
  content: Dictionary["principles"];
}) {
  return (
    <section className="bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--color-water-dark)]">
            {content.badge}
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text-primary)] sm:text-5xl">
            {content.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.description}
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.items.map((principle, index) => (
            <article
              key={principle.title}
              className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-background-soft)] p-6 transition hover:-translate-y-1 hover:border-[var(--color-water)] hover:shadow-[0_20px_70px_rgba(0,217,255,0.12)]"
            >
              <span
                className={
                  index === 2
                    ? "text-[var(--color-ai)]"
                    : index % 2
                      ? "text-[var(--color-earth)]"
                      : "text-[var(--color-water-dark)]"
                }
              >
                0{index + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-text-secondary)]">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
