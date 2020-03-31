const spawn = require('cross-spawn');
const { bold, red } = require('ansi-colors');
const { resolveBin } = require('../utils/resolve');
const { hasAnyDep } = require('../utils/dependencies');
const { rollup } = require('rollup');
const { webpack } = require('./build/webpack');


const failedMessage = `
Sorry, we either couldn't find a build tool, or your build tool is not yet supported.

Currently supported build tools are:
* Rollup
* Webpack

If you are using either of these, or want to have your preferred build tool added, please raise an issue on Github https://github.com/deanacus/dfhscripts/issues/new
`;

const isWebpack = hasAnyDep('webpack');
const isRollup = hasAnyDep('rollup');

const [nodeExec, caller, script, ...args] = process.argv;
const runScript = (targetScript) => {
  const scriptPath = require.resolve(path.join(__dirname, 'build', targetScript));
  const result = spawn.sync(nodeExec, [scriptPath, ...args], {
    stdio: 'inherit',
  });

  process.exit(result.status);
};

const binary = () => {
  if (isWebpack) {
    return runScript('weboack');
  }
  if (isRollup) {
    return runScript('rollup');
  }

  console.log(failedMessage);

  process.exit(1);
};