const items = [
  { source: 'Alpha 1', topic: 'Election market', side: 'YES', size: '$120', mode: 'Preview' },
  { source: 'Alpha 3', topic: 'Football market', side: 'NO', size: '$80', mode: 'Preview' },
  { source: 'Alpha 4', topic: 'Crypto market', side: 'YES', size: '$45', mode: 'Preview' }
];

export default function handler(req, res) {
  res.status(200).json({ items, count: items.length });
}
