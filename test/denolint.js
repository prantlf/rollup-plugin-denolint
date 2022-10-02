import { ok, rejects, strictEqual } from 'assert'
import { fileURLToPath } from 'url'
import { rollup } from 'rollup'
import tehanu from 'tehanu'
import { denolint } from '../lib/index.js'

const test = tehanu(fileURLToPath(import.meta.url))

test('exports', () => {
  strictEqual(typeof denolint, 'function')
})

function text() {
  return {
    name: 'text',
    transform () {
      return { code: '', map: { mappings: '' } }
    }
  }
}

test('pass', async () => {
  await rollup({
    input: 'test/samples/pass/ultimate.js',
    plugins: [denolint({ configFile: 'test/.denolint.json' })] 
  })
})

test('warn', async () => {
  await rejects(rollup({
    input: 'test/samples/warn/ultimate.js',
    plugins: [denolint({ ignoreConfig: true })] 
  }))
})

test('warn silently', async () => {
  await rollup({
    input: 'test/samples/warn/ultimate.js',
    plugins: [denolint({ ignoreConfig: true, throwOnWarning: false })] 
  })
})

test('fail', async () => {
  await rejects(rollup({
    input: 'test/samples/fail/ultimate.txt',
    plugins: [denolint({ ignoreConfig: true, include: ['**/*.txt'] }), text()] 
  }))
})

test('fail silently', async () => {
  await rollup({
    input: 'test/samples/fail/ultimate.txt',
    plugins: [denolint({
      ignoreConfig: true, include: ['**/*.txt'], throwOnError: false
    }), text()] 
  })
})

test('missing config', async () => {
  await rollup({
    input: 'test/samples/pass/ultimate.js',
    plugins: [denolint({ configFile: 'missing' })] 
  })
})

test('explicit rules', async () => {
  await rollup({
    input: 'test/samples/warn/ultimate.js',
    plugins: [denolint({
      rules: { exclude: ['no-unused-vars', 'no-var']}
    })] 
  })
})

test('formatter of warnings', async () => {
  let params
  await rejects(rollup({
    input: 'test/samples/warn/ultimate.js',
    plugins: [denolint({
      ignoreConfig: true,
      formatter: (warnings, id, source) => {
        params = { warnings, id, source }
        return warnings
      }
    })] 
  }))
  strictEqual(params.warnings.length, 2)
  ok(params.id.endsWith('test/samples/warn/ultimate.js'))
  strictEqual(typeof params.source, 'string')
})

test('formatter of errors', async () => {
  let params
  await rejects(rollup({
    input: 'test/samples/fail/ultimate.txt',
    plugins: [denolint({
      ignoreConfig: true, include: ['**/*.txt'],
      formatter: (errors, id, source) => {
        params = { errors, id, source }
        return errors
      }
    }), text()] 
  }))
  strictEqual(params.errors.length, 1)
  ok(params.id.endsWith('test/samples/fail/ultimate.txt'))
  strictEqual(typeof params.source, 'string')
})
