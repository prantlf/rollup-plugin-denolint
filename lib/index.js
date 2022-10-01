import { createFilter } from '@rollup/pluginutils'
import { relative, resolve, sep } from 'path'
import { readFileSync } from 'fs'
import { lint } from 'libdenolint'

const cwd = process.cwd()

function normalizePath(path) {
  path = relative(cwd, path)
  /* c8 ignore next */
  if (sep !== '/') path = path.split(sep).join('/')
  return path
}

export function denolint({
  include, exclude, configFile = '.denolint.json', ignoreConfig, rules,
  formatter, throwOnWarning = true, throwOnError = true
} = {}) {
  let allRules, excludeRules, includeRules
  if (rules) {
    ({ all: allRules, exclude: excludeRules, include: includeRules } = rules)
  } else if (!ignoreConfig) {
    try {
      const config = JSON.parse(readFileSync(configFile, 'utf8'))
      const { tags = [], rules = {} } = config
      if (allRules === undefined) allRules = !tags.includes('recommended')
      ({ exclude: excludeRules, include: includeRules } = rules)
      // eslint-disable-next-line no-empty
    } catch {}
  }
  if (!include) include = ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx']

  const filter = createFilter(include, exclude || /node_modules/)

  return {
    name: 'denolint',

    load(id) {
      if (filter(id)) this.addWatchFile(resolve(id))
    },

    async transform(source, id) {
      const path = normalizePath(id)
      if (filter(path)) {
        let warnings
        try {
          warnings = await lint(path, source, allRules, excludeRules, includeRules)
          if (formatter) warnings = formatter(warnings, id, source)
          for (const warning of warnings) console.warn(warning)
        } catch (error) {
          const { message } = error
          /* c8 ignore next */
          const suffix = message.includes(path) ? '' : `, at: ${path}`
          const errors = [`Lint failed: ${message}${suffix}\n`]
          if (formatter) errors = formatter(errors, id, source)
          for (const error of errors) console.error(error)
          if (throwOnError) throw Error('Errors were found')
        }
        if (warnings && warnings.length && throwOnWarning) throw Error('Warnings were found')
      }
      return null
    }
  }
}
