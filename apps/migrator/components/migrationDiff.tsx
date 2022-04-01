import { ReactElement } from 'react'
import { ErrorAlerts } from '.'
import { IDiffArrayApiItem, selectDiffApiItems, shouldShowDetails, useAppSelector } from '../app'
import Image from 'next/image';

const MigrationDiff = (): ReactElement => {
  const diff = useAppSelector(selectDiffApiItems)
  const showDetails = useAppSelector(shouldShowDetails)

  return (
    <div className={`features relative bg-jade-300 bg-home-features bg-cover bg-center bg-no-repeat py-16 sm:py-24 lg:py-16 ${showDetails ? 'opacity-100 mt-24' : 'opacity-0 mt-0'}`} data-test="more-details">
      <div className="mx-auto max-w-md px-4  sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <p className="mt-2 text-center text-5xl font-extrabold tracking-tight text-gray-50 lg:text-left">
          More details about your migration:
        </p>
        <ErrorAlerts />
        <div className="flex justify-between">
          <div data-test="api-details">
            {diff.length > 0 ? (
              <>
                <p className="py-4 text-gray-50 text-lg">
                  The following Cypress API items were found in the migrated code. For more detailed information about
                  each item, click the link to its page within our documentation.
                </p>

                <div className="grid auto-rows-fr grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {diff.map((d: IDiffArrayApiItem, i: number) => (
                  <div key={i} className="pt-6">
                    <a href={d.url} key={i} rel="noreferrer" target="_blank">
                      <div className="h-full rounded-lg bg-gray-50 px-6 py-8">
                        <Image
                          className="h-8 w-auto sm:h-10"
                          src={`/book-icon.svg`}
                          alt="Cypress Logo"
                          height={62}
                          width={75}
                        />
                        <h3 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
                          {d.command}
                        </h3>
                        <p className="mt-5 text-base text-gray-500">
                          A Short Description Goes Here
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MigrationDiff
