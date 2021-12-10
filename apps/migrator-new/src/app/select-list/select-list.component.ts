import { Component } from '@angular/core'
import { selectAvailableLanguages, selectLangauge } from '@cypress-dx/migrator/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
})
export class SelectListComponent {
  selectedLanguage$ = this.store.select(selectLangauge)
  availableLanguages$ = this.store.select(selectAvailableLanguages)

  constructor(private readonly store: Store) {}
}
