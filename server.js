const http = require('http');
const app = require('./app');

const port = normalizePort(process.env.PORT || 3000);

const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(value) {
  const port = parseInt(value, 10);

  return Number.isNaN(port)
    ? value
    : port >= 0
      ? port
      : false;
}

function onError(error) {
  if (error.syscall !== 'listen') throw error;

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
    console.log(`${bind} is already in use`);
    process.exit(1);
    break;
  default:
    throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;

  console.log(`Listening on ${bind}`);
}
