export type AvailableLanguage = 'protractor'

export const defaultText = {
  protractor: `describe('Cypress Docs', () => {
    it('should show the correct site title and redirect url', () => {
      browser.driver.get('https://docs.cypress.io/');
      expect(browser.getTitle()).toEqual('Why Cypress? | Cypress Documentation');
      expect(browser.getCurrentUrl()).toEqual('https://docs.cypress.io/guides/overview/why-cypress');
    });
  });`,
}

export interface MigrateResult {
  output: string | undefined
  diff: DiffArrayItem[]
  error?: {
    message: string
    level: 'warning' | 'error' | 'info'
  }
}

export interface DiffArrayApiItem {
  command: string
  url: string
}

export interface DiffArrayItem {
  original: string
  modified: string
  api?: DiffArrayApiItem[]
}

export interface CodemodError {
  message: string
  level: 'warning' | 'error' | 'info'
}

export interface Notifications {
  copied: boolean
  sentAddMigrationRequest: boolean
}

export interface ErrorAlerts {
  noMigrationsMade: boolean
  browserWaitMigrated: boolean
  xPathFound: boolean
}
