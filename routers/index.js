const mainRouter = require('express').Router();

mainRouter.use(require('./currencies'));
mainRouter.use(require('./markets'));

module.exports = mainRouter;
