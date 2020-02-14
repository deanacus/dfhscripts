const { ifAnyDep, hasFile } = require('./src/utils');

// console.log(hasFile("utils.js"));

// console.log(require.resolve('./config/jest.config'))

const script = process.argv[2];

if(script) {
  require(`./src/scripts/${script}`);
}