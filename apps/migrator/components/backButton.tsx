import { ReactElement } from 'react'
import { ArrowNarrowLeftIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

const BackButton = (): ReactElement => {
  const router = useRouter()
  return (
    <div className="-mt-px flex-1 flex">
      <a
        style={{ cursor: 'pointer' }}
        className="py-8 pr-1 inline-flex items-center text-sm font-medium text-green-500 hover:text-green-700"
        onClick={() => window.location.replace(window.location.href.replace('/migrations', ''))}
      >
        <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        Back To Migrator
      </a>
    </div>
  )
}
export default BackButton
