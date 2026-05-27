type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

function canTrack() {
  return typeof window !== "undefined";
}

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}) {
  if (!canTrack()) return;

  window.dispatchEvent(
    new CustomEvent("tiktalink:analytics", {
      detail: {
        eventName,
        payload,
        timestamp: new Date().toISOString(),
      },
    })
  );
}

export function trackLead(payload: AnalyticsPayload = {}) {
  trackEvent("lead_intent", payload);
}

export function trackContactSubmit(payload: AnalyticsPayload = {}) {
  trackEvent("contact_submit", payload);
}

export function trackLanguageChange(locale: string) {
  trackEvent("language_change", { locale });
}
