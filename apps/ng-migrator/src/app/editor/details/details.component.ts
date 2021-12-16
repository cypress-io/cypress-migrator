import { Component } from '@angular/core'
import { selectDiffApiItems, selectShouldShowDetails } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  showDetails$ = this.store.select(selectShouldShowDetails)
  diffItems$ = this.store.select(selectDiffApiItems)

  constructor(private readonly store: Store) {}
}
