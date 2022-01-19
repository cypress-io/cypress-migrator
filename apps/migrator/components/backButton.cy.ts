import { mount } from '@cypress/react'
import BackButton from './backButton'

it('Renders page component', () => {
  mount(<BackButton />)
  cy.get('button').contains('Back to Migrator')
})
