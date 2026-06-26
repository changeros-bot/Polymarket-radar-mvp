import { MarketTrade, TraderMetrics, WatchedTrader } from '../types';

export const watchedTraders: WatchedTrader[] = [
  {
    wallet: '0x7c3db723f1d4d8cb9c550095203b686cb11e5c6b',
    label: 'Example high-profit trader',
    notes: 'Placeholder wallet from upstream README example. Replace after real candidate screening.',
    riskLevel: 'unknown',
  },
  {
    wallet: '0x1111111111111111111111111111111111111111',
    label: 'Mock disciplined trader',
    notes: 'Mock wallet for dashboard development only.',
    riskLevel: 'medium',
  },
];

export const traderMetrics: TraderMetrics[] = [
  {
    wallet: watchedTraders[0].wallet,
    label: watchedTraders[0].label,
    realizedProfitUsd: 12840,
    roiPercent: 42.5,
    winRatePercent: 63.2,
    tradeCount: 184,
    maxDrawdownPercent: 12.4,
    averageTradeSizeUsd: 74,
  },
  {
    wallet: watchedTraders[1].wallet,
    label: watchedTraders[1].label,
    realizedProfitUsd: 2310,
    roiPercent: 18.7,
    winRatePercent: 58.9,
    tradeCount: 76,
    maxDrawdownPercent: 8.1,
    averageTradeSizeUsd: 31,
  },
];

export const recentTrades: MarketTrade[] = [
  {
    id: 'mock-trade-1',
    wallet: watchedTraders[0].wallet,
    market: 'Will candidate A win the election?',
    outcome: 'YES',
    side: 'BUY',
    price: 0.57,
    sizeUsd: 80,
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: 'mock-trade-2',
    wallet: watchedTraders[0].wallet,
    market: 'Will BTC close above target price?',
    outcome: 'NO',
    side: 'BUY',
    price: 0.44,
    sizeUsd: 45,
    timestamp: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
  },
  {
    id: 'mock-trade-3',
    wallet: watchedTraders[1].wallet,
    market: 'Will event resolve before Friday?',
    outcome: 'YES',
    side: 'BUY',
    price: 0.62,
    sizeUsd: 25,
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
];
