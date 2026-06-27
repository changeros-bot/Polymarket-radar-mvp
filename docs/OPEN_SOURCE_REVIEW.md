# Open Source Review

This document defines how the project evaluates Polymarket-related open-source repositories.

Principle:

```text
Reuse proven tools first. Build only the missing differentiating layer.
```

The project should not rewrite official SDKs, wallet trackers, alert bots, or dashboards unless necessary.

---

## Review Policy

Every third-party repository must be assigned one decision:

| Decision | Meaning |
|---|---|
| ADOPT | Use directly or as an official dependency. |
| FORK | Fork and adapt for project needs. |
| REFERENCE | Study ideas or architecture only. Do not import code directly. |
| REJECT | Do not use. Document why. |

No repo should be added to the project without a review decision.

---

## Evaluation Criteria

| Criteria | Weight |
|---|---:|
| Maintenance activity | 20% |
| Official status | 20% |
| Documentation quality | 15% |
| Community adoption | 15% |
| Integration fit | 20% |
| License compatibility | 10% |

Repositories involving live trading, private keys, allowances, redeem scripts, or order execution require extra safety review.

---

## Current Decisions

### ADOPT

These are preferred first-party or infrastructure sources.

| Repo / Source | Type | Reason |
|---|---|---|
| Polymarket CLOB client | SDK | Official access layer for CLOB data and future execution. |
| Polymarket Python CLOB client | SDK | Useful for research, scripts, and analytics pipelines. |
| Polymarket real-time data client | WebSocket | Official real-time data layer. |
| Polymarket subgraph | GraphQL/Subgraph | Official/history-friendly indexed data source. |
| Gamma API / Data API / CLOB API | API | Primary read-only data sources for product logic. |

### FORK / ADAPT CANDIDATES

These may be forked or partially adapted after review.

| Repo / Source | Type | Reason |
|---|---|---|
| polymarket-pnl | Wallet analytics | Strong PnL and leaderboard reference. Useful for analytics patterns. |
| polymarket-trade-tracker | Wallet tracker | Useful for wallet trade history and charting patterns. |
| polymarket-explorer | Dashboard | Useful product and UI reference. |
| polyterm | Terminal dashboard | Useful for real-time monitoring and alert ideas. |

### REFERENCE ONLY

These may be studied but should not be imported into Phase 1 or Phase 2.

| Repo / Source | Type | Reason |
|---|---|---|
| shmlkv/polymarket-copy-trading-bot | Copy trading bot | Useful architecture reference, but contains live trading paths. |
| unitmargaretaustin/Polymarket-copy-trading-bot | Copy trading bot | Reference only until paper-trading and risk gates exist. |
| polymarket-tracker-bot | Copy/Discord bot | Useful alert and monitoring ideas, not direct import. |
| polymarket-tg-bot | Telegram bot | Useful notification reference. |
| insider-detector style projects | Analytics | Useful as research references but require careful false-positive handling. |

### REJECT UNTIL LATER

Reject or delay any repo that:

- Requires private keys during setup.
- Auto-submits orders.
- Performs redeem/manual sell/allowance operations.
- Has unclear license.
- Has no recent maintenance.
- Cannot be isolated from live trading.

---

## Architecture Review Gate

Before adopting any third-party code, answer:

1. Is there an official source that already solves this?
2. Is the license compatible?
3. Does it require private keys?
4. Does it submit real orders?
5. Can it run in preview/paper mode?
6. Can it be isolated behind an adapter?
7. Does it reduce maintenance cost?
8. Does it improve Alpha Discovery, Paper Trading, or Risk Control?

If the answer is unclear, classify as `REFERENCE` until reviewed.

---

## Current MVP Strategy

For MVP v0.1:

- Use mock data.
- Deploy dashboard on Vercel.
- Do not import live trading code.

For MVP v0.2:

- Add official read-only APIs.
- Study wallet analytics repos for PnL logic.
- Keep all execution disabled.

For MVP v0.3:

- Add paper trading.
- Add AI ranking / confidence scoring.
- Evaluate whether to fork wallet analytics tools.

For v1.0:

- Only consider live execution after paper-trading evidence and explicit approval.

---

## Open Items

- Verify exact star counts, licenses, and last commit dates for candidate repos.
- Decide whether `polymarket-pnl` should be forked or only referenced.
- Decide whether `polymarket-trade-tracker` has reusable modules.
- Decide whether the current MVP should stay static + serverless or migrate to Next.js before real data.
