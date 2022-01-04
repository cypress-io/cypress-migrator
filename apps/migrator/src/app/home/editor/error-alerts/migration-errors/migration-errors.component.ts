import { Component } from '@angular/core'
import { selectMigrationError } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-migration-errors',
  templateUrl: './migration-errors.component.html',
  styleUrls: ['./migration-errors.component.scss'],
})
export class MigrationErrorsComponent {
  error$ = this.store.select(selectMigrationError)

  constructor(private readonly store: Store) {}
}
