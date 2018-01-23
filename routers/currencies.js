const currenciesRouter = require('express').Router();

const { currencies } = require('../controllers');

currenciesRouter.get('/currencies', currencies);

module.exports = currenciesRouter;
