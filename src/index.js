const path = require('path');
const spawn = require('cross-spawn');
const glob = require('glob');
const { bold, red } = require('ansi-colors');

const [nodeExec, caller, script, ...args] = process.argv;

const availableScripts = glob
  .sync(path.join(__dirname, 'scripts', '*'))
  .map((scr) => scr.replace(path.join(__dirname, 'scripts/'), '').replace('.js', ''));

const runScript = (targetScript) => {
  const scriptPath = require.resolve(path.join(__dirname, 'scripts', targetScript));
  const result = spawn.sync(nodeExec, [scriptPath, ...args], { stdio: 'inherit' });

  process.exit(result.status);
};

if (script && availableScripts.includes(script)) {
  runScript(script);
}
else {
  const scriptsList = availableScripts.map( scr => `  * ${scr}`).join('\n');
  const noScriptMessage = red('No script was supplied. Please see usage below');
  const invalidScriptMessage = red(`Unknown script: ${bold(script)}. Please see usage below`);
  const errorMessage = script ? invalidScriptMessage : noScriptMessage;
  const usage = `
${errorMessage}

${bold('Usage')}:
${caller} [script] [--flags]

${bold('Available Scripts')}:
${scriptsList}

${bold('Flags')}:
  These are all dependent on the script you are calling. All supplied
  flags and options are passed through to the script, but whether
  they are used is dependent on what is available in the
  underlying package.
  `
  console.log(usage)
}