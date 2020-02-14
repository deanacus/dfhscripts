const { hasAnyDep } = require('../utils');

const presets = () => {
  const output = [require.resolve('@babel/preset-env')];

  if (hasAnyDep('react')) {
    output.push(require.resolve('@babel/preset-react'));
  }

  return output;
};

const plugins = () => {
  const output = [];
  return output;
};

module.exports = () => ({
  presets: presets(),
  plugins: plugins(),
});
