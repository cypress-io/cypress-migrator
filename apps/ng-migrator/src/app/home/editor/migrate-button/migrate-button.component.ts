import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'cypress-dx-migrate-button',
  templateUrl: './migrate-button.component.html',
  styleUrls: ['./migrate-button.component.scss'],
})
export class MigrateButtonComponent {
  @Output() migrate = new EventEmitter()
}
