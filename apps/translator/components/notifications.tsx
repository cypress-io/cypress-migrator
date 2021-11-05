import { ReactElement } from 'react'
import {
  selectCopiedNotification,
  selectSentAddTranslationRequest,
  sentAddTranslationRequest,
  setCopiedNotification,
  useAppDispatch,
  useAppSelector,
} from '../app'
import { Toast } from '../components'

const Notifications = (): ReactElement => {
  const showCopiedNotification = useAppSelector(selectCopiedNotification)
  const showSentAddTranslationRequestSuceeded = useAppSelector(selectSentAddTranslationRequest)
  const dispatch = useAppDispatch()
  const toggleOffCopiedNotification = () => {
    dispatch(setCopiedNotification(false))
  }

  const toggleOffSentAddTranslationRequest = () => {
    dispatch(sentAddTranslationRequest(false))
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

      {showSentAddTranslationRequestSuceeded ? (
        <Toast
          title="Sent Sucessfully"
          message="We successfully received your request to add your translation. We appreciate your feedback!"
          alertType="Success"
          hideToastAlert={toggleOffSentAddTranslationRequest}
        />
      ) : null}
    </>
  )
}
export default Notifications
