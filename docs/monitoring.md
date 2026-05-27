# Monitoring and Analytics Readiness

No analytics provider is active until real environment variables are configured.

## Prepared Providers

- Google Analytics: `NEXT_PUBLIC_GA_ID`
- Google Search Console: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- Microsoft Clarity: `NEXT_PUBLIC_CLARITY_ID`
- PostHog: `NEXT_PUBLIC_POSTHOG_KEY`
- Plausible: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- Meta Pixel: `NEXT_PUBLIC_META_PIXEL_ID`
- LinkedIn Insight Tag: `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`
- Sentry: `SENTRY_DSN`

## Internal Hooks

`src/lib/analytics.ts` provides safe placeholder functions:

- `trackEvent()`
- `trackLead()`
- `trackContactSubmit()`
- `trackLanguageChange()`

These functions currently dispatch local browser events only. Wire them to the chosen provider after consent and privacy requirements are finalized.

## Recommended Production Setup

- Enable Vercel Web Analytics if desired.
- Enable Vercel Speed Insights for performance monitoring.
- Add Sentry only after a real DSN is available.
- Add a cookie consent system before marketing pixels or non-essential analytics in regulated markets.
- Review logs for `/api/contact` validation failures and Cloudflare WAF events.
