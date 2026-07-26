# Business Card Website

Personal business card website. Built with Next.js 16 and deployed on Vercel.

## Tech Stack

- **Framework** - Next.js 16 (App Router)
- **Language** - TypeScript
- **Styling** - CSS Modules + custom-property design tokens
- **Fonts** - Space Mono + IBM Plex Sans via `next/font`
- **Forms** - React Hook Form + Zod
- **Email** - Resend
- **Testing** - Vitest
- **Analytics** - Vercel Analytics + Speed Insights
- **Package manager** - pnpm

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command          | Description                        |
| ---------------- | ---------------------------------- |
| `pnpm dev`       | Start development server           |
| `pnpm build`     | Production build                   |
| `pnpm start`     | Start production server            |
| `pnpm test`      | Run tests                          |
| `pnpm lint`      | Lint with ESLint                   |
| `pnpm typecheck` | Type-check with TypeScript         |
| `pnpm format`    | Format with Prettier               |
| `pnpm validate`  | Format, lint, typecheck, and build |

## Design System

Tokens live in `src/app/globals.css` under `:root` - one flat violet palette, hard
borders, zero border-radius. Two typefaces: Space Mono for UI chrome and headings,
IBM Plex Sans for prose (`--font-mono` / `--font-sans`).

Foreground tokens are chosen to clear **WCAG AA - 4.5:1 for body text, 3:1 for
large text and non-text UI**. `--ink-5` is decorative only and fails AA for text.
Re-check with a contrast checker after changing any colour.

## Project Structure

```
src/
  app/          # App Router pages, layout, OG image, sitemap, robots
  assets/fonts/ # Font binary read at build time by the OG image
  components/   # layout/, sections/, ui/
  hooks/        # Custom React hooks
  lib/          # content/, services/, inquiry/, config, seo, nav
  types/        # Ambient type declarations
public/         # Images (webp)
docs/agents/    # Agent docs
```

All user-facing copy is centralised in `src/lib/content/` and
`src/lib/services/data.ts` rather than inlined in components.

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```
RESEND_API_KEY=           # Resend API key for the inquiry form
CONTACT_SENDER_EMAIL=     # Address the notification is sent from
CONTACT_RECIPIENT_EMAIL=  # Address the notification is delivered to
```

`CONTACT_SENDER_EMAIL` can be omitted in development - Resend's
`onboarding@resend.dev` works without domain verification. In production it must be
a verified address on your Resend domain.

## Pre-commit Hooks

Husky runs two steps on every commit:

1. `lint-staged` - `eslint --fix` on staged JS/TS, Prettier on everything else
2. `pnpm validate` - Prettier, ESLint, `tsc --noEmit`, and a full `next build`

The production build runs on every commit, so expect commits to take a while.

## Deployment

Deployed on Vercel. Every push to `main` triggers a production deploy automatically.
