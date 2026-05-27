import type { IndustryContent } from "@/data/industryPages";
import type { Dictionary } from "@/i18n/dictionaries";
import type { ReactNode } from "react";

type IndustryExperienceProps = {
  content: IndustryContent;
  labels: Dictionary["industryPage"];
};

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-water-dark)]">
      {children}
    </p>
  );
}

export function SectorNavigationPreview({ tabs }: { tabs: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab, index) => (
        <span
          key={`${tab}-${index}`}
          className="rounded-full border border-[var(--color-border-soft)] bg-white/85 px-3 py-2 text-xs font-semibold text-[var(--color-text-primary)] shadow-[0_10px_24px_rgba(15,23,42,0.05)]"
        >
          {tab}
        </span>
      ))}
    </div>
  );
}

export function IndustryWebsitePreview({ content }: { content: IndustryContent }) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border-soft)] bg-white shadow-[0_26px_90px_rgba(15,23,42,0.10)]">
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-background-soft)] px-5 py-4">
        <div className="flex gap-2" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[var(--color-earth)]/60" />
          <span className="h-3 w-3 rounded-full bg-[var(--color-water)]/70" />
          <span className="h-3 w-3 rounded-full bg-[var(--color-ai)]/50" />
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
          {content.websitePreview.label}
        </span>
      </div>

      <div className="relative p-6 sm:p-8">
        <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(111,211,255,0.18),transparent_65%)]" />
        <div className="relative">
          <SectorNavigationPreview tabs={content.navigationTabs} />
          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-earth)]">
                {content.badge}
              </p>
              <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.055em] text-[var(--color-text-primary)] sm:text-5xl">
                {content.websitePreview.headline}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-secondary)]">
                {content.websitePreview.subheadline}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <span className="rounded-full bg-[var(--color-water)] px-5 py-3 text-sm font-semibold text-[#061018] shadow-[0_14px_34px_rgba(0,217,255,0.22)]">
                  {content.websitePreview.primaryAction}
                </span>
                <span className="rounded-full border border-[var(--color-border-soft)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)]">
                  {content.websitePreview.secondaryAction}
                </span>
              </div>
            </div>

            <div className="grid gap-3">
              {content.websitePreview.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-water-soft)]/70 px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)]"
                >
                  {highlight}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function IndustryFeatureModules({
  title,
  modules,
}: {
  title: string;
  modules: string[];
}) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)]">
        {title}
      </h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {modules.map((module, index) => (
          <div
            key={`${module}-${index}`}
            className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] px-4 py-4"
          >
            <span className="text-xs font-semibold text-[var(--color-water-dark)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-2 text-sm font-semibold leading-6 text-[var(--color-text-primary)]">
              {module}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function BeforeAfterLayer({
  beforeTitle,
  afterTitle,
  content,
}: {
  beforeTitle: string;
  afterTitle: string;
  content: IndustryContent;
}) {
  const columns = [
    { title: beforeTitle, items: content.beforeAfter.before, className: "bg-[var(--color-earth-soft)] border-[var(--color-earth-light)]" },
    { title: afterTitle, items: content.beforeAfter.after, className: "bg-[var(--color-water-soft)] border-[var(--color-water)]/20" },
  ];

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      {columns.map((column) => (
        <div key={column.title} className={`rounded-[1.75rem] border p-6 ${column.className}`}>
          <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)]">
            {column.title}
          </h3>
          <ul className="mt-5 grid gap-3">
            {column.items.map((item) => (
              <li key={item} className="rounded-2xl bg-white/78 px-4 py-3 text-sm leading-6 text-[var(--color-text-secondary)]">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export function SectorAISimulation({ title, content }: { title: string; content: IndustryContent }) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--color-ai-light)] bg-[var(--color-ai-soft)] p-6 shadow-[0_18px_60px_rgba(124,58,237,0.08)]">
      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)]">
        {title}
      </h3>
      <div className="mt-6 grid gap-4">
        {content.aiConversation.map((line, index) => (
          <div key={`${line.user}-${index}`} className="grid gap-3">
            <p className="max-w-[88%] rounded-2xl bg-white px-4 py-3 text-sm font-medium leading-6 text-[var(--color-text-primary)] shadow-[0_10px_28px_rgba(15,23,42,0.06)]">
              {line.user}
            </p>
            <p className="ms-auto max-w-[88%] rounded-2xl bg-[var(--color-deep)] px-4 py-3 text-sm leading-6 text-white shadow-[0_14px_32px_rgba(15,23,42,0.14)]">
              {line.assistant}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MobileExperiencePreview({ title, content }: { title: string; content: IndustryContent }) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)]">
        {title}
      </h3>
      <div className="mx-auto mt-6 max-w-[18rem] rounded-[2.2rem] border border-[var(--color-deep)] bg-[var(--color-deep)] p-3 shadow-[0_24px_70px_rgba(15,23,42,0.18)]">
        <div className="rounded-[1.6rem] bg-white p-4">
          <div className="mx-auto h-1.5 w-16 rounded-full bg-[var(--color-border)]" />
          <div className="mt-5 grid gap-3">
            {content.mobilePreview.map((item, index) => (
              <div key={item} className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] p-3">
                <span className="text-[10px] font-bold text-[var(--color-water-dark)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-1 text-sm font-semibold leading-5 text-[var(--color-text-primary)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ConversionJourneyPreview({ title, journey }: { title: string; journey: string[] }) {
  return (
    <section className="rounded-[1.75rem] border border-[var(--color-border-soft)] bg-[var(--color-section-soft)] p-6">
      <h3 className="text-2xl font-semibold tracking-[-0.035em] text-[var(--color-text-primary)]">
        {title}
      </h3>
      <div className="mt-6 grid gap-3 md:grid-cols-3 xl:grid-cols-6">
        {journey.map((step, index) => (
          <div key={`${step}-${index}`} className="relative rounded-2xl border border-white bg-white/82 p-4 shadow-[0_10px_28px_rgba(15,23,42,0.05)]">
            <span className="text-xs font-bold text-[var(--color-earth)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="mt-3 text-sm font-semibold leading-6 text-[var(--color-text-primary)]">
              {step}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function IndustryExperience({ content, labels }: IndustryExperienceProps) {
  return (
    <section className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-7xl 2xl:max-w-[88rem]">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{labels.experienceBadge}</Eyebrow>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.05em] text-[var(--color-text-primary)] sm:text-5xl">
            {labels.experienceTitle}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
            {labels.experienceDescription}
          </p>
        </div>

        <div className="mt-12">
          <IndustryWebsitePreview content={content} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.78fr]">
          <IndustryFeatureModules title={labels.modulesTitle} modules={content.exampleModules} />
          <SectorAISimulation title={labels.aiSimulationTitle} content={content} />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.58fr]">
          <div className="grid gap-6">
            <BeforeAfterLayer beforeTitle={labels.beforeTitle} afterTitle={labels.afterTitle} content={content} />
            <ConversionJourneyPreview title={labels.conversionPreviewTitle} journey={content.customerJourney} />
          </div>
          <MobileExperiencePreview title={labels.mobilePreviewTitle} content={content} />
        </div>
      </div>
    </section>
  );
}
