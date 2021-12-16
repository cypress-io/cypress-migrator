import { Component } from '@angular/core'
import { migrate, selectEditorViewModel } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
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

  editorVM$ = this.store.select(selectEditorViewModel)
  editor: any

  constructor(private readonly store: Store) {}

  initEditor(editor: any): void {
    this.editor = editor.getOriginalEditor()
  }

  triggerMigration(): void {
    this.store.dispatch(migrate({ input: this.editor.getValue() }))
  }
}
