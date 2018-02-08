const marketsRouter = require('express').Router();

const {
  markets: {
    marketsList,
    marketsById
  }
} = require('../controllers');

marketsRouter.get('/markets/:id', marketsById);
marketsRouter.get('/markets/', marketsList);

module.exports = marketsRouter;
