import { ArrowRightIcon } from '@heroicons/react/solid'
import React, { ReactElement } from 'react'
import { selectLanguage, useAppSelector } from '../app'

const LanguagePills = (): ReactElement => {
  const selectedLanguage = useAppSelector(selectLanguage)
  return (
    <div className="grid md:grid-cols-3 gap-4 sm:grid-cols-1 pb-8 mr-6">
      <div className="md:col-start-2 flex justify-center">
        <span className="px-3 py-2 rounded-full text-sm font-medium bg-red-400 text-white capitalize">
          {selectedLanguage}
        </span>
        <ArrowRightIcon className="h-5 w-5 mx-4 my-2 text-gray-500" />
        <span className="px-3 py-2 rounded-full text-sm font-medium bg-jade-400 text-white">Cypress</span>
      </div>
    </div>
  )
}
export default LanguagePills
