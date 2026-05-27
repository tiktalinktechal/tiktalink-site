# Tiktalink Website

Official website for **Tiktalink TechAl**, a digital evolution systems company building AI-ready infrastructure for modern businesses.

Tiktalink helps companies move from outdated digital presence to connected systems across web, Google visibility, SEO, AI, automation, software, analytics, catalogs, and multilingual business infrastructure.

## Tech Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- Framer Motion
- Route-based internationalization
- Static sitemap and robots generation
- JSON-LD structured data
- Vercel-ready deployment structure

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm run start
```

## Internationalization

Localized routes:

- `/en`
- `/fr`
- `/de`
- `/es`
- `/pt`
- `/sv`
- `/tr`
- `/ar`

Translations live in `messages/*.json`. Locale routing, persistence, RTL direction, and hreflang metadata are handled through `src/i18n` and `src/proxy.ts`.

## SEO Infrastructure

Implemented:

- Localized metadata
- Canonical URLs
- hreflang alternates
- Organization and WebSite JSON-LD
- `sitemap.xml`
- `robots.txt`
- OpenGraph image route
- App icon placeholder
- Official social `sameAs` links

## Environment Variables

Copy `.env.example` when analytics or verification tools are ready:

```bash
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_LINKEDIN_PARTNER_ID=
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
SENTRY_DSN=
RESEND_API_KEY=
CONTACT_TO_EMAIL=techal@tiktalink.com
CONTACT_FROM_EMAIL=
```

No fake tracking IDs are included.

## Deployment

Recommended deployment path:

1. Push this repository to GitHub.
2. Import the project into Vercel.
3. Set the production domain to `tiktalink.com`.
4. Point Cloudflare DNS to the Vercel deployment target.
5. Add real analytics and verification IDs only after accounts are created.

Detailed deployment and security notes live in:

- `docs/vercel-deployment.md`
- `docs/cloudflare-security.md`
- `docs/github-security.md`
- `docs/backup-and-recovery.md`
- `docs/monitoring.md`
- `docs/ai-seo-strategy.md`
- `docs/edge-security-strategy.md`
- `docs/performance-strategy.md`

## Brand System

The interface follows the official Tiktalink balance:

- 60% white/light foundation
- 20% Evolution Cyan
- 15% Volcanic Earth
- 5% Neural Purple

Primary tokens live in `src/app/globals.css`.

## Roadmap

- Wire the validated contact endpoint to a real email provider
- CMS-backed insights
- Case studies after real client results exist
- Cookie consent manager when analytics/marketing tools are enabled
- Dedicated service pages
- Dynamic OG images per insight article

## Production Hardening

Implemented foundations:

- Security headers and CSP in `next.config.ts`
- Contact API placeholder with honeypot, timestamp, validation, and provider-ready environment variables
- Edge security and Turnstile-ready architecture for Cloudflare
- AI-readable files at `/llms.txt` and `/ai.txt`
- Programmatic industry SEO pages under `/:locale/industries/:slug`
- Digital Evolution Engine concept page under `/:locale/digital-evolution-engine`
- Monitoring hooks in `src/lib/analytics.ts`
