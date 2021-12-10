import Head from 'next/head'
import { ReactElement } from 'react'
import { Footer, Navigation, Notifications, SelectList, MigrateEditor, MigrationDiff } from '../components'

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

      <main className="h-full">
        <div className="max-w-7xl h-full mx-auto py-6 px-6 lg:px-8">
          <div className="flex items-center justify-center pb-6">
            <p className="text-xl sm:text-3xl">Migrate</p>
            <div className="px-3">
              <SelectList />
            </div>

            <p className="text-xl sm:text-3xl"> code to Cypress.</p>
          </div>

          <MigrateEditor />
          <MigrationDiff />
          <Notifications />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Index