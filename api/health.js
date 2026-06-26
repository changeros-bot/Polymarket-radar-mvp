const { config } = require('./_mockData');

module.exports = function handler(_req, res) {
  res.status(200).json({
    ok: true,
    service: 'polymarket-radar-mvp',
    previewMode: config.previewMode,
    phase: 'vercel-paper-trading-mvp',
  });
};
