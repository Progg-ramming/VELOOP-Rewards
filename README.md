# VELOOP Rewards Giveaway

## Project Overview

VELOOP Rewards is a premium, trustworthy giveaway experience for discovering rewards, understanding participation rules, joining a giveaway, tracking a countdown, and moving through winner notification and prize claim. The interface uses the supplied reward artwork with a restrained navy, violet, and warm-gold visual system so it feels like a real rewards platform rather than a casino or promotional landing page.

## Giveaway Concept

The current fictional campaign, **The Good News Giveaway**, gives VELOOP members a simple path:

`Discover rewards -> understand the rules -> join -> earn entries -> track the countdown -> see winners -> claim a prize`

All statistics, users, prizes, and announcements in this frontend are clearly mock development data.

## Features

- Premium hero/banner with gift artwork and primary participation CTA
- Active giveaway status bar and live countdown
- Responsive featured reward cards for iPhone, Apple Watch, AirPods, and Amazon Gift Card
- Visitor and participant CTA states with entry feedback
- Auto-rotating winner announcement slider with manual controls
- Current winners and masked previous winner tabs
- Winner matching for demo user `VE10025`
- Physical prize claim modal with name, phone, address, city, state, and PIN fields
- Prize-type-driven claim configuration for gift cards and physical rewards
- Claim verification and submitted states
- Trust, rules, FAQ, and participation sections
- Mobile navigation and horizontal reward card scrolling
- Accessible labels, focus states, tabs, buttons, modal dismissal, and image alt text
- Local footer control for previewing the ended/winner lifecycle

## Giveaway States

The default state is an active giveaway with a live countdown and no public current winners. The **Preview ended state** footer control demonstrates the ended state, winner reveal, and matched winner claim action. The data model is structured for future `active`, `ended`, and `upcoming` records.

| State | User experience |
| --- | --- |
| Active | Countdown, reward cards, join CTA, and winner announcement messaging |
| Ended | Winner reveal panel, winner list, and claim action for the matched winner |
| Previous winners | Masked winner history with prize, giveaway, date, and status |
| Participant | “You’re participating”, entry count, and earn-more feedback |
| Non-winner | Winner history and future participation path without claim access |

## Winner System

Current winner records contain a private `userId`, masked `displayId`, prize reference, and winner status. The UI matches the current demo user against the winner record and renders a claim button only for that matching record. Public winner history never exposes email addresses, phone numbers, or physical addresses.

The current mock distribution demonstrates one iPhone winner and multiple winners for the other prize categories through configurable `winners` values in the prize data.

## Prize Claim System

Claim forms are selected from the prize `type` and `claimLabel` configuration:

- `physical`: full name, phone, address, city, state, and PIN
- `giftCard`: email address only
- `digital`: ready for account-email delivery when connected to an API

The current modal includes winner verification, a seven-day claim message, validation, and claim submitted confirmation. Claim processing, delivered, and expired states are intended backend-driven states for the next integration step.

## Individual Giveaway Details

Every reward card links to a dedicated route before any participation is recorded:

- `/giveaway/iphone-15-pro` — `250 VEs`
- `/giveaway/apple-watch-series-9` — `200 VEs`
- `/giveaway/airpods-pro-2` — `500 SVEs`
- `/giveaway/amazon-2000-voucher` — `500 VEs`
- `/giveaway/amazon-500-voucher` — `300 VEs`
- `/giveaway/amazon-20-voucher` — `2,000 Tokens`

The details page shows the prize, countdown, duration, participants, winner count, eligibility, entry fee, available balance, balance-after-joining, prize information, participation timeline, important information, terms, and claim guidance. Joining opens a confirmation modal and only succeeds after the terms checkbox is acknowledged. Insufficient balances show the exact shortfall and an `Earn more` CTA instead of allowing participation.

## Technology Stack

- React 19
- Vite
- Bootstrap CSS utilities/reset
- CSS Modules
- React Hooks
- Lucide React icons
- Supplied PNG/JPEG reward assets

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the local URL printed by Vite, normally `http://127.0.0.1:5173`.

## Build

```bash
npm run build
npm run preview
```

The production build has been verified locally with `npm run build`.

## Folder Structure

```text
src/
  App.jsx
  App.module.css
  main.jsx
  data/
    giveawayData.js
  pages/
    Giveaway/
      Giveaway.jsx
  components/
    GiveawayBanner/
    GiveawayHero/
    GiveawayStats/
    PrizeCard/
    FeaturedGiveaways/
    HowToParticipate/
    Countdown/
    WinnerSlider/
    WinnersTabs/
    WinnerCard/
    PreviousWinnerCard/
    PrizeClaimModal/
    GiveawayRules/
    FAQ/
    TrustSection/
public/
  assets/
screenshots/
README.md
```

## Component Architecture

`pages/Giveaway/Giveaway.jsx` is the page boundary. `App.jsx` owns temporary demo state and orchestration. Reusable components receive giveaway data, user state, and callbacks through props. Countdown logic is shared through `useCountdown`; prize type rules live in `data/giveawayData.js` rather than being scattered across the UI.

## Responsive Design

- Desktop: two-column hero, four-card reward grid, trust strip, and split rules/FAQ layout
- Tablet: balanced content columns and condensed participation layout
- Mobile: stacked hero, two-column statistics, horizontal prize scrolling, touch-friendly tabs, mobile navigation, and full-width claim forms

The layout was browser-checked at desktop, tablet, and mobile widths. Captured examples are in [screenshots](screenshots/).

## Animation Details

Motion is deliberately restrained: the hero gift and entry ticket float slowly, reward cards lift on hover/focus, countdown values update every second, and winner announcements rotate every five seconds with manual previous/next controls. `prefers-reduced-motion` is respected for the hero motion.

## Mock Data Structure

The mock data in [src/data/giveawayData.js](src/data/giveawayData.js) is shaped for API replacement:

```js
{
  id: 'GW-2026-09-MIDNIGHT',
  title: 'The Good News Giveaway',
  status: 'active',
  endDate: '2026-09-24T18:00:00+05:30',
  participants: 8500,
  entries: 24,
  prizes: [{
    id: 'PRIZE-002',
    name: 'Apple Watch Series 9',
    type: 'physical',
    winners: 3
  }]
}
```

## Future Backend Integration

Replace the mock imports with API hooks or a query layer for:

- `GET /giveaways/current`
- `GET /giveaways/:id`
- `GET /giveaways/:id/winners`
- `GET /giveaways/previous`
- `GET /giveaways/my-status`
- `POST /giveaways/:id/join`
- `POST /giveaways/:id/claim`

The current user, winner records, statistics, and claim submission are fictional frontend values and must be replaced before production use.

The current route switch is intentionally lightweight. It can be replaced by React Router or the application's existing router without changing the detail component contract: `GiveawayDetail` accepts a prize slug and resolves the corresponding API-shaped record.

## Backend API

The repository now includes a modular Express/Mongoose service in [backend](backend/README.md). It is the intended server-side source of truth for giveaway status, entry fees, balances, participation, winners, claims, fraud signals, and audit records.

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

The backend requires MongoDB. Participation requests send only a giveaway identifier and `Idempotency-Key`; the server resolves the configured prize fee/currency, checks the authoritative lifecycle, validates the authenticated user and balance, assesses fraud signals, and performs balance deduction, participation creation, and transaction logging in one MongoDB transaction. The `userId + giveawayId` unique index protects against concurrent duplicate participation.

## Screenshots

- [Desktop active giveaway](screenshots/desktop-active.png)
- [Tablet active giveaway](screenshots/tablet-active.png)
- [Mobile active giveaway](screenshots/mobile-active.png)
- [Ended giveaway](screenshots/ended-giveaway.png)
- [Previous winners](screenshots/previous-winners.png)
- [Rewards panel](screenshots/rewards-panel.png)

Upcoming, Amazon gift-card, and non-winner screenshots require dedicated demo state controls that are not yet exposed in the current UI.

## Live Demo

Local demo: `http://127.0.0.1:5173`

Vercel/Netlify deployment requires an authenticated hosting account and a remote Git repository. No authenticated GitHub or Vercel/Netlify session is available in this workspace, so no live URL or GitHub repository has been fabricated. The project is deployment-ready with Vite's default build output.

## Testing Checklist

### Verified locally

- Hero/banner, countdown, status bar, prize cards, participation CTA, entry display
- How-to-participate, rules, FAQ, trust section
- Winner announcement slider and previous-winner tab
- Masked IDs and configurable one/multiple winner counts
- Active state does not display current winners
- Ended preview displays winners
- Demo winner matching and claim-button gating
- Physical prize form and submitted state
- Mobile, tablet, and desktop layout rendering
- React, Vite, Bootstrap, CSS Modules, Hooks, Lucide, responsive layout, accessibility labels, and animations
- Production build with `npm run build`



# VELOOP Rewards Backend

Secure Express/Mongoose API for giveaway lifecycle, participation, balances, winners, claims, fraud signals, and audit logs.

## Setup

```bash
cd backend
npm install
copy .env.example .env
npm run seed
npm run dev
```

MongoDB must be running locally or `MONGODB_URI` must point to an available MongoDB deployment. The API listens on `http://127.0.0.1:4000` by default.

Participation uses MongoDB transactions, so the target MongoDB deployment must support sessions/transactions (a replica set or MongoDB Atlas; a standalone local server is not sufficient for the join operation).

## Security rules

The client sends only the giveaway id to join. The server resolves the active status, prize, entry currency, and amount from MongoDB. Participation is protected by a compound unique index on `userId + giveawayId`, an idempotency key, a MongoDB transaction, and a balance deduction performed atomically with the participation and transaction record.

The current authentication middleware accepts a VELOOP JWT. In local development, `DEV_AUTH_BYPASS=true` may be added only in a private environment to use `x-dev-user-id`; this bypass is intentionally not enabled by default or documented as a production option.

## API

- `GET /api/giveaways/current`
- `GET /api/giveaways/:id`
- `GET /api/giveaways/previous`
- `GET /api/giveaways/:id/my-status`
- `POST /api/giveaways/:id/join` with `Idempotency-Key` header
- `GET /api/giveaways/:id/winners`
- `GET /api/giveaways/previous/winners`
- `POST /api/giveaways/:id/claim`
- `GET /api/giveaways/:id/my-claim`
- `POST /api/admin/giveaways/:id/select-winners`

Winner selection and admin routes require an authenticated admin token. Public winner responses never include claim details.
