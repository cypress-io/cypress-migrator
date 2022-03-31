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
        <p className="mt-2 text-center text-3xl font-extrabold tracking-tight text-gray-50 sm:text-4xl lg:text-left">
          More details about your migration:
        </p>
        <ErrorAlerts />
        <div className="flex justify-between">
          <div data-test="api-details">
            {diff.length > 0 ? (
              <>
                <p className="py-4 text-gray-50">
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
                          {/* {feature.description} */} A Short Description Goes Here
                        </p>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
                
                {/* <div className="overflow-hidden" data-test="api-details-list">
                  {diff.map((d: IDiffArrayApiItem, i: number) => (
                    <a href={d.url} key={i} rel="noreferrer" target="_blank">
                      <div className="relative mb-6 rounded border border-gray-400 py-4 pl-4 lg:py-6">
                        <div className="relative flex items-center">
                          <span className="flex h-9 items-center">
                            <span className="relative z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 border-gray-400 bg-white group-hover:border-gray-400">
                              <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300"></span>
                            </span>
                          </span>
                          <span className="ml-2 flex w-full flex-row lg:ml-4">
                            <span className="grow font-normal text-jade-300">{d.command}</span>
                          </span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>                 */}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
export default MigrationDiff
