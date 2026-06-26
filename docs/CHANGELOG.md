# Changelog

## 0.1.0-bootstrap - 2026-06-26

### Added

- Created GitHub repository.
- Added project README.
- Added project status file.
- Added safety policy.
- Added roadmap.
- Added environment template.
- Added upstream repository review.
- Added TypeScript API scaffold.
- Added mock trader data.
- Added mock recent trades.
- Added paper-trading simulation scaffold.
- Added API endpoints:
  - `GET /health`
  - `GET /api/traders`
  - `GET /api/trades/recent`
  - `GET /api/paper/summary`
- Added static dashboard HTML bootstrap.
- Added architecture document.
- Added decision log.
- Added AI handoff context.

### Changed

- Clarified that Phase 1 and Phase 2 are radar and paper trading only.
- Clarified that live trading is a future Phase 4 capability requiring explicit approval.
- Updated deployment direction from Railway/Render-first to Vercel-first for the dashboard.

### Safety

- Added startup safety guard that blocks Phase 1 and Phase 2 if `PREVIEW_MODE=false`, `PRIVATE_KEY`, or `PROXY_WALLET` is set.

### Known Gaps

- Dashboard CSS and JavaScript are not complete yet.
- No deployed URL exists yet.
- Real Polymarket wallet ingestion is not implemented yet.
- MongoDB persistence is not wired yet.
- Telegram alerts are not wired yet.
- Paper-trading simulator still uses mock PnL.
