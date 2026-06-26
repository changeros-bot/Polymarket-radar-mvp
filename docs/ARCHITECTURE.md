# Architecture

This document is the architecture source of truth for Polymarket Radar MVP.

## Mission

Discover strong Polymarket traders, validate them with paper trading, protect capital with risk controls, and only then consider small live copy trading.

## Current Architecture

```text
Mobile Dashboard
      |
      v
API Layer
      |
      +--> Trader Data
      +--> Recent Trades
      +--> Paper Trading Summary
      +--> Health / Safety Status
```

Current implementation uses:

- TypeScript
- Express API scaffold
- Static dashboard bootstrap
- Mock trader data
- Mock recent trades
- Paper-trading simulator scaffold

## Target MVP Architecture

```text
Vercel Dashboard
      |
      v
API Layer
      |
      +--> Data Provider
      |       +--> Mock Provider
      |       +--> Polymarket Read-only Provider
      |
      +--> Trader Registry
      +--> Analytics Engine
      +--> Paper Trading Engine
      +--> Alert Engine
      +--> Risk Gate
      |
      v
MongoDB Atlas
```

## Future Architecture

```text
Data Layer
      |
      v
Data Normalizer
      |
      v
Trader Registry
      |
      +--> Analytics Engine
      +--> Discovery Engine
      +--> Radar Score
      +--> Trader DNA
      +--> Market DNA
      +--> Confidence Engine
      |
      v
Paper Trading Engine
      |
      v
Risk Engine
      |
      v
Execution Engine (Phase 4 only, disabled by default)
```

## Module Boundaries

### Data Provider

Responsible for fetching external data.

Current:

- Mock data only.

Future:

- Polymarket wallet activity.
- Polymarket market metadata.
- Optional future prediction market providers.

### Analytics Engine

Responsible for:

- ROI.
- Win rate.
- Realized profit.
- Trade count.
- Drawdown.
- Activity recency.

### Paper Trading Engine

Responsible for:

- Simulated entries.
- Simulated exits.
- Virtual balance.
- Simulated PnL.
- Paper-trading reports.

### Risk Engine

Responsible for:

- Max order size.
- Max daily loss.
- Wallet whitelist.
- Market blacklist.
- Kill switch.

### Execution Engine

Not implemented in MVP.

Must remain disabled until Phase 4 and explicit user approval.

## Safety Rule

Phase 1 and Phase 2 must run without:

```text
PRIVATE_KEY
PROXY_WALLET
real CLOB order submission
redeem
manual sell
allowance approval
fund movement
```

## Deployment Direction

Preferred deployment:

```text
GitHub -> Vercel -> Mobile Dashboard
```

Supporting services:

```text
MongoDB Atlas -> persistence
Telegram Bot -> alerts
Worker platform -> future background scanning
```

## Architecture Principles

1. Reuse mature open-source or official SDKs before building custom code.
2. Keep data ingestion separate from analytics.
3. Keep paper trading separate from execution.
4. Keep execution disabled until the decision gate is passed.
5. Every sprint should produce a deployable mobile-testable version.
