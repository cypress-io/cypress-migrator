import { Component } from '@angular/core'
@Component({
  selector: 'cypress-dx-migration-table',
  templateUrl: './migration-table.component.html',
  styleUrls: ['./migration-table.component.scss'],
})
export class MigrationTableComponent {
  assets: string[] = [
    '/assets/assertions.md',
    '/assets/browser-methods.md',
    '/assets/interactions.md',
    '/assets/selectors.md',
  ]
}
