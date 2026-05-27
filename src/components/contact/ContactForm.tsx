"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { validateContactPayload } from "@/lib/contactValidation";
import { trackContactSubmit } from "@/lib/analytics";

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    company: string;
    website: string;
    industry: string;
    need: string;
    message: string;
    submit: string;
    error: string;
    projectTypes: string[];
  };
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    website: "",
    industry: "",
    need: labels.projectTypes[0],
    message: "",
    honeypot: "",
  });
  const [startedAt] = useState(() => Date.now());
  const [lastSubmitAt, setLastSubmitAt] = useState(0);
  const [error, setError] = useState("");

  function update(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (Date.now() - lastSubmitAt < 10000) {
      setError(labels.error);
      return;
    }

    const payload = { ...form, startedAt };
    const validation = validateContactPayload(payload);

    if (!validation.ok) {
      setError(labels.error);
      return;
    }

    setLastSubmitAt(Date.now());

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => undefined);

    trackContactSubmit({
      need: form.need,
      industry: form.industry || null,
      hasWebsite: Boolean(form.website),
    });

    const body = [
      `Name: ${form.name}`,
      `Business email: ${form.email}`,
      `Company: ${form.company}`,
      `Website: ${form.website || "Not provided"}`,
      `Industry: ${form.industry}`,
      `Need: ${form.need}`,
      "",
      form.message,
    ].join("\n");

    window.location.href = `mailto:techal@tiktalink.com?subject=${encodeURIComponent(
      `Tiktalink inquiry - ${form.need}`
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form className="grid gap-4" onSubmit={submit}>
      <input
        aria-hidden="true"
        autoComplete="off"
        className="hidden"
        name="company_website"
        tabIndex={-1}
        value={form.honeypot}
        onChange={(event) => update("honeypot", event.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
          {labels.name}
          <input required className="rounded-2xl border border-[var(--color-border)] px-4 py-3 outline-none transition focus:border-[var(--color-water)]" value={form.name} onChange={(event) => update("name", event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
          {labels.email}
          <input required type="email" className="rounded-2xl border border-[var(--color-border)] px-4 py-3 outline-none transition focus:border-[var(--color-water)]" value={form.email} onChange={(event) => update("email", event.target.value)} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
          {labels.company}
          <input required className="rounded-2xl border border-[var(--color-border)] px-4 py-3 outline-none transition focus:border-[var(--color-water)]" value={form.company} onChange={(event) => update("company", event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
          {labels.website}
          <input type="url" className="rounded-2xl border border-[var(--color-border)] px-4 py-3 outline-none transition focus:border-[var(--color-water)]" value={form.website} onChange={(event) => update("website", event.target.value)} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
          {labels.industry}
          <input className="rounded-2xl border border-[var(--color-border)] px-4 py-3 outline-none transition focus:border-[var(--color-water)]" value={form.industry} onChange={(event) => update("industry", event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
          {labels.need}
          <select className="rounded-2xl border border-[var(--color-border)] px-4 py-3 outline-none transition focus:border-[var(--color-water)]" value={form.need} onChange={(event) => update("need", event.target.value)}>
            {labels.projectTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-[var(--color-text-primary)]">
        {labels.message}
        <textarea required minLength={20} maxLength={4000} rows={5} className="resize-none rounded-2xl border border-[var(--color-border)] px-4 py-3 outline-none transition focus:border-[var(--color-water)]" value={form.message} onChange={(event) => update("message", event.target.value)} />
      </label>
      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      )}
      <button className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--color-water)] px-6 text-sm font-semibold text-[#061018] shadow-[0_12px_32px_rgba(0,217,255,0.22)] transition hover:-translate-y-0.5 hover:bg-[var(--color-water-dark)]" type="submit">
        {labels.submit}
      </button>
    </form>
  );
}
