import { checkIfBrowserWaitTranslationMade, checkIfTranslationsHaveNotBeenMade, IDiffArrayApiItem, IDiffArrayItem, selectBrowserWaitTranslated, selectDiffApiItems, selectDiffEditorThemeColors, selectNoInputProvided, selectNoTranslationsMade, setDisplayDiff } from '.'
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
    const nextState = reducer(initialState, setLanguage('protractor'))
    expect(selectLanguage({ translator: nextState })).toEqual('protractor')
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

  it('should correctly set the noInputProvided notifications flag to true when found in errors', () => {
    const diffArray = [];
    const nextState = reducer(initialState, setDiff(diffArray));
    expect(selectDiff({ translator: nextState })).toEqual(diffArray);
    expect(selectNoInputProvided({ translator: nextState })).toBeTruthy();
  })

  it('should correctly set error in state', () => {
    const error: IError = {
      message: 'This is an error.',
      level: 'info',
    }

    const nextState = reducer(initialState, setError(error))
    expect(selectError({ translator: nextState })).toEqual(error)
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
      'diffEditor.insertedTextBackground': "#a3e7cb",
      'diffEditor.removedTextBackground': "#f8c4cd"
    }
    // act
    const nextState = reducer(initialState, setDisplayDiff(true));
    
    // assert
    expect(selectDiffEditorThemeColors({ translator: nextState })).toEqual(expected);
  });

  it('should correctly get the DiffEditorThemeColors when displayDiff is false', () => {
    // arrange
    const expected = {
      'editor.background': '#fff',
      'editor.lineHighlightBackground': '#e1e3ed',
      'scrollbarSlider.background': '#c2f1de',
      'scrollbarSlider.hoverBackground': '#a3e7cb',
      'editorLineNumber.foreground': '#747994',
      'editorLineNumber.activeForeground': '#747994',
      'diffEditor.insertedTextBackground': "#ffffff",
      'diffEditor.removedTextBackground': "#ffffff"
    }
    // act
    const nextState = reducer(initialState, setDisplayDiff(false));
    
    // assert
    expect(selectDiffEditorThemeColors({ translator: nextState })).toEqual(expected);
  });

  it('should correctly get the list of diffArray Api items', () => {
    // arrange
    const apiItem1: IDiffArrayApiItem = { command: 'get', url: 'www.cypress.io' };
    const apiItem2: IDiffArrayApiItem = { command: 'visit', url: 'www.cypress.io' };
    const diffArray: IDiffArrayItem[] = [
      { original: 'old', modified: 'new', api: [] },
      { original: 'old', modified: 'new', api: [apiItem1, apiItem2]},
    ];
    const expected = [apiItem1, apiItem2];
    
    // act
    const nextState = reducer(initialState, setDiff(diffArray));
    
    // assert
    expect(selectDiffApiItems({ translator: nextState })).toEqual(expected);

  });

  it('should filter out all duplicates of the diffArray Api Items', () => {
    // arrange
    const apiItem1: IDiffArrayApiItem = { command: 'get', url: 'www.cypress.io' };
    const apiItem2: IDiffArrayApiItem = { command: 'visit', url: 'www.cypress.io' };
    const diffArray: IDiffArrayItem[] = [
      { original: 'oldLine1', modified: 'newLine1', api: [apiItem1]},
      { original: 'oldLine2', modified: 'newLine2', api: [apiItem2]},
      { original: 'oldLine3', modified: 'newLIne3', api: [apiItem1, apiItem2]}
    ];
    const expected = [apiItem1, apiItem2];

    // act
    const nextState = reducer(initialState, setDiff(diffArray));

    // assert
    expect(selectDiffApiItems({ translator: nextState})).toEqual(expected)
  });

  describe('checkIfTranslationsHaveNotBeenMade', () => {
    it('returns false given diffArray items are not the same', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [{ original: 'browser.driver.get()', modified: 'cy.visit()', api: [{ command: 'visit', url: 'https://on.cypress.io/visit'}]}];
      
      // act
      const actual = checkIfTranslationsHaveNotBeenMade(diffArray);

      // assert
      expect(actual).toBeFalsy();
    });

    it('returns true given diffArray has an empty api array', () => {
      // arrange
      const diffArray: IDiffArrayItem[] = [{ original: 'test()', modified: 'test()', api: []}];

      // act
      const actual = checkIfTranslationsHaveNotBeenMade(diffArray);

      // assert
      expect(actual).toBeTruthy();
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
