import Head from 'next/head'
import { applyTransforms } from '@cypress-dx/migrate-protractor'
import { ArrowCircleRightIcon } from '@heroicons/react/solid'
import { DiffEditor, useMonaco } from '@monaco-editor/react'
import Link from 'next/link'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { CopyButton, DiffToggle, LanguagePills } from '.'
import {
  selectDiffEditorThemeColors,
  selectError,
  selectLanguage,
  selectModified,
  selectOriginal,
  migrate,
  useAppDispatch,
  useAppSelector,
} from '../app'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line @typescript-eslint/no-var-requires
const monacoPackage = require('../../../node_modules/monaco-editor/package.json')

const MigrateEditor = (): ReactElement => {
  const dispatch = useAppDispatch()
  const original = useAppSelector(selectOriginal)
  const migrated = useAppSelector(selectModified)
  const selectedLanguage = useAppSelector(selectLanguage)
  const themeColors = useAppSelector(selectDiffEditorThemeColors)
  const [isMobile, setIsMobile] = useState(false)

  const diffEditorRef = useRef(null)
  const monaco = useMonaco()

  const setMonacoLight = (monaco) =>
    monaco.editor.defineTheme('cypress-light', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: themeColors,
    })

  useEffect(() => {
    window.addEventListener('load', () => setIsMobile(window.innerWidth <= 768))
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 768))
  }, [])

  useEffect(() => {
    // handles setting theme when diff colors are toggled
    if (monaco) {
      setMonacoLight(monaco)

      monaco.editor.setTheme('cypress-light')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monaco, themeColors])

  // handles setting theme on editor mount
  const handleEditorWillMount = (monaco) => {
    setMonacoLight(monaco)
  }

  const handleEditorMount = (editor) => {
    diffEditorRef.current = editor
  }

  const migrateEditorValue = (): void => {
    const input = diffEditorRef.current.getOriginalEditor().getValue()
    const result = applyTransforms({ input })
    dispatch(migrate({ input, result }))
  }

  return (
    <div className="flex pt-4 h-3/5 gap-2 flex-col">
      <Head>
        {/* Fix from https://github.com/suren-atoyan/monaco-react/issues/272#issuecomment-893672844
  Fixes https://github.com/vercel/next.js/issues/11012 that causes Monaco Editor CSS to be removed
  */}
        <link
          rel="stylesheet"
          type="text/css"
          data-name="vs/editor/editor.main"
          href={`https://cdn.jsdelivr.net/npm/monaco-editor@${monacoPackage.version}/min/vs/editor/editor.main.css`}
        ></link>
      </Head>
      <LanguagePills />
      <div className={classNames(isMobile ? 'justify-end pt-2' : 'justify-between', 'flex')}>
        {!isMobile ? (
          <>
            <DiffToggle />
          </>
        ) : null}
        <CopyButton />
      </div>

      <div className="flex h-full">
        <div className="px-4 py-4 sm:p-2 w-full border-solid border-2 border-gray-200 rounded">
          <DiffEditor
            language="javascript"
            original={original}
            modified={!!migrated ? migrated : ''}
            keepCurrentOriginalModel={true}
            keepCurrentModifiedModel={true}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorMount}
            theme={'cypress-light'}
            options={{
              lineNumbers: 'on',
              originalEditable: true,
              fontSize: 14,
              codeLens: true,
              wordWrap: 'on',
              scrollbar: {
                vertical: 'hidden',
              },
              renderSideBySide: !isMobile,
              colorDecorators: false,
              minimap: { enabled: false },
              renderIndicators: false,
              renderLineHighlight: 'none',
              renderOverviewRuler: false,
              readOnly: true,
              overviewRulerLanes: 0,
            }}
          />
        </div>
      </div>
      <div className="pb-4 flex flex-wrap-reverse justify-center sm:justify-between items-center">
        <div>
          <h4 className="font-bold">Want to dig deeper?</h4>
          <p>
            <Link href="/migrations">
              <a className="text-green-400 hover:text-green-500" data-test="all-migrations-link">
                {' '}
                See the full list of <span className="capitalize">{selectedLanguage}</span> migrations &rarr;{' '}
              </a>
            </Link>
          </p>
        </div>
        <button
          type="button"
          className="w-full sm:w-auto sm:max-w-1/2 inline-flex justify-center items-center px-6 py-3 my-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
          onClick={migrateEditorValue}
          data-test="migrate-button"
        >
          Migrate to Cypress
          <ArrowCircleRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default MigrateEditor
