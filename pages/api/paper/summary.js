export default function handler(req, res) {
  res.status(200).json({
    mode: 'preview',
    startingBalance: 100,
    currentBalance: 106.4,
    simulatedReturn: '+6.4%',
    maxDrawdown: '-2.1%',
    days: 14,
    note: 'Mock preview data only.'
  });
}
