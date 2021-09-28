import { ReactElement, useState } from "react"
import { Toast } from ".";
import { ClipboardCopyIcon } from "@heroicons/react/outline"

const CopyButton = ({ translated }: { translated: string }): ReactElement => {
  const [showCopiedAlert, setShowCopiedAlert] = useState(false)

  const copyToClipboard = (): void => {
    navigator.clipboard.writeText(translated)
    setShowCopiedAlert(true)
  }

  const hideToastAlert = (): void => setShowCopiedAlert(false)

  return (
    <div className="flex justify-end">
      <button
        type="button"
        title="Copy Button"
        // eslint-disable-next-line no-extra-boolean-cast
        disabled={!!!translated}
        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={copyToClipboard}
      >
        <ClipboardCopyIcon className="h-5 w-5 text-gray-500" />
        Copy
      </button>
      {showCopiedAlert && (
        <Toast
          title="Sucessfully copied!"
          message="You sucessfully copied the Cypress translation to clipboard"
          hideToastAlert={hideToastAlert}
        />
      )}
    </div>
  )
}
export default CopyButton
