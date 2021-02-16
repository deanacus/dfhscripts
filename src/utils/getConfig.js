const fs = require('fs');
const path = require('path');
const pkgDir = require('pkg-up');

const configs = {
  webpack: ['webpack.config.js'],
  rollup: [],
  jest: ['jest.config.js', 'package.json'],
  eslint: [
    '.eslintrc.js',
    '.eslintrc.cjs',
    '.eslintrc.yaml',
    '.eslintrc.yml',
    '.eslintrc.json',
    'package.json',
  ],
  prettier: [
    'package.json',
    '.prettierrc',
    '.prettierrc.json',
    '.prettierrc.yml',
    '.prettierrc.yaml',
    '.prettierrc.json5',
    '.prettierrc.js',
    '.prettierrc.cjs',
    'prettier.config.js',
    'prettier.config.cjs',
    '.prettierrc.toml',
  ],
};

const getConfig = async (module) => {
  const rootDir = await pkgDir(process.cwd());
  const possibleConfigs = configs[module];
  const primaryConfig =
    possibleConfigs
      .map((config) =>
        fs.existsSync(path.resolve(rootDir, config))
          ? path.resolve(rootDir, config)
          : false,
      )
      .filter(Boolean)[0] ?? resolve(__dirname, `../config/${module}.js`);
  return primaryConfig;
};

module.exports = getConfig;
