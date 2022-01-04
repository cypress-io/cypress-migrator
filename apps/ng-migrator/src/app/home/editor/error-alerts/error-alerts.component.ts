import { Component } from '@angular/core'
import { selectAlerts } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-error-alerts',
  templateUrl: './error-alerts.component.html',
  styleUrls: ['./error-alerts.component.scss'],
})
export class ErrorAlertsComponent {
  alerts$ = this.store.select(selectAlerts)
  constructor(private readonly store: Store) {}
}
