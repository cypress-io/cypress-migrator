// Based on https://github.com/skovhus/jest-codemods/blob/master/src/cli/transformers.ts

import { execaSync } from 'execa'
import * as path from 'path'

import cypressStringifyChromeRecorder from '../lib/migrate'

const __dirname = path.resolve(path.dirname(''))
export const transformDirectory = path.join(__dirname, '../')

// cli flags
type Flags = {
  force?: boolean
  dry?: boolean
  print?: boolean
}

export function runTransforms({ files, flags }: { files: string | string[]; flags: Flags }): any {
  const transformPath = path.join(__dirname, '../main.js')
  const { dry, print } = flags

  const args = ['-t', transformPath].concat(files)
  console.log('🚀 ~ file: transforms.ts ~ line 28 ~ args', args)

  if (dry) {
    args.push('--dry')
  }
  if (print) {
    args.push('--print')
  }

  console.log(`Running Cypress Chrome Recorder: ${args.join(' ')}`)

  const result = cypressStringifyChromeRecorder()

  if (!result) {
    throw new Error(`Cypress Chrome Recorder was not able to translate anything. Please check the path and try again.`)
  }

  return result
}
