import { migrateProtractor } from '@cypress-dx/migrate-protractor'
import { migrateChromeRecorder } from '@cypress-dx/chrome-recorder'

import { MigrateResult, createDiffArray } from './utils'

interface MigrateProps {
  input: string
  type: 'protractor' | 'chrome-recorder'
  warningMessage?: string
  notSupportedMessage?: string
  errorMessage?: string
  noInputProvided?: string
}

export async function migrate({
  input,
  type,
  warningMessage = 'We currently do not support transforming this. If you think this should be added, submit an issue or PR in the cypress-dx repo.',
  notSupportedMessage = 'We currently do not support transforming this. There is no Cypress equivalent.',
  errorMessage = 'We are not able to transform this. If you think this should be added submit an issue or PR in the cypress-dx repo.',
  noInputProvided = 'Please provide an input value to migrate.',
}: MigrateProps): Promise<MigrateResult> {
  // Handle empty input
  if (input === '') {
    return {
      output: undefined,
      diff: [],
      error: { message: noInputProvided, level: 'warning' },
    }
  }

  let result
  switch (type) {
    case 'protractor':
      result = await migrateProtractor({ input })
      break
    case 'chrome-recorder':
      result = await migrateChromeRecorder({ input })
      break
  }

  if (result) {
    if (typeof result === 'undefined') {
      return {
        output: undefined,
        diff: [],
        error: { message: warningMessage, level: 'warning' },
      }
    } else if (typeof result === 'string') {
      // else if it is a string, determine if it has length or not.
      // an empty string implies that it was removed and not supported.
      if (result.length > 0) {
        return {
          output: result.trim(),
          diff: createDiffArray(input, result),
        }
      } else {
        return {
          output: undefined,
          diff: [],
          error: {
            message: notSupportedMessage,
            level: 'info',
          },
        }
      }
    }
  }
  return {
    output: undefined,
    diff: [],
    error: { message: errorMessage, level: 'error' },
  }
}
