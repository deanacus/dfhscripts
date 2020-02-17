const { hasAnyDep } = require('../utils');

const presets = [
  '@babel/preset-env',
  hasAnyDep('react') && '@babel/preset-react',
].filter(Boolean);

const babelrc = {
  presets,
};

module.exports = babelrc;
