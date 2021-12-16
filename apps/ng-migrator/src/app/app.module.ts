import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'
import { MigratorStateModule } from '@cypress-dx/migrator-state'

import { AppComponent } from './app.component'
import { EditorModule } from './editor/editor.module'
import { NavigationComponent } from './navigation/navigation.component'
import { FooterComponent } from './footer/footer.component'
import { LanguagePillsComponent } from './language-pills/language-pills.component'
import { SelectListComponent } from './select-list/select-list.component';
import { NotificationComponent } from './notification/notification.component'

@NgModule({
  declarations: [AppComponent, NavigationComponent, FooterComponent, LanguagePillsComponent, SelectListComponent, NotificationComponent],
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
