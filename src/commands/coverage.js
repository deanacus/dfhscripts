const { resolve } = require('path');
const { spawn } = require('child_process');
const { getBinary, getConfig } = require('../utils');

const coverage = async () => {
  const cliArgs = process.argv.slice(3);
  const jestPath = await getBinary('jest');
  const config =
    getConfig('jest') ?? resolve(__dirname, '../config/jest.config.js');

  const args = ['--coverage', ...cliArgs];
  if (!config.contains('package.json')) {
    args.unshift('--config', config);
  }

  return spawn(jestPath, args);
};

module.exports = coverage;
