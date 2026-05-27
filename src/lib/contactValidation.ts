export type ContactPayload = {
  name: string;
  email: string;
  company: string;
  website?: string;
  industry?: string;
  need: string;
  message: string;
  startedAt: number;
  honeypot?: string;
};

export type ContactValidationResult = {
  ok: boolean;
  errors: string[];
};

const spamSignals = [
  "crypto investment",
  "casino bonus",
  "free money",
  "loan offer",
  "viagra",
  "wp-admin",
  "phpmyadmin",
];

export function validateContactPayload(payload: Partial<ContactPayload>): ContactValidationResult {
  const errors: string[] = [];
  const now = Date.now();

  const name = normalizeInput(payload.name, 160);
  const company = normalizeInput(payload.company, 200);
  const email = normalizeInput(payload.email, 240);
  const website = normalizeInput(payload.website, 400);
  const need = normalizeInput(payload.need, 160);
  const message = normalizeInput(payload.message, 4000);

  if (payload.honeypot) errors.push("bot_signal");
  if (!payload.startedAt || now - Number(payload.startedAt) < 2500) {
    errors.push("completion_too_fast");
  }
  if (!name || name.length < 2) errors.push("name_required");
  if (!company || company.length < 2) errors.push("company_required");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("email_invalid");
  }
  if (website) {
    try {
      new URL(website);
    } catch {
      errors.push("website_invalid");
    }
  }
  if (!need || need.length < 2) errors.push("need_required");
  if (!message || message.length < 20) {
    errors.push("message_too_short");
  }
  if (message && message.length > 4000) {
    errors.push("message_too_long");
  }

  const searchable = `${name} ${company} ${message}`.toLowerCase();
  if (spamSignals.some((signal) => searchable.includes(signal))) {
    errors.push("spam_signal");
  }

  return { ok: errors.length === 0, errors };
}
import { normalizeInput } from "@/lib/security";
