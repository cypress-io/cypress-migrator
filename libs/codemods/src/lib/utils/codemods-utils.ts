export interface APIItem {
  command: string
  url: string
}
export interface DiffArrayItem {
  original: string
  modified: string
  api?: APIItem[]
}

export interface MigrationError {
  message: string
  level: 'warning' | 'error' | 'info'
}
export interface MigrateResult {
  output: string | undefined
  diff: DiffArrayItem[]
  error?: MigrationError
}

function splitTrim(value: string): string[] {
  return value.split('\n').map((item) => item.trim())
}

export function createDiffArray(input: string, output: string): DiffArrayItem[] {
  const inputArray: string[] = splitTrim(input)
  const outputArray: string[] = splitTrim(output)
  const diffArray: DiffArrayItem[] = []

  outputArray.forEach((item, index): void => {
    const cyMatches: RegExpMatchArray = item.match(/(?<!')\.(.*?)\(/g)
    const commands: APIItem[] = []

    if (cyMatches) {
      cyMatches.map((item: string) => {
        let name: string = item.replace('.', '').replace('(', '')

        if (item.includes('should')) {
          name = 'should'
        }

        return commands.push({
          command: name,
          url: `https://on.cypress.io/${name}`,
        })
      })
    }

    diffArray.push({
      original: inputArray[index],
      modified: item,
      api: commands,
    })
  })

  return diffArray
}
