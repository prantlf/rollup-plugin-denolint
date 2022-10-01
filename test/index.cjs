const { strictEqual } = require('assert')
const test = require('tehanu')(__filename)
const { denolint } = require('rollup-plugin-denolint')

test('exports', () => {
  strictEqual(typeof denolint, 'function')
})
