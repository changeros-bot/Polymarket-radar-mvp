import cors from 'cors';
import express from 'express';
import path from 'path';
import { assertSafeMode, env } from './config/env';
import { recentTrades, traderMetrics, watchedTraders } from './data/mockWallets';
import { simulatePaperTrades } from './simulation/paperTrading';

assertSafeMode();

const app = express();
const publicDir = path.join(__dirname, '..', 'public');

app.use(cors());
app.use(express.json());
app.use(express.static(publicDir));

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'polymarket-radar-mvp',
    previewMode: env.previewMode,
    phase: 'paper-trading-mvp',
  });
});

app.get('/api/traders', (_req, res) => {
  res.json({
    traders: watchedTraders,
    metrics: traderMetrics,
  });
});

app.get('/api/trades/recent', (_req, res) => {
  res.json({
    trades: recentTrades,
  });
});

app.get('/api/paper/summary', (_req, res) => {
  const summary = simulatePaperTrades(recentTrades);
  res.json(summary);
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(env.port, () => {
  console.log(`Polymarket Radar MVP API running on port ${env.port}`);
  console.log('PREVIEW_MODE is enabled. Real trading is disabled.');
});
