const { fetch } = require('../utils');

const URL_DOMAIN = 'https://coinbin.org';

module.exports = {
  cache: {},
  health() {},
  currenciesById(id) {
    return fetch(`${URL_DOMAIN}/${id}`);
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
    fetch(`${URL_DOMAIN}/coins`)
      .then(response => this.cache = {
        name: 'Coinbin',
        data: mapObjectToCustomArray(response.coins),
        ts: Date.now(),
      })
      .catch(err => ({
        message: err.message,
        error: err,
        status: err.status,
      }));
  },
};

function mapObjectToCustomArray(data = {}) {
  return Object.keys(data).map((key, index) => {
    const coin = data[key];
    return {
      id: key,
      symbol: coin.ticker,
      name: coin.ticker,
      price: coin.usd,
      order: index,
    };
  })
}
