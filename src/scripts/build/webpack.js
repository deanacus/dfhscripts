const spawn = require('cross-spawn');
const { bold, red } = require('ansi-colors');
const { hasFile } = require('../../utils/files');
const { resolveBin } = require('../../utils/resolve');

const localConfig = require.resolve('../../config/webpack.config');
const userConfig = hasFile('webpack.config');

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

const result = spawn.sync(resolveBin('webpack'), [...buildArguments], { stdio: 'inherit' });

process.exit(result.status);
