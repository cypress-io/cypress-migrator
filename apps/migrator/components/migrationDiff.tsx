import Link from 'next/link'
import Image from 'next/image'
import { ReactElement } from 'react'
import { selectDiffApiItems, shouldShowDetails, useAppSelector } from '../app'
import { ErrorAlerts } from '.'

const MigrationDiff = (): ReactElement => {
  const diff = useAppSelector(selectDiffApiItems)
  const showDetails = useAppSelector(shouldShowDetails)

  return (
      <div
        className={`md:w-full transition duration-500 ease-in-out mt-20 relative ${showDetails ? 'opacity-100' : 'opacity-0'}`}
        data-test="more-details"
      >
        <ErrorAlerts />
        {diff.length > 0 ? (
            <div className="flex w-full">
              <div className="w-1/2">
                <h2 className="text-2xl leading-10 font-bold text-gray-900 max-w-lg">
                  Great! The following Cypress commands were found in the migrated code.
                </h2>
                <p className="text-gray-600 py-4 max-w-md">
                  For more detailed information about each item, click the link to its page within our documentation.
                </p>
                <Link href="/migrations" passHref>
                  <button
                      type="button"
                      className="px-6 py-3 my-4 text-base font-medium rounded-md shadow-sm text-indigo-500 bg-indigo-50 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
                      data-test="all-migrations-button"
                      >
                        See all Protractor Migrations
                  </button>
                </Link>
              </div>
              <div className="bg-white w-1/2" data-test="api-details">
                <ul className="list-inside list-none divide-y divide-gray-50 p-6 rounded shadow" data-test="api-details-list">
                  {diff.map((d, i: number) => (
                    <li className="flex items-center py-4 first:pt-0 last:pb-0" key={i}>
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
