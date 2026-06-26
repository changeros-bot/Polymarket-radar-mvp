const { simulatePaperTrades } = require('../_mockData');

module.exports = function handler(_req, res) {
  res.status(200).json(simulatePaperTrades());
};
