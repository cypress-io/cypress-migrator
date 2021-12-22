import { ReactElement } from 'react'
import {
  selectCopiedNotification,
  selectSentAddMigrationRequest,
  sentAddMigrationRequest,
  setCopiedNotification,
  useAppDispatch,
  useAppSelector,
} from '../app'
import { Toast } from '../components'

const Notifications = (): ReactElement => {
  const showCopiedNotification = useAppSelector(selectCopiedNotification)
  const showSentAddMigrationRequestSuceeded = useAppSelector(selectSentAddMigrationRequest)
  const dispatch = useAppDispatch()
  const toggleOffCopiedNotification = () => {
    dispatch(setCopiedNotification(false))
  }

  const toggleOffSentAddMigrationRequest = () => {
    dispatch(sentAddMigrationRequest(false))
  }
  return (
    <>
      {showCopiedNotification ? (
        <Toast
          title="Migration copied!"
          alertType="Success"
          hideToastAlert={toggleOffCopiedNotification}
        />
      ) : null}

      {showSentAddMigrationRequestSuceeded ? (
        <Toast
          title="Sent Sucessfully"
          message="We successfully received your request to add your migration. We appreciate your feedback!"
          alertType="Success"
          hideToastAlert={toggleOffSentAddMigrationRequest}
        />
      ) : null}
    </>
  )
}
export default Notifications
