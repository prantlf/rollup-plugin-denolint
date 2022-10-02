import { rejects, strictEqual } from 'assert'
import { fileURLToPath } from 'url'
import { rollup } from 'rollup'
import tehanu from 'tehanu'
import { denolintAll } from '../lib/index.js'

const test = tehanu(fileURLToPath(import.meta.url))

test('exports', () => {
  strictEqual(typeof denolintAll, 'function')
})

test('pass', async () => {
  await rollup({
    input: 'test/samples/pass/ultimate.js',
    plugins: [denolintAll({
      exclude: ['test/samples/warn'],
      configFile: 'test/.denolint.json'
    })] 
  })
})

test('warn', async () => {
  await rejects(rollup({
    input: 'test/samples/warn/ultimate.js',
    plugins: [denolintAll({
      configFile: 'test/.denolint.json'
    })] 
  }))
})

test('warn silently', async () => {
  await rollup({
    input: 'test/samples/warn/ultimate.js',
    plugins: [denolintAll({
      configFile: 'test/.denolint.json',
      throwOnWarning: false
    })] 
  })
})
