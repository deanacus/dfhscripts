const { spawn } = require('child_process');
const { getBinary } = require('../utils');

const lint = async () => {
  const args = process.argv.slice(3);
  const eslintPath = await getBinary('eslint');
  const config = getConfig('eslint');
  if (!config.contains('package.json')) {
    args.unshift('--config', config);
  }
  return spawn(eslintPath, args);
};

module.exports = lint;
