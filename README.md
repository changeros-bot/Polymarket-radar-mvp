# Polymarket Radar MVP

Polymarket Radar MVP is a mobile-first system for finding high-performing Polymarket traders, tracking their wallets, and simulating copy-trading results with virtual capital before any real-money execution is considered.

The current MVP is **trader radar plus paper trading only**. It must not request private keys, submit real CLOB orders, redeem positions, or move funds.

## Project Purpose

The main goal is to identify Polymarket players with strong win rate, high realized profit, disciplined position sizing, and repeatable trading behavior.

The first question this project must answer is:

> If I copy this Polymarket trader with simulated money, does the strategy still perform well after delay, sizing limits, and drawdown?

This is not meant to blindly copy any popular wallet. The system should filter for traders who are profitable, consistent, and worth studying.

## Current Status

Current implementation status:

- GitHub repository created.
- Documentation baseline created.
- Safety policy created.
- Upstream repository review completed.
- Clean TypeScript API scaffold created.
- Mock trader wallet data created.
- Mock recent trades created.
- Paper-trading simulation scaffold created.
- Express API endpoints created.
- Static dashboard bootstrap started.

Current phase:

```text
Sprint 1: Mobile Dashboard MVP
```

Current execution mode:

```text
Paper trading / preview mode only
```

Real trading status:

```text
Disabled until later explicit approval
```

## Current Features

Available API endpoints:

```text
GET /health
GET /api/traders
GET /api/trades/recent
GET /api/paper/summary
```

Current data source:

```text
Mock trader and mock trade data
```

Current simulator:

```text
Deterministic mock paper-trading PnL scaffold
```

## Core Workflow

1. Find candidate Polymarket wallets with high win rate and strong profit.
2. Add selected wallets to the watchlist.
3. Track recent bets, trade frequency, position size, ROI, win rate, PnL, and drawdown.
4. Simulate copy-trading with virtual money.
5. Run paper trading for 14–30 days.
6. Review simulated ROI, maximum drawdown, latency, and trade quality.
7. Only after passing the review gate, discuss small-size live copy trading.

## Product Phases

### Phase 1: Trader Radar

- Track selected Polymarket trader wallets.
- Display wallet analytics.
- Show recent bets and activity.
- Rank traders by ROI, win rate, realized profit, drawdown, and consistency.
- Send Telegram alerts when a tracked wallet places a new bet.
- No private key.
- No real order.

### Phase 2: Paper Trading

- Simulate copy-trading with virtual capital.
- Track simulated entry, exit, PnL, win rate, and drawdown.
- Include estimated delay and slippage assumptions.
- Run for at least 14–30 days before any real trading discussion.

Default settings:

```env
PREVIEW_MODE=true
COPY_SIZE=1
MAX_ORDER_SIZE_USD=2
PAPER_STARTING_BALANCE_USD=100
PAPER_TRADING_DAYS=14
```

### Phase 3: Shadow Trading

- Connect exchange or trading API in read-only / no-execution mode.
- Read balances, positions, and market data if needed.
- Generate intended orders but do not submit them.
- Continue Telegram alerts and risk checks.

### Phase 4: Small Live Copy Trading

- Enable real trading only after explicit approval.
- Start with very small size.
- Require kill switch, max daily loss, max order size, wallet whitelist, and market blacklist.
- Keep full logs for every decision and order.

## Startup Method

Current local startup flow:

```bash
npm install
npm run dev
```

Build and start:

```bash
npm run build
npm start
```

Type check:

```bash
npm run typecheck
```

## Deployment Method

Preferred MVP deployment path:

```text
GitHub -> Vercel -> Mobile Dashboard
```

Planned supporting services:

```text
MongoDB Atlas -> persistence
Telegram Bot -> alerts
Railway or another worker platform -> optional future background scanner
```

Deployment direction:

- Use Vercel for the mobile dashboard and API where possible.
- Use MongoDB Atlas for trader registry, trade history, paper trades, alerts, and decision logs.
- Add a separate worker only when continuous background scanning is needed.

## Environment Variables

Required for Phase 1 and Phase 2:

```env
PREVIEW_MODE=true
COPY_SIZE=1
MAX_ORDER_SIZE_USD=2
PAPER_STARTING_BALANCE_USD=100
PAPER_TRADING_DAYS=14
MONGODB_URI=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Forbidden in Phase 1 and Phase 2:

```env
PRIVATE_KEY=
PROXY_WALLET=
```

If `PRIVATE_KEY` or `PROXY_WALLET` is set during Phase 1 or Phase 2, the app should refuse to start.

## Important Files

```text
README.md                  Project overview and startup guide
AI_CONTEXT.md              AI handoff context and coding rules
SAFETY.md                  Safety policy and phase gates
ROADMAP.md                 Product milestones
PROJECT_STATUS.md          Current project status
docs/PROGRESS.md           Daily progress and handoff log
docs/UPSTREAM_REVIEW.md    Review of upstream copy-trading repo
docs/ARCHITECTURE.md       Architecture truth source
docs/DECISIONS.md          Major design decisions
docs/CHANGELOG.md          Version history
src/server.ts              Current Express API scaffold
src/config/env.ts          Environment parsing and safety guard
src/data/mockWallets.ts    Mock trader and trade data
src/simulation/paperTrading.ts Paper-trading simulator scaffold
```

## Known Issues

- Static dashboard is not complete yet.
- Next.js / Vercel migration has not been completed yet.
- Real Polymarket wallet ingestion does not exist yet.
- MongoDB persistence is not wired yet.
- Telegram alerts are not wired yet.
- Paper-trading simulator currently uses mock PnL, not real settlement or mark-to-market data.
- No production deployment URL exists yet.

## Next Steps

1. Finish the mobile dashboard or migrate to Next.js for Vercel deployment.
2. Deploy the first mobile-readable version to Vercel.
3. Replace mock wallet data with read-only Polymarket wallet activity ingestion.
4. Add MongoDB Atlas persistence.
5. Add Telegram alerts.
6. Add real paper-trading records and daily reports.
7. Add Trader Registry, Radar Score, and Discovery Engine.

## Decision Gate

Small live copy trading can only be discussed after:

- 14–30 days of paper-trading results.
- Positive simulated performance.
- Acceptable maximum drawdown.
- No low-quality chase trades.
- Acceptable tracking delay.
- Clear wallet whitelist.
- Explicit user approval.

## Development Rule

Every development cycle should follow this order:

```text
Plan -> Modify -> Commit -> Update Progress -> Summarize Impact -> Define Next Step
```
