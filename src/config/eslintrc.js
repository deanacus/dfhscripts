const { hasAnyDep } = require('../utils');

const reactPlugins = [
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-react',
  'eslint-plugin-react-app',
  'eslint-plugin-react-hooks',
];

const extend = () => {
  const extendArr = ['airbnb'];

  // Has to go last to let prettier override any other settings
  extendArr.push('prettier');
  return extendArr;
};

const plugins = () => {
  let pluginArr = ['jest', 'import'];
  if (hasAnyDep('react')) {
    pluginArr = [...pluginArr, ...reactPlugins];
  }
  return pluginArr;
};

const rules = () => {
  let rulesObj = {
    'import/prefer-default-export': 0,
  };
  if (hasAnyDep('react')) {
    rulesObj = {
      ...rulesObj,
      'react/jsx-one-expression-per-line': 0,
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    };
  }

  return rulesObj;
};

module.exports = {
  extends: extend(),
  plugins: plugins(),
  env: {
    'jest/globals': true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 9,
    sourceType: 'module',
  },
  rules: rules(),
};
