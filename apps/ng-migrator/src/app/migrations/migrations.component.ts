import { Component } from '@angular/core'
import { selectLanguage } from '@cypress-dx/migrator-state'
import { Store } from '@ngrx/store'

@Component({
  selector: 'cypress-dx-migrations',
  templateUrl: './migrations.component.html',
  styleUrls: ['./migrations.component.scss'],
})
export class MigrationsComponent {
  selectedLanguage$ = this.store.select(selectLanguage)

  constructor(private readonly store: Store) {}
}
