const { recentTrades } = require('../_mockData');

module.exports = function handler(_req, res) {
  res.status(200).json({
    trades: recentTrades,
  });
};
