const fetch = require('../utils/fetch');

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
      .then(values => {
        const data = values[0].symbols;
        const prices = getPriceDictionary(values[1]);
        this.cache = {
          name: 'Binance',
          data: mapToCustomArray(data, prices),
          ts: Date.now(),
        };
      });
  }
};

function getPriceDictionary(priceTicker) {
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
