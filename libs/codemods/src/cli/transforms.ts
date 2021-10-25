// Based on https://github.com/skovhus/jest-codemods/blob/master/src/cli/transformers.ts
// eslint-disable-next-line @typescript-eslint/no-var-requires
const execa = require('execa')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

export const transformDirectory = path.join(__dirname, '../', 'transforms')
export const jscodeshiftExecutable = require.resolve('.bin/jscodeshift')

// cli flags
type Flags = {
  force?: boolean
  dry?: boolean
  print?: boolean
}

// supported test libraries
export type Library = 'protractor'

export function runTransforms({
  library,
  files,
  flags,
}: {
  library: Library
  files: string | string[]
  flags: Flags
}): any {
  const transformPath = path.join(transformDirectory, `src/lib/${library}/index.js`)
  const { dry, print } = flags

  const args = ['-t', transformPath].concat(files)

  if (dry) {
    args.push('--dry')
  }
  if (print) {
    args.push('--print')
  }

  args.push('--extensions=tsx,ts,jsx,js')
  args.push(`--parser=ts`)

  console.log(`Executing command: jscodeshift ${args.join(' ')}`)

  const result = execa.sync(jscodeshiftExecutable, args, {
    stdio: 'inherit',
    stripFinalNewline: false,
  })

  if (result.failed) {
    throw new Error(`jscodeshift exited with code ${result.exitCode}`)
  }

  return result
}
