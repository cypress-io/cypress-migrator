import { commands, ExtensionContext } from 'vscode';
import { TranslatePanel } from './TranslatePanel';

// On activation
export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand('cypress.translate', () => {
      TranslatePanel.createOrShow(context.extensionUri);
    })
  )
}
