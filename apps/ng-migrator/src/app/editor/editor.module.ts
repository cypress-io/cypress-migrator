import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MonacoEditorModule } from 'ngx-monaco-editor'
import { EditorComponent } from './editor.component'
import { DigDeeperComponent } from './dig-deeper/dig-deeper.component'
import { MigrateButtonComponent } from './migrate-button/migrate-button.component'
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component'

@NgModule({
  declarations: [EditorComponent, DigDeeperComponent, MigrateButtonComponent, DetailsComponent],
  imports: [CommonModule, MonacoEditorModule.forRoot(), FormsModule],
  exports: [EditorComponent],
})
export class EditorModule {}
