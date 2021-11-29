import { ReactElement } from 'react'
import { CheckCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/react/outline'

export type AlertIconType = 'Success' | 'Warning' | 'Error'

const AlertType = ({ alertType }: { alertType: AlertIconType }): ReactElement => (
  <>
    {alertType === 'Success' && <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />}
    {alertType === 'Warning' && <InformationCircleIcon className="h-6 w-6 text-yellow-400" aria-hidden="true" />}
    {alertType === 'Error' && <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />}
  </>
)
export default AlertType
