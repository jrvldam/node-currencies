const marketsRouter = require('express').Router;

const { markets } = require('../controllers');

marketsRouter.get('/', markets);

module.exports = marketsRouter;
