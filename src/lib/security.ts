export type AbuseSignal = {
  type: "honeypot" | "speed" | "validation" | "spam" | "rate_limit_ready";
  severity: "low" | "medium" | "high";
  detail?: string;
};

export function normalizeInput(value: unknown, maxLength = 4000) {
  if (typeof value !== "string") return "";
  return value.replace(/\s+/g, " ").trim().slice(0, maxLength);
}

export function createAbuseSignal(signal: AbuseSignal) {
  return {
    ...signal,
    observedAt: new Date().toISOString(),
  };
}

export function getClientFingerprintHeaders(request: Request) {
  return {
    forwardedFor: request.headers.get("x-forwarded-for") ?? "",
    userAgent: request.headers.get("user-agent") ?? "",
    cfRay: request.headers.get("cf-ray") ?? "",
    country: request.headers.get("cf-ipcountry") ?? "",
  };
}
