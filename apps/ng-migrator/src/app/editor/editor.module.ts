import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MonacoEditorModule, NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor'
import { CopyButtonComponent } from './copy-button/copy-button.component'
import { DetailsComponent } from './details/details.component'
import { DiffToggleComponent } from './diff-toggle/diff-toggle.component'
import { DigDeeperComponent } from './dig-deeper/dig-deeper.component'
import { EditorComponent } from './editor.component'
import { MigrateButtonComponent } from './migrate-button/migrate-button.component'
import MonacoConfig from './monaco-config';
import { ErrorAlertsComponent } from './error-alerts/error-alerts.component';
import { NoMigrationsComponent } from './error-alerts/no-migrations/no-migrations.component';
import { BrowserWaitComponent } from './error-alerts/browser-wait/browser-wait.component';
import { XpathComponent } from './error-alerts/xpath/xpath.component'

@NgModule({
  declarations: [
    EditorComponent,
    DigDeeperComponent,
    MigrateButtonComponent,
    DetailsComponent,
    DiffToggleComponent,
    CopyButtonComponent,
    ErrorAlertsComponent,
    NoMigrationsComponent,
    BrowserWaitComponent,
    XpathComponent,
  ],
  imports: [CommonModule, MonacoEditorModule.forRoot(), FormsModule],
  providers: [{ provide: NGX_MONACO_EDITOR_CONFIG, useValue: MonacoConfig }],
  exports: [EditorComponent],
})
export class EditorModule {}
