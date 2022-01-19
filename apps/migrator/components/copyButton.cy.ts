import React from 'react'
import { mount } from '@cypress/react'
import CopyButton from './copyButton'

it('Renders page component', () => {
  mount(<CopyButton />)
  cy.contains('Copy')
})
