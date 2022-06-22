import Link from 'next/link'
import Image from 'next/image'
import { ReactElement } from 'react'
import { selectDiffApiItems, shouldShowDetails, useAppSelector, selectLanguage } from '../app'
import { ErrorAlerts } from '.'

const MigrationDiff = (): ReactElement => {
  const diff = useAppSelector(selectDiffApiItems)
  const showDetails = useAppSelector(shouldShowDetails)
  const selectedLanguage = useAppSelector(selectLanguage)

  return (
      <div
        className={`md:w-full transition duration-500 ease-in-out mt-16 relative ${showDetails ? 'opacity-100' : 'opacity-0 hidden'}`}
        data-test="more-details"
      >
        <ErrorAlerts />
        {diff.length > 0 ? (
            <div className="grid gap-8 p-6 md:grid-cols-2 lg:px-16">
              <div>
                <h2 className="md:text-2xl sm:text-xl md:leading-10 font-bold text-gray-900 max-w-lg">
                  Great! Here are the Cypress commands that were found in the migrated code.
                </h2>
                <p className="text-gray-600 text-sm md:text-base py-4 max-w-md">
                  For more detailed information about each item, click the link to its page within our documentation.
                </p>
                <h2 className="md:text-2xl sm:text-xl leading-10 font-bold text-gray-900 max-w-lg mt-4">
                  Want to dig deeper?
                </h2>
                <p className="text-gray-600 text-sm md:text-base mt-3 w-9/12">
                  See the full list of <span className="capitalize">{selectedLanguage}</span> migrations.
                </p>
                <Link href={"/migrations"} passHref>
                  <a
                  type="button"
                  className="px-6 py-3 my-4 text-sm md:text-base font-medium rounded-md shadow-sm text-indigo-500 bg-indigo-50 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                  >
                    View All Migrations
                  </a>
                </Link>
              </div>
              <div className="bg-white" data-test="api-details">
                <ul className="list-inside list-none divide-y divide-gray-50 p-6 rounded shadow " data-test="api-details-list">
                  {diff.map((d, i: number) => (
                    <li className="flex items-center py-4 first:pt-0 last:pb-0 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105 hover:underline" key={i}>
                      <Image src="/docs_icon.svg" alt="" width="40" height="40" />
                      <a
                        className="ml-2 text-gray-900 hover:text-indigo-400 hover:underline"
                        href={d.url}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {d.command}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
      </div>
  )
}
export default MigrationDiff
