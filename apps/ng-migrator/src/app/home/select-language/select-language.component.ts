import { Component } from '@angular/core'
import { AvailableLanguage, selectAvailableLanguages, selectLanguage, setLanguage } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss'],
})
export class SelectLanguageComponent {
  selectedLanguage$ = this.store.select(selectLanguage)
  availableLanguages$ = this.store.select(selectAvailableLanguages)

  constructor(private readonly store: Store) {}

  updateLanguage(event): void {
    console.log(event.target['value'])
    this.store.dispatch(setLanguage({ language: event.target.value as AvailableLanguage }))
  }
}
