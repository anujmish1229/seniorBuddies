# Senior Buddies

Website for **Senior Buddies**, a youth-led nonprofit in Durham Region, Ontario, that pairs youth volunteers with seniors to reduce loneliness and build connections across generations. The organization has run since 2022.

**Live site:** https://seniorbuddiesdurham.ca

![Senior Buddies home page](docs/screenshot.png)
<!-- TODO: add a 1280×800 screenshot of the home page at docs/screenshot.png -->

## Who it's for

- **Youth volunteers** looking to join and sign up for events
- **Seniors and their families** who want to take part
- **Community partners and donors** learning about the program and team

## My role

I'm a board member of Senior Buddies, and I built and maintain the website: design, React front end, the Eventbrite integration via a Netlify Function, Netlify Forms for sign-ups, and deployment.

## Features

- **Live events from Eventbrite.** A Netlify Function proxies the Eventbrite API, so the API key never reaches the browser. If the API is unavailable, the Events page falls back to bundled example events.
- **Volunteer, senior and contact forms** handled by Netlify Forms (no backend), with honeypot spam protection.
- **Team page** driven by `src/data/team-members.json`, with WebP photos.
- Responsive layout, SEO and Open Graph meta tags, client-side routing.

## Tech stack

| Layer      | Choice                                                  |
| ---------- | ------------------------------------------------------- |
| Framework  | React 19 + TypeScript                                   |
| Build tool | Vite 8                                                  |
| Routing    | React Router 7                                          |
| Styling    | Tailwind CSS 4 + shadcn/ui (Radix) primitives           |
| Data       | TanStack Query                                          |
| Serverless | Netlify Functions (Eventbrite proxy), Netlify Forms     |
| Hosting    | Netlify (auto-deploys from `main`)                      |
| CI         | GitHub Actions: lint, typecheck, build                  |

## Architecture

```
Browser (React SPA)
   │
   ├── static assets ─────────────► Netlify CDN (dist/)
   │
   ├── GET /.netlify/functions/eventbrite-events?range=upcoming|past
   │        └─► Netlify Function ──► Eventbrite API (EVENTBRITE_API_KEY, server-side only)
   │
   └── POST form submissions ─────► Netlify Forms
                                     (forms declared as hidden <form>s in index.html
                                      so Netlify detects them at build time)
```

```
index.html                 HTML shell, meta tags, hidden Netlify form definitions
netlify.toml               Build command, SPA redirect, `netlify dev` settings
netlify/functions/         eventbrite-events.js (see its README)
public/                    _redirects, favicon, robots.txt
src/
  App.tsx                  Route table
  pages/                   Index, About, Team, Events, Contact, Join, NotFound
  components/              Layout, Navbar, Footer, icons/, ui/ (shadcn)
  hooks/use-netlify-form.ts  Submits forms to Netlify
  data/                    team-members.json, events-fallback.json
  assets/                  WebP images
```

## Local setup

Requires Node.js 20.19+ or 22.12+ (see `.nvmrc`) and npm.

```bash
git clone https://github.com/anujmish1229/seniorBuddies.git
cd seniorBuddies
npm install
npm run dev              # http://localhost:8080 (frontend only; events use fallback data)
```

To run the Eventbrite function locally as well, use the Netlify CLI:

```bash
npx netlify-cli dev      # serves the site and /.netlify/functions/*
```

| Script              | What it does                       |
| ------------------- | ---------------------------------- |
| `npm run dev`       | Vite dev server                    |
| `npm run build`     | Production build into `dist/`      |
| `npm run preview`   | Serve the production build         |
| `npm run lint`      | ESLint                             |
| `npm run typecheck` | TypeScript type check              |

## Environment variables

Set these in the Netlify dashboard (Site configuration → Environment variables), or in a local `.env` for `netlify dev`:

| Name                 | Used by                     | Purpose                     |
| -------------------- | --------------------------- | --------------------------- |
| `EVENTBRITE_API_KEY` | `netlify/functions` (server) | Eventbrite private API token |

The frontend uses no environment variables.
