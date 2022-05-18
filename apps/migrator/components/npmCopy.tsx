import { ReactElement } from 'react'
import { setCopiedNotification, useAppDispatch, useAppSelector } from '../app'

const NPMCopy = (): ReactElement => {
  const dispatch = useAppDispatch()

  const copy = (): void => {
    dispatch(setCopiedNotification(true))
    navigator.clipboard.writeText('npm install cypress')
  }

  return (
    <div className="flex justify-end">
      <button
        type="button"
        title="NPM Button"
        className="w-full sm:w-auto sm:max-w-1/2 inline-flex justify-center items-center px-6 py-3 my-4 text-base font-medium font-mono rounded-md shadow-sm bg-gray-900 transition duration-300 ease-in-out transform gap-1"
        onClick={copy}
      >
        <span className="text-orange-100">$</span>
        <span className="text-white">npm install cypress</span>
      </button>
    </div>
  )
}
export default NPMCopy
