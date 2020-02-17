const { hasPkgProp, hasAnyDep } = require('../utils');

const useCommonJS = hasPkgProp('bin');

const presets = [
  '@babel/preset-env',
  hasAnyDep('react') && '@babel/preset-react',
].filter(Boolean)

const plugins = [
  [
    require.resolve('@babel/plugin-transform-runtime'),
    {useESModules: !useCommonJS},
  ],
  hasAnyDep('react') && [
    require.resolve('babel-plugin-transform-react-remove-prop-types'),
    {mode: 'unsafe-wrap'},
  ],
].filter(Boolean)

const babelrc = {
  presets,
  plugins,
}

module.exports = babelrc;