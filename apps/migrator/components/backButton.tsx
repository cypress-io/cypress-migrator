import { ReactElement } from 'react'
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const BackButton = (): ReactElement => {
  return (
    <div className="-mt-px flex-1 flex">
      <Link href="/">
      <a
        style={{ cursor: 'pointer' }}
        className="py-8 pr-1 inline-flex items-center text-sm font-medium text-jade-300 hover:text-jade-700"
      >
        <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Back To Migrator
      </a></Link>
    </div>
  )
}
export default BackButton
