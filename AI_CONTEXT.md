# AI Context

This file is for AI agents and future maintainers. Read this before making changes.

## Project Name

Polymarket Radar MVP

## Mission

Find high-performing Polymarket traders, track their wallets, simulate copy trading with virtual capital, and only later consider small live copy trading after validation and approval.

## Current Sprint

Sprint 1: Mobile Dashboard MVP

Current state:

- TypeScript API scaffold exists.
- Mock trader data exists.
- Paper-trading simulator scaffold exists.
- Static dashboard HTML exists but CSS and JavaScript are incomplete.
- No deployed URL exists yet.

## Never Do During Phase 1 and Phase 2

- Do not request or store private keys.
- Do not require `PROXY_WALLET`.
- Do not submit CLOB orders.
- Do not redeem.
- Do not manual sell.
- Do not approve allowance.
- Do not move funds.
- Do not make live trading the default.

## Current Safe Defaults

```env
PREVIEW_MODE=true
COPY_SIZE=1
MAX_ORDER_SIZE_USD=2
PAPER_STARTING_BALANCE_USD=100
PAPER_TRADING_DAYS=14
```

## Important Files

```text
README.md
SAFETY.md
ROADMAP.md
PROJECT_STATUS.md
docs/PROGRESS.md
docs/ARCHITECTURE.md
docs/DECISIONS.md
docs/CHANGELOG.md
docs/UPSTREAM_REVIEW.md
src/server.ts
src/config/env.ts
src/data/mockWallets.ts
src/simulation/paperTrading.ts
```

## Development Workflow

Every development cycle should follow:

```text
Plan -> Modify -> Commit -> Update Progress -> Summarize Impact -> Define Next Step
```

Before changing files, state which files will be changed.

After changing files, summarize:

- What changed.
- Impact scope.
- Commit SHA / commit message.
- Next recommended step.

## Architecture Rule

Keep modules replaceable:

- Data provider should be replaceable.
- Paper trading should be separate from execution.
- Execution should be disabled until Phase 4.
- Dashboard should not directly depend on any execution logic.

## Current Technical Direction

Preferred deployment path:

```text
GitHub -> Vercel -> Mobile Dashboard
```

Likely next architectural task:

- Finish current static dashboard, or migrate to Next.js for Vercel-first deployment.

## Upstream Repo

Reviewed upstream:

```text
shmlkv/polymarket-copy-trading-bot
```

Decision:

- Use as reference only for now.
- Do not import wholesale because it contains live trading paths.

## Next Best Step

Complete the mobile dashboard files:

```text
public/styles.css
public/app.js
```

Then test:

```bash
npm install
npm run typecheck
npm run dev
```

After that, deploy a first preview to Vercel.
