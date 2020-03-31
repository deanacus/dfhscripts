const path = require('path');
// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(process.cwd(), 'package.json'));
// const pkgUp = require('pkg-up')

const pkgName = pkg.name;

const hasPkgProp = (prop) => Object.keys(pkg).includes(prop);

const getPkgProp = (prop) => (hasPkgProp(prop) ? pkg[prop] : false);

module.exports = {
  pkgName,
  hasPkgProp,
  getPkgProp,
};
