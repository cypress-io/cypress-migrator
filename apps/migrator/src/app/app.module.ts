import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { MigratorStateModule } from '@cypress-dx/migrator-state'
import { AppComponent } from './app.component'
import { FooterComponent } from './footer/footer.component'
import { HomeModule } from './home/home.module'
import { NavigationComponent } from './navigation/navigation.component'
import { NotificationComponent } from './notification/notification.component'

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'migrations',
    loadChildren: () => import('./migrations/migrations.module').then((m) => m.MigrationsModule),
  },
]
@NgModule({
  declarations: [AppComponent, NavigationComponent, FooterComponent, NotificationComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), MigratorStateModule, HomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
