import { ReactElement } from 'react'
import { selectError, selectErrorAlert, useAppSelector } from '../app'
import AlertType, { AlertIconType } from './alertType'

const ErrorAlert = ({
  title,
  description,
  alertType,
}: {
  title: string
  description: string
  alertType: AlertIconType
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

  return (
    <>
      {alerts.noTranslationsMade ? (
        <ErrorAlert
          title="No Translations Found"
          alertType="Warning"
          description="We were unable to find any translations. If you think there is an issue with a translated item, please file an issue in the Cypress Codemods repo <span><a class='text-yellow-500 text-underline' href='https://github.com/cypress-io/cypress-dx/issues' target='_blank' rel='noreferrer'>here</a></span>"
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
