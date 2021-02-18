const fs = require('fs');
const path = require('path');
const pkgDir = require('pkg-dir');

const getBinary = async (module) => {
  const rootDir = await pkgDir(process.cwd());
  const binDir = path.resolve(rootDir, './node_modules/.bin');
  return new Promise((resolve, reject) => {
    fs.access(`${binDir}/${module}`, fs.F_OK, (err) =>
      err ? reject(err) : resolve(`${binDir}/${module}`),
    );
  });
};

module.exports = getBinary;
