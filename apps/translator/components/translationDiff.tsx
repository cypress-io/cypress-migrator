import { ReactElement } from 'react'
import { ArrowCircleRightIcon } from '@heroicons/react/outline'

import { selectDiffApiItems, useAppSelector } from '../app'

const TranslationDiff = (): ReactElement => {
  const diff = useAppSelector(selectDiffApiItems)

  return (
    <div className="md:w-3/5">
      <h2 className="text-3xl leading-6 font-bold text-gray-900 my-4 capitalize">
        More details about your translation:
      </h2>
      <hr />
      <div className="flex justify-between">
        <div>
          {diff.length > 0 ? (
            <>
              <p className="py-4">
                The following Cypress API items were found in the translated code. For more detailed information about
                each item, click the link to its page within our documentation.
              </p>
              <ul className="list-inside list-none mb-4">
                {diff.map((d, i: number) => (
                  <li className="flex items-center" key={i}>
                    <ArrowCircleRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
                    <a
                      className="ml-2 text-green-400 hover:text-green-500"
                      href={d.url}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {d.command}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
export default TranslationDiff
