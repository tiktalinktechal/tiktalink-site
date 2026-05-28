"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type AccountData = {
  account: {
    id: string;
    username?: string;
    name?: string;
    profile_picture_url?: string;
  };
  expectedUsername: string;
  tokenStatus: string;
  connected: boolean;
};

type PublishData = {
  provider: "instagram";
  username: string;
  containerId: string;
  mediaId: string;
  lifecycle: Array<{
    status: string;
    at: string;
    id?: string;
    detail?: string;
  }>;
};

type ApiResult = {
  ok: boolean;
  provider?: "instagram";
  requestId?: string;
  error?: {
    code: string;
    message: string;
    status: number;
    details?: unknown;
  };
  data?: AccountData | PublishData;
};

const initialState = {
  imageUrl: "https://tiktalink.com/test-image.jpg",
  caption: "TiktaLink Instagram API test post",
  hashtags: "tiktalink techal digitaltransformation",
  adminSecret: "",
};

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[var(--color-text-primary)]">
      <span>{label}</span>
      {children}
      {hint ? <span className="text-xs font-normal text-[var(--color-text-muted)]">{hint}</span> : null}
    </label>
  );
}

function StatusBadge({ ok }: { ok?: boolean }) {
  const waiting = typeof ok === "undefined";
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        waiting
          ? "bg-[var(--color-background-soft)] text-[var(--color-text-muted)]"
          : ok
            ? "bg-[var(--color-water-soft)] text-[var(--color-water-dark)]"
            : "bg-red-50 text-red-700"
      }`}
    >
      {waiting ? "Waiting" : ok ? "Success" : "Failed"}
    </span>
  );
}

function isAccountData(data: ApiResult["data"]): data is AccountData {
  return Boolean(data && "account" in data);
}

function isPublishData(data: ApiResult["data"]): data is PublishData {
  return Boolean(data && "mediaId" in data);
}

export function InstagramAdminPanel() {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState<"account" | "publish" | null>(null);
  const [accountResult, setAccountResult] = useState<ApiResult | null>(null);
  const [publishResult, setPublishResult] = useState<ApiResult | null>(null);

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function callApi(path: string, method: "GET" | "POST") {
    const mode = method === "GET" ? "account" : "publish";
    setLoading(mode);

    try {
      const response = await fetch(path, {
        method,
        headers: {
          "content-type": "application/json",
          "x-instagram-admin-secret": form.adminSecret,
        },
        body:
          method === "POST"
            ? JSON.stringify({
                imageUrl: form.imageUrl,
                caption: form.caption,
                hashtags: form.hashtags,
              })
            : undefined,
      });

      const data = (await response.json()) as ApiResult;
      if (mode === "account") setAccountResult(data);
      if (mode === "publish") setPublishResult(data);
    } catch {
      const fallback: ApiResult = {
        ok: false,
        error: {
          code: "admin_panel_request_failed",
          message: "The admin panel could not reach the local API route.",
          status: 500,
        },
      };
      if (mode === "account") setAccountResult(fallback);
      if (mode === "publish") setPublishResult(fallback);
    } finally {
      setLoading(null);
    }
  }

  const account = isAccountData(accountResult?.data) ? accountResult.data : null;
  const publish = isPublishData(publishResult?.data) ? publishResult.data : null;

  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-water-dark)]">
              Account status
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)]">
              Instagram connection
            </h2>
          </div>
          <StatusBadge ok={accountResult?.ok} />
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] p-4">
            <p className="text-xs font-semibold text-[var(--color-text-muted)]">Username</p>
            <p className="mt-2 font-semibold text-[var(--color-text-primary)]">
              {account?.account.username ?? "Not tested"}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] p-4">
            <p className="text-xs font-semibold text-[var(--color-text-muted)]">Account ID</p>
            <p className="mt-2 break-all font-semibold text-[var(--color-text-primary)]">
              {account?.account.id ?? "Not tested"}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] p-4">
            <p className="text-xs font-semibold text-[var(--color-text-muted)]">Token validation</p>
            <p className="mt-2 font-semibold text-[var(--color-text-primary)]">
              {account?.tokenStatus ?? "Not tested"}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="grid gap-5">
          <Field label="Admin Secret" hint="Sent only as a request header to your own API route. It is not the Instagram token.">
            <input
              value={form.adminSecret}
              onChange={(event) => updateField("adminSecret", event.target.value)}
              type="password"
              autoComplete="off"
              className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-water)]"
              placeholder="INSTAGRAM_ADMIN_SECRET"
            />
          </Field>

          <Field label="Image URL" hint="Must be a public HTTPS image URL accessible by Meta.">
            <input
              value={form.imageUrl}
              onChange={(event) => updateField("imageUrl", event.target.value)}
              type="url"
              className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-water)]"
              placeholder="https://tiktalink.com/test-image.jpg"
            />
          </Field>

          <Field label="Caption">
            <textarea
              value={form.caption}
              onChange={(event) => updateField("caption", event.target.value)}
              rows={4}
              className="resize-none rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-water)]"
              placeholder="Caption"
            />
          </Field>

          <Field label="Hashtags" hint="Separate with spaces or commas. # is optional.">
            <input
              value={form.hashtags}
              onChange={(event) => updateField("hashtags", event.target.value)}
              className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-background-soft)] px-4 py-3 text-sm outline-none transition focus:border-[var(--color-water)]"
              placeholder="tiktalink techal"
            />
          </Field>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => callApi("/api/instagram/account", "GET")}
              disabled={loading !== null}
              className="rounded-full border border-[var(--color-border-soft)] bg-white px-5 py-3 text-sm font-semibold text-[var(--color-text-primary)] transition hover:border-[var(--color-water)] hover:bg-[var(--color-water-soft)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading === "account" ? "Testing..." : "Test Account"}
            </button>
            <button
              type="button"
              onClick={() => callApi("/api/instagram/publish", "POST")}
              disabled={loading !== null}
              className="rounded-full bg-[var(--color-water)] px-5 py-3 text-sm font-semibold text-[#061018] shadow-[0_14px_34px_rgba(0,217,255,0.22)] transition hover:bg-[var(--color-water-dark)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading === "publish" ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-deep)] p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-water)]">
              Result status
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
              Publishing response
            </h2>
          </div>
          <StatusBadge ok={publishResult?.ok} />
        </div>

        {publish ? (
          <div className="mt-5 grid gap-3">
            {publish.lifecycle.map((step) => (
              <div key={`${step.status}-${step.at}`} className="rounded-2xl bg-white/8 p-4 text-sm">
                <p className="font-semibold text-white">{step.status}</p>
                <p className="mt-1 text-zinc-300">{step.detail ?? step.id}</p>
              </div>
            ))}
          </div>
        ) : null}

        {publishResult?.error ? (
          <div className="mt-5 rounded-2xl border border-red-300/30 bg-red-500/10 p-4 text-sm text-red-100">
            <p className="font-semibold">{publishResult.error.message}</p>
            <p className="mt-1 text-red-200">{publishResult.error.code}</p>
          </div>
        ) : null}

        <pre className="mt-5 max-h-80 overflow-auto rounded-2xl bg-white/8 p-4 text-xs leading-6 text-zinc-200">
          {JSON.stringify(publishResult ?? accountResult ?? { ok: false, status: "waiting" }, null, 2)}
        </pre>
      </section>
    </div>
  );
}
