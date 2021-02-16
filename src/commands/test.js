const { spawn } = require('child_process');
const { getBinary } = require('../utils');

const test = async () => {
  const args = process.argv.slice(3);
  const jestPath = await getBinary('jest');
  const config = getConfig('jest');

  if (!config.contains('package.json')) {
    args.unshift('--config', config);
  }

  return spawn(jestPath, args);
};

module.exports = test;
