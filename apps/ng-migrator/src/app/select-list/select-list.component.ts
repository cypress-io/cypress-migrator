import { Component, OnInit } from '@angular/core'
import { selectAvailableLanguages, selectLanguage } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
})
export class SelectListComponent {
  selectedLanguage$ = this.store.select(selectLanguage)
  availableLanguages$ = this.store.select(selectAvailableLanguages)

  constructor(private readonly store: Store) {}
}
