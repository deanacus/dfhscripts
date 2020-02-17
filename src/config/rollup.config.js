const path = require('path');
const babel = require('rollup-plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const { hasFile, hasPkgProp } = require('../utils');

const localBabel = require(path.join(__dirname, '../config/babelrc'));
const userBabel =
  hasFile('babel.config.js') ||
  hasFile('babel.config.json') ||
  hasFile('babel.config.cjs') ||
  hasFile('babel.config.mjs') ||
  hasFile('.babelrc.js') ||
  hasFile('.babelrc.json') ||
  hasFile('.babelrc.cjs') ||
  hasFile('.babelrc.mjs');

const babelOpts = {
  exclude: 'node_modules/**',
};

if (!userBabel) {
  babelOpts.presets = localBabel.presets;
}

const outputDir = 'dist';
const useCommonJs = hasPkgProp('bin');

const output = {
  exports: useCommonJs ? 'auto' : 'named',
  dir: outputDir,
  format: useCommonJs ? 'cjs' : 'esm',
};

const input = ['src/index.js'].filter(Boolean);

const config = {
  input,
  output,
  plugins: [peerDepsExternal(), babel(babelOpts), commonjs(), resolve()],
};

export default config;
