const spawn = require('cross-spawn');
const { hasAnyDep, hasFile, resolveBin } = require('../utils');

const failedMessage = `
Sorry, we either couldn't find a build tool, or your build tool is not yet supported.

Currently supported build tools are:
* Rollup
* Webpack

If you are using either of these, or want to have your preferred build tool added, please raise an issue on Github https://github.com/deanacus/dfhscripts/issues/new
`;

const isWebpack = hasAnyDep('webpack');
const isRollup = hasAnyDep('rollup');

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

const binary = () => {
  if (isWebpack) {
    return resolveBin('webpack');
  }
  if (isRollup) {
    return resolveBin('rollup');
  }

  console.log(failedMessage);

  process.exit(1);
};

const result = spawn.sync(binary(), [...buildArguments], { stdio: 'inherit' });

process.exit(result.status);
