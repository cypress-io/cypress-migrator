import { parse, stringify, Schema } from '@puppeteer/replay'
import { CypressStringifyExtension } from './CypressStringifyExtension'

function parseRecording(input: string): Schema.UserFlow {
  return parse(JSON.parse(input))
}

export function migrateChromeRecorder({ input }: { input: string }): Promise<string> | undefined {
  const parsedRecording = parseRecording(input)

  const stringifiedRecording = stringify(parsedRecording, {
    extension: new CypressStringifyExtension(),
    indentation: '	',
  })

  return stringifiedRecording
}
