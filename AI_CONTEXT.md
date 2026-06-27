# AI Context

This file is for AI agents and future maintainers. Read this before making changes.

## Project Name

Polymarket Radar MVP

## Mission

The project exists to find high-win-rate, positive expected value Polymarket copy-trading opportunities under strict risk controls.

Research, dashboards, wallet analytics, and AI scoring are tools. The goal is profitable, repeatable, risk-controlled copy trading. The system should eventually follow only high-quality trades, not blindly copy every trade from any wallet.

## Current Production State

```text
MVP v0.1: Vercel Production Ready
Stack: Next.js 14 + React 18
Active path: pages/ + pages/api/
Data: mock only
Trading: disabled
```

The mobile dashboard is live and deployable. Current visible trader names, scores, and paper signals are placeholders.

## Active Architecture

Use this as the current source of truth:

```text
pages/index.js        Dashboard page
pages/_app.js         App wrapper
styles/globals.css    Dashboard styles
pages/api/*           Next.js API routes
package.json          Next.js dependencies and scripts
next.config.js        Build config
tsconfig.json         Next.js TypeScript config
vercel.json           Vercel framework config
```

Old root `api/` and `public/index.html` were removed or deprecated during deployment repair. Old Express/TypeScript scaffold under `src/` may still exist but is not the current Vercel production path.

## Never Do Until Explicitly Approved

- Do not request or store private keys.
- Do not require `PROXY_WALLET`.
- Do not submit CLOB orders.
- Do not redeem.
- Do not manual sell.
- Do not approve allowance.
- Do not move funds.
- Do not enable real trading by default.

## Safe Defaults

```env
PREVIEW_MODE=true
COPY_SIZE=1
MAX_ORDER_SIZE_USD=2
PAPER_STARTING_BALANCE_USD=100
PAPER_TRADING_DAYS=14
```

No environment variables are required for MVP v0.1.

## Development Workflow

Before changing files, state which files will be changed.

Every development cycle should follow:

```text
Plan -> Modify -> Commit -> Update Progress -> Summarize Impact -> Define Next Step
```

After changing files, summarize:

- What changed.
- Impact scope.
- Commit SHA / commit message.
- Next recommended step.

## Product Priorities

### Story 5: Live Read-Only Data

Replace mock data with read-only Polymarket data. Keep mock fallback until live data is stable.

Suggested implementation:

```text
lib/polymarket.js
pages/api/traders.js
pages/api/trades/recent.js
pages/api/paper/summary.js
pages/index.js
```

Do not add execution logic.

### Story 6: Wallet Radar

Add wallet input, watchlist, wallet profile, recent activity, and basic observed performance.

### Story 7: Paper Trading Ledger

Record simulated copy trades and calculate simulated ROI, PnL, win rate, and drawdown.

## Scoring Direction

The long-term product should score each trade, not only each wallet.

Core future metrics:

- Trade Score
- Wallet Score
- Copyability Score
- Liquidity Score
- Delay / Slippage Score
- Expected Value estimate
- Risk score

The system should aim to follow only the best 10% to 20% of candidate trades after paper-trading validation.

## Handoff Read Order

1. `README.md`
2. `AI_CONTEXT.md`
3. `docs/PROGRESS.md`
4. `docs/DATA_SOURCES.md`
5. `docs/TRADER_REGISTRY.md`
6. `docs/OPEN_SOURCE_REVIEW.md`
7. `pages/index.js`
8. `pages/api/*`

## Current Next Best Step

Start Story 5: add a small read-only Polymarket data helper and replace one mock endpoint at a time.

Do not refactor the whole app. Do not beautify UI first. Do not add trading execution.
