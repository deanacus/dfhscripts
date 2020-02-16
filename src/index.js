#!/usr/bin/env node
const path = require('path');
const spawn = require('cross-spawn');
const glob = require('glob');

const [exec, , script, ...args] = process.argv;

const availableScripts = glob
  .sync(path.join(__dirname, 'scripts', '*'))
  .map((scr) => scr.replace(path.join(__dirname, 'scripts/'), '').replace('.js', ''));

const runScript = (targetScript) => {
  const scriptPath = require.resolve(path.join(__dirname, 'scripts', targetScript));
  const result = spawn.sync(exec, [scriptPath, ...args], { stdio: 'inherit' });

  process.exit(result.status);
};

if (script && availableScripts.includes(script)) {
  runScript(script);
}
