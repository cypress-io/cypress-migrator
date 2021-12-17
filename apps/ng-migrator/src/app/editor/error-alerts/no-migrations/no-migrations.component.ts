import { Component } from '@angular/core'
import { addMigration } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-no-migrations',
  templateUrl: './no-migrations.component.html',
  styleUrls: ['./no-migrations.component.scss'],
})
export class NoMigrationsComponent {
  constructor(private readonly store: Store) {}

  addMigration(): void {
    this.store.dispatch(addMigration())
  }
}
