const marketsRouter = require('express').Router();

const { markets } = require('../controllers');

marketsRouter.get('/markets', markets);

module.exports = marketsRouter;
