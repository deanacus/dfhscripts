<div align="center">
  <h1>📦dfh-scripts</h1>
  <p>Common scripts for keeping my projects nice</p>
</div>

Inspired by [`kcd-scripts`][kcd-scripts] and [`react-scripts`][react-scripts], I decided to create a
collection of preconfigured scripts to run in my projects to make it easier to manage things like
linting, testing and formatting.

## Installation

This package is distributed via npm so it can be installed with your preferred package manager:

```bash
npm install --save-dev @deanacus/dfhscripts
```

```bash
yarn add --dev @deanacus/dfhscripts
```

## Usage

This is purely a CLI tool, and is designed for you to use in your npm scripts, in much the same way
`create-react-app` uses [`react-scripts`][react-scripts].

It exposes a binary called `dfhscripts` for use in your `package.json`:

```json
{
  "scripts": {
    "lint": "dfhscripts lint",
    "format": "dfhscripts format",
    "test": "dfhscripts test",
    "coverage": "dfhscripts coverage",
    "build": "dfhscripts build"
  }
}
```

## Available scripts

As it stands, there are 4 available scripts:

- lint: runs eslint
- test: runs jest in watch mode
- format: runs prettier
- coverage: runs jest and collects coverage
- build: runs a simple rollup config and puts a single file in the dist directory.

Scripts I would like to expand upon:

- build: I'd like to make it smarter to detect what kind of package you're building and build that properly, including bin files or multiple files. I've made a start on the logic for this, but webpack is such a fickle beast that it may be worth requiring users to provide their own config.

Eventually I would like to add scripts for:

- pre-commit hooks
- webpack build
- npm-publish
- github-publish

## Configuration

There's no method for extending or merging the built in configuration. You can either completely override the config by creating whatever config file the underlying package expects,
`dfhscripts` will simply use that instead - no other change needed.

If you really want to merge or extend or merge configs the built in configs are exposed, so you can import those into your own config, and go from there:

```javascript
import jest from '@deanacus/dfhscripts/jest';

module.exports = {
  // ... your config here
}
```

## Contributing

This is a pretty simple project, almost entirely configuration files and some looking for files. It might be a really good way to make your first contribution to someone else's code. If you find something, fork the repo, make your change and raise a PR. Provided it doesn't break my usage, I'll likely accept it.

## Acknowledgements

Primarily, [Kent C. Dodds][kcd]. His [`kcd-scripts`][kcd-scripts] is pretty much the entire inspiration
for this package (and I've definitely borrowed heavily from his package's code), along with
[`react-scripts`][react-scripts]

[kcd-scripts]: https://github.com/kentcdodds/kcd-scripts 'kcd-scripts'
[react-scripts]: https://github.com/facebook/create-react-app/tree/master/packages/react-scripts
[kcd]: https://kentcdodds.com 'Kent C. Dodds'
