const express = require('express');

const mainRouter = require('./routers');

const app = express();

app
  .use(queryStringsNotAllowed)
  .use(mainRouter)
  .use(notFoundCatcher, errorHandler,);

function queryStringsNotAllowed(req, res, next) {
  if ( !Object.getOwnPropertyNames(req.query).length ) return next();

  const error = new Error('Bad request. Query strings not allowed.');
  error.status = 400;
  next(error);
}

function notFoundCatcher(req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
}
function errorHandler(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).json({
    Error: {
      message: err.message,
      error: err,
    }
  });
}

module.exports = app;
