import { ReactElement } from 'react'
import { Navigation, AvailableCodeMods, Notifications, BackButton } from '../components'
import { getAllCodeMods } from '../api'

const Migrations = ({ allCodeMods }: { allCodeMods: string[] }): ReactElement => (
  <div>
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
