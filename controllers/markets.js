const marketsList = (req, res, next) => {
  res.send('markets list');
};

const marketsById = (req, res, next) => {
  res.send(`market id ${req.params.id}`);
};

module.exports = {
  marketsList,
  marketsById,
};
