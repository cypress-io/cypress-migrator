import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor'
import { DetailsComponent } from './details/details.component'
import { DigDeeperComponent } from './dig-deeper/dig-deeper.component'
import { EditorComponent } from './editor.component'
import { MigrateButtonComponent } from './migrate-button/migrate-button.component'
import MonacoConfig from './monaco-config'

@NgModule({
  declarations: [EditorComponent, DigDeeperComponent, MigrateButtonComponent, DetailsComponent],
  imports: [CommonModule, MonacoEditorModule.forRoot(), FormsModule],
  providers: [{ provide: NGX_MONACO_EDITOR_CONFIG, useValue: MonacoConfig }],
  exports: [EditorComponent],
})
export class EditorModule {}
