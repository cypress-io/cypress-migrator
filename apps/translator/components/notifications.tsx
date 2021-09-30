import { ReactElement } from 'react'
import { selectCopiedNotification, setCopiedNotification, useAppDispatch, useAppSelector } from '../app'
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
          hideToastAlert={toggleOffCopiedNotification}
        />
      ) : null}
    </>
  )
}

const Notifications = (): ReactElement => <CopiedNotification />
export default Notifications
