import { env } from '../config/env';
import { MarketTrade, PaperTrade, PaperTradingSummary } from '../types';

const clampOrderSize = (tradeSizeUsd: number): number => {
  const requestedSize = env.copySize;
  const cappedByTrade = Math.min(requestedSize, tradeSizeUsd);
  return Math.min(cappedByTrade, env.maxOrderSizeUsd);
};

const mockResolvePnl = (trade: MarketTrade, simulatedSizeUsd: number): number => {
  // Temporary deterministic placeholder for MVP API development.
  // Real implementation should settle using Polymarket resolution / mark-to-market data.
  const hashSeed = trade.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const isWin = hashSeed % 2 === 0;
  const returnRate = isWin ? 0.18 : -0.12;
  return Number((simulatedSizeUsd * returnRate).toFixed(2));
};

export const simulatePaperTrades = (trades: MarketTrade[]): PaperTradingSummary => {
  const paperTrades: PaperTrade[] = trades.map((trade) => {
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

  const totalPnlUsd = Number(
    paperTrades.reduce((sum, trade) => sum + trade.simulatedPnlUsd, 0).toFixed(2)
  );
  const closedTrades = paperTrades.filter((trade) => trade.status === 'CLOSED');
  const winningTrades = closedTrades.filter((trade) => trade.simulatedPnlUsd > 0);
  const currentBalanceUsd = Number((env.paperStartingBalanceUsd + totalPnlUsd).toFixed(2));
  const roiPercent = Number(((totalPnlUsd / env.paperStartingBalanceUsd) * 100).toFixed(2));
  const winRatePercent =
    closedTrades.length === 0
      ? 0
      : Number(((winningTrades.length / closedTrades.length) * 100).toFixed(2));

  return {
    startingBalanceUsd: env.paperStartingBalanceUsd,
    currentBalanceUsd,
    totalPnlUsd,
    roiPercent,
    winRatePercent,
    maxDrawdownPercent: 0,
    openTrades: paperTrades.filter((trade) => trade.status === 'OPEN').length,
    closedTrades: closedTrades.length,
    trades: paperTrades,
  };
};
