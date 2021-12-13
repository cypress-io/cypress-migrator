export interface APIItem {
  command: string
  url: string
}
export interface DiffArrayItem {
  original: string
  modified: string
  api?: APIItem[]
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
        const name: string = item.replace('.', '').replace('(', '')
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
