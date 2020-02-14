const { hasAnyDep } = require('../utils');

const reactPlugins = [
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-react',
  'eslint-plugin-react-app',
  'eslint-plugin-react-hooks',
];

const extend = () => {
  const extendArr = ['eslint-config-airbnb'];
  return extendArr;
};

const plugins = () => {
  let pluginArr = ['jest'];
  if (hasAnyDep('react')) {
    pluginArr = [...pluginArr, ...reactPlugins];
  }
  return pluginArr;
};

module.exports = {
  extends: extend(),
  plugins: plugins(),
  env: {
    'jest/globals': true,
  },
  rules: {},
};
