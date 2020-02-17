const { hasPkgProp, getPkgProp } = require('../utils');
const babel = require('rollup-plugin-babel');
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');

const outputDir = 'dist';

const useCommonJs = hasPkgProp('bin');

const output = [
  {
    exports: useCommonJs ? 'auto' : 'named',
    dir: outputDir,
    format: useCommonJs ? 'cjs' : 'esm',
  },
];

const input = [
  'src/index.js'
].filter(Boolean)

const config = {
  input,
  output,
  plugins: [
    peerDepsExternal(),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
    resolve(),
  ],
};

export default config;