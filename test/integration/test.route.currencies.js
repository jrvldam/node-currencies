const supertest = require('supertest');
const app = require('sever');

exports.currencies_should_accept_strings = done => {
  supertest(app)
    .get('/currencies/TCB')
    .expect(200)
    .end(done);
};

exports.currencies_should_reject_other_than_strings = done => {
  supertest(app)
    .get('/currencies/57')
    .expect(404)
    .end(done);
};
