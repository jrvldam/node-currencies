const mainRouter = require('express').Router();

mainRouter.use('/currencies', require('./currencies'));
mainRouter.use('/markets', require('./markets'));

module.exports = mainRouter;
