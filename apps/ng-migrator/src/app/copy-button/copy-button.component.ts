import { Component } from '@angular/core'
import { copyMigration } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-copy-button',
  templateUrl: './copy-button.component.html',
  styleUrls: ['./copy-button.component.scss'],
})
export class CopyButtonComponent {
  constructor(private readonly store: Store) {}

  copy(): void {
    this.store.dispatch(copyMigration())
  }
}
