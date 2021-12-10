import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MigratorEditorModule } from '@cypress-dx/migrator/migrator-editor'
import { MigratorStateModule } from '@cypress-dx/migrator/migrator-state'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { SelectListComponent } from './select-list/select-list.component';
import { LanguagePillsComponent } from './language-pills/language-pills.component';
import { DiffToggleComponent } from './diff-toggle/diff-toggle.component';
import { CopyButtonComponent } from './copy-button/copy-button.component';
import { DigDeeperComponent } from './dig-deeper/dig-deeper.component';
import { MigrateButtonComponent } from './migrate-button/migrate-button.component';
import { MigrationDiffComponent } from './migration-diff/migration-diff.component';
import { FooterComponent } from './footer/footer.component'

@NgModule({
  declarations: [AppComponent, NavigationComponent, SelectListComponent, LanguagePillsComponent, DiffToggleComponent, CopyButtonComponent, DigDeeperComponent, MigrateButtonComponent, MigrationDiffComponent, FooterComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    MigratorEditorModule,
    MigratorStateModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
