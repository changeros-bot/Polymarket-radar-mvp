# Polymarket Radar MVP

Polymarket Radar MVP is a mobile-first, read-only dashboard for tracking high-performing Polymarket wallets and simulating copy-trading results.

This is **not** an auto-trading project. The first version must not request private keys, submit real CLOB orders, redeem positions, or move funds.

## Project Purpose

Build a safe MVP that helps the user answer one question:

> If I followed this Polymarket wallet in simulation mode, would the strategy be worth studying further?

The MVP focuses on observation, analytics, and paper-trading simulation only.

## Current Features

Current repository status:

- Repository initialized
- Project status file added
- Product direction defined
- Safety-first MVP scope defined

Planned MVP features:

- Mobile-friendly dashboard
- Track selected Polymarket trader wallets
- Display ROI, win rate, recent bets, trade frequency, and maximum drawdown
- Simulate copy-trading PnL
- Send Telegram alerts when a tracked wallet places a new bet
- Store wallet activity and simulation logs

## Explicitly Disabled in MVP

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
MONGODB_URI=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

Forbidden for MVP:

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

1. Add `docs/PROGRESS.md` for AI handoff and version-control tracking.
2. Add `SAFETY.md` to define the no-real-trading boundary.
3. Add `.env.example` with safe defaults.
4. Review upstream repository structure.
5. Import only the safe read-only/dashboard portions or rebuild the MVP from a minimal clean codebase.
6. Add simulation-only storage and Telegram alert flow.

## Decision Gate

Real copy-trading can only be discussed after:

- 14 consecutive days of simulation results
- Positive simulated performance
- Acceptable maximum drawdown
- No low-quality chase trades
- Acceptable tracking delay
- Explicit user approval
