import { commands, ExtensionContext, window } from 'vscode';

// On activation
export function activate(context: ExtensionContext) {
  // Register command cypress.translateCode
  commands.registerCommand('cypress.translateCode', () => {
    window.showInformationMessage('Hello there!');
  })
}
