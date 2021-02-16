const { spawn } = require('child_process');
const { getBinary, getConfig } = require('../utils');

const format = async () => {
  const cliArgs = process.argv.slice(3);
  const prettierPath = await getBinary('prettier');
  const config = getConfig('prettier');
  const args = ['--write', ...cliArgs];
  if (!config.contains('package.json')) {
    args.unshift('--config', config);
  }
  return spawn(prettierPath, args);
};

module.exports = format;
