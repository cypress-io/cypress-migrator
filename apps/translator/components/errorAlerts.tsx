import { ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  selectError,
  selectErrorAlert,
  selectModified,
  selectOriginal,
  sentAddTranslationRequest,
  useAppSelector,
} from '../app'
import AlertType, { AlertIconType } from './alertType'

type CTA = {
  text?: string
  success?: boolean
  action?: () => void
}

const ErrorCTA = ({ cta }: { cta: CTA }): ReactElement => (
  <>
    {cta ? (
      <p className="mt-3 text-sm md:mt-4">
        {cta.success ? (
          <>
            <span className="inline-flex text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="green">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Issue Submission Succeeded
            </span>
          </>
        ) : (
          <button
            data-test="errorCTAButton"
            onClick={cta.action}
            className="inline-flex items-center px-2.5 py-1.5 border border-yellow-300 shadow-sm text-xs font-medium rounded text-yellow-700 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            {cta.text} <span aria-hidden="true">&rarr;</span>
          </button>
        )}
      </p>
    ) : null}
  </>
)

const ErrorAlert = ({
  title,
  description,
  alertType,
  cta,
}: {
  title: string
  description: string
  alertType: AlertIconType
  cta?: CTA
}): ReactElement => {
  return (
    <>
      {alertType === 'Warning' ? (
        <div data-test="error-alert-warning" className="rounded-md bg-yellow-50 p-4 m-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertType alertType={alertType} />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">{title}</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p dangerouslySetInnerHTML={{ __html: description }} />
                <ErrorCTA cta={cta} />
              </div>
            </div>
          </div>
        </div>
      ) : alertType === 'Error' ? (
        <div data-test="error-alert-error" className="rounded-md bg-red-50 p-4 m-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertType alertType={alertType} />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-red-700" dangerouslySetInnerHTML={{ __html: description }} />
              <ErrorCTA cta={cta} />
            </div>
          </div>
        </div>
      ) : (
        <div data-test="error-alert-success" className="rounded-md bg-green-50 p-4 m-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertType alertType={alertType} />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-green-700" dangerouslySetInnerHTML={{ __html: description }} />
              <ErrorCTA cta={cta} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const ErrorAlerts = (): ReactElement => {
  const alerts = useAppSelector(selectErrorAlert)
  const error = useAppSelector(selectError)
  const original = useAppSelector(selectOriginal)
  const modified = useAppSelector(selectModified)
  const dispatch = useDispatch()
  const [translationSent, setTranslationSent] = useState<boolean>(false)

  const submitAnIssue = async () => {
    await fetch('/api/translation', {
      method: 'POST',
      body: JSON.stringify({
        protractor: original,
        cypress: modified,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          dispatch(sentAddTranslationRequest(true))
          setTranslationSent(true)
        }
      })
      .catch((error) => {
        console.error(error)
        dispatch(sentAddTranslationRequest(false))
      })
  }

  return (
    <>
      {alerts.noTranslationsMade ? (
        <ErrorAlert
          title="No Translations Found"
          alertType="Warning"
          description="We were unable to find any translations. If you think there is an issue with a translated item, please submit an issue below."
          cta={
            translationSent
              ? { success: true }
              : {
                  text: 'Submit An Issue',
                  action: submitAnIssue,
                }
          }
        />
      ) : null}
      {alerts.browserWaitTranslated ? (
        <ErrorAlert
          title="Potential Anti-Pattern Found"
          alertType="Warning"
          description="You typically should not need to use hard code waits in your test code. Learn more about about cy.wait and retry-ability from the <a class='text-yellow-500 text-underline' href='https://on.cypress.io/wait' target='_blank'>Cypress Docs.</a>"
        />
      ) : null}
      {alerts.xPath ? (
        <ErrorAlert
          title="XPath Translation Found"
          alertType="Warning"
          description="It appears that your Protractor code is using xpath which is only supported in Cypress by adding this dependency <a class='text-yellow-500 text-underline' href='https://www.npmjs.com/package/cypress-xpath' target='_blank'>npm install -D cypress-xpath</a>."
        />
      ) : null}
      {!!error ? <ErrorAlert title="Warning" alertType="Error" description={error.message} /> : null}
    </>
  )
}
export default ErrorAlerts
