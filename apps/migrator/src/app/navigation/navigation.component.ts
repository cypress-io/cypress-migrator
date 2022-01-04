import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectLanguage } from '@cypress-dx/migrator-state'

@Component({
  selector: 'cypress-dx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  migrationGuides = {
    protractor: { url: 'https://on.cypress.io/protractor-to-cypress' },
  }
  navLinks = [{ title: 'Cypress Docs', url: 'https://on.cypress.io/docs' }]

  selectedLanguage$ = this.store.select(selectLanguage)

  constructor(private readonly store: Store) {}
}
