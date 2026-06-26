const { watchedTraders, traderMetrics } = require('./_mockData');

module.exports = function handler(_req, res) {
  res.status(200).json({
    traders: watchedTraders,
    metrics: traderMetrics,
  });
};
