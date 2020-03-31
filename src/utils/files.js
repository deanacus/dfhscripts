const path = require('path');
const fs = require('fs');

const hasFile = (file) => fs.existsSync(path.join(process.cwd(), file));

const getFile = (file) => (hasFile(file) ? require.resolve(path.join(process.cwd(), file)) : false);

const readFile = (file) => fs.readFileSync(file, 'utf-8');

module.exports = {
  hasFile,
  getFile,
  readFile,
};
