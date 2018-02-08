const { fetch } = require('../utils');

const URL_DOMAIN = 'https://api.binance.com';

module.exports = {
  cache: {},
  health() {
    return fetch(`${URL_DOMAIN}/api/v1/ping`);
  },
  currenciesById(id) {
    return fetch(`${URL_DOMAIN}/api/v3/ticker/price?symbol=${id}`);
  },
  currenciesList() {
    return this.getCache();
  },
  getCache() {
    if (!this.cache.ts || (Date.now() - this.cache.ts) > 60000) {
      this.updateCache();
    }
    return this.cache;
  },
  updateCache() {
    const priceTicker = fetch(`${URL_DOMAIN}/api/v3/ticker/price`);
    const exchangeInfo = fetch(`${URL_DOMAIN}/api/v1/exchangeInfo`);
    Promise.all([exchangeInfo, priceTicker])
      .then((results) => {
        const [exchangeInfo, priceTicker] = results;
        const data = exchangeInfo.symbols;
        const prices = getPriceDictionary(priceTicker);
        this.cache = {
          name: 'Binance',
          data: mapToCustomArray(data, prices),
          ts: Date.now(),
        };
      })
      .catch(err => {
        return {
          message: err.message,
          error: err,
          status: err.status,
        }
      });
  }
};

function getPriceDictionary(priceTicker = []) {
  return priceTicker.reduce((acc, coin) => {
    acc[coin.symbol] = coin.price;
    return acc;
  }, {});
}

function mapToCustomArray(data = [], prices) {
  return data.map((coin, index) => ({
    id: coin.symbol,
    symbol: coin.symbol,
    name: coin.baseAsset,
    price: prices[coin.symbol],
    order: index,
  }));
}
