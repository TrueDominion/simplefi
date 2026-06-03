# SimpleFi

A structured financial education platform. Seven tracks. One complete curriculum.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS with custom design tokens
- **Fonts**: Syne + Syne Mono via `next/font`
- **Icons**: Tabler Icons
- **Animation**: Framer Motion
- **State**: Zustand with localStorage persistence
- **Auth**: NextAuth.js (magic link + Google OAuth)
- **Payments**: Stripe (subscriptions + webhooks)
- **Deployment**: Vercel-ready

## Setup

```bash
npm install
cp .env.example .env.local
# Fill in .env.local values
npm run dev
```

## Environment Variables

See `.env.example` for all required variables:

| Variable | Description |
|---|---|
| `NEXTAUTH_URL` | App URL (http://localhost:3000 for local) |
| `NEXTAUTH_SECRET` | Generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `EMAIL_SERVER` | SMTP connection string |
| `EMAIL_FROM` | From address for magic link emails |
| `STRIPE_SECRET_KEY` | Stripe secret key (sk_test_...) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_MONTHLY` | Stripe price ID for monthly plan |
| `STRIPE_PRICE_ANNUAL` | Stripe price ID for annual plan |
| `NEXT_PUBLIC_APP_URL` | Public app URL |

## Stripe Setup

1. Create two products in Stripe dashboard: Pro Monthly ($12) and Pro Annual ($99)
2. Copy the price IDs into `STRIPE_PRICE_MONTHLY` and `STRIPE_PRICE_ANNUAL`
3. Add webhook endpoint: `{your-url}/api/stripe/webhook`
4. Subscribe to: `checkout.session.completed`, `customer.subscription.deleted`
5. Copy webhook signing secret into `STRIPE_WEBHOOK_SECRET`

Test webhooks locally:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Content

All curriculum content lives in `/content`:

- `tracks.json` — 7 track definitions
- `lessons/t{XX}-l{YY}.json` — 35 lesson files

To add a lesson: create a new JSON file following the schema in `/types/index.ts`.

## Architecture Notes

- **Progress** is stored in Zustand + localStorage (no backend in v1). For production, migrate to a database.
- **Auth sessions** use JWT strategy. Subscription tier in v1 is set client-side after Stripe webhook. For production, persist plan to a database and read it in the JWT callback.
- **Route structure**: `/app/app/` maps to authenticated routes. Next.js route groups `(auth)` and `(app)` keep the folder structure clean.

## Curriculum

| Track | Title | Tier |
|---|---|---|
| T01 | Money fundamentals | Free |
| T02 | Risk & allocation | Pro |
| T03 | Asset classes | Pro |
| T04 | Portfolio construction | Pro |
| T05 | Equity & valuation | Pro |
| T06 | Debt, credit & fixed income | Pro |
| T07 | Derivatives & advanced instruments | Pro |

## Design Tokens

All tokens defined in `tailwind.config.ts` and `styles/globals.css`. Key values:

- `ink` (#0D0D0C) — primary text and dark elements
- `cream` (#F1EFE8) — background
- `teal` (#1D9E75) — complete states, progress
- `amber` (#EF9F27) — accents, pro tier
- `stone` (#888780) — secondary text
- `warm` (#D3D1C7) — borders, dividers
