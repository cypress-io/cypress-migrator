import { MigrateResult } from '@cypress-dx/codemods'
import {
  checkIfXPathMigrationMade,
  IErrorAlerts,
  INotifications,
  selectErrorAlert,
  selectNotifications,
  selectSentAddMigrationRequest,
  selectXPathMigrated,
  setCopiedNotification,
  shouldShowDetails,
} from '.'
import reducer, {
  checkIfBrowserWaitMigrationMade,
  checkIfMigrationsHaveNotBeenMade,
  IDiffArrayApiItem,
  IDiffArrayItem,
  IError,
  initialState,
  selectBrowserWaitMigrated,
  selectDiff,
  selectDiffApiItems,
  selectDiffEditorThemeColors,
  selectError,
  selectLanguage,
  selectModified,
  selectNoMigrationsMade,
  selectOriginal,
  sentAddMigrationRequest,
  setDisplayDiff,
  setLanguage,
  migrate,
} from './migratorSlice'

describe('migratorSlice', () => {
  it('should have correct initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should correctly set language in state', () => {
    const nextState = reducer(initialState, setLanguage('protractor'))
    expect(selectLanguage({ migrator: nextState })).toEqual('protractor')
  })

  describe('migrate', () => {
    it('should correctly set modified in state', () => {
      const result: MigrateResult = {
        diff: [],
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = ''
      const nextState = reducer(initialState, migrate({ input, result }))
      const selector = selectModified({ migrator: nextState })
      setTimeout(() => expect(selector).toBe(result.output))
    })

    it('should correctly set original in state', () => {
      const result: MigrateResult = {
        diff: [],
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const nextState = reducer(initialState, migrate({ input, result }))
      setTimeout(() => expect(selectOriginal({ migrator: nextState })).toEqual(input))
    })

    it('should correctly set diff in state and sets noMigrationsMade flag to false when migrations found', () => {
      const diffArray = [
        {
          original: "by.className('this-class')",
          modified: "cy.get('.this-class')",
          api: [
            {
              command: 'get',
              url: 'https://on.cypress.io/get',
            },
          ],
        },
      ]
      const result: MigrateResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const nextState = reducer(initialState, migrate({ input, result }))
      expect(selectDiff({ migrator: nextState })).toEqual(diffArray)
      expect(selectNoMigrationsMade({ migrator: nextState })).toBeFalsy()
    })

    it('should correctly set diff in state and setNoMigrationsMade flag to true when none found', () => {
      const diffArray = [
        {
          original: "by.invalidMigration('this-class')",
          modified: "by.invalidMigration('this-class')",
          api: [],
        },
      ]
      const result: MigrateResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, noMigrationsMade: true }
      const nextState = reducer(initialState, migrate({ input, result }))
      expect(selectDiff({ migrator: nextState })).toEqual(diffArray)
      expect(selectNoMigrationsMade({ migrator: nextState })).toBeTruthy()
      expect(selectErrorAlert({ migrator: nextState })).toEqual(alerts)
    })

    it('should show the Details section given state has diffAPIItems', () => {
      // arrange
      const diffArrays: IDiffArrayItem[] = [
        {
          original: 'test',
          modified: 'test',
          api: [
            {
              url: 'https://docs.cypress.io',
              command: 'get',
            },
          ],
        },
      ]

      // act
      const nextState = reducer(initialState, migrate({ result: { diff: diffArrays, output: 'test' }, input: 'test' }))

      // assert
      expect(shouldShowDetails({ migrator: nextState })).toBeTruthy()
    })

    it('should show the Details section given state has an alert flag', () => {
      // arrange
      const alerts: IErrorAlerts = {
        browserWaitMigrated: true,
        noMigrationsMade: false,
        xPath: false,
      }

      // act
      const nextState = { ...initialState, alerts }

      // assert
      expect(shouldShowDetails({ migrator: nextState })).toBeTruthy()
    })

    it('should show the Details section given state has an error', () => {
      // arrange
      const error: IError = { level: 'warning', message: 'Real Bad Error' }

      // act
      const nextState = { ...initialState, error }

      // assert
      expect(shouldShowDetails({ migrator: nextState })).toBeTruthy()
    })

    it('should NOT show the Details section if no error, alert or diffAPIItems in state', () => {
      // arrange
      // act
      // assert
      expect(shouldShowDetails({ migrator: initialState })).toBeFalsy()
    })

    it('should correctly set the browserWaitMigrated alert flag to true when one found in diff', () => {
      const diffArray = [
        {
          original: 'browser.wait(1000)',
          modified: 'cy.wait(1000)',
          api: [
            {
              command: 'wait',
              url: '',
            },
          ],
        },
      ]
      const result: MigrateResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, browserWaitMigrated: true }
      const nextState = reducer(initialState, migrate({ input, result }))
      expect(selectDiff({ migrator: nextState })).toEqual(diffArray)
      expect(selectBrowserWaitMigrated({ migrator: nextState })).toBeTruthy()
      expect(selectErrorAlert({ migrator: nextState })).toEqual(alerts)
    })

    it('should correctly set the browserWaitMigrated alert flag to false when none found in diff', () => {
      const diffArray = [
        {
          original: "by.invalidMigration('this-class')",
          modified: "cy.get('this-class')",
          api: [
            {
              command: 'get',
              url: '',
            },
          ],
        },
      ]
      const result: MigrateResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, browserWaitMigrated: false }
      const nextState = reducer(initialState, migrate({ input, result }))
      expect(selectDiff({ migrator: nextState })).toEqual(diffArray)
      expect(selectBrowserWaitMigrated({ migrator: nextState })).toBeFalsy()
      expect(selectErrorAlert({ migrator: nextState })).toEqual(alerts)
    })

    it('should correcly set the xpath alert flag to true when one found in diff', () => {
      const diffArray = [
        {
          original: "by.xpath('test')",
          modified: "cy.xpath('test')",
          api: [
            {
              command: 'xpath',
              url: '',
            },
          ],
        },
      ]
      const result: MigrateResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, xPath: true }
      const nextState = reducer(initialState, migrate({ input, result }))
      expect(selectDiff({ migrator: nextState })).toEqual(diffArray)
      expect(selectXPathMigrated({ migrator: nextState })).toBeTruthy()
      expect(selectErrorAlert({ migrator: nextState })).toEqual(alerts)
    })

    it('should correctly set the xpath alert flag to false when none found in diff', () => {
      const diffArray = [
        {
          original: "by.invalidMigration('this-class')",
          modified: "cy.get('this-class')",
          api: [
            {
              command: 'get',
              url: '',
            },
          ],
        },
      ]
      const result: MigrateResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, xPath: false }
      const nextState = reducer(initialState, migrate({ input, result }))
      expect(selectDiff({ migrator: nextState })).toEqual(diffArray)
      expect(selectXPathMigrated({ migrator: nextState })).toBeFalsy()
      expect(selectErrorAlert({ migrator: nextState })).toEqual(alerts)
    })

    it('should correctly set error in state', () => {
      const error: IError = {
        message: 'This is an error.',
        level: 'info',
      }
      const result: MigrateResult = {
        diff: [],
        output: 'cy.wait(2000)',
        error,
      }
      const input = "by.className('this-class')"
      const nextState = reducer(initialState, migrate({ input, result }))
      expect(selectError({ migrator: nextState })).toEqual(error)
    })

    it('correctly clears alerts when none returned in response', () => {
      const result: MigrateResult = {
        diff: [],
        output: 'cy.wait(2000)',
        error: undefined,
      }
      const input = "by.className('this-class')"
      const nextState = reducer(initialState, migrate({ input, result }))
      expect(selectError({ migrator: nextState })).toBeUndefined()
    })

    it('should correctly get the list of diffArray Api items', () => {
      // arrange
      const apiItem1: IDiffArrayApiItem = { command: 'get', url: 'www.cypress.io' }
      const apiItem2: IDiffArrayApiItem = { command: 'visit', url: 'www.cypress.io' }
      const diffArray: IDiffArrayItem[] = [
        { original: 'old', modified: 'new', api: [] },
        { original: 'old', modified: 'new', api: [apiItem1, apiItem2] },
        { original: 'old', modified: 'new', api: [apiItem2] },
      ]
      const expected = [apiItem1, apiItem2]
      const result: MigrateResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"

      // act
      const nextState = reducer(initialState, migrate({ input, result }))

      // assert
      expect(selectDiffApiItems({ migrator: nextState })).toEqual(expected)
    })

    it('should filter out all duplicates of the diffArray Api Items', () => {
      // arrange
      const apiItem1: IDiffArrayApiItem = { command: 'get', url: 'www.cypress.io' }
      const apiItem2: IDiffArrayApiItem = { command: 'visit', url: 'www.cypress.io' }
      const diffArray: IDiffArrayItem[] = [
        { original: 'oldLine1', modified: 'newLine1', api: [apiItem1] },
        { original: 'oldLine2', modified: 'newLine2', api: [apiItem2] },
        { original: 'oldLine3', modified: 'newLIne3', api: [apiItem1, apiItem2] },
      ]
      const expected = [apiItem1, apiItem2]
      const result: MigrateResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"

      // act
      const nextState = reducer(initialState, migrate({ input, result }))

      // assert
      expect(selectDiffApiItems({ migrator: nextState })).toEqual(expected)
    })
  })

  it('should correctly set the copied flag in state', () => {
    const notifications: INotifications = { ...initialState.notifications, copied: true }
    const nextState = reducer(initialState, setCopiedNotification(true))
    expect(selectNotifications({ migrator: nextState })).toEqual(notifications)
  })

  it('should correctly set the sentAddMigrationRequest flag in state', () => {
    const nextState = reducer(initialState, sentAddMigrationRequest(true))
    expect(selectSentAddMigrationRequest({ migrator: nextState })).toEqual(true)
  })

  it('should correctly get the DiffEditorThemeColors when displayDiff is true', () => {
    // arrange
    const expected = {
      'editor.background': '#fff',
      'editor.lineHighlightBackground': '#e1e3ed',
      'scrollbarSlider.background': '#c2f1de',
      'scrollbarSlider.hoverBackground': '#a3e7cb',
      'editorLineNumber.foreground': '#747994',
      'editorLineNumber.activeForeground': '#747994',
      'diffEditor.insertedTextBackground': '#a3e7cb70',
      'diffEditor.removedTextBackground': '#f8c4cd70',
    }
    // act
    const nextState = reducer(initialState, setDisplayDiff(true))

    // assert
    expect(selectDiffEditorThemeColors({ migrator: nextState })).toEqual(expected)
  })

  it('should correctly get the DiffEditorThemeColors when displayDiff is false', () => {
    // arrange
    const expected = {
      'editor.background': '#fff',
      'scrollbarSlider.background': '#c2f1de',
      'scrollbarSlider.hoverBackground': '#a3e7cb',
      'editorLineNumber.foreground': '#747994',
      'editorLineNumber.activeForeground': '#747994',
      'diffEditor.insertedTextBackground': '#ffffff70',
      'diffEditor.removedTextBackground': '#ffffff70',
      'editor.lineHighlightBackground': '#e1e3ed',
    }
    // act
    const nextState = reducer(initialState, setDisplayDiff(false))

    // assert
    expect(selectDiffEditorThemeColors({ migrator: nextState })).toEqual(expected)
  })

  describe('checkIfMigrationsHaveNotBeenMade', () => {
    it('returns false given diffArray items are not the same', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [
        {
          original: 'browser.driver.get()',
          modified: 'cy.visit()',
          api: [{ command: 'visit', url: 'https://on.cypress.io/visit' }],
        },
      ]

      // act
      const actual = checkIfMigrationsHaveNotBeenMade(diffArray)

      // assert
      expect(actual).toBeFalsy()
    })

    it('returns true given diffArray has an empty api array', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [{ original: 'test()', modified: 'test()', api: [] }]

      // act
      const actual = checkIfMigrationsHaveNotBeenMade(diffArray)

      // assert
      expect(actual).toBeTruthy()
    })
  })

  describe('checkIfBrowserWaitMigrationMade', () => {
    it('returns true if diffArray includes an API item for browser.wait', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [
        {
          original: 'browser.wait(1000)',
          modified: 'cy.wait(1000)',
          api: [{ command: 'wait', url: 'https://on.cypress.io/wait' }],
        },
      ]

      // act
      const actual = checkIfBrowserWaitMigrationMade(diffArray)

      // assert
      expect(actual).toBeTruthy()
    })

    it('returns false if diffArray does NOT include an API item for browser.wait', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [
        {
          original: 'browser.driver.get()',
          modified: 'cy.visit()',
          api: [{ command: 'visit', url: 'https://on.cypress.io/visit' }],
        },
      ]

      // act
      const actual = checkIfBrowserWaitMigrationMade(diffArray)

      // assert
      expect(actual).toBeFalsy()
    })
  })

  describe('checkIfXPathMigrationMade', () => {
    it('returns true if diffArray includes an API item with a command of xpath', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [
        {
          original: "by.xpath('test')",
          modified: "cy.xpath('test')",
          api: [{ command: 'xpath', url: 'https://on.cypress.io/xpath' }],
        },
      ]

      // act
      const actual = checkIfXPathMigrationMade(diffArray)

      // assert
      expect(actual).toBeTruthy()
    })
    it('returns false if diffArray does NOT include an API item with a command of xpath', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [
        {
          original: 'browser.wait(1000)',
          modified: 'cy.wait(1000)',
          api: [{ command: 'wait', url: 'https://on.cypress.io/wait' }],
        },
      ]

      // act
      const actual = checkIfXPathMigrationMade(diffArray)

      // assert
      expect(actual).toBeFalsy()
    })
  })
})
