import { ClipboardCopyIcon } from '@heroicons/react/outline'
import { ReactElement } from 'react'
import { selectModified, setCopiedNotification, useAppDispatch, useAppSelector } from '../app'

const CopyButton = (): ReactElement => {
  const dispatch = useAppDispatch()
  const migrated = useAppSelector(selectModified)

  const copy = (): void => {
    dispatch(setCopiedNotification(true))
    navigator.clipboard.writeText(migrated)
  }

  return (
    <div className="flex justify-end">
      <button
        type="button"
        title="Copy Button"
        className="inline-flex items-center px-4 py-2 border border-gray-400 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:border-indigo-500 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={copy}
      >
        <ClipboardCopyIcon className="h-5 w-5 text-indigo-500" />
        Copy
      </button>
    </div>
  )
}
export default CopyButton
