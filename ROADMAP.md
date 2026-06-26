# Roadmap

## Mission

Find high-performing Polymarket traders, track their wallets, simulate copy-trading with virtual capital, and only later consider small-size live copy trading if the data supports it.

## Phase 1: Trader Radar

Goal: Identify and monitor strong Polymarket traders.

Deliverables:

- Mobile-first dashboard
- Wallet watchlist
- Trader cards
- ROI, win rate, realized profit, recent bets, frequency, and drawdown
- Telegram alert when watched wallet places a new bet
- MongoDB storage for wallet activity

Exit criteria:

- Can track at least 3 candidate wallets
- Can show recent bets and basic analytics on mobile
- No private key required
- No execution path available

## Phase 2: Paper Trading

Goal: Simulate copy-trading with virtual capital.

Deliverables:

- Virtual balance
- Simulated copy entries
- Simulated exits / settlement tracking
- Simulated ROI, PnL, win rate, and max drawdown
- Latency and sizing assumptions
- 14–30 day paper-trading report

Default settings:

```env
PREVIEW_MODE=true
COPY_SIZE=1
MAX_ORDER_SIZE_USD=2
PAPER_STARTING_BALANCE_USD=100
PAPER_TRADING_DAYS=14
```

Exit criteria:

- 14–30 days of simulation data
- Positive or clearly explainable performance
- Acceptable drawdown
- No repeated low-quality chase trades
- Delay is acceptable

## Phase 3: Shadow Trading

Goal: Prepare exchange/trading API connection without submitting real orders.

Deliverables:

- Read-only API connection
- Intended order logs
- Risk engine dry run
- Kill switch design
- Wallet whitelist and market blacklist

Exit criteria:

- Every intended order is logged
- Risk engine blocks invalid orders
- No execution function is callable

## Phase 4: Small Live Copy Trading

Goal: Enable real trading only with very small size and strict controls.

Required controls:

- Explicit user approval
- Max order size
- Max daily loss
- Max concurrent exposure
- Kill switch
- Wallet whitelist
- Market blacklist
- Full execution logs
- Telegram notification for every action

Initial live mode should be treated as an experiment, not a production money machine.

## Current Status

Current phase: Bootstrap documentation before Phase 1 implementation.

Next task: review upstream code and decide whether to import selected modules or build a minimal clean MVP.
