import { TransformResult } from '@cypress-dx/codemods'
import {
  checkIfXPathTranslationMade,
  IErrorAlerts,
  INotifications,
  selectErrorAlert,
  selectNotifications,
  selectXPathTranslated,
  setCopiedNotification,
} from '.'
import reducer, {
  checkIfBrowserWaitTranslationMade,
  checkIfTranslationsHaveNotBeenMade,
  IDiffArrayApiItem,
  IDiffArrayItem,
  IError,
  initialState,
  selectBrowserWaitTranslated,
  selectDiff,
  selectDiffApiItems,
  selectDiffEditorThemeColors,
  selectError,
  selectLanguage,
  selectModified,
  selectNoTranslationsMade,
  selectOriginal,
  setDisplayDiff,
  setLanguage,
  translate,
} from './translatorSlice'

describe('translatorSlice', () => {
  it('should have correct initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should correctly set language in state', () => {
    const nextState = reducer(initialState, setLanguage('protractor'))
    expect(selectLanguage({ translator: nextState })).toEqual('protractor')
  })

  describe('translate', () => {
    it('should correctly set modified in state', () => {
      const result: TransformResult = {
        diff: [],
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = ''
      const nextState = reducer(initialState, translate({ input, result }))
      const selector = selectModified({ translator: nextState })
      setTimeout(() => expect(selector).toBe(result.output))
    })

    it('should correctly set original in state', () => {
      const result: TransformResult = {
        diff: [],
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const nextState = reducer(initialState, translate({ input, result }))
      setTimeout(() => expect(selectOriginal({ translator: nextState })).toEqual(input))
    })

    it('should correctly set diff in state and sets noTranslationsMade flag to false when translations found', () => {
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
      const result: TransformResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const nextState = reducer(initialState, translate({ input, result }))
      expect(selectDiff({ translator: nextState })).toEqual(diffArray)
      expect(selectNoTranslationsMade({ translator: nextState })).toBeFalsy()
    })

    it('should correctly set diff in state and setNoTranslationsMade flag to true when none found', () => {
      const diffArray = [
        {
          original: "by.invalidTranslation('this-class')",
          modified: "by.invalidTranslation('this-class')",
          api: [],
        },
      ]
      const result: TransformResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, noTranslationsMade: true }
      const nextState = reducer(initialState, translate({ input, result }))
      expect(selectDiff({ translator: nextState })).toEqual(diffArray)
      expect(selectNoTranslationsMade({ translator: nextState })).toBeTruthy()
      expect(selectErrorAlert({ translator: nextState })).toEqual(alerts)
    })

    it('should correctly set the browserWaitTranslated alert flag to true when one found in diff', () => {
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
      const result: TransformResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, browserWaitTranslated: true }
      const nextState = reducer(initialState, translate({ input, result }))
      expect(selectDiff({ translator: nextState })).toEqual(diffArray)
      expect(selectBrowserWaitTranslated({ translator: nextState })).toBeTruthy()
      expect(selectErrorAlert({ translator: nextState })).toEqual(alerts)
    })

    it('should correctly set the browserWaitTranslated alert flag to false when none found in diff', () => {
      const diffArray = [
        {
          original: "by.invalidTranslation('this-class')",
          modified: "cy.get('this-class')",
          api: [
            {
              command: 'get',
              url: '',
            },
          ],
        },
      ]
      const result: TransformResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, browserWaitTranslated: false }
      const nextState = reducer(initialState, translate({ input, result }))
      expect(selectDiff({ translator: nextState })).toEqual(diffArray)
      expect(selectBrowserWaitTranslated({ translator: nextState })).toBeFalsy()
      expect(selectErrorAlert({ translator: nextState })).toEqual(alerts)
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
      const result: TransformResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, xPath: true }
      const nextState = reducer(initialState, translate({ input, result }))
      expect(selectDiff({ translator: nextState })).toEqual(diffArray)
      expect(selectXPathTranslated({ translator: nextState })).toBeTruthy()
      expect(selectErrorAlert({ translator: nextState })).toEqual(alerts)
    })

    it('should correctly set the xpath alert flag to false when none found in diff', () => {
      const diffArray = [
        {
          original: "by.invalidTranslation('this-class')",
          modified: "cy.get('this-class')",
          api: [
            {
              command: 'get',
              url: '',
            },
          ],
        },
      ]
      const result: TransformResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"
      const alerts: IErrorAlerts = { ...initialState.alerts, xPath: false }
      const nextState = reducer(initialState, translate({ input, result }))
      expect(selectDiff({ translator: nextState })).toEqual(diffArray)
      expect(selectXPathTranslated({ translator: nextState })).toBeFalsy()
      expect(selectErrorAlert({ translator: nextState })).toEqual(alerts)
    })

    it('should correctly set error in state', () => {
      const error: IError = {
        message: 'This is an error.',
        level: 'info',
      }
      const result: TransformResult = {
        diff: [],
        output: 'cy.wait(2000)',
        error,
      }
      const input = "by.className('this-class')"
      const nextState = reducer(initialState, translate({ input, result }))
      expect(selectError({ translator: nextState })).toEqual(error)
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
      const result: TransformResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"

      // act
      const nextState = reducer(initialState, translate({ input, result }))

      // assert
      expect(selectDiffApiItems({ translator: nextState })).toEqual(expected)
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
      const result: TransformResult = {
        diff: diffArray,
        output: 'cy.wait(2000)',
        error: null,
      }
      const input = "by.className('this-class')"

      // act
      const nextState = reducer(initialState, translate({ input, result }))

      // assert
      expect(selectDiffApiItems({ translator: nextState })).toEqual(expected)
    })
  })

  it('should correctly set the copied flag in state', () => {
    const notifications: INotifications = { ...initialState.notifications, copied: true }
    const nextState = reducer(initialState, setCopiedNotification(true))
    expect(selectNotifications({ translator: nextState })).toEqual(notifications)
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
    expect(selectDiffEditorThemeColors({ translator: nextState })).toEqual(expected)
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
    expect(selectDiffEditorThemeColors({ translator: nextState })).toEqual(expected)
  })

  describe('checkIfTranslationsHaveNotBeenMade', () => {
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
      const actual = checkIfTranslationsHaveNotBeenMade(diffArray)

      // assert
      expect(actual).toBeFalsy()
    })

    it('returns true given diffArray has an empty api array', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [{ original: 'test()', modified: 'test()', api: [] }]

      // act
      const actual = checkIfTranslationsHaveNotBeenMade(diffArray)

      // assert
      expect(actual).toBeTruthy()
    })
  })

  describe('checkIfBrowserWaitTranslationMade', () => {
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
      const actual = checkIfBrowserWaitTranslationMade(diffArray)

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
      const actual = checkIfBrowserWaitTranslationMade(diffArray)

      // assert
      expect(actual).toBeFalsy()
    })
  })

  describe('checkIfXPathTranslationMade', () => {
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
      const actual = checkIfXPathTranslationMade(diffArray)

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
      const actual = checkIfXPathTranslationMade(diffArray)

      // assert
      expect(actual).toBeFalsy()
    })
  })
})
