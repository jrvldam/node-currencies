const { writeFile, readFile } = require('fs');
const path = require('path');

const FILE_NAME = 'db.json';
const URI = path.join(process.cwd(), FILE_NAME);

exports.read = () => new Promise(( resolve, reject ) => {
  let db;
  try {
    db = require(URI);
  } catch (error) { // MODULE_NOT_FOUND
    return reject(error);
  }
  resolve(db);
});

exports.write = data => new Promise(( resolve, reject ) => {
  writeFile(URI, data, 'utf8', err => {
    if (err) return reject(err);
    resolve(true);
  });
});
