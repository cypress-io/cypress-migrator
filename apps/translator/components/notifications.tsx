import { ReactElement } from 'react'
import { selectBrowserWaitTranslated, selectCopiedNotification, selectNoTranslationsMade, setBrowserWaitTranslated, setCopiedNotification, setNoTranslationsMade, useAppDispatch, useAppSelector } from '../app'
import { Toast } from '../components'

const CopiedNotification = (): ReactElement => {
  const showCopiedNotification = useAppSelector(selectCopiedNotification)
  const dispatch = useAppDispatch()
  const toggleOffCopiedNotification = () => {
    dispatch(setCopiedNotification(false))
  }
  return (
    <>
      {showCopiedNotification ? (
        <Toast
          title="Sucessfully copied!"
          message="You sucessfully copied the Cypress translation to clipboard"
          alertType="Success"
          hideToastAlert={toggleOffCopiedNotification}
        />
      ) : null}
    </>
  )
}

const NoTranslationsMadeNotification = (): ReactElement => {
  const showNoTranslationsMade = useAppSelector(selectNoTranslationsMade);
  const dispatch = useAppDispatch();
  const toggleOffNoTranslationsMadeNotifications = () => {
    dispatch(setNoTranslationsMade(false))
  }
  return (
    <>
      {showNoTranslationsMade ? (
        <Toast
          title="No Translations Found"
          message="We were unable to find any translations. If you think there is an issue with a translated item, please file an issue in the Cypress Codemods repo <span><a class='text-yellow-500 text-underline' href='https://github.com/cypress-io/cypress-codemods/issues/new' target='_blank'>here</a>"
          alertType="Warning"
          hideToastAlert={toggleOffNoTranslationsMadeNotifications}
        />
      ) : null }
    </>
  )
}

const BrowserWaitTranslatedNotification = (): ReactElement => {
  const showBrowserWaitTranslated = useAppSelector(selectBrowserWaitTranslated);
  const dispatch = useAppDispatch();
  const toggleOffBrowserWaitTranslated = () => {
    dispatch(setBrowserWaitTranslated(false))
  }
  return (
    <>
      { showBrowserWaitTranslated ? (
        <Toast
          title="Potential Anti-Pattern Found"
          message="You typically should not need to use hard code waits in your test code. Learn more about about cy.wait and retry-ability from the <a class='text-yellow-500 text-underline' href='https://on.cypress.io/wait' target='_blank'>Cypress Docs.</a>"
          alertType="Warning"
          hideToastAlert={toggleOffBrowserWaitTranslated}
        />
      ): null}
    </>
  )
}

const Notifications = (): ReactElement => <>
  <CopiedNotification />
  <NoTranslationsMadeNotification />
  <BrowserWaitTranslatedNotification />
</>
export default Notifications
