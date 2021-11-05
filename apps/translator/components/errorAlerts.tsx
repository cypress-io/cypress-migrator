import { ReactElement } from 'react'
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
  text: string
  action: () => void
}

const ErrorCTA = ({ cta }: { cta: CTA }): ReactElement => (
  <>
    {cta ? (
      <p className="mt-3 text-sm md:mt-4">
        <button
          onClick={cta.action}
          className="inline-flex items-center px-2.5 py-1.5 border border-yellow-300 shadow-sm text-xs font-medium rounded text-yellow-700 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
        >
          {cta.text} <span aria-hidden="true">&rarr;</span>
        </button>
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

  const submitAnIssue = () => {
    try {
      fetch('/api/translation', {
        method: 'POST',
        body: JSON.stringify({
          protractor: original,
          cypresss: modified,
        }),
      }).then(() => dispatch(sentAddTranslationRequest(true)))
    } catch {
      console.error('There was an error submitting your issue')
      dispatch(sentAddTranslationRequest(false))
    }
  }

  return (
    <>
      {alerts.noTranslationsMade ? (
        <ErrorAlert
          title="No Translations Found"
          alertType="Warning"
          description="We were unable to find any translations. If you think there is an issue with a translated item, please submit an issue"
          cta={{
            text: 'Submit An Issue',
            action: submitAnIssue,
          }}
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
