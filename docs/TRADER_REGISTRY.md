# Trader Registry

This document defines how the project tracks, validates, ranks, and promotes Polymarket traders.

The registry is a product layer, not just a list of names. It is the source of truth for which traders are watched, validated, paper-traded, or rejected.

---

## Purpose

The Trader Registry exists to answer:

```text
Which Polymarket traders are worth studying, paper-trading, and possibly copying later?
```

The registry must prevent blind copy trading.

A trader must move through a validation lifecycle before any real-money execution can be discussed.

---

## Trader Lifecycle

```text
DISCOVERED
  ↓
WATCHING
  ↓
VALIDATED
  ↓
PAPER
  ↓
LIVE_CANDIDATE
  ↓
RETIRED / REJECTED
```

### Status Definitions

| Status | Meaning |
|---|---|
| DISCOVERED | Found by leaderboard, social signal, or research. Not trusted yet. |
| WATCHING | Being monitored. No paper trading yet. |
| VALIDATED | Basic identity and performance data are verified. |
| PAPER | Eligible for simulated copy trading only. |
| LIVE_CANDIDATE | Passed paper trading and risk review. Still requires explicit approval. |
| RETIRED | Previously useful but no longer active or effective. |
| REJECTED | Failed validation or too risky. |

---

## Trader Tiers

### Tier S: Daily Watch

These traders are high-priority research candidates. They are not automatically copy targets.

| Trader | Current Status | Notes |
|---|---|---|
| Theo4 | DISCOVERED | High-profile historical Polymarket whale. Requires wallet and performance verification. |
| sparklingwater123 | DISCOVERED | Reported high recent PnL. Requires verification. |
| fishalive | DISCOVERED | Reported sports upset alpha candidate. Requires verification. |

### Tier A: Watchlist

| Trader | Current Status | Notes |
|---|---|---|
| mintblade | DISCOVERED | Reported high-volume consistent trader. Verify with data sources. |
| frostrizz | DISCOVERED | Reported high PnL and volume. Verify with data sources. |
| swisstony | DISCOVERED | Reported analytics-platform high PnL trader. Verify with data sources. |
| GRIMDRIP | DISCOVERED | Potential alpha wallet. Higher variance risk. |
| endlessFate | DISCOVERED | Potential alpha wallet. Requires history check. |

### Tier B: Candidates

New traders discovered from leaderboard, API, social research, or open-source analytics tools.

Tier B traders must not enter paper trading until validated.

---

## Trader Schema

Each trader should eventually be represented with this schema:

```json
{
  "id": "theo4",
  "displayName": "Theo4",
  "wallets": [],
  "aliases": [],
  "status": "DISCOVERED",
  "tier": "S",
  "categories": ["Politics"],
  "firstSeenAt": null,
  "lastActiveAt": null,
  "allTimePnlUsd": null,
  "roiPercent": null,
  "winRatePercent": null,
  "tradeCount": null,
  "averagePositionSizeUsd": null,
  "maxDrawdownPercent": null,
  "radarScore": null,
  "confidenceScore": null,
  "riskLevel": "UNKNOWN",
  "copyEnabled": false,
  "paperTradingEnabled": false,
  "liveTradingEnabled": false,
  "sources": [],
  "notes": ""
}
```

---

## Validation Rules

A trader can move from `DISCOVERED` to `WATCHING` only after:

- At least one credible source confirms the identity or wallet.
- Wallet address is stored when available.
- Known aliases are recorded.
- Market category is identified.

A trader can move from `WATCHING` to `VALIDATED` only after:

- PnL is verified from an official or trusted source.
- Trade count is sufficient.
- Recent activity is confirmed.
- Category specialization is known.
- No major unresolved red flags are found.

A trader can move from `VALIDATED` to `PAPER` only after:

- Risk level is not high or unknown.
- Trade size is compatible with small simulated copy sizes.
- Market liquidity is acceptable.
- Strategy is not based on one-off luck only.

A trader can move to `LIVE_CANDIDATE` only after:

- 14–30 days of paper trading.
- Positive simulated performance.
- Acceptable drawdown.
- No low-quality chase trades.
- Acceptable delay/slippage.
- Explicit user approval remains required.

---

## Safety Rules

- `liveTradingEnabled` must default to `false`.
- `copyEnabled` must not imply live trading.
- Social reputation is not enough for validation.
- Past PnL does not guarantee future edge.
- A trader can be downgraded at any time.

---

## Review Cadence

| Review Type | Frequency |
|---|---|
| Tier S | Daily when real data is available |
| Tier A | Weekly |
| Tier B | On discovery or weekly batch |
| Paper traders | Daily during paper-trading window |
| Live candidates | Manual review only |

---

## Downgrade Rules

A trader should be downgraded if:

- Recent win rate deteriorates.
- Drawdown expands beyond threshold.
- Trading style changes materially.
- Activity stops.
- Market category edge disappears.
- Wallet is linked to suspicious behavior.

---

## Future Expansion

The registry should eventually support:

- Multi-wallet identity resolution.
- Category-level trader DNA.
- Recent 7/30/90-day performance windows.
- Confidence score history.
- Paper trading result history.
- Auto-retirement of inactive or degraded traders.
