import type { Metadata } from "next";
import { InstagramAdminPanel } from "@/components/admin/InstagramAdminPanel";

export const metadata: Metadata = {
  title: "Instagram Admin | Tiktalink",
  description: "Internal Instagram publishing test panel for Tiktalink TechAl.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function InstagramAdminPage() {
  return (
    <main className="min-h-screen bg-[var(--color-background-soft)] px-5 py-16 sm:px-8">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-water-dark)]">
            Tiktalink Social API
          </p>
          <h1 className="mt-4 text-5xl font-semibold tracking-[-0.055em] text-[var(--color-text-primary)]">
            Instagram publishing test
          </h1>
          <p className="mt-5 text-base leading-8 text-[var(--color-text-secondary)]">
            This internal panel talks only to server-side API routes. The Instagram access token and
            app credentials stay in environment variables and are never sent to the browser. Publishing
            uses the official Meta Instagram Graph API content publishing flow.
          </p>
          <div className="mt-8 rounded-3xl border border-[var(--color-border-soft)] bg-white p-5 text-sm leading-7 text-[var(--color-text-secondary)]">
            <p className="font-semibold text-[var(--color-text-primary)]">Required environment</p>
            <ul className="mt-3 grid gap-2">
              <li>INSTAGRAM_ACCESS_TOKEN</li>
              <li>INSTAGRAM_USER_ID</li>
              <li>INSTAGRAM_ADMIN_SECRET</li>
              <li>META_GRAPH_API_VERSION</li>
            </ul>
          </div>
          <div className="mt-4 rounded-3xl border border-[var(--color-water)]/20 bg-[var(--color-water-soft)] p-5 text-sm leading-7 text-[var(--color-text-secondary)]">
            <p className="font-semibold text-[var(--color-text-primary)]">Architecture boundary</p>
            <p className="mt-2">
              This MVP is intentionally API-only: no scraping, no login automation, no unofficial
              Instagram endpoints. It is ready to grow into scheduling, analytics, token rotation,
              and multi-platform publishing.
            </p>
          </div>
        </section>

        <InstagramAdminPanel />
      </div>
    </main>
  );
}
