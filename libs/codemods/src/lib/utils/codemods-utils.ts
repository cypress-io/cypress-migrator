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

const needsSanitized = (value: string): boolean => {
  switch (value[value.length - 1]) {
    case '.':
    case '(':
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      return true

    default:
      return false
  }
}


export function sanitize(value: string): string {
  return needsSanitized(value) ? sanitize(value.slice(0, -1)) : value
}

function splitTrim(value: string): string[] {
  return value.split('\n').map((item) => item.trim())
}

export function createDiffArray(input: string, output: string): DiffArrayItem[] {
  const inputArray: string[] = splitTrim(input)
  const outputArray: string[] = splitTrim(output)
  const diffArray: DiffArrayItem[] = []

  outputArray.forEach((item, index): void => {
    const cyMatches: RegExpMatchArray | null = item.match(/(?<!')\.(.*?)\(/g)
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
