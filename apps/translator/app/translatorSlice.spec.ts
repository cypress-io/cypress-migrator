import { isJsxText } from 'typescript'
import { checkIfBrowserWaitTranslationMade, checkIfTranslationsHaveBeenMade, IDiffArrayItem, selectBrowserWaitTranslated, selectNoTranslationsMade } from '.'
import reducer, {
  IError,
  initialState,
  setDiff,
  setError,
  setLanguage,
  setModified,
  setOriginal,
  selectDiff,
  selectError,
  selectLanguage,
  selectModified,
  selectOriginal,
} from './translatorSlice'

describe('translatorSlice', () => {
  it('should have correct initial state', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should correctly set language in state', () => {
    const nextState = reducer(initialState, setLanguage('Protractor'))
    expect(selectLanguage({ translator: nextState })).toEqual('Protractor')
  })

  it('should correctly set modified in state', () => {
    const nextState = reducer(initialState, setModified("cy.get('.this-class')"))
    expect(selectModified({ translator: nextState })).toEqual("cy.get('.this-class')")
  })

  it('should correctly set original in state', () => {
    const nextState = reducer(initialState, setOriginal("by.className('this-class')"))
    expect(selectOriginal({ translator: nextState })).toEqual("by.className('this-class')")
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
    const nextState = reducer(initialState, setDiff(diffArray))
    expect(selectDiff({ translator: nextState })).toEqual(diffArray)
    expect(selectNoTranslationsMade({ translator: nextState })).toBeFalsy();
  })

  it('should correctly set diff in state and setNoTranslationsMade flag to true when none found', () => {
    const diffArray = [
      {
        original: "by.invalidTranslation('this-class')",
        modified: "by.invalidTranslation('this-class')",
        api: [],
      }
    ];
    const nextState = reducer(initialState, setDiff(diffArray));
    expect(selectDiff({ translator: nextState })).toEqual(diffArray);
    expect(selectNoTranslationsMade({ translator: nextState })).toBeTruthy()
  });

  it('should correctly set the browserWaitTranslated notifications flag to true when one found in diff', () => {
    const diffArray = [
     {
      original: "browser.wait(1000)",
      modified: "cy.wait(1000)",
      api: [
        {
          command: 'wait',
          url: ''
        }
      ],
     }
    ];
    const nextState = reducer(initialState, setDiff(diffArray));
    expect(selectDiff({ translator: nextState })).toEqual(diffArray);
    expect(selectBrowserWaitTranslated({ translator: nextState })).toBeTruthy()
  })

  it('should correctly set the browserWaitTranslated notifications flag to false when none found in diff', () => {
    const diffArray = [
     {
      original: "by.invalidTranslation('this-class')",
      modified: "cy.get('this-class')",
      api: [
        {
          command: 'get',
          url: ''
        }
      ],
     }
    ];
    const nextState = reducer(initialState, setDiff(diffArray));
    expect(selectDiff({ translator: nextState })).toEqual(diffArray);
    expect(selectBrowserWaitTranslated({ translator: nextState })).toBeFalsy()
  })

  it('should correctly set error in state', () => {
    const error: IError = {
      message: 'This is an error.',
      level: 'info',
    }

    const nextState = reducer(initialState, setError(error))
    expect(selectError({ translator: nextState })).toEqual(error)
  })

  describe('checkIfTranslationsHaveBeenMade', () => {
    it('returns true given diffArray includes at least one api item', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [{ original: 'test()', modified: 'test()', api: [{ command: 'testing()', url: 'www.cypress.io'}]}];
      
      // act
      const actual = checkIfTranslationsHaveBeenMade(diffArray);

      // assert
      expect(actual).toBeTruthy();
    });

    it('returns false given diffArray has an empty api array', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [{ original: 'test()', modified: 'test()', api: []}];

      // act
      const actual = checkIfTranslationsHaveBeenMade(diffArray);

      // assert
      expect(actual).toBeFalsy();
    });
  })

  describe('checkIfBrowserWaitTranslationMade', () => {
    it('returns true if diffArray includes an API item for browser.wait', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [{ original: 'browser.wait(1000)', modified: 'cy.wait(1000)', api: [{ command: 'wait', url: 'https://on.cypress.io/wait'}]}];

      // act
      const actual = checkIfBrowserWaitTranslationMade(diffArray);

      // assert
      expect(actual).toBeTruthy();
    });
  });
})
