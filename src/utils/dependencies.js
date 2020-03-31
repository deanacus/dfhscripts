const path = require('path');
// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(process.cwd(), 'package.json'));

const deps = pkg.dependencies;
const devDeps = pkg.devDependencies;
const peerDeps = pkg.peerDependencies;
const allDeps = { ...deps, ...devDeps, ...peerDeps };

const hasDep = (...depsArr) => {
  return !!depsArr.filter((dep) => Object.keys(deps).includes(dep)).length;
};

const getDep = (dep) => (hasDep([dep]) ? deps[dep] : false);

const hasDevDep = (...depsArr) => {
  return !!depsArr.filter((dep) => Object.keys(devDeps).includes(dep)).length;
};

const getDevDep = (dep) => (hasDevDep([dep]) ? devDeps[dep] : false);

const hasPeerDep = (...depsArr) => {
  return !!depsArr.filter((dep) => Object.keys(peerDeps).includes(dep)).length;
};

const getPeerDep = (dep) => (hasPeerDep([dep]) ? peerDeps[dep] : false);

const hasAnyDep = (...depsArr) => {
  return !!depsArr.filter((dep) => Object.keys(allDeps).includes(dep)).length;
};

const getAnyDep = (dep) => (hasAnyDep([dep]) ? allDeps[dep] : false);

module.exports = {
  hasDep,
  getDep,
  hasDevDep,
  getDevDep,
  hasPeerDep,
  getPeerDep,
  hasAnyDep,
  getAnyDep,
};
