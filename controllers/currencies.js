const { cryptocompare, binance } = require('../markets');

exports.currenciesList = (req, res, next) => {
  const list = binance.currenciesList();
  return res.json(list);
}

exports.currenciesById = (req, res, next) => {
  binance.currenciesById(req.params.id)
    .then(coin => res.json(coin));
};
