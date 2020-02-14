const script = process.argv[2];

if(script) {
  require(`./src/scripts/${script}`);
}