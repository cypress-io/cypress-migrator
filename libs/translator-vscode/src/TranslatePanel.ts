import * as vscode from 'vscode'
import cypressCodemods from '@cypress-dx/codemods'
export class TranslatePanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: TranslatePanel | undefined

  public static readonly viewType = 'translate'

  private readonly _panel: vscode.WebviewPanel
  private readonly _extensionUri: vscode.Uri
  private _disposables: vscode.Disposable[] = []

  public static createOrShow(extensionUri: vscode.Uri) {
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined

    // If we already have a panel, show it.
    if (TranslatePanel.currentPanel) {
      TranslatePanel.currentPanel._panel.reveal(column)
      TranslatePanel.currentPanel._update()
      return
    }

    // Otherwise, create a new panel.
    const panel = vscode.window.createWebviewPanel(
      TranslatePanel.viewType,
      'Cypress Translator',
      column || vscode.ViewColumn.One,
      {
        // Enable javascript in the webview
        enableScripts: true,

        // And restrict the webview to only loading content from our extension's `media` directory.
        localResourceRoots: [
          vscode.Uri.joinPath(extensionUri, 'media'),
          vscode.Uri.joinPath(extensionUri, 'out/compiled'),
        ],
      },
    )

    TranslatePanel.currentPanel = new TranslatePanel(panel, extensionUri)
  }

  public static kill() {
    TranslatePanel.currentPanel?.dispose()
    TranslatePanel.currentPanel = undefined
  }

  public static revive(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    TranslatePanel.currentPanel = new TranslatePanel(panel, extensionUri)
  }

  private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
    this._panel = panel
    this._extensionUri = extensionUri

    // Set the webview's initial html content
    this._update()

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables)
  }

  public dispose() {
    TranslatePanel.currentPanel = undefined

    // Clean up our resources
    this._panel.dispose()

    while (this._disposables.length) {
      const x = this._disposables.pop()
      if (x) {
        x.dispose()
      }
    }
  }

  private async _update() {
    const webview = this._panel.webview

    this._panel.webview.html = this._getHtmlForWebview(webview)
    webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case 'onInfo': {
          if (!data.value) {
            return
          }
          vscode.window.showInformationMessage(data.value)
          break
        }
        case 'onError': {
          if (!data.value) {
            return
          }
          vscode.window.showErrorMessage(data.value)
          break
        }
      }
    })
  }

  private _getCSSForWebView(): string {
    return `
      <style>
                  html {
                    box-sizing: border-box;
                    font-size: 13px;
                  }
                  
                  *,
                  *:before,
                  *:after {
                    box-sizing: inherit;
                  }
                  
                  body,
                  h1,
                  h2,
                  h3,
                  h4,
                  h5,
                  h6,
                  p,
                  ol,
                  ul {
                    margin: 0;
                    padding: 0;
                    font-weight: normal;
                  }
                  
                  img {
                    max-width: 100%;
                    height: auto;
                  }
                  
                  html,
                  body {
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                  }

                  :root {
                    --container-paddding: 20px;
                    --input-padding-vertical: 6px;
                    --input-padding-horizontal: 4px;
                    --input-margin-vertical: 4px;
                    --input-margin-horizontal: 0;
                  }
                  
                  body {
                    /* padding: 0 var(--container-paddding); */
                    color: var(--vscode-foreground);
                    font-size: var(--vscode-font-size);
                    font-weight: var(--vscode-font-weight);
                    font-family: var(--vscode-font-family);
                    background-color: var(--vscode-editor-background);
                  }
                  
                  ol,
                  ul {
                    padding-left: var(--container-paddding);
                  }
                  
                  body > *,
                  form > * {
                    margin-block-start: var(--input-margin-vertical);
                    margin-block-end: var(--input-margin-vertical);
                  }
                  
                  *:focus {
                    outline-color: var(--vscode-focusBorder) !important;
                  }
                  
                  a {
                    color: var(--vscode-textLink-foreground);
                  }
                  
                  a:hover,
                  a:active {
                    color: var(--vscode-textLink-activeForeground);
                  }
                  
                  code {
                    font-size: var(--vscode-editor-font-size);
                    font-family: var(--vscode-editor-font-family);
                    margin: 2rem;
                  }
                  
                  button {
                    border: none;
                    padding: var(--input-padding-vertical) var(--input-padding-horizontal);
                    width: 100%;
                    text-align: center;
                    outline: 1px solid transparent;
                    outline-offset: 2px !important;
                    color: var(--vscode-button-foreground);
                    background: var(--vscode-button-background);
                  }
                  
                  /* span {
                      color: #1e1e1e;
                      color: #d4d4d4;
                      color: #9cdcfe;
                      color: #d19a66;
                      color: #dcdcaa;
                      color: #c586c0;
                      color: #d4d4d4;
                      color: #dcdcaa;
                      color: #b5cea8;
                      color: #ce9178;
                      color: #6a9955;
                      color: #d4d4d4;
                      color: #569cd6;
                    } */
                  
                  button:hover {
                    cursor: pointer;
                    background: var(--vscode-button-hoverBackground);
                  }
                  
                  button:focus {
                    outline-color: var(--vscode-focusBorder);
                  }
                  
                  button.secondary {
                    color: var(--vscode-button-secondaryForeground);
                    background: var(--vscode-button-secondaryBackground);
                  }
                  
                  button.secondary:hover {
                    background: var(--vscode-button-secondaryHoverBackground);
                  }
                  
                  input:not([type='checkbox']),
                  textarea {
                    display: block;
                    width: 100%;
                    border: none;
                    font-family: var(--vscode-font-family);
                    padding: var(--input-padding-vertical) var(--input-padding-horizontal);
                    color: var(--vscode-input-foreground);
                    outline-color: var(--vscode-input-border);
                    background-color: var(--vscode-input-background);
                  }
                  
                  input::placeholder,
                  textarea::placeholder {
                    color: var(--vscode-input-placeholderForeground);
                  }                  
                </style>
            `
  }

  private _translate(input: string): string | undefined {
    const translatedResult = cypressCodemods({ input })
    return translatedResult.output
    // return input.toUpperCase();
  }

  private _handleSubmission() {
    return `
    <script>
        var inputText = document.getElementById('input-text');
        var formEl = document.getElementById('translate-form');
        var codeBlock = document.getElementById('translated-codeblock');

        formEl.addEventListener('submit', (e) => {
            e.preventDefault();
            submit();
        })

        function submit() {
            console.log(inputText.value);
            // var translated = cypressCodemods({ input: inputText.value }).
            // codeBlock.innerHTML = translated.output;
            codeBlock.innerHTML = inputText.value.toUpperCase();
        }
    </script>`
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const css = (): string => this._getCSSForWebView()
    const submission = () => this._handleSubmission()
    const codemods = cypressCodemods
    // const codemods = {};

    return `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${css()}
        </head>
        <body>
            <h1>Translate</h1>
            <form id="translate-form">
                <textarea id="input-text"></textarea>
                <button type="submit">Translate</button>
            </form>
            <code id="translated-codeblock"></code>
        </body>
        <script type="module" src=${codemods}></script>
        ${submission()}
        </html>
    `
  }
}
