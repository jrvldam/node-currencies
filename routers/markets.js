const marketsRouter = require('express').Router();

const {
  markets: {
    marketsList,
    marketsById
  }
} = require('../controllers');

marketsRouter.get('/:id', marketsById);
marketsRouter.get('/', marketsList);

module.exports = marketsRouter;
