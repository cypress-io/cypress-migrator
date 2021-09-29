export interface DiffArrayItem {
  original: string
  modified: string
  api?: {
    command: string
    url: string
  }[]
}

function splitTrim(value: string): string[] {
  return value.split('\n').map((item) => item.trim())
}

export function createDiffArray(input: string, output: string): DiffArrayItem[] {
  const inputArray = splitTrim(input)
  const outputArray = splitTrim(output)
  const diffArray: DiffArrayItem[] = []

  outputArray.forEach((item, index) => {
    const cyMatches = item.match(/\.(.*?)\(/g)
    const commands: {
      command: string
      url: string
    }[] = []

    if (cyMatches) {
      cyMatches.map((item) => {
        const name = item.replace('.', '').replace('(', '')
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
