import { DiffArrayItem, MigrationError } from '@cypress-dx/migrate-protractor'
import { Action, createReducer, on } from '@ngrx/store'
import { defaultText } from './constants'
import { setLanguage, toggleDisplayDiff, migrateResult, formatedResult, formatInput } from './editor.actions'

export const EDITOR_FEATURE = 'editor'

export type AvailableLanguage = 'protractor'

export interface EditorState {
  language: AvailableLanguage
  availableLanguages: AvailableLanguage[]
  diffArray: DiffArrayItem[]
  original: string
  modified: string
  error?: MigrationError
  displayDiff: boolean
}

const initialState: EditorState = {
  language: 'protractor',
  availableLanguages: ['protractor'],
  displayDiff: true,
  diffArray: [],
  original: defaultText['protractor'],
  modified: '',
  error: undefined,
}

const reducer = createReducer(
  initialState,
  on(setLanguage, (state, { language }) => ({
    ...state,
    language,
  })),
  on(toggleDisplayDiff, (state) => ({
    ...state,
    displayDiff: !state.displayDiff,
  })),
  on(migrateResult, (state, { result }) => ({
    ...state,
    diffArray: result?.diff,
    error: result?.error,
  })),
  on(formatedResult, (state, { result }) => ({
    ...state,
    modified: result,
  })),
  on(formatInput, (state, { input }) => ({
    ...state,
    original: input,
  })),
)

export function editorRducer(state = initialState, action: Action): EditorState {
  return reducer(state, action)
}
