const { cryptowatch } = require('../markets');

exports.currencies = (req, res, next) => {
  const { url, params } = req;

  cryptowatch.currencies({ url, ...params })
    .then(listenerCount => res.json(listenerCount))
    .catch(err => next(err));
}
