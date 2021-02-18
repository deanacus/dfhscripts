const pkgDir = require('pkg-up');

const getDeps = async () => {
  const pkgFile = await pkgDir(process.cwd());
  const pkg = require(pkgFile);
  const deps = Object.keys({
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {}),
    ...(pkg.peerDependencies ?? {}),
  });
  return deps;
};

module.exports = getDeps;
