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

const hasDevDep = (...depsArr) => {
  return !!depsArr.filter((dep) => Object.keys(devDeps).includes(dep)).length;
};

const hasPeerDep = (...depsArr) => {
  return !!depsArr.filter((dep) => Object.keys(peerDeps).includes(dep)).length;
};

const hasAnyDep = (...depsArr) => {
  return !!depsArr.filter((dep) => Object.keys(allDeps).includes(dep)).length;
};

const hasFile = (file) => fs.existsSync(path.join(process.cwd(), file));

const hasPkgProp = (prop) => Object.keys(pkg).includes(prop);

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
  hasDevDep,
  hasPeerDep,
  hasAnyDep,
  hasFile,
  hasPkgProp,
  isCi,
  resolveBin,
};
