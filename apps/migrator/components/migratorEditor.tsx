import Head from 'next/head'
import { applyTransforms } from '@cypress-dx/codemods'
import { ArrowSmRightIcon } from '@heroicons/react/solid'
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
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-y-3 pt-2 pb-5 pr-1'>
          {!isMobile ? ( <DiffToggle /> ) : null}
          <div className="flex md:justify-end">
            <button
              type="button"
              className="w-full md:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-normal rounded-md shadow-sm text-white bg-indigo-500 hover:bg-jade-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jade-500 transition duration-300 ease-in-out transform hover:-translate-y-0 hover:scale-105"
              onClick={migrateEditorValue}
              data-test="migrate-button"
            >
              Migrate
              <ArrowSmRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
            </button>
          </div>
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
    </div>
  )
}

export default MigrateEditor
