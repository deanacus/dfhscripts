const path = require('path');

module.exports = {
  entry: path.resolve(process.cwd(), "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  }
}