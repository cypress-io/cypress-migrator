import { ArrowRightIcon } from '@heroicons/react/solid'
import React, { ReactElement } from 'react'
import { selectLanguage, useAppSelector } from '../app'

const LanguagePills = (): ReactElement => {
  const selectedLanguage = useAppSelector(selectLanguage);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-start-2 flex justify-center">
        <span className="px-3 py-2 rounded-full text-sm font-medium bg-red-300 text-red-800 capitalize">
          {selectedLanguage}
        </span>
        <ArrowRightIcon className="h-5 w-5 mx-4 my-2 text-gray-500" />
        <span className="px-3 py-2 rounded-full text-sm font-medium bg-green-300 text-green-800">Cypress</span>
      </div>
    </div>
  )
}
export default LanguagePills
