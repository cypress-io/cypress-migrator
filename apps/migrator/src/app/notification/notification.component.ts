import { Component } from '@angular/core'
import { selectNotification, turnOffNotification } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  notification$ = this.store.select(selectNotification)

  constructor(private readonly store: Store) {}

  close(): void {
    this.store.dispatch(turnOffNotification())
  }
}
