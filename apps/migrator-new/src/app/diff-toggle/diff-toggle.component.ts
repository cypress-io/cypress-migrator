import { Component } from '@angular/core'
import { selectDisplayDiff, toggleDisplayDiff } from '@cypress-dx/migrator/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-diff-toggle',
  templateUrl: './diff-toggle.component.html',
  styleUrls: ['./diff-toggle.component.scss'],
})
export class DiffToggleComponent {
  diffToggle$ = this.store.select(selectDisplayDiff)

  constructor(private readonly store: Store) {}

  toggle(): void {
    console.log('toggle')
    this.store.dispatch(toggleDisplayDiff())
  }
}
