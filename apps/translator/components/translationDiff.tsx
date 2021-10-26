import { ReactElement } from 'react'
import { ArrowCircleRightIcon, InformationCircleIcon } from '@heroicons/react/outline'

import { selectDiffApiItems, selectErrorAlert, useAppSelector } from '../app'

const ErrorAlert = ({ title, description }: { title: string, description: string }): ReactElement => {
  return (
    <div className="rounded-md bg-yellow-50 p-4 m-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
      </div>
    </div>
  )
}

const ErrorAlerts = (): ReactElement => {
  const alerts = useAppSelector(selectErrorAlert);

  return (
    <>
    { alerts.noTranslationsMade ? <ErrorAlert title="NO Translations Found" description="We were unable to find any translations. If you think there is an issue with a translated item, please file an issue in the Cypress Codemods repo <span><a class='text-yellow-500 text-underline' href='https://github.com/cypress-io/cypress-dx/issues' target='_blank' rel='noreferrer'>here</a></span>" /> : null }
    { alerts.browserWaitTranslated ? <ErrorAlert title="Potential Anti-Pattern Found" description="You typically should not need to use hard code waits in your test code. Learn more about about cy.wait and retry-ability from the <a class='text-yellow-500 text-underline' href='https://on.cypress.io/wait' target='_blank'>Cypress Docs.</a>" /> : null }
    { alerts.noInputProvided ? <ErrorAlert title="No Input Value Provided" description="No input value was provided to translate. Please try again by passing a valid string value." /> : null }
    </>
  )
}

const TranslationDiff = (): ReactElement => {
  const diff = useAppSelector(selectDiffApiItems)

  return (
    <div className="md:w-3/5" data-test="more-details">
      <h2 className="text-3xl leading-6 font-bold text-gray-900 my-4 capitalize">
        More details about your translation:
      </h2>
      <hr />
      <div className="flex justify-between">
        <div data-test="api-details">
          {diff.length > 0 ? (
            <>
            <ErrorAlerts />
              <p className="py-4">
                The following Cypress API items were found in the translated code. For more detailed information about
                each item, click the link to its page within our documentation.
              </p>
              <ul className="list-inside list-none mb-4" data-test="api-details-list">
                {diff.map((d, i: number) => (
                  <li className="flex items-center" key={i}>
                    <ArrowCircleRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    <a
                      className="ml-2 text-green-400 hover:text-green-500"
                      href={d.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {d.command}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default TranslationDiff
