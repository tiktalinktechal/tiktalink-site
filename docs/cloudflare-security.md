# Cloudflare Security Configuration

Canonical production domain: `https://tiktalink.com`

This guide describes defensive Cloudflare settings for Tiktalink after the Vercel deployment is connected. Do not block legitimate search engines or AI crawlers blindly; monitor first, then tighten rules based on real traffic.

## SSL/TLS

- SSL/TLS mode: `Full (strict)`
- Always Use HTTPS: `On`
- Automatic HTTPS Rewrites: `On`
- Minimum TLS Version: `TLS 1.2` or higher
- HSTS: enable only after HTTPS is confirmed stable on the production domain

## WAF

- Enable Cloudflare Managed Rules.
- Enable OWASP managed rules if available on the active plan.
- Review false positives before moving rules from log/challenge to block.
- Add a WAF rule to block requests containing `x-middleware-subrequest` if unusual traffic appears.

## Bot Protection

- Enable Bot Fight Mode or Super Bot Fight Mode if the plan supports it.
- Allow known search engines and legitimate AI crawlers when they respect robots and rate limits.
- Monitor crawl behavior before adding broad country or user-agent blocks.

## Rate Limiting

Recommended future rules:

- `/api/contact`: limit repeated submissions by IP per minute.
- `/api/*`: apply reasonable API protection once new endpoints exist.
- `/api/digital-evolution-audit`: protect any future analyzer endpoint.
- `/admin/*` or login endpoints: challenge or rate limit if an admin area is ever added.

Example starting point for `/api/contact`: challenge or block after a small burst from the same IP within one minute. Tune after observing real contact volume.

## Firewall Rules

Suggested defensive blocks:

- Block repeated requests to `/wp-admin`, `/xmlrpc.php`, `/phpmyadmin`, `/.env`, `/.git`, and obvious scanner paths.
- Challenge suspicious automated traffic only after confirming it is not legitimate indexing.
- Avoid broad country blocking unless abuse clearly requires it.

## DDoS

Cloudflare DDoS protection is automatic. Use Under Attack Mode only during an active incident because it can add friction for real visitors.

## Cache

- Cache static assets aggressively.
- Do not cache dynamic API responses.
- Keep Vercel-generated static assets on immutable cache behavior.

## Redirects

- Redirect HTTP to HTTPS.
- Redirect `www.tiktalink.com` to `https://tiktalink.com` unless the brand later chooses `www` as canonical.
- Keep `https://tiktalink.com` as the canonical domain in sitemap, metadata, and Search Console.
