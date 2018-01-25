const fetch = require('../utils/fetch');

const URL_DOMAIN = 'https://min-api.cryptocompare.com';

module.exports = {
  cache: {},
  health() {
    return fetch(`${URL_DOMAIN}/`);
  },
  currenciesById(id) {
    return fetch(`https://www.cryptocompare.com/api/data/coinsnapshot/?fsym=${id}&tsym=USD`);
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
    fetch(`${URL_DOMAIN}/data/all/coinlist`)
      .then(result => {
        this.cache = {
          name: 'Cryptocompare',
          data: mapObjectToCustomArray(result.Data),
          ts: Date.now(),
        };
      });
  },
};

function mapObjectToCustomArray(coins = {}) {
  return Object.keys(coins)
    .map(key => {
      const coin = coins[key];
      return {
        id: coin.Id,
        symbol: coin.Symbol,
        name: coin.Name,
        order: parseInt(coin.SortOrder, 10),
      };
    })
    .sort((a, b) => a.order - b.order);
}
