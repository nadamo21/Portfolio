# Nada Mohamed — Data Analyst portfolio

Personal portfolio for Nada Mohamed, Data Analyst (Power BI, SQL, DAX, Python).
Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Motion · Lucide.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Where the content lives

| What | File |
| --- | --- |
| Name, links, WhatsApp number, nav | `src/lib/site.ts` |
| Dashboards + case studies | `src/lib/work.ts` |
| Experience, education, certifications, skills, reviews | `src/lib/profile.ts` |
| Dashboard recreations (static HTML, dummy data) | `src/content/dashboards/NN.html` |
| Profile photo | `public/images/nada.jpg` |

The 16 dashboards are the HTML/CSS recreations from the original site
(`nadamo21.github.io/Portfolio`), rendered at their 980px design width and scaled to fit
by `src/components/work/DashboardFrame.tsx`. Their styles are the `.dash-root` block at the
end of `src/app/globals.css`.

**To add a dashboard:** drop `NN.html` into `src/content/dashboards`, add an entry to
`dashboards` in `src/lib/work.ts`, and reference its id from a case study.

**To add a case study:** add an entry to `caseStudies` in `src/lib/work.ts` — the
`/work/[slug]` page, sitemap entry and home-page card are generated from it. Set
`featured: true` to show it as a large card.

## WhatsApp

Every WhatsApp button uses `WhatsAppButton` (`src/components/ui/WhatsAppButton.tsx`) or
`whatsappUrl()` from `src/lib/site.ts`. The number is set once, in `site.ts`.

## WP Direct integration (ready, not yet connected)

No WP Direct API documentation or credentials were available, so the integration is built
but switched off:

- `src/lib/wpdirect.ts` — server-only service. Reads config from env vars, sends the
  contact-form message, handles timeouts and errors. The request body is built in
  `buildPayload()` — **adjust that one function** to match WP Direct's real API contract.
- `src/app/api/contact/route.ts` — validates input, honeypot + rate limit, calls the service.
- `src/components/sections/ContactForm.tsx` — posts to `/api/contact`. While WP Direct is
  unconfigured (or failing), it opens WhatsApp with the same message pre-filled, so no
  enquiry is ever lost.

To connect it:

1. Copy `.env.example` to `.env.local` (locally) and fill in `WPDIRECT_API_URL` and
   `WPDIRECT_API_KEY`, plus the auth header/scheme and instance id if WP Direct needs them.
2. On Vercel: Project → Settings → Environment Variables → add the same keys, then redeploy.
3. Update `buildPayload()` in `src/lib/wpdirect.ts` if the API expects different field names.

Credentials are only ever read on the server — never prefix them with `NEXT_PUBLIC_`.

## Deployment

Deployed on Vercel. Set `NEXT_PUBLIC_SITE_URL` to the production URL so canonical links,
Open Graph tags and the sitemap point at the right domain.
