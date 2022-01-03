import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { EditorModule } from './editor/editor.module'
import { HomeComponent } from './home.component'
import { LanguagePillsComponent } from './language-pills/language-pills.component'
import { SelectLanguageComponent } from './select-language/select-language.component'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
]

@NgModule({
  declarations: [HomeComponent, LanguagePillsComponent, SelectLanguageComponent],
  imports: [CommonModule, EditorModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeModule {}
