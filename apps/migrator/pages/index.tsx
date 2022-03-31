import Head from 'next/head'
import { ReactElement } from 'react'
import { Footer, Navigation, Notifications, SelectList, MigrateEditor, MigrationDiff } from '../components'
import DigDeeper from '../components/digDeeper'

const Index = (): ReactElement => {
  return (
    <div className={'h-full'}>
      <Head>
        <title>Cypress Migrator | Interactive Code Transformer</title>
        <meta property="og:title" content="Cypress Migrator | Interactive Code Transformer" key="title" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="shortcut icon" href="public/favicon.ico" type="image/x-icon" />
      </Head>

      <Navigation />

      <main className="h-3/5">
        <div className="max-w-7xl h-full mx-auto py-6 px-6 lg:px-8">
          <div className="flex items-center justify-center pb-6">
            <p className="lg:text-5xl sm:text-3xl font-bold leading-tight text-gray-1000">Migrate</p>
            <div className="px-3">
              <SelectList />
            </div>

            <p className="lg:text-5xl sm:text-3xl font-bold leading-tight text-gray-1000"> code to Cypress.</p>
          </div>

          <MigrateEditor />
        </div>
      </main>
        <MigrationDiff />
        <DigDeeper />
        <Notifications />
      <Footer />
    </div>
  )
}

export default Index
