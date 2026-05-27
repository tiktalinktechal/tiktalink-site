# Vercel Deployment Hardening

## Import

- Import the GitHub repository into Vercel.
- Framework preset: Next.js.
- Install command: `npm install`.
- Build command: `npm run build`.
- Production branch: `main`.

## Domain

- Add `tiktalink.com`.
- Add `www.tiktalink.com` and redirect it to `https://tiktalink.com`.
- Keep `https://tiktalink.com` as canonical in metadata and sitemap.
- Use Cloudflare DNS with SSL/TLS set to Full Strict.

## Environment Variables

Add only real values:

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_CLARITY_ID`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`
- `SENTRY_DSN`
- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

## Launch Checks

- Confirm `npm run build` passes locally and in Vercel.
- Confirm `/sitemap.xml`, `/robots.txt`, `/llms.txt`, and `/ai.txt` load.
- Confirm all locale routes resolve.
- Confirm Cloudflare redirects do not create loops.
- Enable Vercel Analytics and Speed Insights only if privacy requirements are ready.
