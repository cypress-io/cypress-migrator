import { Component } from '@angular/core'
import { selectLangauge } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-language-pills',
  templateUrl: './language-pills.component.html',
  styleUrls: ['./language-pills.component.scss'],
})
export class LanguagePillsComponent {
  selectedLanguage$ = this.store.select(selectLangauge)
  constructor(private readonly store: Store) {}
}
