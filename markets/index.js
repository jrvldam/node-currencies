const cryptocompare = require('./cryptocompare');
const binance       = require('./binance');
const Cryptowatch   = require('./Cryptowatch');

const cryptowatch = new Cryptowatch();

cryptocompare.updateCache();
binance.updateCache();

module.exports = {
  cryptocompare,
  binance,
  cryptowatch,
};
