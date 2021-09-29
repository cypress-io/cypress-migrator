import { ReactElement } from 'react'
import Head from 'next/head'

import { useAppSelector } from '../app/hooks'
import { selectLanguage } from '../app/translatorSlice'
import { Navigation, SelectList, TranslateEditor, AvailableCodeMods } from '../components'
import { getAllCodeMods } from '../api'

const Translator = ({ allCodeMods }: { allCodeMods: string[] }): ReactElement => {
  // default to protractor until we have other options.
  const selectedLanguage = useAppSelector(selectLanguage)

  return (
    <div className={'h-full'}>
      <Head>
        <title>Cypress Translator | Interactive Code Transformer</title>
        <meta property="og:title" content="Cypress Translator | Interactive Code Transformer" key="title" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </Head>

      <Navigation />

      <main className="h-full">
        <div className="max-w-7xl h-full mx-auto py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center pb-6">
            <p className="text-3xl">Translate</p>
            <div className="px-3">
              <SelectList selected={selectedLanguage} />
            </div>

            <p className="text-3xl"> code to Cypress.</p>
          </div>

          <TranslateEditor selected={selectedLanguage} />

          <AvailableCodeMods selectedLanguage={selectedLanguage} allCodeMods={allCodeMods} />
        </div>
      </main>
    </div>
  )
}

export default Translator

export async function getStaticProps() {
  const allCodeMods = getAllCodeMods()
  return { props: { allCodeMods } }
}
