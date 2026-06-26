# Polymarket Radar MVP

Polymarket Radar MVP is a mobile-first system for finding high-performing Polymarket traders, tracking their wallets, and simulating copy-trading results with virtual capital before any real-money execution is considered.

The current MVP is **wallet radar plus paper trading only**. It must not request private keys, submit real CLOB orders, redeem positions, or move funds.

## Project Purpose

The main goal is to identify Polymarket players with strong win rate, high realized profit, disciplined position sizing, and repeatable trading behavior.

The first question this project must answer is:

> If I copy this Polymarket trader with simulated money, does the strategy still perform well after delay, sizing limits, and drawdown?

This is not meant to blindly copy any popular wallet. The system should filter for traders who are profitable, consistent, and worth studying.

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

- Track selected Polymarket trader wallets
- Display wallet analytics
- Show recent bets and activity
- Rank traders by ROI, win rate, realized profit, drawdown, and consistency
- Send Telegram alerts when a tracked wallet places a new bet
- No private key
- No real order

### Phase 2: Paper Trading

- Simulate copy-trading with virtual capital
- Default settings:
  - `PREVIEW_MODE=true`
  - `COPY_SIZE=1`
  - `MAX_ORDER_SIZE_USD=2`
- Track simulated entry, exit, PnL, win rate, and drawdown
- Include estimated delay and slippage assumptions
- Run for at least 14 days before any real trading discussion

### Phase 3: Shadow Trading

- Connect exchange or trading API in read-only / no-execution mode
- Read balances, positions, and market data if needed
- Generate intended orders but do not submit them
- Continue Telegram alerts and risk checks

### Phase 4: Small Live Copy Trading

- Enable real trading only after explicit approval
- Start with very small size
- Require kill switch, max daily loss, max order size, wallet whitelist, and market blacklist
- Keep full logs for every decision and order

## Current Features

Current repository status:

- Repository initialized
- GitHub write access verified
- Product direction defined
- Trader radar and paper-trading roadmap defined
- Safety-first staged roadmap defined

Planned MVP features:

- Mobile-friendly dashboard
- Track selected Polymarket trader wallets
- Display ROI, win rate, recent bets, trade frequency, maximum drawdown, and realized profit
- Simulate copy-trading PnL with virtual capital
- Send Telegram alerts when a tracked wallet places a new bet
- Store wallet activity and simulation logs

## Explicitly Disabled in Phase 1 and Phase 2

- No private key input
- No real order submission
- No auto trading
- No redeem flow
- No manual sell flow
- No allowance approval scripts
- No real-money execution path

## Startup Method

This repository is currently in documentation/bootstrap phase. Source code has not yet been imported.

After the application code is added, the expected local startup flow will be:

```bash
npm install
npm run dev
```

The final command may change after the source repo is imported.

## Deployment Method

Target cloud deployment:

1. GitHub repository
2. Railway or Render web service
3. MongoDB Atlas database
4. Telegram Bot for alerts
5. Mobile browser dashboard

The MVP should deploy without any wallet private key or real trading credential.

## Environment Variables

Required for MVP:

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

If later source code includes these variables, they must remain optional, unused, and blocked while `PREVIEW_MODE=true`.

## Known Issues

- Source code has not yet been imported.
- No dashboard exists yet in this repo.
- No wallet ingestion pipeline exists yet in this repo.
- No simulation engine exists yet in this repo.
- No deployment configuration exists yet.
- Need to review the upstream copy-trading repo before importing or adapting any code.

## Next Steps

1. Add `SAFETY.md` to define the no-real-trading boundary and future phase gates.
2. Add `.env.example` with safe defaults.
3. Add `ROADMAP.md` with the four-phase roadmap.
4. Review upstream repository `shmlkv/polymarket-copy-trading-bot`.
5. Decide whether to import selected upstream code or build a minimal clean MVP.
6. Build the first read-only trader wallet tracker.
7. Build paper-trading simulation logs.
8. Add Telegram alerts.
9. Deploy the dashboard to Railway or Render.

## Decision Gate

Small live copy trading can only be discussed after:

- 14–30 days of paper-trading results
- Positive simulated performance
- Acceptable maximum drawdown
- No low-quality chase trades
- Acceptable tracking delay
- Clear wallet whitelist
- Explicit user approval
