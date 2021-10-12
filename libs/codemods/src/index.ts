import { DiffArrayItem, createDiffArray } from './lib/utils'
import protractorTransformer from './lib/protractor'
import * as jscodeshift from 'jscodeshift/dist/core'
interface TransformResult {
  output: string | undefined
  diff: DiffArrayItem[]
  error?: {
    message: string
    level: 'warning' | 'error' | 'info'
  }
}

interface TransformProps {
  input: string
  warningMessage?: string
  notSupportedMessage?: string
  errorMessage?: string
  noInputProvided?: string
}

export const parser = 'babel'

export default function applyTransforms({
  input,
  warningMessage = 'We currently do not support transforming this. If you think this should be added, submit an issue or PR in the cypress-codemods repo.',
  notSupportedMessage = 'We currently do not support transforming this. There is no Cypress equivalent.',
  errorMessage = 'We are not able to transform this. If you think this should be added submit an issue or PR in the cypress-codemods repo.',
  noInputProvided = 'Please provide an input value to translate.',
}: TransformProps): TransformResult {
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
