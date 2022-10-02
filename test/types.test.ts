import { denolint, denolintAll } from 'rollup-plugin-denolint'

declare type testCallback = () => void
declare function test (label: string, callback: testCallback): void

test('Type declarations for TypeScript', () => {
  denolint()
  denolint({})
  denolint({ include: [] })
  denolint({ include: [''] })
  denolint({ include: '' })
  denolint({ exclude: [] })
  denolint({ exclude: [''] })
  denolint({ exclude: '' })
  denolint({ exclude: /a/ })
  denolint({ configFile: '' })
  denolint({ ignoreConfig: true })
  denolint({ rules: {} })
  denolint({ rules: { all: true } })
  denolint({ rules: { include: [''] } })
  denolint({ rules: { exclude: [''] } })
  denolint({ throwOnWarning: false })
  denolint({ throwOnError: false })
  denolint({ formatter: (messages: string[], _id: string, _source: string): string[] => messages })

  denolintAll()
  denolintAll({})
  denolint({ include: [] })
  denolint({ include: [''] })
  denolint({ exclude: [] })
  denolint({ exclude: [''] })
  denolint({ configFile: '' })
  denolint({ ignoreConfig: true })
  denolint({ throwOnWarning: false })
  denolint({ throwOnError: false })
  denolint({ formatter: (messages: string[]): string[] => messages })
})
