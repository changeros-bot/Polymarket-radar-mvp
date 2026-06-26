const watchedTraders = [
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

const traderMetrics = [
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

const recentTrades = [
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

const config = {
  previewMode: true,
  copySize: 1,
  maxOrderSizeUsd: 2,
  paperStartingBalanceUsd: 100,
};

const clampOrderSize = (tradeSizeUsd) => {
  const cappedByTrade = Math.min(config.copySize, tradeSizeUsd);
  return Math.min(cappedByTrade, config.maxOrderSizeUsd);
};

const mockResolvePnl = (trade, simulatedSizeUsd) => {
  const hashSeed = trade.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const isWin = hashSeed % 2 === 0;
  const returnRate = isWin ? 0.18 : -0.12;
  return Number((simulatedSizeUsd * returnRate).toFixed(2));
};

const simulatePaperTrades = () => {
  const trades = recentTrades.map((trade) => {
    const simulatedSizeUsd = clampOrderSize(trade.sizeUsd);
    const simulatedPnlUsd = mockResolvePnl(trade, simulatedSizeUsd);

    return {
      id: `paper-${trade.id}`,
      sourceTradeId: trade.id,
      wallet: trade.wallet,
      market: trade.market,
      outcome: trade.outcome,
      side: trade.side,
      simulatedPrice: trade.price,
      simulatedSizeUsd,
      timestamp: trade.timestamp,
      status: 'CLOSED',
      simulatedPnlUsd,
    };
  });

  const totalPnlUsd = Number(trades.reduce((sum, trade) => sum + trade.simulatedPnlUsd, 0).toFixed(2));
  const closedTrades = trades.filter((trade) => trade.status === 'CLOSED');
  const winningTrades = closedTrades.filter((trade) => trade.simulatedPnlUsd > 0);

  return {
    startingBalanceUsd: config.paperStartingBalanceUsd,
    currentBalanceUsd: Number((config.paperStartingBalanceUsd + totalPnlUsd).toFixed(2)),
    totalPnlUsd,
    roiPercent: Number(((totalPnlUsd / config.paperStartingBalanceUsd) * 100).toFixed(2)),
    winRatePercent: closedTrades.length === 0 ? 0 : Number(((winningTrades.length / closedTrades.length) * 100).toFixed(2)),
    maxDrawdownPercent: 0,
    openTrades: trades.filter((trade) => trade.status === 'OPEN').length,
    closedTrades: closedTrades.length,
    trades,
  };
};

module.exports = {
  config,
  watchedTraders,
  traderMetrics,
  recentTrades,
  simulatePaperTrades,
};
