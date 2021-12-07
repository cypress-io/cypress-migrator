import { commands, ExtensionContext, window } from 'vscode'

// On activation
export function activate(context: ExtensionContext) {
  // Register command cypress.migrateCode
  commands.registerCommand('cypress.migrateCode', () => {
    window.showInformationMessage('Hello there!')
  })
}
