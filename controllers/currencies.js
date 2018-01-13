const currenciesControlller = (req, res, next) => {
  res.json({
    message: 'hello currencies!',
    params: req.params,
  });
};

module.exports = currenciesControlller;
