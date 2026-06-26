# Upstream Review: shmlkv/polymarket-copy-trading-bot

Reviewed upstream repository:

```text
shmlkv/polymarket-copy-trading-bot
```

Review date: 2026-06-26

## Summary

The upstream repository is useful as a reference base because it already contains Polymarket trader analytics, wallet tracking, MongoDB storage, copy strategy logic, simulation scripts, and a web dashboard.

However, it is also a real copy-trading bot with live execution paths. It requires careful separation before any code is imported into this repository.

## Useful Parts

Potentially useful for this project:

- Web dashboard structure
- Trader analytics view
- Wallet watchlist logic
- MongoDB models and persistence design
- Trader performance metrics
- Simulation scripts
- Multi-trader support
- Copy-size calculation logic
- Docker / deployment references

These parts support the mission of finding strong Polymarket traders and testing simulated copy-trading performance.

## Dangerous Parts

The upstream repository includes real trading features that must not be imported directly into Phase 1 or Phase 2:

- Real order execution
- Private key requirement
- Proxy wallet requirement
- Allowance scripts
- Manual sell scripts
- Close stale / close resolved scripts
- Redeem resolved positions
- Transfer-to-Gnosis scripts
- Quick action buttons that can trigger trading-related workflows

## Evidence From Upstream Review

The upstream README describes the project as a real automation bot with real-time execution, web dashboard, position tracking, trade aggregation, multi-trader support, smart sizing, MongoDB, and Docker support.

The upstream README setup requires:

```env
PROXY_WALLET=
PRIVATE_KEY=
RPC_URL=
```

The upstream package scripts include trading or wallet-action commands such as:

```text
set-token-allowance
manual-sell
sell-large
transfer-to-gnosis
close-stale
close-resolved
redeem-resolved
```

The upstream `src/utils/postOrder.ts` directly calls CLOB order functions such as:

```ts
clobClient.createMarketOrder(...)
clobClient.postOrder(...)
```

This confirms that the upstream repository can execute real trades and must not be copied blindly.

## Recommendation

Do not import the upstream repository wholesale.

Recommended approach:

1. Use the upstream repository as a reference.
2. Import or rebuild only the safe components first.
3. Start with a clean MVP in this repository.
4. Build the following modules in order:
   - Trader watchlist
   - Trader analytics
   - Paper-trading simulation engine
   - Telegram alerts
   - Mobile dashboard
5. Keep execution-related modules out of Phase 1 and Phase 2.
6. Add any future execution engine as a separate module behind strict phase gates.

## Safe Import Candidates

Potential import/reference candidates:

- Dashboard layout and trader analytics concepts
- MongoDB schema ideas
- Trader scanner scripts
- Simulation scripts
- Copy sizing formulas

## Do Not Import Yet

Do not import these until live trading is explicitly approved:

- `src/utils/postOrder.ts`
- `src/services/tradeExecutor.ts`
- `src/services/autoResolver.ts`
- `src/scripts/setTokenAllowance.ts`
- `src/scripts/manualSell.ts`
- `src/scripts/sellLargePositions.ts`
- `src/scripts/closeStalePositions.ts`
- `src/scripts/closeResolvedPositions.ts`
- `src/scripts/redeemResolvedPositions.ts`
- `src/scripts/transferPositionsToGnosisSafe.ts`

## Decision

The safest path is:

```text
Reference upstream architecture, but build a clean paper-trading MVP first.
```

This avoids accidentally importing real-money execution paths while preserving the option to add live trading later.
