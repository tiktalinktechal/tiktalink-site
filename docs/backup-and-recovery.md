# Backup and Recovery Strategy

## Code Backup

- Use GitHub as the primary source-code backup.
- Protect the main branch before launch.
- Keep `.env` files out of Git.

## Deployment Recovery

- Vercel deployments act as release snapshots.
- To roll back, open the Vercel project, choose a known-good deployment, and promote it to production.
- Keep production environment variables documented outside the repository in a secure password manager.

## Cloudflare Recovery

- Export DNS records after the domain is configured.
- Document page rules, redirects, WAF rules, and rate limits.
- Review DNS and WAF settings monthly.

## Monthly Checklist

- Confirm GitHub repository access and 2FA.
- Review Vercel deployment health.
- Export or document Cloudflare DNS changes.
- Review environment variables for stale or unused keys.
- Run `npm audit` and review package updates.
- Confirm legal pages and contact email are still accurate.
