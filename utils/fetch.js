const fetch = require('node-fetch');

module.exports = url => {
  return fetch(url)
    .then(response => {
      console.warn(':::! Remember you must handle ~=2XX code status');
      return response.json();
    })
    .catch(error => ({
      Error: {
        message: error.message,
        error: error,
      },
    }));
};
