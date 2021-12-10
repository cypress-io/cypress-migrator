import { Component } from '@angular/core'
import { migrate } from '@cypress-dx/migrator/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-migrate-button',
  templateUrl: './migrate-button.component.html',
  styleUrls: ['./migrate-button.component.scss'],
})
export class MigrateButtonComponent {
  constructor(private readonly store: Store) {}

  triggerMigration(): void {
    this.store.dispatch(migrate({ input: '' }))
  }
}
