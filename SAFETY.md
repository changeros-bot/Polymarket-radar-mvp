# Safety Policy

This project is designed to eventually support automated copy trading, but only through staged validation.

The current phase is **Trader Radar + Paper Trading**. Real-money execution is disabled.

## Current Rule

No private key. No real order. No fund movement.

## Phase Gates

### Phase 1: Trader Radar

Allowed:

- Track public Polymarket wallets
- Display analytics
- Send Telegram alerts
- Store watchlist and activity logs

Forbidden:

- Private key input
- Real order submission
- Redeem
- Sell
- Allowance approval
- Auto trading

### Phase 2: Paper Trading

Allowed:

- Simulate copy-trading with virtual capital
- Record simulated entries and exits
- Calculate simulated PnL, ROI, win rate, and drawdown
- Compare trader performance after delay and size limits

Forbidden:

- Real order submission
- Private key storage
- Signing transactions
- Moving funds

Default settings:

```env
PREVIEW_MODE=true
COPY_SIZE=1
MAX_ORDER_SIZE_USD=2
PAPER_STARTING_BALANCE_USD=100
PAPER_TRADING_DAYS=14
```

### Phase 3: Shadow Trading

Allowed:

- Read-only exchange or trading API connection
- Balance and position reading
- Generate intended order logs
- Risk checks

Forbidden:

- Submitting orders
- Signing orders
- Using private keys for execution

### Phase 4: Small Live Copy Trading

Allowed only after explicit approval.

Minimum requirements:

- 14–30 days paper-trading results
- Positive simulated ROI
- Acceptable maximum drawdown
- Acceptable latency
- Wallet whitelist
- Market blacklist
- Max order size
- Max daily loss
- Kill switch
- Full execution logs

## Hard Safety Rules

1. `PREVIEW_MODE=true` must block all execution paths.
2. Any function that submits, signs, redeems, sells, or approves must check the current phase.
3. Phase 1 and Phase 2 must run without `PRIVATE_KEY`.
4. If `PRIVATE_KEY` is present during Phase 1 or Phase 2, the app should refuse to start.
5. Simulation records must be clearly marked as simulated.
6. Telegram alerts must not be treated as trade instructions.

## Engineering Principle

Build the execution engine as a separate module that can remain disabled until the project passes the paper-trading decision gate.
