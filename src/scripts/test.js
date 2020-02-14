const { hasPkgProp, hasFile } = require('../utils');

const localConfig = require.resolve('../config/jest.config');
const userConfig = hasFile('jest.config.js') || hasPkgProp('jest');

const buildArgs = () => {
  const argv = process.argv.slice(3);
  const args = [...argv];
  // which config to pass
  if (!userConfig || !argv.includes('--config')) {
    args.push('--config', localConfig);
  }
  // Suppress Watch
  if (!argv.includes('--no-watch') && !argv.includes('--coverage')) {
    args.push('--watch');
  }

  return args;
};

const jestArgs = buildArgs();

require('jest').run(jestArgs);
