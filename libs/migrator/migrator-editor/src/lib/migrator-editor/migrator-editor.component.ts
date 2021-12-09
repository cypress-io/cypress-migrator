import { Component } from '@angular/core'
import { DiffEditorModel } from 'ngx-monaco-editor'

@Component({
  selector: 'cypress-dx-migrator-editor',
  templateUrl: './migrator-editor.component.html',
  styleUrls: ['./migrator-editor.component.css'],
})
export class MigratorEditorComponent {
  options = {
    theme: 'vs-light',
    language: 'javascript',
    lineNumbers: 'on',
    originalEditable: true,
    fontSize: 14,
    codeLens: true,
    wordWrap: 'on',
    scrollbar: {
      vertical: 'hidden',
    },
    colorDecorators: false,
    minimap: { enabled: false },
    renderIndicators: false,
    renderLineHighlight: 'none',
    renderOverviewRuler: false,
    readOnly: true,
    overviewRulerLanes: 0,
  }

  originalModel: DiffEditorModel = {
    code: `describe('Cypress Docs', () => {
      it('should show the correct site title and redirect url', () => {
        browser.driver.get('https://docs.cypress.io/');
        expect(browser.getTitle()).toEqual('Why Cypress? | Cypress Documentation');
        expect(browser.getCurrentUrl()).toEqual('https://docs.cypress.io/guides/overview/why-cypress');
      });
    });`,
    language: 'javascript',
  }

  modifiedModel: DiffEditorModel = {
    code: '',
    language: 'javascript',
  }
}
