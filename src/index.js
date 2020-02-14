const path = require('path');
const spawn = require('cross-spawn');
const glob = require('glob');
const { resolveBin } = require('./utils');

const [_, __, script] = process.argv;

const availableScripts = glob
  .sync(path.join(__dirname, 'scripts', '*'))
  .map((script) => script.replace(path.join(__dirname, 'scripts/'), '').replace('.js', ''));

const runScript = (script) => {
  const scriptPath = require.resolve(path.join(__dirname, './scripts', script));

  console.log(scriptPath);

  const result = spawn.sync(
    require.resolve(path.join(__dirname, './scripts', script)),
    [process.argv],
    { stdio: 'inherit' },
  );

  if (result.signal) {
    console.log(result);
  } else {
    process.exit(result.status);
  }
};

if (script && availableScripts.includes(script)) {
  runScript(script);
}
