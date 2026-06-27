const GAMMA_API_BASE = process.env.POLYMARKET_GAMMA_API_URL || 'https://gamma-api.polymarket.com';
const DATA_API_BASE = process.env.POLYMARKET_DATA_API_URL || 'https://data-api.polymarket.com';

const requestJson = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      accept: 'application/json',
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`Polymarket request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

const numberOrNull = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const pickMarketPrice = (market) => {
  if (market.outcomePrices) {
    try {
      const prices = typeof market.outcomePrices === 'string' ? JSON.parse(market.outcomePrices) : market.outcomePrices;
      if (Array.isArray(prices) && prices.length > 0) {
        return numberOrNull(prices[0]);
      }
    } catch (_error) {
      return null;
    }
  }

  return numberOrNull(market.lastTradePrice || market.bestAsk || market.bestBid);
};

const normalizeMarket = (market) => ({
  id: String(market.id || market.conditionId || market.slug || ''),
  question: market.question || market.title || 'Untitled market',
  slug: market.slug || null,
  category: market.category || market.tags?.[0]?.label || 'Unknown',
  volume: numberOrNull(market.volume || market.volumeNum || market.volume24hr),
  liquidity: numberOrNull(market.liquidity || market.liquidityNum),
  price: pickMarketPrice(market),
  endDate: market.endDate || market.endDateIso || null,
  url: market.slug ? `https://polymarket.com/event/${market.slug}` : null
});

const sortByVolume = (items) => {
  return [...items].sort((a, b) => (b.volume || 0) - (a.volume || 0));
};

export const getTopMarkets = async ({ limit = 8 } = {}) => {
  const url = new URL('/markets', GAMMA_API_BASE);
  url.searchParams.set('active', 'true');
  url.searchParams.set('closed', 'false');
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('order', 'volume');
  url.searchParams.set('ascending', 'false');

  const data = await requestJson(url.toString());
  const rawMarkets = Array.isArray(data) ? data : data.markets || [];
  return sortByVolume(rawMarkets.map(normalizeMarket)).slice(0, limit);
};

const marketToCandidate = (market, index) => ({
  id: market.id || `market-${index + 1}`,
  name: market.question,
  tier: index < 2 ? 'Live' : 'Watch',
  score: Math.max(60, 92 - index * 4),
  performance: market.volume ? `$${Math.round(market.volume).toLocaleString()} volume` : 'Live market',
  status: market.price !== null ? `${Math.round(market.price * 100)}% implied` : 'Live data',
  source: 'polymarket-gamma',
  url: market.url
});

export const getTraderCandidates = async ({ limit = 8 } = {}) => {
  const markets = await getTopMarkets({ limit });
  return markets.map(marketToCandidate);
};

const marketToRecentSignal = (market, index) => ({
  source: 'Polymarket Live Market',
  topic: market.question,
  side: market.price !== null && market.price >= 0.5 ? 'YES' : 'NO',
  size: market.volume ? `$${Math.round(market.volume).toLocaleString()} volume` : 'Unknown volume',
  mode: 'Read-only',
  sourceId: market.id || `signal-${index + 1}`,
  url: market.url
});

export const getRecentMarketSignals = async ({ limit = 6 } = {}) => {
  const markets = await getTopMarkets({ limit });
  return markets.map(marketToRecentSignal);
};

export const getDataSourceStatus = () => ({
  gammaApiBase: GAMMA_API_BASE,
  dataApiBase: DATA_API_BASE,
  mode: 'read-only'
});
