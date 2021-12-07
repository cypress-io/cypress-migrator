import { join } from 'path'
import fs from 'fs'
import matter from 'gray-matter'

type CodeModTypes = 'assertions' | 'browser-methods' | 'interactions' | 'selectors'

const codeModsDirectory = join(process.cwd(), 'apps/migrator/markdown')

const getCodeModSlugs = (): string[] => fs.readdirSync(codeModsDirectory)

export const getCodeModBySlug = (slug: CodeModTypes): string => {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(codeModsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { content } = matter(fileContents)
  return content
}

export const getAllCodeMods = (): string[] => {
  const slugs = getCodeModSlugs()
  return slugs.map((slug: CodeModTypes) => getCodeModBySlug(slug))
}
