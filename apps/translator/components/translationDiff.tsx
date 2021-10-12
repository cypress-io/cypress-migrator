import { ReactElement } from 'react'
import Link from 'next/link'
import { selectDiffApiItems, useAppSelector } from '../app'

const TranslationDiff = (): ReactElement => {
  const diff = useAppSelector(selectDiffApiItems)

  return (
    <>
      <h2 className="text-3xl leading-6 font-bold text-gray-900 my-4 capitalize">Details:</h2>
      <hr />
      <div className="flex justify-between">
        <div>
          {diff.length > 0 ? (
            <>
              <ul className="list-inside list-none p-4 mb-4">
                {diff.map((d, i: number) => (
                  <li key={i}>
                    <a className="text-green-400 hover:text-green-500" href={d.url} rel="noreferrer" target="_blank">
                      {d.command}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
        <div>
          <h4 className="pt-8 font-bold">Want to dig deeper?</h4>
          <p>
            <Link href="/translations">
              <a className="text-green-400 hover:text-green-500"> See the full list of translations &rarr; </a>
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
export default TranslationDiff
