import { ReactElement, useEffect, useRef, useState } from 'react'
import { DiffEditor, useMonaco } from '@monaco-editor/react'
import { ArrowCircleRightIcon, PlusIcon, MinusIcon } from '@heroicons/react/solid'
import cypressCodemods from '@cypress-dx/codemods'

import {
  selectError,
  selectModified,
  setOriginal,
  setModified,
  setDiff,
  setError,
  selectLanguage,
  selectOriginal,
  useAppDispatch,
  useAppSelector,
  selectDiffEditorThemeColors,
  selectDisplayDiff,
  setDisplayDiff,
  selectFontSize,
  increaseFontSize,
  decreaseFontSize,
} from '../app'
import { defaultText } from '../constants'
import { AboveEditor } from '.'
import { Switch } from '@headlessui/react'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const DiffToggle = () => {
  const enabled = useAppSelector(selectDisplayDiff);
  const dispatch = useAppDispatch();
  const setEnabled = () => dispatch(setDisplayDiff(!enabled))

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={enabled}
        onChange={() => setEnabled()}
        className={classNames(
          enabled ? 'bg-green-300' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3">
        <span className="text-sm font-medium text-gray-900">Display Diff Coloring</span>
      </Switch.Label>
    </Switch.Group>
  )
}

const FontSizeButtons = () => {
  const size = useAppSelector(selectFontSize);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center">
      <span className="text-sm font-medium text-gray-900">Font Size: <span className="font-bold text-lg">{size}</span></span>
      <button
          className="bg-green-400 text-white hover:bg-green-500 hover:text-white active:bg-green-500 font-bold uppercase text-xs px-2 py-1 rounded-l outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 ml-4"
          type="button"
          onClick={() => dispatch(decreaseFontSize())}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
          </svg>
      </button>
      <button
          className="bg-green-400 text-white hover:bg-green-500 hover:text-white active:bg-green-500 font-bold uppercase text-xs px-2 py-1 rounded-r outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => dispatch(increaseFontSize())}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
      </button>
    </div>
  )
}

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.addEventListener('load', () => setIsMobile(window.innerWidth <= 768))
    window.addEventListener('resize', () => setIsMobile(window.innerWidth <= 768))
  })

  return isMobile
}

const TranslateEditor = (): ReactElement => {
  const dispatch = useAppDispatch()
  const translated = useAppSelector(selectModified)
  const error = useAppSelector(selectError)
  const original: string = useAppSelector(selectOriginal)
  const modified: string = useAppSelector(selectModified)
  const selectedLanguage = useAppSelector(selectLanguage)
  const themeColors = useAppSelector(selectDiffEditorThemeColors);
  const isMobile = useIsMobile();
  const fontSize = useAppSelector(selectFontSize);

  const diffEditorRef = useRef(null)
  const monaco = useMonaco()

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('cypress-light', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: themeColors
      })

      monaco.editor.setTheme('cypress-light')
    }
  }, [monaco, themeColors])

  const handleEditorMount = (editor) => {
    diffEditorRef.current = editor
    const originalEditor = editor.getOriginalEditor()

    originalEditor.onDidChangeModelContent(() => {
      dispatch(setOriginal(originalEditor.getValue()));
    })
  }

  const translateEditorValue = (): void => {
    const codemodResult = cypressCodemods({ input: original })

    dispatch(setOriginal(original))
    dispatch(setModified(codemodResult.output))
    dispatch(setDiff(codemodResult.diff))

    if (codemodResult.error) {
      dispatch(setError(codemodResult.error))
    }
  }

  return (
    <div className=" flex pt-4 h-3/5 gap-2 flex-col">
      <AboveEditor translated={translated} />
      <div className="flex justify-between">
        {!isMobile ? <DiffToggle /> : null}
        <FontSizeButtons />
      </div>

      <div className="flex h-full">
      <div className="px-4 py-4 sm:p-2 w-full border-solid border-2 border-gray-200 rounded">
          <DiffEditor
            language="javascript"
            original={defaultText[selectedLanguage.toLowerCase()]}
            modified={!error && translated}
            keepCurrentOriginalModel={true}
            keepCurrentModifiedModel={true}
            onMount={handleEditorMount}
            options={{
              lineNumbers: 'on',
              originalEditable: true,
              fontSize: fontSize,
              codeLens: true,
              wordWrap: 'on',
              scrollbar: {
                vertical: 'hidden',
              },
              minimap: { enabled: false },
              renderSideBySide: !isMobile,
              readOnly: true
            }}
          />
        </div>
      </div>
      <div className="pb-4 flex justify-end">
        <button
          type="button"
          className="inline-flex items-center px-6 py-3 my-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={translateEditorValue}
        >
          Translate to Cypress
          <ArrowCircleRightIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default TranslateEditor
