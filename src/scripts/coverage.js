const { hasFile } = require('../utils/files');
const { hasPkgProp } = require('../utils/package');

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
  if (!argv.includes('--coverage')) {
    args.push('--no-watch');
    args.push('--coverage');
  }

  return args;
};

const jestArgs = buildArgs();

require('jest').run(jestArgs);
