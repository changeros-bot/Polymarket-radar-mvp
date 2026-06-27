import { getTraderCandidates } from '../../lib/polymarket';

const fallbackItems = [
  { id: 'alpha-1', name: 'Alpha 1', tier: 'S', score: 94, performance: '+38.4%', status: 'Mock fallback' },
  { id: 'alpha-2', name: 'Alpha 2', tier: 'S', score: 91, performance: '+31.2%', status: 'Mock fallback' },
  { id: 'alpha-3', name: 'Alpha 3', tier: 'S', score: 88, performance: '+24.8%', status: 'Mock fallback' },
  { id: 'alpha-4', name: 'Alpha 4', tier: 'A', score: 84, performance: '+19.6%', status: 'Mock fallback' }
];

export default async function handler(req, res) {
  try {
    const items = await getTraderCandidates({ limit: 8 });
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
