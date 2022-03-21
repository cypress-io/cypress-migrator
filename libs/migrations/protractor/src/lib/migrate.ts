import * as jscodeshift from 'jscodeshift/dist/core'
import transformer from './transformer'

export const parser = 'babel'

export function migrateProtractor({ input }: { input: string }): Promise<string> | undefined {
  const transform = transformer(
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

  return transform ? Promise.resolve(transform) : undefined
}
