import { NgxMonacoEditorConfig } from 'ngx-monaco-editor'

const MonacoConfig: NgxMonacoEditorConfig = {
  onMonacoLoad: () => {
    const monaco = (window as any).monaco
    monaco.editor.defineTheme('cypress-diff', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.lineHighlightBackground': '#e1e3ed',
        'editorLineNumber.foreground': '#747994',
        'editorLineNumber.activeForeground': '#747994',
        'diffEditor.insertedTextBackground': '#a3e7cb70',
        'diffEditor.removedTextBackground': '#f8c4cd70',
      },
    })
    monaco.editor.defineTheme('cypress-no-diff', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#ffffff',
        'editor.lineHighlightBackground': '#e1e3ed',
        'editorLineNumber.foreground': '#747994',
        'editorLineNumber.activeForeground': '#747994',
        'diffEditor.insertedTextBackground': '#ffffff70',
        'diffEditor.removedTextBackground': '#ffffff70',
      },
    })
    monaco.editor.setTheme('cypress-light')
  },
}

export default MonacoConfig
