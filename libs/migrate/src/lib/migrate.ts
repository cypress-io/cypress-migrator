import { applyTransforms } from '@cypress-dx/migrate-protractor'

import { MigrateResult } from './utils'

interface MigrateTypes {
  input: string
  type: 'protractor' | 'chrome-recorder'
}

export function migrate({ input, type }: MigrateTypes): MigrateResult | undefined {
  let result
  switch (type) {
    case 'protractor':
      result = applyTransforms({ input })
      break
    case 'chrome-recorder':
      console.log('Chrome!!!')
      break
  }
  return result
}
