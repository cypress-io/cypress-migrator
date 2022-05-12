import Head from 'next/head'
import Image from 'next/image'
import { ReactElement } from 'react'
import { Footer, Navigation, Notifications, SelectList, MigrateEditor, MigrationDiff } from '../components'

const Index = (): ReactElement => {
  return (
    <div className={'h-full'}>
      <Head>
        <title>Cypress Migrator | Interactive Code Transformer</title>
        <meta property="og:title" content="Cypress Migrator | Interactive Code Transformer" key="title" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Navigation />

      <main className="h-full">
        <div className="max-w-7xl h-full mx-auto py-6 px-6 lg:px-8">
          <div className="flex items-center justify-center pb-6">
            <p className="lg:text-5xl sm:text-3xl font-semibold mr-1">Migrate</p>
            <div>
              <SelectList />
            </div>
            <p className="lg:text-5xl sm:text-3xl font-semibold"> code to Cypress.</p>
        </div>
          <MigrateEditor />
          <MigrationDiff />
          <Notifications />
        </div>
      </main>

      <section className="flex flex-col items-center justify-center">
        <p className="lg:text-4xl sm:text-3xl font-semibold">Test your code, not your patience.</p>
        <div className="flex flex-row space-x-4 pt-8 pb-12">
          <button          
              type="button"
              className="w-full sm:w-auto sm:max-w-1/2 inline-flex justify-center items-center px-6 py-3 my-4 text-base font-medium rounded-md shadow-sm text-indigo-500 bg-indigo-50 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
              >
                NPM Install
          </button>
          <button          
              type="button"
              className="w-full sm:w-auto sm:max-w-1/2 inline-flex justify-center items-center px-6 py-3 my-4 text-base font-medium rounded-md shadow-sm text-indigo-500 bg-indigo-50 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
              >
                Download Now
          </button>
        </div>
        <Image src="/test_runner.svg" alt="Cypress App" width="1120" height="274" />
      </section>


      <Footer />
    </div>
  )
}

export default Index
