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
