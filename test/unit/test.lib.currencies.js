const assert = require('assert');
const currencies = require('../../lib/currencies');

exports.it_should_return_false = done => {
  const result = currencies('BTC');
  assert.ok(result === false);
  return done();
};
