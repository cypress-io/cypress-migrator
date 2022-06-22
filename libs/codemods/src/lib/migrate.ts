import * as jscodeshift from 'jscodeshift/dist/core'
import protractorTransformer from './protractor'
import { MigrateResult, createDiffArray } from './utils'

interface TransformProps {
  input: string
  warningMessage?: string
  notSupportedMessage?: string
  errorMessage?: string
  noInputProvided?: string
}

export const parser = 'babel'

export function applyTransforms({
  input,
  warningMessage = 'We currently do not support transforming this. If you think this should be added, submit an issue or PR to the <a class="text-indigo-500 hover:underline font-medium" href="https://github.com/cypress-io/cypress-migrator/issues">Cypress Migrator repo</a>.',
  notSupportedMessage = 'We currently do not support transforming this. There is no Cypress equivalent.',
  errorMessage = 'We are not able to transform this. If you think this should be added, submit an issue or PR to the <a class="text-indigo-500 hover:underline font-medium" href="https://github.com/cypress-io/cypress-migrator/issues">Cypress Migrator repo</a>.',
  noInputProvided = 'Please provide an input value to migrate.',
}: TransformProps): MigrateResult {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  // const jscodeshift = require('../../node_modules/jscodeshift/dist/core.js');

  if (input === '') {
    return {
      output: undefined,
      diff: [],
      error: { message: noInputProvided, level: 'warning' },
    }
  }

  try {
    const transform = protractorTransformer(
      { path: 'transform.js', source: input },
      {
        jscodeshift,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        stats: () => {},
        j: jscodeshift,
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        report: () => {},
      },
      {},
    )

    // if the transform does not exist for some reason.
    if (typeof transform === 'undefined') {
      return {
        output: undefined,
        diff: [],
        error: { message: warningMessage, level: 'warning' },
      }
    } else if (typeof transform === 'string') {
      // else if it is a string, determine if it has length or not.
      // an empty string implies that it was removed and not supported.
      if (transform.length > 0) {
        return {
          output: transform.trim(),
          diff: createDiffArray(input, transform),
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
    } else {
      throw new Error()
    }
  } catch {
    return {
      output: undefined,
      diff: [],
      error: { message: errorMessage, level: 'error' },
    }
  }
}
