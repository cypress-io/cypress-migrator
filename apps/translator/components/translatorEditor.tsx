import { ReactElement, useEffect, useRef, useState } from 'react';
import { DiffEditor, useMonaco } from '@monaco-editor/react';
import { ArrowCircleRightIcon } from '@heroicons/react/solid';
import cypressCodemods from '@cypress-dx/codemods';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectError,
  selectModified,
  setOriginal,
  setModified,
  setDiff,
  setError,
} from '../app/translatorSlice';
import { defaultText } from '../constants';
import AboveEditor from './aboveEditor';

const TranslateEditor = ({ selected }: { selected: string }): ReactElement => {
  const dispatch = useAppDispatch();
  const translated = useAppSelector(selectModified);
  const error = useAppSelector(selectError);

  const [value, setValue] = useState<string | undefined>(
    defaultText[selected.toLowerCase()]
  );

  const diffEditorRef = useRef(null);
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      monaco.editor.defineTheme('cypress-light', {
        base: 'vs',
        inherit: true,
        rules: [],
        colors: {
          'editor.background': '#fff',
          'editor.lineHighlightBackground': '#e1e3ed',
          'scrollbarSlider.background': '#c2f1de',
          'scrollbarSlider.hoverBackground': '#a3e7cb',
          'editorLineNumber.foreground': '#747994',
          'editorLineNumber.activeForeground': '#747994',
        },
      });

      monaco.editor.setTheme('cypress-light');
    }
  }, [monaco]);

  const handleEditorMount = (editor) => {
    diffEditorRef.current = editor;

    const originalEditor = editor.getOriginalEditor();
    originalEditor.onDidChangeModelContent(() => {
      setValue(originalEditor.getValue());
    });
  };

  const translateEditorValue = (): void => {
    const codemodResult = cypressCodemods({ input: value });

    dispatch(setOriginal(value));
    dispatch(setModified(codemodResult.output));
    dispatch(setDiff(codemodResult.diff));

    if (codemodResult.error) {
      dispatch(setError(codemodResult.error));
    }
  };

  return (
    <div className="md:flex pt-4 h-1/2 gap-2 flex-col">
      <AboveEditor selectedLanguage={selected} translated={translated} />

      <div className="flex h-full">
        <div className="px-4 py-4 sm:px-0 w-full border-solid border-2 border-gray-200 rounded">
          <DiffEditor
            language="javascript"
            original={defaultText[selected.toLowerCase()]}
            modified={!error && translated}
            keepCurrentOriginalModel={true}
            keepCurrentModifiedModel={true}
            onMount={handleEditorMount}
            options={{
              lineNumbers: 'on',
              originalEditable: true,
              fontSize: 16,
              codeLens: true,
              wordWrap: 'on',
              scrollbar: {
                vertical: 'hidden',
              },
              minimap: { enabled: false },
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
          <ArrowCircleRightIcon
            className="ml-2 -mr-1 h-5 w-5"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default TranslateEditor;