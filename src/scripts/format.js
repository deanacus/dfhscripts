const spawn = require('cross-spawn');
const { hasFile } = require('../utils/files');
const { resolveBin } = require('../utils/resolve');
const { hasPkgProp } = require('../utils/package');

const localConfig = require.resolve('../config/prettierrc');
const localIgnore = require.resolve('../config/prettierignore');
const userConfig =
  hasFile('.prettierrc') || hasFile('.prettierrc.js') || hasPkgProp('prettierConfig');
const userIgnore = hasFile('.prettierignore') || hasPkgProp('prettierIgnore');

const buildArgs = () => {
  const argv = process.argv.slice(2);
  const args = [...argv];
  // which config to pass
  if (!userConfig || !argv.includes('--config')) {
    args.unshift('--config', localConfig);
  }

  // Which ignore file to use
  if (!userIgnore || !argv.includes('--ignore-path')) {
    args.unshift('--ignore-path', localIgnore);
  }

  args.push('./src/**/*.{js,jsx,md,mdx,html,css,yml}');
  args.push('--write');

  return args;
};

const formatArgs = buildArgs();

const result = spawn.sync(resolveBin('prettier'), [...formatArgs], { stdio: 'inherit' });

process.exit(result.status);
