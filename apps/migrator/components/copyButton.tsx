import { ClipboardCopyIcon } from '@heroicons/react/outline'
import { ReactElement } from 'react'
import { selectModified, setCopiedNotification, useAppDispatch, useAppSelector, shouldShowCopy } from '../app'

const CopyButton = (): ReactElement => {
  const dispatch = useAppDispatch()
  const migrated = useAppSelector(selectModified)
  const showCopyButton = useAppSelector(shouldShowCopy)

  const copy = (): void => {
    dispatch(setCopiedNotification(true))
    navigator.clipboard.writeText(migrated)
  }

  return (
    showCopyButton ? (
    <div className="md:col-end-3 flex justify-end">
      <button
        type="button"
        title="Copy Button"
        className="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 shadow-sm text-base font-medium rounded-md text-indigo-500 bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:bg-indigo-100 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
        onClick={copy}
      >
        <ClipboardCopyIcon className="h-5 w-5 text-indigo-500" />
        Copy
      </button>
    </div>
    ) : null
  )
}
export default CopyButton
