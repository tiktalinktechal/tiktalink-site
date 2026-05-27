# Performance Strategy

Target: Lighthouse 95+ on production hosting with Vercel and Cloudflare correctly configured.

## Current Performance Foundations

- Static generation for localized marketing pages.
- No external images or video payloads.
- CSS-driven visual system.
- Minimal dependencies.
- No analytics scripts enabled without environment configuration.
- Framer Motion limited to high-value motion areas.
- Reduced-motion CSS support.

## Core Web Vitals Focus

- LCP: keep hero text and CSS visuals lightweight.
- CLS: avoid late-loading images and unstable card dimensions.
- INP: keep interactive client components isolated to navbar, language switcher, motion sections, and contact form.
- TBT: avoid adding heavy third-party scripts until consent and measurement are ready.

## Future Optimization

- Add Vercel Speed Insights in production.
- Use bundle analysis before adding chat, analytics, or AI widgets.
- Lazy-load any future AI assistant or dashboard preview.
- Keep public marketing pages statically generated where possible.
