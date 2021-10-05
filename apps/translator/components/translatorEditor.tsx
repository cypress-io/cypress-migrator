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
  selectFontSize,
} from '../app'
import { defaultText } from '../constants'
import { AboveEditor, DiffToggle, FontSizeButtons } from '.'

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
  const error = useAppSelector(selectError)
  const translated = useAppSelector(selectModified)
  const original: string = useAppSelector(selectOriginal)
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
      translate(originalEditor.getValue());
    })
  }

  const translate = (value: string): void => {
    const codemodResult = cypressCodemods({ input: value })

    dispatch(setOriginal(value))
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
      <div className="px-4 py-4 mb-8 sm:p-2 w-full border-solid border-2 border-gray-200 rounded">
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
    </div>
  )
}

export default TranslateEditor
