const spawn = require('cross-spawn');
const { hasFile, hasPkgProp, resolveBin } = require('../utils');

const localConfig = require.resolve('../config/prettierrc');
const localIgnore = require.resolve('../config/prettierignore');
const userConfig = hasFile('.prettierrc') || hasFile('.prettierrc.js') || hasPkgProp('prettierConfig');
const userIgnore = hasFile('.prettierignore') || hasPkgProp('prettierIgnore');

const buildArgs = () => {
  const argv = process.argv.slice(3);
  const args = [...argv];
  // which config to pass
  if (!userConfig || !argv.includes('--config')) {
    args.push('--config', localConfig);
  }

  // Which ignore file to use
  if (!userIgnore || !argv.includes('--ignore-path')) {
    args.push('--ignore-path', localIgnore);
  }

  args.push('src/**/*.js');
  args.push('--write');

  return args;
};

const formatArgs = buildArgs();

const result = spawn.sync(resolveBin('prettier'), [...formatArgs], { stdio: 'inherit' });

process.exit(result.status);
