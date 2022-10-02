const { strictEqual } = require('assert')
const test = require('tehanu')(__filename)
const { denolint, denolintAll } = require('rollup-plugin-denolint')

test('exports', () => {
  strictEqual(typeof denolint, 'function')
  strictEqual(typeof denolintAll, 'function')
})
