import { ReactElement } from 'react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const tableComponent = {
  table: ({ children, ...props }) => (
    <div className="flex flex-col mb-12 mt-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200" {...props}>
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  ),
  thead: ({ ...props }) => <thead className="bg-gray-50" {...props} />,
  th: ({ children }) => (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  ),
  tbody: ({ ...props }) => <tbody className="bg-white divide-y divide-gray-200" {...props} />,
  td: ({ children }) => <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{children}</td>,
  h2: ({ children, ...props }) => (
    <div className="pb-2 border-b border-gray-200">
      <h2 className="text-lg leading-6 font-medium text-gray-900">{children}</h2>
    </div>
  ),
}

const AvailableCodemods = ({
  allCodeMods,
  selectedLanguage,
}: {
  allCodeMods: string[]
  selectedLanguage: string
}): ReactElement => {
  return (
    <>
      <h2 className="text-3xl leading-6 font-bold text-gray-900 mb-4 capitalize">{selectedLanguage} Translations</h2>
      {allCodeMods?.map((codeMod: string, i: number) => (
        <ReactMarkdown key={i} plugins={[gfm]} children={codeMod} components={tableComponent} />
      ))}
    </>
  )
}
export default AvailableCodemods
