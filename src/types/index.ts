export type TradeSide = 'BUY' | 'SELL';

export interface WatchedTrader {
  wallet: string;
  label: string;
  notes?: string;
  riskLevel: 'low' | 'medium' | 'high' | 'unknown';
}

export interface TraderMetrics {
  wallet: string;
  label: string;
  realizedProfitUsd: number;
  roiPercent: number;
  winRatePercent: number;
  tradeCount: number;
  maxDrawdownPercent: number;
  averageTradeSizeUsd: number;
}

export interface MarketTrade {
  id: string;
  wallet: string;
  market: string;
  outcome: string;
  side: TradeSide;
  price: number;
  sizeUsd: number;
  timestamp: string;
}

export interface PaperTrade {
  id: string;
  sourceTradeId: string;
  wallet: string;
  market: string;
  outcome: string;
  side: TradeSide;
  simulatedPrice: number;
  simulatedSizeUsd: number;
  timestamp: string;
  status: 'OPEN' | 'CLOSED';
  simulatedPnlUsd: number;
}

export interface PaperTradingSummary {
  startingBalanceUsd: number;
  currentBalanceUsd: number;
  totalPnlUsd: number;
  roiPercent: number;
  winRatePercent: number;
  maxDrawdownPercent: number;
  openTrades: number;
  closedTrades: number;
  trades: PaperTrade[];
}
