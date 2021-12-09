import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MigratorEditorModule } from '@cypress-dx/migrator/migrator-editor'
import { MigratorStateModule } from '@cypress-dx/migrator/migrator-state'

import { AppComponent } from './app.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [AppComponent],
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
