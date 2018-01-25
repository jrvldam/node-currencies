const express = require('express');

const mainRouter = require('./routers');

const app = express();

app
  .use(mainRouter)
  .use(notFoundCatcher, errorHandler,);

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
