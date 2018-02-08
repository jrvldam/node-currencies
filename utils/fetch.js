const fetch = require('node-fetch');

module.exports = url => {
  const timeStart = Date.now();

  return fetch(url)
    .then(response => {
      const { status, statusText } = response;
      const timeSpended = Date.now() - timeStart;

      console.log(status, statusText, url, `${timeSpended} ms`);

      if (399 < status || status < 200) {
        const error = new Error();
        error.status = status;
        error.message = `Something goes wrong 😞`;
        throw error;
      }

      return response.json();
    });
};
