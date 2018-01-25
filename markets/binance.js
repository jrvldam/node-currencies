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
    fetch(`${URL_DOMAIN}/api/v1/exchangeInfo`)
      .then(response => {
        this.cache = {
          name: 'Binance',
          data: mapToCustomArray(response.symbols),
          ts: Date.now(),
        };
      });
  }
};

function mapToCustomArray(data = []) {
  return data.map((coin, index) => ({
    id: coin.symbol,
    symbol: coin.symbol,
    name: coin.baseAsset,
    order: index,
  }));
}
