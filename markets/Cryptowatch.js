const { fetch } = require('../utils');
const { cache } = require('../cache');

class Cryptowatch {
  constructor() {
    const domain = 'https://api.cryptowat.ch';
    this.url = {
      ping: () => domain,
      assets: symbol => `${domain}/assets${symbol ? `/${symbol}` : ''}`,
      pairs: id => `${domain}/pairs${id ? `/${id}` : ''}`,
      exchanges: id => `${domain}/exchanges${id ? `/${id}` : ''}`,
      markets: (exchange, pair, price) => `${domain}/markets${exchange
        ? `/${exchange}${pair
          ? `/${pair}${price
            ? `/${price}`
            : ''}`
          : ''}`
        : ''}`,
    };
    // warm cache of currencies
    this.currencies({ url: this.url.assets() })
        .then(res =>
        cache.set('/currencies', this.valueParse({ url: '/currencies', res })));
  }

  currencies({ url, id }) {
    const cachedValue = cache.get(url);
    console.log('cachedValue', url, !!cachedValue);

    return cachedValue
      ? Promise.resolve(cachedValue)
      : fetch(this.url.assets(id))
          .then(({ result }) => Promise.all(result.map(coin => fetch(coin.route)
            .then(coinInfo => {
              const merge1 = { ...coin, ...coinInfo };

              return merge1;
            })))
          .then(data => cache.set(url, this.valueParse({ url, data }))));
  }

  valueParse({ url, data }) {
    return {
      url,
      data,
      ts: Date.now(),
    };
  }
}

module.exports = Cryptowatch;


// jsonAsDB.read().then(console.log).catch(console.error);
// cache.setLongTerm = () => '::: cache for long term';

// console.log(cache.setLongTerm())


// cache.set(url, valueParse({ url, res })))
