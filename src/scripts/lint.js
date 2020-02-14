const spawn = require('cross-spawn');
const { hasFile, hasPkgProp, resolveBin } = require('../utils');

const localConfig = require.resolve('../config/eslintrc');
const localIgnore = require.resolve('../config/eslintignore');
const userConfig = hasFile('.eslintrc') || hasFile('.eslintrc.js') || hasPkgProp('eslintConfig');
const userIgnore = hasFile('.eslintignore') || hasPkgProp('eslintIgnore');

const buildArgs = () => {
  const argv = process.argv.slice(2);
  const args = [...argv];
  // which config to pass
  if (!userConfig || !argv.includes('--config')) {
    args.push('--config', localConfig);
  }

  // Which ignore file to use
  if (!userIgnore || !argv.includes('--ignore-path')) {
    args.push('--ignore-path', localIgnore);
  }

  args.push('./src/**/*.js');

  return args;
};

const lintArgs = buildArgs();

const result = spawn.sync(resolveBin('eslint'), [...lintArgs], { stdio: 'inherit' });

process.exit(result.status);
