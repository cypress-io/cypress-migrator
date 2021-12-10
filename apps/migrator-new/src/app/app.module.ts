import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { MigratorStateModule } from '@cypress-dx/migrator-state'
import { MonacoEditorModule } from 'ngx-monaco-editor'
import { AppComponent } from './app.component'
import { CopyButtonComponent } from './copy-button/copy-button.component'
import { DiffToggleComponent } from './diff-toggle/diff-toggle.component'
import { DigDeeperComponent } from './dig-deeper/dig-deeper.component'
import { FooterComponent } from './footer/footer.component'
import { LanguagePillsComponent } from './language-pills/language-pills.component'
import { MigrateButtonComponent } from './migrate-button/migrate-button.component'
import { MigrationDiffComponent } from './migration-diff/migration-diff.component'
import { NavigationComponent } from './navigation/navigation.component'
import { SelectListComponent } from './select-list/select-list.component';
import { MigrationEditorComponent } from './migration-editor/migration-editor.component'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SelectListComponent,
    LanguagePillsComponent,
    DiffToggleComponent,
    CopyButtonComponent,
    DigDeeperComponent,
    MigrateButtonComponent,
    MigrationDiffComponent,
    FooterComponent,
    MigrationEditorComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    MigratorStateModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
