import { denolint } from 'libdenolint'

export default function denolintAll({
  include, exclude, configFile = '.denolint.json',
  formatter, throwOnWarning = true, throwOnError = true
} = {}) {
  const cwd = process.cwd()

  return {
    name: 'denolint-all',

    async buildStart() {
      let ok
      try {
        ok = await denolint(cwd, configFile, {
          scanDirs: include, ignorePatterns: exclude
        })
      /* c8 ignore next 6 */
      } catch ({ message }) {
        let messages = [message]
        if (formatter) messages = formatter(messages, id, source)
        for (const message of messages) console.error(message)
        if (throwOnError) throw Error('Errors were found')
      }
      if (!ok && throwOnWarning) throw Error('Warnings were found')
    }
  }
}
