import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { MigratorStateModule } from '@cypress-dx/migrator-state'

import { AppComponent } from './app.component'
import { EditorModule } from './editor/editor.module';
import { NavigationComponent } from './navigation/navigation.component'

@NgModule({
  declarations: [AppComponent, NavigationComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabledBlocking' }),
    MigratorStateModule,
    EditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
