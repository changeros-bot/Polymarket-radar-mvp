# Open Source Integration Plan

Date: 2026-06-27

## Decision

Use `shmlkv/polymarket-copy-trading-bot` as the core architecture. Do not rebuild the copy trading engine from scratch.

The current `polymarket-radar-mvp` remains a proof-of-concept only. It proved that Vercel deployment, Polymarket market data, wallet activity lookup, and a mobile-first UI are feasible. It should not become the main production architecture.

## Core principle

80% reuse, 20% extension.

Reuse the open source project for:

- copy trading engine
- wallet monitoring
- trader analytics
- position tracking
- PnL and ROI calculations
- simulation and backtesting scripts
- MongoDB persistence
- existing Next.js web dashboard
- settings and risk controls

Only extend the project for:

- mobile-first Chinese dashboard copy
- username-to-wallet helper
- curated watchlist workflow
- AI Copy Score display layer
- Telegram/notification layer
- Josh-specific deployment and documentation

## Files and areas that should remain core-owned

Do not rewrite or replace these unless there is a confirmed bug:

- `src/services/tradeMonitor.ts`
- `src/services/tradeExecutor.ts`
- `src/models/*`
- `src/scripts/simulateProfitability.ts`
- `src/scripts/analyzeAllTraders.ts`
- `src/scripts/findBestTraders.ts`
- `src/scripts/scanBestTraders.ts`
- `src/scripts/auditCopyTradingAlgorithm*.ts`
- `.env.example` risk and bot settings structure
- MongoDB data model
- existing copy trading execution flow

## Files and areas allowed for Josh-specific customization

Low-risk customization areas:

- `web/src/app/page.tsx`
- `web/src/components/StatusBar.tsx`
- `web/src/components/TradersTable.tsx`
- `web/src/components/SettingsView.tsx`
- `web/src/components/MyTradesView.tsx`
- `web/src/app/globals.css`
- new docs under `docs/`
- new helper API routes under `web/src/app/api/` only if they do not replace existing logic

## Required MVP configuration

Initial deployment must run in safe mode:

```env
PREVIEW_MODE=true
COPY_SIZE=1
MAX_ORDER_SIZE_USD=2
TRADE_AGGREGATION_ENABLED=false
USER_ADDRESSES=0x6d9fc316c3b8377060a44b852ba664adbfd59790
```

`USER_ADDRESSES` remains the source of truth. Username search is only a helper to discover wallet addresses.

## Deployment direction

Use the original project structure:

```text
root package.json         bot / scripts / analysis
web/package.json          Next.js dashboard
web/src/app/page.tsx      dashboard entry
```

For Vercel, deploy the `web/` folder as the project root.

The bot process itself should run separately on Railway, Render, or VPS if continuous monitoring is needed. Vercel should serve the dashboard and API routes, not long-running copy-trading loops.

## Next steps

1. Fork or use the existing fork of `shmlkv/polymarket-copy-trading-bot` as the main repo.
2. Deploy only `web/` to Vercel first.
3. Configure MongoDB Atlas.
4. Set `PREVIEW_MODE=true` before any live trading.
5. Add MEPP wallet as the first tracked trader.
6. Confirm dashboard shows trader analytics using original data flow.
7. Only after that, add Chinese/mobile UI polish.
8. Only after 7-14 days of simulated tracking, consider live copy trading with strict limits.

## Explicit non-goals

Do not continue expanding `polymarket-radar-mvp` into a competing architecture.

Do not build a second trading engine.

Do not replace original analysis, simulation, or copy trading logic before fully validating it.

Do not enable real trading before preview mode has been validated.
