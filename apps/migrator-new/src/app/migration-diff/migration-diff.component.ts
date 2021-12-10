import { Component } from '@angular/core'
import { selectDiffApiItems, selectShouldShowDetails } from '@cypress-dx/migrator/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-migration-diff',
  templateUrl: './migration-diff.component.html',
  styleUrls: ['./migration-diff.component.scss'],
})
export class MigrationDiffComponent {
  showDetails$ = this.store.select(selectShouldShowDetails)
  diffItems$ = this.store.select(selectDiffApiItems)

  constructor(private readonly store: Store) {}
}
