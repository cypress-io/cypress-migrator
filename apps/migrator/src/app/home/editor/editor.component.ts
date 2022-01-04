/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core'
import { migrate, selectEditorViewModel, selectThemeOptions } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  options$ = this.store.select(selectThemeOptions)
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
