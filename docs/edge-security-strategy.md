# Edge Security and Abuse Mitigation Strategy

Tiktalink is a public marketing and lead-generation website. The security model should stay defensive, transparent, and privacy-conscious.

## Layers

1. Browser delivery
   - CSP
   - HSTS
   - clickjacking protection
   - reduced browser permissions
   - strict referrer policy

2. Application validation
   - normalized contact payloads
   - honeypot field
   - minimum completion time
   - message length limits
   - spam-signal placeholders
   - status-code-only API responses for automation

3. Edge controls
   - Cloudflare WAF managed rules
   - Turnstile on `/api/contact` if spam appears
   - rate limits on API routes
   - suspicious path blocking for scanner routes
   - emergency Under Attack Mode only during active incidents

4. Future Zero Trust
   - protect any future admin or dashboard route with identity-aware access
   - do not rely on Next.js proxy as the only authorization layer
   - revalidate authorization in route handlers or server components

## Turnstile Readiness

Environment variables are reserved:

- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

When enabled, verify Turnstile tokens server-side inside `/api/contact` before sending email. Keep the current honeypot and timing checks as low-friction defense-in-depth.

## AI Crawler Management

Do not block AI crawlers by default. Maintain:

- `/robots.txt`
- `/llms.txt`
- `/ai.txt`

If abuse appears, rate limit aggressive crawlers at Cloudflare rather than blocking the entire category.
