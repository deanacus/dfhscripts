const { spawn } = require('child_process');
const { getBinary, getConfig, getDeps } = require('../utils');

const knownBuildTools = ['webpack', 'rollup'];

const build = async () => {
  const args = process.argv.slice(3);
  const deps = await getDeps();
  const foundBuildTool = knownBuildTools.filter((tool) => deps.includes(tool));

  if (foundBuildTool.length !== 1) {
    const errorMessage = foundBuildTool.length
      ? 'Multiple build tools found in project dependencies'
      : 'No build tool found in project dependencies';
    throw new Error(errorMessage);
  }

  const buildToolPath = await getBinary(foundBuildTool[0]);
  const config = await getConfig(oundBuildTool[0]);
  args.unshift('--config', config);
  return spawn(buildToolPath, args);
};

module.exports = build;
