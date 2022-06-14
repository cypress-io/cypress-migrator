import { ReactElement } from 'react'
import { SelectList } from '../components'

const LanguageSelect = (): ReactElement => {
  return (
    <div className="flex-none w-3/4 mx-auto sm:flex sm:w-full items-center justify-center text-center pb-6">
        <h1 className="text-gray-900 lg:text-5xl md:text-4xl text-2xl font-semibold mr-2">Migrate</h1>
        <SelectList />
        <h1 className="text-gray-900 lg:text-5xl md:text-4xl text-2xl font-semibold ml-2"> code to Cypress.</h1>
    </div>
  )
}
export default LanguageSelect
