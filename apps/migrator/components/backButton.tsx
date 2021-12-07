import { ReactElement } from 'react'
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'

const BackButton = (): ReactElement => (
  <div className="-mt-px flex-1 flex">
    <Link href="/">
      <a className="py-8 pr-1 inline-flex items-center text-sm font-medium text-green-500 hover:text-green-700">
        <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Back To Migrator
      </a>
    </Link>
  </div>
)
export default BackButton
