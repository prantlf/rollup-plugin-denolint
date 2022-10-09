# rollup-plugin-denolint

[![Latest version](https://img.shields.io/npm/v/rollup-plugin-denolint)
 ![Dependency status](https://img.shields.io/librariesio/release/npm/rollup-plugin-denolint)
](https://www.npmjs.com/package/rollup-plugin-denolint)
[![Coverage](https://codecov.io/gh/prantlf/rollup-plugin-denolint/branch/master/graph/badge.svg)](https://codecov.io/gh/prantlf/rollup-plugin-denolint)

A [Rollup] plugin to lint entry points and all imported files with [denolint].

A lot faster than [@rollup/plugin-eslint], handling both JavaScript and TypeScript sources. Use [esbuild-plugin-denolint] for [esbuild]. Use [webpack-loader-denolint] for [Webpack]. Or simpler, just the [command-line `denolint`].

## Synopsis

```js
import { denolint } from 'rollup-plugin-denolint'

export default {
  plugins: [denolint()]
  // the rest of the configuration
}
```

## Installation

Make sure that you use [Node.js] 14 or newer and [Rollup] 2 or newer. Use your favourite package manager - [NPM], [PNPM] or [Yarn]:

```sh
npm i -D rollup-plugin-denolint
pnpm i -D rollup-plugin-denolint
yarn add -D rollup-plugin-denolint
```

## Usage

Create a `rollup.config.js` [configuration file] and import the plugin:

```js
import { denolint } from 'rollup-plugin-denolint'

export default {
  input: 'src/index.js',
  output: { file: 'dist/main.js', format: 'iife', sourcemap: true },
  plugins: [
    denolint({
      exclude: ['tests'],
      rules: {
        exclude: ['no-unused-vars']
      }
    })
  ]
}
```

Then call `rollup` either via the [command-line] or [programmatically].

## Options

The following options can be passed in an object to the plugin function to change the default values.

### `include`

Type: `string[] | string`<br>
Default: `['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx']`

List of source file patterns to include.

### `exclude`

Type: `string[] string | | regex`<br>
Default: `/node_modules/`

List of source file patterns or a regex to exclude.

### `configFile`

Type: `string`<br>
Default: `'.denolint.json'`

Config file to load the tag, rule inclusion and exclusion lists from. File inclusion and exclusion lists are ignored. Use `include` and `exclude` options of this plugin.

### `ignoreConfig`

Type: `boolean`<br>
Default: `false`

Do not look for `.denolint.json` by default.

### `rules`

Type: `object`<br>
Default: `undefined`

Rules to include or exclude. If specified, the config file will be ignored. See [Rules](#rules) below.

### `throwOnWarning`

Type: `boolean`<br>
Default: `true`

Throw an error and abort if any warnings were reported.

### `throwOnError`

Type: `boolean`<br>
Default: `true`

Throw an error and abort if source file parsing failed fatally.

### `format`

Type: `string`<br>
Default: `'pretty'`

Format of the warning messages. Either `compact` or `pretty` (default).

### `formatter`

Type: `boolean`<br>
Default: `true`

Custom warning and error formatter:

    (messages: string[], id: string, source: string) => string[]

## Rules

The following properties are recognised in the rules object.

### `all`

Type: `boolean`<br>
Default: `false`

Use all rules if set to `true`, otherwise only the recommended ones.

### `include`

Type: `string[]`<br>
Default: `[]`

List of rules to include extra, if only recommended rules are enabled.

### `exclude`

Type: `string[]`<br>
Default: `[]`

List of rules to exclude from all or recommended ones.

## Alternative

Instead of checking the source files as they are processed, you can check all sources, when the bundler starts. It resembles more how the [command-line `denolint`] works and you can reuse the `files.include` and `files.exclude` configuration from `.denolint.json`:

```js
import { denolintAll } from 'rollup-plugin-denolint'

export default {
  input: 'src/index.js',
  output: { file: 'dist/main.js', format: 'iife', sourcemap: true },
  plugins: [
    denolintAll()
  ]
}
```

Options `include`, `exclude`, `configFile`, `format`, `formatter`, `throwOnWarning`, `throwOnError` are recognised. Options `include`, `exclude` override `files.include` and `files.exclude` from `.denolint.json` and have the same meaning. They are not passed to `rollup`.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Lint and test your code.

## License

Copyright (C) 2022 Ferdinand Prantl

Licensed under the [MIT License].

[MIT License]: http://en.wikipedia.org/wiki/MIT_License
[Rollup]: https://rollupjs.org/
[denolint]: https://github.com/prantlf/denolint/tree/master/packages/libdenolint#readme
[@rollup/plugin-eslint]: https://github.com/rollup/plugins/tree/master/packages/eslint#readme
[esbuild-plugin-denolint]: https://github.com/prantlf/esbuild-plugin-denolint#readme
[esbuild]: https://esbuild.github.io/
[webpack-loader-denolint]: https://github.com/prantlf/webpack-loader-denolint#readme
[Webpack]: https://webpack.js.org/
[command-line `denolint`]: https://github.com/prantlf/denolint/tree/master/packages/denolint#readme
[Node.js]: https://nodejs.org/
[NPM]: https://www.npmjs.com/
[PNPM]: https://pnpm.io/
[Yarn]: https://yarnpkg.com/
[configuration file]: https://www.rollupjs.org/guide/en/#configuration-files
[command-line]: https://www.rollupjs.org/guide/en/#command-line-reference
[programmatically]: https://www.rollupjs.org/guide/en/#javascript-api
