const path = require('path');
const { hasAnyDep, hasFile, hasPkgProp } = require('../utils');

// const here = (p) => path.join(__dirname, p);

// const useBuiltInBabelConfig = !hasFile('.babelrc') && !hasPkgProp('babel');

const ignores = [
  '/node_modules/',
  '/__fixtures__/',
  '/fixtures/',
  '/__tests__/helpers/',
  '/__tests__/utils/',
  '__mocks__',
];

const jestConfig = {
  roots: [path.join(process.cwd(), 'src')],
  testEnvironment: hasAnyDep(['webpack', 'rollup', 'react']) ? 'jsdom' : 'node',
  testURL: 'http://localhost',
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  collectCoverageFrom: ['src/**/*.+(js|jsx|ts|tsx)'],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
  testMatch: ['**/__tests__/**/*.+(js|jsx|ts|tsx)'],
  testPathIgnorePatterns: [...ignores],
  watchPlugins: [
    require.resolve('jest-watch-typeahead/filename'),
    require.resolve('jest-watch-typeahead/testname'),
  ],
};

if (hasFile('setup-env.js')) {
  jestConfig.setupFilesAfterEnv = [path.join(process.cwd(), 'setup-env.js')];
}

// if (useBuiltInBabelConfig) {
//   jestConfig.transform = { "^.+\\.js$": here("./babel-transform") };
// }

module.exports = jestConfig;
