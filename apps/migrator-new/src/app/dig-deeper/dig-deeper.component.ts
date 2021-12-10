import { Component } from '@angular/core'
import { selectLangauge } from '@cypress-dx/migrator/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-dig-deeper',
  templateUrl: './dig-deeper.component.html',
  styleUrls: ['./dig-deeper.component.scss'],
})
export class DigDeeperComponent {
  selectedLanguage$ = this.store.select(selectLangauge)

  constructor(private readonly store: Store) {}
}
