import { ReactElement } from 'react'
import { SelectList } from '../components'

const LanguageSelect = (): ReactElement => {
  return (
    <div className="flex items-center justify-center pb-6">
        <h1 className="lg:text-5xl sm:text-3xl font-semibold mr-1">Migrate</h1>
        <SelectList />
        <h1 className="lg:text-5xl sm:text-3xl font-semibold"> code to Cypress.</h1>
    </div>
  )
}
export default LanguageSelect
