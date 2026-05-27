# Dependency Review

Last reviewed: 2026-05-27

## Current Stack

- Next.js `16.2.6`
- React `19.2.4`
- React DOM `19.2.4`
- Framer Motion `12.40.0`
- Tailwind CSS `4`

These versions keep the project on the current Next.js App Router line and patched React 19.2 runtime.

## npm audit result

`npm audit --audit-level=moderate` reported a moderate PostCSS advisory through Next.js bundled dependencies.

The automated suggested fix is not safe because it proposes a breaking/downgrade path. Do not run `npm audit fix --force` blindly.

Recommended action:

- Monitor the Next.js release notes for the next stable patched version.
- Upgrade Next.js normally when a stable fix is released.
- Re-run `npm run lint`, `npm run build`, and `npm audit` after dependency updates.
