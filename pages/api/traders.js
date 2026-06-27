const items = [
  { id: 'alpha-1', name: 'Alpha 1', tier: 'S', score: 94, performance: '+38.4%', status: 'Watching' },
  { id: 'alpha-2', name: 'Alpha 2', tier: 'S', score: 91, performance: '+31.2%', status: 'Watching' },
  { id: 'alpha-3', name: 'Alpha 3', tier: 'S', score: 88, performance: '+24.8%', status: 'Watching' },
  { id: 'alpha-4', name: 'Alpha 4', tier: 'A', score: 84, performance: '+19.6%', status: 'Discovered' }
];

export default function handler(req, res) {
  res.status(200).json({ items, count: items.length });
}
