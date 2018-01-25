const currenciesRouter = require('express').Router();

const {
  currencies: {
    currenciesList,
    currenciesById,
  }
} = require('../controllers');

currenciesRouter.get('/:id', currenciesById);
currenciesRouter.get('/', currenciesList);

module.exports = currenciesRouter;
