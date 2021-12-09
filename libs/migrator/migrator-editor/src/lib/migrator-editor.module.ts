import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MigratorEditorComponent } from './migrator-editor'
import { MonacoEditorModule } from 'ngx-monaco-editor'
import { FormsModule } from '@angular/forms'

@NgModule({
  imports: [CommonModule, MonacoEditorModule.forRoot(), FormsModule],
  declarations: [MigratorEditorComponent],
  exports: [MigratorEditorComponent],
})
export class MigratorEditorModule {}
