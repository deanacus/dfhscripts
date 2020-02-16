<div align="center">
  <h1 style="border-bottom: none;">dfh-scripts</h1>
  <hr style="width: 60%;" />
  <p>Common scripts for keeping my projects nice</p>
</div>

Inspired by [`kcd-scripts`][kcd-scripts] and [`react-scripts`][react-scripts], I
decided to create a collection of preconfigured scripts to run in my projects to
make it easier to manage things like linting, testing and formatting.

## Installation

This package is distributed via npm so it can be installed with your preferred package manager:

```bash
npm install --save-dev @deanacus/dfhscripts
```
```bash
yarn add --dev @deanacus/dfhscripts
```

## Usage

This is purely a CLI tool, and is designed for you to use in your npm scripts,
in much the same way `create-react-app` uses [`react-scripts`][react-scripts].

It exposes a binary called `dfhscripts` for use in your `package.json`:

```json
{
  "scripts": {
    "lint": "dfhscripts lint",
    "format": "dfhscripts format",
    "test": "dfhscripts test",
    "coverage": "dfhscripts coverage"
  }
}
```

## Available scripts

As it stands, there are 4 available scripts:

- lint - runs eslint
- test - runs jest in watch mode
- format - runs prettier
- coverage - runs jest and collects coverage

Eventually I would like to add scripts for:

- pre-commit hooks
- rollup build
- webpack build
- npm-publish
- github-publish

## Configuration

Configuration for each script can be completely overridden by providing
configuration for the underlying package in whatever way that package expects.
If one of those exists, your configuration will be used instead.

There is no method for merging configuration. This is something best left up to
the user - `dfhscripts` exposes its configuration, so that if you would like to
do this, simple import the relevent config and extend it.

## Contributions

I'd love to have contributions. This is a pretty simple project, and not exactly
a lot of difficulty coding, so perhaps it would be a good chance for someone to
get their feet wet with contributing to other people's code.

## Acknowledgements

Primarily, [Kent C. Dodds]. His [`kcd-scripts`][kcd-scripts] is pretty much the
entire inspiration for this package (and I've definitely borrowed heavily from
his package's code), along with [`react-scripts`][react-scripts]

[kcd-scripts]: https://github.com/kentcdodds/kcd-scripts "kcd-scripts"
[react-scripts]:
  https://github.com/facebook/create-react-app/tree/master/packages/react-scripts
[kcd]: https://kentcdodds.com "Kent C. Dodds"
