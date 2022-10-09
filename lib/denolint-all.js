import { denolint } from 'libdenolint'

export default function denolintAll({
  include, exclude, configFile = '.denolint.json', ignoreConfig,
  format, formatter, throwOnWarning = true, throwOnError = true
} = {}) {
  const cwd = process.cwd()

  return {
    name: 'denolint-all',

    async buildStart() {
      let ok
      try {
        ok = await denolint(cwd, ignoreConfig ? '' : configFile, {
          scanDirs: include, ignorePatterns: exclude, format
        })
      /* c8 ignore next 6 */
      } catch ({ message }) {
        let messages = [message]
        if (formatter) messages = formatter(messages)
        for (const message of messages) console.error(message)
        if (throwOnError) throw Error('Errors were found')
      }
      if (!ok && throwOnWarning) throw Error('Warnings were found')
    }
  }
}
