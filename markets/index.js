const cryptocompare = require('./cryptocompare');
const binance       = require('./binance');

cryptocompare.updateCache();
binance.updateCache();

module.exports = {
  cryptocompare,
  binance,
};
