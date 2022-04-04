import { ReactElement } from 'react'
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const BackButton = (): ReactElement => {
  return (
    <div className="-mt-px flex-1 flex">
      <Link href="/">
      <a
        style={{ cursor: 'pointer' }}
        className="w-full sm:w-auto sm:max-w-1/2 inline-flex justify-end items-center px-3 py-3 my-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
      >
        <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Back To Migrator
      </a></Link>
    </div>
  )
}
export default BackButton
