import { ClipboardCopyIcon } from '@heroicons/react/outline'
import { ReactElement } from 'react'

const CopyButton = ({ copy }): ReactElement => {
  return (
    <div className="flex justify-end">
      <button
        type="button"
        title="Copy Button"
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={copy}
      >
        <ClipboardCopyIcon className="h-5 w-5 text-gray-500" />
        Copy
      </button>
    </div>
  )
}
export default CopyButton
