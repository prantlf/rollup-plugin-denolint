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
  denolintAll({ include: [] })
  denolintAll({ include: [''] })
  denolintAll({ exclude: [] })
  denolintAll({ exclude: [''] })
  denolintAll({ configFile: '' })
  denolintAll({ ignoreConfig: true })
  denolintAll({ throwOnWarning: false })
  denolintAll({ throwOnError: false })
  denolintAll({ formatter: (messages: string[]): string[] => messages })
})
