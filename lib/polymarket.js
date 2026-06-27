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

const requestJsonSafe = async (url) => {
  try {
    return await requestJson(url);
  } catch (_error) {
    return null;
  }
};

const numberOrNull = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const pickMarketPrice = (market) => {
  if (market.outcomePrices) {
    try {
      const prices = typeof market.outcomePrices === 'string' ? JSON.parse(market.outcomePrices) : market.outcomePrices;
      if (Array.isArray(prices) && prices.length > 0) return numberOrNull(prices[0]);
    } catch (_error) {
      return null;
    }
  }
  return numberOrNull(market.lastTradePrice || market.bestAsk || market.bestBid);
};

const cleanSlug = (value) => {
  if (!value || typeof value !== 'string') return null;
  return value.replace(/^\/+|\/+$/g, '').trim();
};

const buildPolymarketUrl = (market) => {
  const rawUrl = market.url || market.marketUrl || market.eventUrl || market.clobRewardsUrl;
  if (rawUrl && typeof rawUrl === 'string' && rawUrl.startsWith('https://polymarket.com/')) return rawUrl;

  const eventSlug = cleanSlug(market.eventSlug || market.event?.slug || market.events?.[0]?.slug);
  const marketSlug = cleanSlug(market.slug);
  if (eventSlug && marketSlug) return `https://polymarket.com/event/${eventSlug}/${marketSlug}`;
  if (eventSlug) return `https://polymarket.com/event/${eventSlug}`;
  if (marketSlug) return `https://polymarket.com/market/${marketSlug}`;
  return 'https://polymarket.com/markets';
};

const normalizeMarket = (market) => ({
  id: String(market.id || market.conditionId || market.slug || ''),
  question: market.question || market.title || 'Untitled market',
  slug: market.slug || null,
  eventSlug: market.eventSlug || market.event?.slug || market.events?.[0]?.slug || null,
  category: market.category || market.tags?.[0]?.label || 'Unknown',
  volume: numberOrNull(market.volume || market.volumeNum || market.volume24hr),
  liquidity: numberOrNull(market.liquidity || market.liquidityNum),
  price: pickMarketPrice(market),
  endDate: market.endDate || market.endDateIso || null,
  url: buildPolymarketUrl(market)
});

const sortByVolume = (items) => [...items].sort((a, b) => (b.volume || 0) - (a.volume || 0));

const normalizeWalletInput = (value) => {
  const raw = String(value || '').trim();
  const valueOnly = raw.startsWith('@') ? raw.slice(1) : raw;
  return {
    raw,
    value: valueOnly,
    isUsername: raw.startsWith('@') || !/^0x[a-fA-F0-9]{40}$/.test(raw),
    isAddress: /^0x[a-fA-F0-9]{40}$/.test(raw)
  };
};

const pickFirstItem = (payload) => {
  if (!payload) return null;
  if (Array.isArray(payload)) return payload[0] || null;
  if (Array.isArray(payload.users)) return payload.users[0] || null;
  if (Array.isArray(payload.data)) return payload.data[0] || null;
  if (Array.isArray(payload.items)) return payload.items[0] || null;
  if (payload.user) return payload.user;
  return payload;
};

const pickAddressFromUser = (user) => {
  if (!user || typeof user !== 'object') return null;
  const candidates = [
    user.proxyWallet,
    user.proxyWalletAddress,
    user.wallet,
    user.walletAddress,
    user.address,
    user.funder,
    user.profile?.proxyWallet,
    user.profile?.wallet,
    user.profile?.address
  ];
  return candidates.find((value) => typeof value === 'string' && /^0x[a-fA-F0-9]{40}$/.test(value)) || null;
};

const resolveUsernameToWallet = async (username) => {
  const cleanUsername = String(username || '').replace(/^@/, '').trim();
  if (!cleanUsername) return null;

  const urls = [];
  const gammaUser = new URL('/users', GAMMA_API_BASE);
  gammaUser.searchParams.set('username', cleanUsername);
  urls.push(gammaUser.toString());

  const gammaName = new URL('/users', GAMMA_API_BASE);
  gammaName.searchParams.set('name', cleanUsername);
  urls.push(gammaName.toString());

  const dataUser = new URL('/users', DATA_API_BASE);
  dataUser.searchParams.set('username', cleanUsername);
  urls.push(dataUser.toString());

  const dataName = new URL('/users', DATA_API_BASE);
  dataName.searchParams.set('name', cleanUsername);
  urls.push(dataName.toString());

  for (const url of urls) {
    const payload = await requestJsonSafe(url);
    const user = pickFirstItem(payload);
    const address = pickAddressFromUser(user);
    if (address) {
      return { address, user, resolverUrl: url };
    }
  }

  return null;
};

const summarizeWalletActivity = (rawItems) => {
  const items = Array.isArray(rawItems) ? rawItems : [];
  const totalVolume = items.reduce((sum, item) => {
    const size = numberOrNull(item.size || item.usdcSize || item.amount || item.value);
    return sum + (size || 0);
  }, 0);
  return {
    tradeCount: items.length,
    totalVolume,
    recentItems: items.slice(0, 8).map((item, index) => ({
      id: item.id || item.transactionHash || `activity-${index + 1}`,
      market: item.title || item.question || item.market || item.slug || 'Unknown market',
      side: item.side || item.outcome || item.type || 'Unknown',
      size: numberOrNull(item.size || item.usdcSize || item.amount || item.value),
      timestamp: item.timestamp || item.createdAt || item.time || null
    }))
  };
};

const getActivityForAddress = async (address) => {
  const activityUrl = new URL('/activity', DATA_API_BASE);
  activityUrl.searchParams.set('user', address);
  activityUrl.searchParams.set('limit', '25');
  const activity = await requestJson(activityUrl.toString());
  const rawItems = Array.isArray(activity) ? activity : activity.activity || activity.items || activity.data || [];
  return summarizeWalletActivity(rawItems);
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

export const getWalletProfile = async ({ address }) => {
  const input = normalizeWalletInput(address);
  if (!input.value) throw new Error('Wallet address is required');

  if (input.isUsername && !input.isAddress) {
    const resolved = await resolveUsernameToWallet(input.value);
    if (resolved?.address) {
      const summary = await getActivityForAddress(resolved.address);
      return {
        address: input.raw || `@${input.value}`,
        username: input.value,
        resolvedAddress: resolved.address,
        source: 'username-resolved',
        profileUrl: `https://polymarket.com/@${input.value}`,
        updatedAt: new Date().toISOString(),
        ...summary,
        note: 'Username resolved to wallet address. Activity is read-only.',
        pendingResolution: false
      };
    }

    return {
      address: input.raw || `@${input.value}`,
      username: input.value,
      source: 'username-placeholder',
      profileUrl: `https://polymarket.com/@${input.value}`,
      updatedAt: new Date().toISOString(),
      tradeCount: 0,
      totalVolume: 0,
      recentItems: [],
      note: 'Username found as profile link only. Wallet address resolution did not return a supported address yet.',
      pendingResolution: true
    };
  }

  const summary = await getActivityForAddress(input.value);
  return {
    address: input.value,
    resolvedAddress: input.value,
    source: 'polymarket-data-api',
    profileUrl: `https://polymarket.com/@${input.value}`,
    updatedAt: new Date().toISOString(),
    ...summary,
    note: 'Read-only wallet activity. ROI, win rate, and PnL will be calculated after stable trade ingestion.',
    pendingResolution: false
  };
};

export const getDataSourceStatus = () => ({
  gammaApiBase: GAMMA_API_BASE,
  dataApiBase: DATA_API_BASE,
  mode: 'read-only'
});
