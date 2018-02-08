const currenciesRouter = require('express').Router();

const { currencies } = require('../controllers');

currenciesRouter.get('/currencies/:id?', currencies);

module.exports = currenciesRouter;
