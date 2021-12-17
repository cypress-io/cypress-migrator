import { Component } from '@angular/core'
import { selectShouldShowDetails, selectUniqueDiffApiItems } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  showDetails$ = this.store.select(selectShouldShowDetails)
  diffItems$ = this.store.select(selectUniqueDiffApiItems)

  constructor(private readonly store: Store) {}
}
