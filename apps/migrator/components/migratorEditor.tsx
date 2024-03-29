import Head from 'next/head'
import Link from 'next/link'
import { applyTransforms } from '@cypress-dx/codemods'
import { ArrowCircleRightIcon } from '@heroicons/react/solid'
import { DiffEditor, useMonaco } from '@monaco-editor/react'
import { ReactElement, useEffect, useRef, useState } from 'react'
import { CopyButton, DiffToggle, LanguagePills } from '.'
import {
  selectDiffEditorThemeColors,
  selectModified,
  selectOriginal,
  migrate,
  useAppDispatch,
  useAppSelector,
  selectLanguage
} from '../app'

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
    window.addEventListener('load', () => setIsMobile(window.innerWidth < 768))
    window.addEventListener('resize', () => setIsMobile(window.innerWidth < 768))
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
    <div className="flex pt-4 gap-2 flex-col">
      <Head>
        {/*
          * Fix from https://github.com/suren-atoyan/monaco-react/issues/272#issuecomment-893672844 
          * Fixes https://github.com/vercel/next.js/issues/11012 that causes Monaco Editor CSS to be removed
        */}
        <link
          rel="stylesheet"
          type="text/css"
          data-name="vs/editor/editor.main"
          href={`https://cdn.jsdelivr.net/npm/monaco-editor@${monacoPackage.version}/min/vs/editor/editor.main.css`}
        ></link>
      </Head>
      <LanguagePills />
      <div className="w-full bg-white px-4 pt-4 pb-2 sm:p-2 border-solid border-4 border-gray-200 rounded-md overflow-hidden">
        <div className='md:flex md:justify-between pt-2 pb-4 px-4'>
          {!isMobile ? ( <DiffToggle /> ) : null}
          <CopyButton />
        </div>
        <div className="editor-wrapper">
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
              scrollBeyondLastLine: false
            }}
          />
        </div>
      </div>
      <div className="flex flex-wrap-reverse justify-center md:justify-between items-center p-4 md:py-0 gap-y-4 bg-white bg-opacity-50 rounded">
        <div className="text-center md:text-left">
          <h2 className="font-bold">Want to dig deeper?</h2>
          <p>
            <Link href="/migrations">
            <a className="text-jade-500 hover:underline" data-test="all-migrations-link">
                {' '}
                See the full list of <span className="capitalize">{selectedLanguage}</span> migrations &rarr;{' '}
              </a>
            </Link>
          </p>
        </div>
        <button
          type="button"
          className="w-full md:w-auto inline-flex justify-center items-center px-5 py-2.5 my-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-500 hover:bg-indigo-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
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
