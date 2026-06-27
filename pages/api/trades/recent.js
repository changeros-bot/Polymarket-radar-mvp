import { getRecentMarketSignals } from '../../../lib/polymarket';

const fallbackItems = [
  { source: 'Alpha 1', topic: 'Election market', side: 'YES', size: '$120', mode: 'Mock fallback' },
  { source: 'Alpha 3', topic: 'Football market', side: 'NO', size: '$80', mode: 'Mock fallback' },
  { source: 'Alpha 4', topic: 'Crypto market', side: 'YES', size: '$45', mode: 'Mock fallback' }
];

export default async function handler(req, res) {
  try {
    const items = await getRecentMarketSignals({ limit: 6 });
    res.status(200).json({
      items,
      count: items.length,
      source: 'polymarket-gamma',
      fallback: false,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(200).json({
      items: fallbackItems,
      count: fallbackItems.length,
      source: 'mock-fallback',
      fallback: true,
      error: error.message,
      updatedAt: new Date().toISOString()
    });
  }
}
