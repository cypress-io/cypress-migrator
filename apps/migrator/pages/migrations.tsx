import { ReactElement } from 'react'
import Head from 'next/head'
import { Navigation, AvailableCodeMods, Notifications, BackButton } from '../components'
import { getAllCodeMods } from '../api'

const Migrations = ({ allCodeMods }: { allCodeMods: string[] }): ReactElement => (
  <div>
    <Head>
      <title>Cypress Migrator | Interactive Code Transformer</title>
      <meta property="og:title" content="Cypress Migrator | Interactive Code Transformer" key="title" />
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      <link rel="shortcut icon" type="image/svg+xml" href="/public/favicon.svg" />
    </Head>
    <Navigation />
    <main>
      <div className="max-w-7xl h-full mx-auto py-6 px-8">
        <BackButton />
        <AvailableCodeMods allCodeMods={allCodeMods} />
        <Notifications />
      </div>
    </main>
  </div>
)

export default Migrations
export async function getStaticProps() {
  const allCodeMods = getAllCodeMods()
  return { props: { allCodeMods } }
}
