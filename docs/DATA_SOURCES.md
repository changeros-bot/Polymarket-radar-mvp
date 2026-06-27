# Data Sources

This document lists official and trusted community data sources for the Polymarket Radar MVP.

Principle:

```text
Official first -> trusted infrastructure second -> community tools last
```

Community sources may support research and cross-checking, but they should not be the only source for trading or paper-trading logic.

---

## Credibility Levels

| Level | Meaning |
|---|---|
| A | Official first-party source |
| B | Trusted infrastructure or documented third-party source |
| C | Community tool or secondary source |

---

## Official Sources

### Gamma API

- URL: `https://gamma-api.polymarket.com`
- Use: markets, events, tags, series, comments, sports, search, public profiles.
- Frequency: near real-time / high frequency.
- Credibility: A.
- Notes: Best for market discovery and metadata.

### Data API

- URL: `https://data-api.polymarket.com`
- Use: user positions, trades, activity, holders, open interest, leaderboards, builder analytics.
- Frequency: high frequency.
- Credibility: A.
- Notes: Best for user and position analytics when available.

### CLOB API

- URL: `https://clob.polymarket.com`
- Use: order book, prices, midpoints, spreads, price history, order actions.
- Frequency: real-time / high frequency.
- Credibility: A.
- Notes: Public market data can be used in early phases. Authenticated trading endpoints are disabled until later approval.

### WebSocket

- URL: `wss://ws-subscriptions-clob.polymarket.com`
- Use: real-time order book, price updates, and user/order streams where applicable.
- Frequency: real-time stream.
- Credibility: A.
- Notes: Requires Railway or similar long-running backend for production use.

### Bridge API

- URL: `https://bridge.polymarket.com`
- Use: deposit and withdrawal related flow.
- Frequency: user-action dependent.
- Credibility: A for narrow bridge use.
- Notes: Not needed in Phase 1 or Phase 2 paper-trading mode.

### Official SDKs

- Examples: CLOB client, Python CLOB client, official SDKs, real-time data client.
- Use: standard access to official APIs and streams.
- Frequency: depends on repo release and commit cadence.
- Credibility: A.
- Notes: Prefer official SDKs before custom implementations.

### Official Subgraph

- Use: GraphQL access to on-chain trade, volume, user, liquidity, position, activity, and PnL data.
- Frequency: near real-time, depending on indexer sync.
- Credibility: A.
- Notes: Useful for historical analytics and validation.

---

## Trusted Infrastructure Sources

### Goldsky

- Use: streaming Polymarket on-chain activity into databases or warehouses.
- Frequency: near real-time / streaming.
- Credibility: B.
- Notes: Useful for production-grade indexing.

### The Graph

- Use: GraphQL / subgraph indexing and querying.
- Frequency: near real-time, depending on subgraph sync.
- Credibility: B.
- Notes: Useful for historical analysis and independent verification.

### Dune

- Use: SQL dashboards, volume, open interest, TVL, address and activity analysis.
- Frequency: scheduled query refresh.
- Credibility: B/C.
- Notes: Useful for cross-checking and research, not low-latency signals.

### Allium

- Use: SQL analytics, custom dashboards, on-chain activity analysis.
- Frequency: near real-time to scheduled refresh.
- Credibility: B.
- Notes: Useful for data validation and research.

---

## Third-Party Analytics Sources

### Blockworks

- Use: market and protocol analytics.
- Frequency: platform dependent.
- Credibility: B/C.
- Notes: Auxiliary verification only.

### Artemis

- Use: protocol and market activity indicators.
- Frequency: platform dependent.
- Credibility: B/C.
- Notes: Auxiliary verification only.

### DeFiLlama

- Use: protocol-level metrics and TVL-like references.
- Frequency: scheduled refresh.
- Credibility: B/C.
- Notes: Not a direct trading data source.

### Token Terminal

- Use: project and protocol metrics.
- Frequency: scheduled refresh.
- Credibility: B/C.
- Notes: Useful for macro protocol context only.

---

## Community Tools and Repos

### polymarket-pnl

- Use: wallet PnL, win rate, maker/taker, category breakdowns, leaderboard commands.
- Frequency: on-demand.
- Credibility: C.
- Notes: Good reference for analytics design.

### polymarket-trade-tracker

- Use: wallet transaction history, PnL, charts, on-chain activity.
- Frequency: on-demand / periodic.
- Credibility: C.
- Notes: Good reference for wallet analytics.

### polymarket-explorer

- Use: web dashboard for trader search and analysis.
- Frequency: app dependent.
- Credibility: C.
- Notes: Useful UI/reference product.

### polyterm

- Use: terminal dashboard for markets, wallet activity, whale activity, insider patterns.
- Frequency: near real-time if running.
- Credibility: C.
- Notes: Useful for power-user monitoring ideas.

### polymarket-tg-bot

- Use: Telegram alerts for new markets or selected activity.
- Frequency: periodic or event-based.
- Credibility: C.
- Notes: Useful alert design reference.

### copy trading bots

- Use: wallet monitoring and order copying.
- Frequency: event-based.
- Credibility: C.
- Notes: Reference only. Do not import live execution paths during Phase 1 or Phase 2.

---

## Data Usage Rules

1. Use official APIs for product logic when possible.
2. Use official WebSocket for real-time order book and price changes.
3. Use subgraph/infrastructure providers for history, validation, and backtesting.
4. Use community tools for design inspiration and cross-checking.
5. Do not use community dashboards as the only source of truth.
6. Do not treat social media trader claims as verified performance.
7. Do not enable live execution based on unverified secondary data.

---

## Current Phase Recommendation

### Phase 1

Use mock data and Vercel serverless endpoints only.

### Phase 2

Add official read-only sources:

- Gamma API
- Data API
- CLOB public data
- Subgraph

### Phase 3

Add Railway-backed services:

- WebSocket consumer
- Background worker
- Cron sync
- MongoDB persistence

### Phase 4

Only after successful paper trading and explicit approval, evaluate authenticated execution APIs.
