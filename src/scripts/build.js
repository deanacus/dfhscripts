const spawn = require('cross-spawn');
const { hasFile, resolveBin } = require('../utils');

const localConfig = require.resolve('../config/rollup.config');
const userConfig = hasFile('rollup.config');

const buildArgs = () => {
  const argv = process.argv.slice(2);
  const args = [...argv];
  // which config to pass
  if (!userConfig || !argv.includes('--config')) {
    args.push('--config', localConfig);
  }

  return args;
};

const buildArguments = buildArgs();

const result = spawn.sync(resolveBin('rollup'), [...buildArguments], { stdio: 'inherit' });

process.exit(result.status);
