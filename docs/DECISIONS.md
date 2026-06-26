# Decisions

This document records major project decisions so future AI agents and engineers do not need to read chat history.

## 2026-06-26

### Decision 001: Start with radar and paper trading

The project starts as a trader radar and paper-trading system, not a live copy-trading bot.

Reason:

- The user eventually wants live automated copy trading.
- The safest path is to validate traders with simulated money first.
- Live trading requires risk gates, paper-trading evidence, and explicit approval.

### Decision 002: Do not import upstream repo wholesale

The upstream repository `shmlkv/polymarket-copy-trading-bot` is useful as a reference, but it contains real execution paths.

Reason:

- It requires `PRIVATE_KEY` and `PROXY_WALLET`.
- It contains order submission, manual sell, redeem, and allowance scripts.
- Importing it wholesale creates unnecessary real-money risk.

Decision:

- Use it as a reference.
- Build a clean MVP first.
- Import only safe concepts or selected modules later.

### Decision 003: Phase 1 and Phase 2 must block private keys

During radar and paper-trading phases, the app must not accept private keys or proxy wallet settings.

Reason:

- These phases do not need signing or execution.
- Accidentally enabling live execution is the largest risk.

Implementation:

- `src/config/env.ts` rejects startup if `PRIVATE_KEY` or `PROXY_WALLET` is set.
- `PREVIEW_MODE=true` is required.

### Decision 004: Prefer Vercel for MVP dashboard

The preferred MVP deployment path is GitHub to Vercel.

Reason:

- The user's existing Discount Hunter project already uses Vercel.
- Vercel is suitable for mobile dashboard delivery.
- Keeping projects on the same deployment stack reduces maintenance cost.

Future note:

- A separate worker platform may be added later for continuous wallet scanning.

### Decision 005: Keep execution engine separate

Execution should be a separate module and disabled by default.

Reason:

- Dashboard, analytics, discovery, and paper trading should remain useful even without live trading.
- Real execution requires risk engine, kill switch, and explicit approval.

### Decision 006: Every sprint must update docs

Every meaningful change should update progress and handoff documents.

Reason:

- The project is expected to be developed with AI assistance.
- Future handoff should not require reading chat history.

Required updates:

- `docs/PROGRESS.md`
- `docs/CHANGELOG.md`
- relevant architecture or safety docs if changed
