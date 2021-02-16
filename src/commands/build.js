const { spawn } = require('child_process');
const { getBinary, getConfig } = require('../utils');

const build = async () => {
  const args = process.argv.slice(3);
  const webpackPath = await getBinary('webpack');
  const config = getConfig('webpack');
  args.unshift('--config', config);
  return spawn(webpackPath, args);
};

module.exports = build;
