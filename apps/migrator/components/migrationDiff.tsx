import Image from 'next/image'
import { ReactElement } from 'react'
import { ArrowSmRightIcon } from '@heroicons/react/solid'
import { selectDiffApiItems, shouldShowDetails, useAppSelector, selectLanguage } from '../app'
import { ErrorAlerts } from '.'

const MigrationDiff = (): ReactElement => {
  const diff = useAppSelector(selectDiffApiItems)
  const showDetails = useAppSelector(shouldShowDetails)
  const selectedLanguage = useAppSelector(selectLanguage)

  return (
      <div
        className={`md:w-full transition duration-500 ease-in-out my-12 md:mt-24 relative ${showDetails ? 'opacity-100' : 'opacity-0 hidden'}`}
        data-test="more-details"
      >
        <ErrorAlerts />
        {diff.length > 0 ? (
            <>
              <div className="text-center">
                <h2 className="md:text-2xl sm:text-xl md:leading-10 font-bold text-gray-900">
                  Here are the Cypress commands that were found in the migrated code.
                </h2>
                <p className="text-gray-600 text-sm md:text-base py-4">
                  For more detailed information about each item, click the link to its page within our documentation.
                </p>
              </div>
              <div className="lg:px-60" data-test="api-details">
                <ul className="bg-white list-inside list-none divide-y divide-gray-50 p-6 rounded shadow" data-test="api-details-list">
                  {diff.map((d, i: number) => (
                    <li className="py-4 first:pt-0 last:pb-0 transition duration-300 ease-in-out transform hover:translate-x-2 hover:scale-100 hover:underline text-gray-900 hover:text-indigo-400 cursor-pointer" key={i}>
                      <a
                        href={d.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <div className='flex justify-between'>
                          <div className="flex items-center">
                            <Image src="/docs_icon.svg" alt="" width="40" height="40" />
                            <span className="ml-2">
                              {`cy.${d.command}()`}
                            </span>
                          </div>
                          <div className="flex items-center text-xs">
                            <span className="hidden sm:block">Learn More</span>
                            <ArrowSmRightIcon className="ml-2 -mr-1 h-4 w-5" aria-hidden="true" />
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : null}
      </div>
  )
}
export default MigrationDiff
