# Polymarket Radar MVP

Polymarket Radar MVP is a mobile-first dashboard for finding high-performing Polymarket traders, tracking candidate wallets, and simulating copy-trading results before any real-money execution is considered.

The current product is **preview dashboard + mock trader radar only**. It must not request private keys, submit real CLOB orders, redeem positions, or move funds.

## Project Purpose

The project exists to answer one practical question:

> If Josh follows a high-performing Polymarket trader with delayed, limited-size, simulated trades, does the strategy still perform well after slippage, drawdown, and risk controls?

The product should not blindly copy popular wallets. It should help identify traders with repeatable edge, consistent profit, acceptable drawdown, and explainable behavior.

## Current Production Status

```text
MVP v0.1: Deployed on Vercel Production
Execution mode: Preview / mock data only
Trading mode: Real trading disabled
```

Current stack:

```text
Next.js 14
React 18
Vercel Production
GitHub main branch deployment
```

## Current Features

The current deployed MVP includes:

- Mobile-first dark dashboard.
- Mock top trader list.
- Mock recent paper signals.
- Preview-only system status.
- Next.js API routes for future data replacement.
- Vercel production deployment.

Available routes:

```text
GET /
GET /api/health
GET /api/traders
GET /api/trades/recent
GET /api/paper/summary
```

Current data source:

```text
Mock data only
```

No real Polymarket data, wallet ingestion, MongoDB persistence, Telegram alert, or live trading is connected yet.

## Local Startup

Install dependencies:

```bash
npm install
```

Run local development server:

```bash
npm run dev
```

Build production bundle:

```bash
npm run build
```

Start production server locally:

```bash
npm start
```

## Deployment

The MVP is deployed through:

```text
GitHub main branch -> Vercel -> Production URL
```

Vercel settings:

```text
Framework: Next.js
Root Directory: ./
Build Command: npm run build
Output Directory: default
Environment Variables: none required for v0.1
```

Important deployment files:

```text
package.json
next.config.js
tsconfig.json
vercel.json
pages/index.js
pages/api/*
styles/globals.css
```

## Environment Variables

No environment variables are required for MVP v0.1.

Planned variables for later phases:

```env
PREVIEW_MODE=true
COPY_SIZE=1
MAX_ORDER_SIZE_USD=2
PAPER_STARTING_BALANCE_USD=100
PAPER_TRADING_DAYS=14
MONGODB_URI=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
POLYMARKET_API_URL=https://clob.polymarket.com
```

Forbidden until explicitly approved:

```env
PRIVATE_KEY=
PROXY_WALLET=
```

If real-execution credentials are ever added, the app must include safety gates before any order path is enabled.

## Known Issues / Current Limitations

- Dashboard uses mock data only.
- Trader names and scores are placeholders.
- No real Polymarket wallet ingestion yet.
- No real ROI / win rate calculation yet.
- No MongoDB persistence yet.
- No Telegram alert yet.
- No paper-trading ledger yet.
- Old Express/TypeScript scaffold may still exist under `src/`, but it is not part of the current Vercel MVP path.
- Live trading is intentionally disabled.

## Next Steps

### MVP v0.2: Live Read-Only Data

- Replace mock market and trader data with Polymarket official read-only data.
- Start with official Gamma API and Data API where possible.
- Keep all execution disabled.

### MVP v0.3: Wallet Radar

- Add wallet input.
- Add watchlist.
- Display wallet address, recent activity, ROI, win rate, and observed behavior.

### MVP v0.4: Paper Trading Ledger

- Record simulated copy trades.
- Track simulated entry, exit, PnL, win rate, ROI, and drawdown.
- Run paper mode for at least 14 days before any live-trading discussion.

### MVP v1.0: Alerts and Risk Review

- Add Telegram alerts.
- Add daily paper-trading report.
- Add risk controls and review gates.
- Discuss live trading only after data supports it and Josh explicitly approves it.

## Handoff Notes for AI / Engineers

Read these files first:

```text
README.md
docs/PROGRESS.md
docs/DEPLOYMENT.md
docs/DATA_SOURCES.md
docs/TRADER_REGISTRY.md
docs/OPEN_SOURCE_REVIEW.md
```

Current source of truth:

```text
Vercel MVP path = Next.js pages/ + pages/api/
Old root api/ and static public/index.html were removed or deprecated during deployment repair.
```

Development rule:

```text
Plan -> Modify -> Commit -> Update Progress -> Summarize Impact -> Define Next Step
```

## Safety Rule

Do not add real trading, private key handling, wallet funding, order submission, redemption, or fund movement unless a later phase explicitly approves it.
