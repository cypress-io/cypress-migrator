import { Component } from '@angular/core'
import { migrate } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'
import { DiffEditorModel } from 'ngx-monaco-editor'

@Component({
  selector: 'cypress-dx-migration-editor',
  templateUrl: './migration-editor.component.html',
  styleUrls: ['./migration-editor.component.scss'],
})
export class MigrationEditorComponent {
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

  constructor(private readonly store: Store) {}

  triggerMigration(): void {
    this.store.dispatch(migrate({ input: '' }))
  }
}
