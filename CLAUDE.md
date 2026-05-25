# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (also used in CI/VPS)
npm run lint     # ESLint check
npm run start    # Start production server (after build)
```

No test framework is configured.

## Environment

Copy `.env.example` to `.env.local` and fill in values before running locally:

- `NEXT_PUBLIC_APP_URL` — base URL (e.g. `http://localhost:3000` for dev, `https://ameizze.com` for prod)
- `STRIPE_SECRET_KEY` — server-side Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — client-side Stripe key

## Architecture

This is a Next.js 16 e-commerce storefront for Ameizze 3D (premium 3D-printed desk accessories). Dark-themed, orange (`#f97316`) accent.

### Data layer — no database

All products are hardcoded in `src/lib/products.ts`. Adding a product means adding an entry to that array. **Prices are stored in cents** (integers). Use `formatPrice(cents)` from the same file to display them.

### Cart state

`src/store/cart.ts` — Zustand store with `persist` middleware writing to `localStorage` under the key `ameizze-cart`. The store is consumed only in Client Components (`"use client"`). The cart holds `CartItem[]` (product + quantity); `totalPrice()` returns cents.

### Stripe checkout flow

1. User clicks "Checkout" in `/cart` → POST to `/api/checkout` with `{ items: CartItem[] }`
2. `/api/checkout/route.ts` creates a Stripe Checkout Session (Hosted Checkout) with `price_data` built from cart items
3. Client redirects to `session.url` (Stripe-hosted page)
4. On success, Stripe redirects to `/success?session_id=...`; the success page clears the cart

The Stripe API version in use is `2026-04-22.dahlia` — check `node_modules/stripe/types` for the matching type signatures.

### Page routes

| Route | Rendering | Notes |
|---|---|---|
| `/` | Server | Homepage — hero, 3 featured products, about |
| `/products` | Server | Full product grid |
| `/products/[slug]` | Client | Product detail, uses `getProduct(slug)` |
| `/cart` | Client | Cart review + Stripe redirect |
| `/success` | Client | Post-purchase confirmation, clears cart |
| `/api/checkout` | Server (Route Handler) | Stripe session creation |

### Styling

Tailwind CSS v4 (PostCSS plugin — `@tailwindcss/postcss`). v4 has **breaking changes** from v3: no `tailwind.config.js`, configuration is done in CSS via `@theme` in `src/app/globals.css`. Font: Geist (Google Fonts, loaded via `next/font`).

### Deployment

Push to `main` triggers GitHub Actions (`.github/workflows/deploy.yml`), which builds and SSHs into the Hostinger VPS at `/var/www/ameizze`, then restarts the app with `pm2 restart ameizze`. Required GitHub secrets: `VPS_HOST`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_PORT`.
