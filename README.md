# BYU AI in Finance

A modern React/TypeScript website foundation for BYU AI in Finance, a student organization focused on the intersection of artificial intelligence and finance.

## Setup

```bash
npm install
npm run dev
```

The local site runs through Vite. The production build command is:

```bash
npm run build
```

## Project Structure

- `src/App.tsx` contains the current page routes and reusable UI components.
- `src/types/` defines future-friendly content interfaces.
- `src/data/site.ts` contains seed/mock club content.
- `src/services/contentService.ts` is the handoff layer where mock data can later be replaced with Supabase, Firebase, or another database.
- `src/styles.css` contains centralized visual tokens and responsive styling.
- `public/hero-ai-finance.png` is the temporary homepage visual asset.
- `BYU_AI_in_Finance_Codex_Build_Spec.md` is the copied background build specification.

## Editing Club Information

Update `siteSettings` in `src/data/site.ts` to change the club name, contact email, join link, and social links. Replace `public/hero-ai-finance.png` when final photography or brand assets are available.

Mock content also lives in `src/data/site.ts`:

- `mockEvents`
- `mockResources`
- `mockJobs`
- `mockLeaders`

These records are intentionally realistic seed records, not production data.

## Leader Headshots

Save finished leader photos in `public/leaders/`, then reference them from the matching `mockLeaders` record in `src/data/site.ts`.

Use the repeatable crop helper to make square, avatar-ready images:

```bash
npm run headshot -- -Source "C:\path\to\photo.png" -Output "public\leaders\leader-name.png" -Zoom 1.3 -OffsetY -0.05 -Preview
```

Adjust `-Zoom` up for a tighter face crop and down for more shoulders. Use small `-OffsetX` or `-OffsetY` values, such as `0.05` or `-0.05`, to re-center the subject.

## Environment Variables

Copy `.env.example` to `.env.local` if you want local overrides:

```bash
VITE_JOIN_URL=
VITE_LINKEDIN_URL=
VITE_INSTAGRAM_URL=
VITE_CONTACT_EMAIL=
```

Do not commit secrets. These values are public links only.

## Database Plan

Version 1 uses local mock data. A later database integration should replace the service methods in `src/services/contentService.ts`, while leaving visual components mostly unchanged.

Suggested future tables:

- `events`
- `resources`
- `jobs`
- `leaders`
- `site_settings`

Supabase is a good fit when the club is ready for managed database and authentication.

## Admin Authentication Plan

The `/admin` route is a visual dashboard prototype. It is not protected yet and does not write to a backend. Do not add a frontend-only password. When admin functionality becomes real, use managed authentication with authorized admin users, sessions, protected routes, and logout.

## Deployment

This project includes a GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

In the GitHub repository, go to **Settings > Pages** and set **Build and deployment** to **GitHub Actions**. After that, every push to `main` will build and deploy the site automatically.

The expected GitHub Pages URL is:

```text
https://mckinnonjason.github.io/AIFwebsite/
```

The workflow also copies `dist/index.html` to `dist/404.html` so refreshed client-side routes such as `/events` and `/admin` continue to work on GitHub Pages.
