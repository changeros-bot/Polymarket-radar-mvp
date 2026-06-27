# Deployment Guide

This document describes how to deploy the Polymarket Radar MVP and its future production architecture.

The project uses a staged deployment plan:

- **Phase 1:** Vercel-only mobile dashboard with mock/serverless API.
- **Phase 2:** Vercel frontend + Railway backend/worker + MongoDB Atlas + Telegram.
- **Phase 3:** Real-time WebSocket, background scanning, cron jobs, and persistent analytics.

Real trading remains disabled until a later explicitly approved phase.

---

## Phase 1: Vercel Preview Deployment

Phase 1 exists to get the first mobile-readable URL online quickly.

### Scope

- Static mobile dashboard from `public/`.
- Mock serverless API from `api/`.
- No MongoDB requirement.
- No Telegram requirement.
- No private key.
- No real order execution.

### Files Used

```text
public/index.html
public/styles.css
public/app.js
api/_mockData.js
api/health.js
api/traders.js
api/trades/recent.js
api/paper/summary.js
vercel.json
```

### Vercel Steps

1. Open Vercel.
2. Add a new project.
3. Import `changeros-bot/Polymarket-radar-mvp` from GitHub.
4. Keep the repository root as the project root.
5. Deploy.
6. Verify these URLs:
   - `/`
   - `/api/health`
   - `/api/traders`
   - `/api/trades/recent`
   - `/api/paper/summary`

### Phase 1 Environment Variables

No required secrets for the mock deployment.

Safe defaults:

```env
PREVIEW_MODE=true
COPY_SIZE=1
MAX_ORDER_SIZE_USD=2
PAPER_STARTING_BALANCE_USD=100
PAPER_TRADING_DAYS=14
```

Forbidden during Phase 1:

```env
PRIVATE_KEY=
PROXY_WALLET=
```

---

## Phase 2: Production-Like Hybrid Architecture

Phase 2 adds real data, persistence, alerts, background jobs, and future real-time feeds.

### Target Architecture

```text
Vercel
└── Frontend dashboard

Railway
├── API server
├── WebSocket server
├── Background worker
└── Cron jobs

MongoDB Atlas
└── Traders / wallets / trades / paper trades / alerts / decisions

Telegram
└── Alerts and status messages
```

---

## Telegram Setup

1. Open Telegram and search for `@BotFather`.
2. Create a bot with `/newbot`.
3. Save the generated bot token.
4. Add the bot to the target chat or group.
5. Retrieve the chat ID using Telegram Bot API `getUpdates`.

Railway variables:

```env
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
```

---

## MongoDB Atlas Setup

1. Create a MongoDB Atlas account.
2. Create a shared cluster for development.
3. Create a database user.
4. Configure Network Access.
5. Copy the connection string.

Railway variable:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/polymarket_db?retryWrites=true&w=majority
```

Collections expected later:

```text
traders
wallets
markets
trades
paper_trades
alerts
decisions
sync_runs
```

---

## Railway Backend Setup

Railway will be used when the project needs long-running services.

### Services

- `web-api`: REST API and future WebSocket broadcast server.
- `background-worker`: Polymarket data collection, scheduled sync, and alert generation.

### Railway Environment Variables

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
POLYMARKET_API_URL=https://clob.polymarket.com
POLYMARKET_GAMMA_API_URL=https://gamma-api.polymarket.com
PREVIEW_MODE=true
```

Forbidden until live phase:

```env
PRIVATE_KEY=
PROXY_WALLET=
```

---

## Vercel Frontend Setup for Phase 2

When Railway is added, Vercel should call Railway for production data.

Vercel variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app
NEXT_PUBLIC_WS_URL=wss://your-backend.up.railway.app
```

---

## Verification Checklist

### Phase 1

- [ ] `/` loads on mobile.
- [ ] `/api/health` returns `previewMode: true`.
- [ ] `/api/traders` returns mock traders.
- [ ] `/api/trades/recent` returns mock trades.
- [ ] `/api/paper/summary` returns paper trading summary.

### Phase 2

- [ ] MongoDB receives sync data.
- [ ] Railway API health check passes.
- [ ] Worker logs show successful Polymarket sync.
- [ ] Telegram receives test alert.
- [ ] Frontend can read Railway API.
- [ ] WebSocket connection works if enabled.

---

## Troubleshooting

### CORS errors

Allow the Vercel domain in the Railway backend CORS configuration.

### MongoDB connection errors

Check Atlas Network Access, credentials, and URL encoding for special characters in passwords.

### Vercel timeout

Heavy data jobs must run on Railway workers, not Vercel serverless functions.

### WebSocket issues

WebSocket should be served from Railway, not Vercel.

---

## Deployment Principle

Vercel is for fast mobile UI. Railway is for long-running computation. MongoDB Atlas is the shared state. Telegram is the alert channel.
