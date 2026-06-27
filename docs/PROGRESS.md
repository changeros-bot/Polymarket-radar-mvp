# Progress Log

This document records project progress, decisions, blockers, and handoff notes for GitHub version control and AI-assisted development.

## 2026-06-27

### Story 3 Vercel Deployment Progress

Story 3 focus: deploy the first mobile-readable Vercel preview for the Polymarket Radar MVP.

### Completed

- Updated `README.md` with mobile-first Vercel deployment steps.
- Confirmed the first preview can use static `public/` assets and `api/` serverless mock endpoints.
- Confirmed no secrets are required for the first Vercel mock preview.

### Story 3 Task Status

| Task | Status |
|---|---|
| GitHub repo ready | Done |
| README mobile deploy steps | Done |
| Vercel project import | Pending user action |
| Preview URL generated | Not Started |
| Mobile dashboard verification | Not Started |
| API verification | Not Started |

### Manual Deployment Steps

1. Open Vercel on mobile.
2. Add a new project.
3. Import `changeros-bot/Polymarket-radar-mvp`.
4. Keep repository root as project root.
5. Do not add environment variables for the first mock preview.
6. Deploy.
7. Verify:
   - `/`
   - `/api/health`
   - `/api/traders`
   - `/api/trades/recent`
   - `/api/paper/summary`

### Current Blockers

- Vercel import/deploy requires user action in the Vercel account.
- Vercel deployment has not been manually verified yet.
- Real Polymarket wallet ingestion does not exist yet.
- MongoDB persistence is not wired yet.
- Telegram alerts are not wired yet.
- Paper-trading simulator currently uses deterministic mock PnL, not real settlement or mark-to-market data.

### Next Handoff: Read This First

1. `README.md` for mobile deployment steps.
2. `docs/DEPLOYMENT.md` for staged deployment architecture.
3. `docs/PROGRESS.md` for current deployment status.
4. `public/index.html`, `public/styles.css`, and `public/app.js` for the static dashboard.
5. `api/_mockData.js` and `api/*` for Vercel serverless endpoints.

### Recommended Next Steps

1. Deploy to Vercel.
2. Share the Vercel URL back into chat.
3. Verify the dashboard and API endpoints.
4. Fix any routing or API issue immediately.
5. Begin MVP v0.2: replace mock data with read-only Polymarket data.

### Current Status

Phase: Story 3 Vercel deployment waiting for first preview

Execution mode: Paper trading scaffold with mock data

Trading mode: Real trading disabled until later approval

---

### Story 2 Documentation Progress

Story 2 focus: make the multi-AI collaboration rules, deployment approach, trader registry rules, open-source review process, and data-source rules explicit in GitHub so the project does not depend on chat history.

### Completed

- Added `docs/DEPLOYMENT.md`.
  - Defines Phase 1 Vercel-only preview deployment.
  - Defines Phase 2 hybrid architecture: Vercel + Railway + MongoDB Atlas + Telegram.
  - Lists environment variables and verification checklist.
  - Clarifies that Vercel is for frontend/preview and Railway is for long-running workers/WebSocket.

- Added `docs/AI_TEAM.md`.
  - Defines ChatGPT, Claude, Gemini, Perplexity, Grok, Qwen, and CubeLV roles.
  - Defines input/output contract for multi-AI review.
  - Defines conflict resolution, review cadence, and safety boundaries.
  - States that GitHub documents are the source of truth.

- Added `docs/DATA_SOURCES.md`.
  - Lists official Polymarket data sources: Gamma API, Data API, CLOB API, WebSocket, Bridge API, SDKs, and Subgraph.
  - Lists trusted infrastructure sources: Goldsky, The Graph, Dune, Allium.
  - Lists community tools and repos for reference only.
  - Defines usage rules: official first, trusted infrastructure second, community tools last.

- Added `docs/TRADER_REGISTRY.md`.
  - Defines trader lifecycle: DISCOVERED, WATCHING, VALIDATED, PAPER, LIVE_CANDIDATE, RETIRED, REJECTED.
  - Defines Tier S, Tier A, and Tier B candidates.
  - Adds initial trader candidates from research.
  - Defines validation, safety, review, and downgrade rules.

- Added `docs/OPEN_SOURCE_REVIEW.md`.
  - Defines ADOPT, FORK, REFERENCE, and REJECT decisions.
  - Defines open-source evaluation criteria.
  - Classifies official sources, analytics tools, dashboards, and copy-trading bots.
  - Adds architecture review gate before importing third-party code.

### Important Decisions

- Story completion now requires GitHub documents/code, not only chat discussion.
- CubeLV is temporarily unavailable, so ChatGPT is acting PM and architect.
- The current collaboration mode is multi-AI review and planning, not autonomous multi-agent coding.
- Deployment remains staged: Vercel first, Railway/MongoDB/Telegram later.
- Live execution remains disabled.
- Open-source tools should be reused where mature and safe, but live trading paths must remain isolated.
- MVP should be built first, then iterated quickly.

### Story 2 Task Status

| Task | Status |
|---|---|
| AI_TEAM.md | Done |
| DATA_SOURCES.md | Done |
| DEPLOYMENT.md | Done |
| TRADER_REGISTRY.md | Done |
| OPEN_SOURCE_REVIEW.md | Done |
| Story 2 review | Done |

---

## 2026-06-26

### Completed Today

- Created the repository `changeros-bot/Polymarket-radar-mvp`.
- Verified GitHub write access from ChatGPT by creating `PROJECT_STATUS.md`.
- Updated `README.md` with the project baseline and later refreshed it for AI handoff.
- Clarified the core mission: find high-win-rate and high-profit Polymarket traders, track their wallets, and simulate copying them before any real trading.
- Defined the project as **Polymarket Radar MVP**, starting with trader radar and paper trading.
- Established a staged roadmap from radar to paper trading, shadow trading, and eventually small live copy trading.
- Added safety policy and safe environment-variable template.
- Reviewed upstream repository `shmlkv/polymarket-copy-trading-bot` and decided not to import it wholesale because it contains live trading paths.
- Added a clean TypeScript API scaffold for local development.
- Added mock trader wallet data and recent mock trades.
- Added a paper-trading simulation engine scaffold.
- Added API endpoints for health, traders, recent trades, and paper-trading summary.
- Started a static mobile dashboard bootstrap with `public/index.html`.
- Completed static mobile dashboard assets with `public/styles.css` and `public/app.js`.
- Added Vercel-compatible serverless API endpoints under `api/`.
- Added `vercel.json` for static dashboard routing.
- Added AI handoff documentation package:
  - `AI_CONTEXT.md`
  - `docs/ARCHITECTURE.md`
  - `docs/DECISIONS.md`
  - `docs/CHANGELOG.md`

### Decisions Made

- The project will remain separated from `discount-hunter`.
- The user eventually wants real automated copy trading, but only after simulated-money validation.
- The first usable version focuses on finding and tracking strong Polymarket traders.
- The first trading-like behavior is paper trading with virtual capital.
- The paper-trading window should run for 14–30 days before any live mode discussion.
- `PREVIEW_MODE=true` is mandatory during Phase 1 and Phase 2.
- Phase 1 and Phase 2 must not require `PRIVATE_KEY`.
- Phase 1 and Phase 2 must not submit real Polymarket CLOB orders.
- The upstream repo should be treated as a reference source, not copied wholesale.
- The clean MVP starts from mock data and safe APIs, then progressively replaces mock data with real read-only Polymarket data.
- Vercel is preferred for the dashboard because the user's existing Discount Hunter project already uses Vercel.
- For first mobile deployment, static `public/` assets plus Vercel serverless functions are preferred over a long-running Express service.
- A separate worker platform can be added later for continuous wallet scanning.
- Telegram will be used for new-wallet-activity alerts.
- Future live execution must remain isolated behind phase gates.
