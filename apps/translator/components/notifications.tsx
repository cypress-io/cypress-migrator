import { ReactElement } from 'react'
import {
  selectCopiedNotification, setCopiedNotification, useAppDispatch,
  useAppSelector
} from '../app'
import { Toast } from '../components'

const Notifications = (): ReactElement => {
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
export default Notifications
