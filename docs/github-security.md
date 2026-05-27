# GitHub Security Checklist

- Enable two-factor authentication for every maintainer.
- Protect the `main` branch before production launch.
- Require pull requests for future team work.
- Do not commit `.env`, `.env.local`, `.env.production`, secrets, API keys, or private credentials.
- Use `.env.example` for safe placeholders.
- Enable Dependabot alerts if available.
- Review package vulnerabilities with `npm audit`.
- Do not blindly apply breaking dependency upgrades without testing.
- Rotate secrets if they are ever exposed.
- Keep repository access limited to people who need it.

The current `.gitignore` should include:

- `.env`
- `.env.local`
- `.env.production`
- `node_modules`
- `.next`
- `.vercel`
