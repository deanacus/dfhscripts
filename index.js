const commands = require('./src/commands');

const [_, __, cmd] = process.argv;

const helpText = `
@deanacus/scripts

DESCRIPTION:
  A zero config development script toolkit for use with Node.js projects

USAGE:
  @deanacus/scripts <command>

COMMANDS:
  build
  coverage
  format
  lint
  start
  test`;

const main = async () => {
  if (commands.hasOwnProperty(cmd)) {
    try {
      const job = await commands[cmd]();
      job.addListener('close', (exitCode) => {
        if (!exitCode) {
          process.stdout.write('Success!');
        }
      });
      job.addListener('error', (err) => {
        process.stderr.write(err.toString());
        let message = '';
        if (err.path) {
          message += err.path;
        }
        if (err.spawnargs) {
          message += ` ${err.spawnargs.join(' ')}`;
        }
        console.log(message);
        process.exit(1);
      });
    } catch (error) {
      process.stdout.write(error.toString());
    }
  } else {
    process.stdout.write(helpText);
    process.exit(1);
  }
};

main();
