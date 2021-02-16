const commands = require('./src/commands');

const [_, __, cmd] = process.argv;

if (commands.hasOwnProperty(cmd)) {
  const job = commands[cmd]();
  job.on('close', (code, signal) => console.log(code, signal));
  job.on('exit', (code, signal) => console.log(code, signal));
  job.on('error', (err) => console.log(err));
  job.on('message', (message, sendHandle) => console.log(message, sendHandle));
} else {
  // print some usage stuff
}
