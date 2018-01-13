const currencies = (req, res, next) => {
  res.json({
    message: 'hello market!',
    params: req.params,
  });
};

module.exports = currencies;
