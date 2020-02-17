const path = require('path');
const fs = require('fs');
// eslint-disable-next-line import/no-dynamic-require
const pkg = require(path.join(process.cwd(), 'package.json'));
// const pkgUp = require('pkg-up')
const which = require('which');

const pkgName = pkg.name;

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

const hasFile = (file) => fs.existsSync(path.join(process.cwd(), file));

const getFile = (file) => (hasFile(file) ? require.resolve(path.join(process.cwd(), file)) : false);

const readFile = (file) => fs.readFileSync(file, 'utf-8');

const hasPkgProp = (prop) => Object.keys(pkg).includes(prop);

const getPkgProp = (prop) => (hasPkgProp(prop) ? pkg[prop] : false);

const isCi = () => false;

/**
 * Just for the time being until I can work out a naive way of doing this for me
 */

function resolveBin(modName, { executable = modName, cwd = process.cwd() } = {}) {
  let pathFromWhich;
  try {
    pathFromWhich = fs.realpathSync(which.sync(executable));
    if (pathFromWhich && pathFromWhich.includes('.CMD')) return pathFromWhich;
  } catch (_error) {
    // ignore _error
  }
  try {
    const modPkgPath = require.resolve(`${modName}/package.json`);
    const modPkgDir = path.dirname(modPkgPath);
    // eslint-disable-next-line import/no-dynamic-require
    const { bin } = require(modPkgPath); // eslint-disable-line global-require
    const binPath = typeof bin === 'string' ? bin : bin[executable];
    const fullPathToBin = path.join(modPkgDir, binPath);
    if (fullPathToBin === pathFromWhich) {
      return executable;
    }
    return fullPathToBin.replace(cwd, '.');
  } catch (error) {
    if (pathFromWhich) {
      return executable;
    }
    throw error;
  }
}

module.exports = {
  pkgName,
  hasDep,
  getDep,
  hasDevDep,
  getDevDep,
  hasPeerDep,
  getPeerDep,
  hasAnyDep,
  getAnyDep,
  hasFile,
  getFile,
  readFile,
  hasPkgProp,
  getPkgProp,
  isCi,
  resolveBin,
};
