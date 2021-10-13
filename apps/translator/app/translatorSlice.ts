import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '.'
import { defaultText } from '../constants'
import prettier from 'prettier/standalone'
import typescriptParser from 'prettier/parser-typescript'

export interface IError {
  message: string
  level: 'warning' | 'error' | 'info'
}

export interface IDiffArrayApiItem {
  command: string
  url: string
}
export interface IDiffArrayItem {
  original: string
  modified: string
  api?: IDiffArrayApiItem[]
}

export type AvailableLanguages = 'protractor'

export type IColors = {
  [colorId: string]: string
}
const diffColors = { 'diffEditor.insertedTextBackground': '#a3e7cb', 'diffEditor.removedTextBackground': '#f8c4cd' }
const noDiffColors = { 'diffEditor.insertedTextBackground': '#ffffff', 'diffEditor.removedTextBackground': '#ffffff' }
const themeDefaultColors = {
  'editor.background': '#fff',
  'editor.lineHighlightBackground': '#e1e3ed',
  'scrollbarSlider.background': '#c2f1de',
  'scrollbarSlider.hoverBackground': '#a3e7cb',
  'editorLineNumber.foreground': '#747994',
  'editorLineNumber.activeForeground': '#747994',
}
const setThemeColors = (showDiff: boolean) =>
  showDiff ? { ...themeDefaultColors, ...diffColors } : { ...themeDefaultColors, ...noDiffColors }
export interface INotifications {
  copied: boolean
  noTranslationsMade: boolean
  browserWaitTranslated: boolean
  noInputProvided: boolean
}
export interface ITranslatorState {
  language: AvailableLanguages
  availableLanguages: AvailableLanguages[]
  original: string
  modified: string
  diffArray: IDiffArrayItem[]
  error?: IError
  notifications: INotifications
  displayDiff: boolean
}

export const initialState: ITranslatorState = {
  language: 'protractor',
  availableLanguages: ['protractor'],
  original: defaultText['protractor'],
  modified: null,
  diffArray: [],
  error: undefined,
  notifications: {
    copied: false,
    noTranslationsMade: false,
    browserWaitTranslated: false,
    noInputProvided: false,
  },
  displayDiff: true,
}

export const translatorSlice = createSlice({
  name: 'translator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLanguage: (state, action: PayloadAction<AvailableLanguages>) => {
      state.language = action.payload
    },
    setOriginal: (state, action: PayloadAction<string>) => {
      state.original = action.payload
    },
    setModified: (state, action: PayloadAction<string>) => ({
      ...state,
      modified: format(action.payload),
      original: format(state.original),
    }),
    setDiff: (state, action: PayloadAction<IDiffArrayItem[]>) => ({
      ...state,
      diffArray: action.payload,
      notifications: {
        ...state.notifications,
        noTranslationsMade: checkIfTranslationsHaveNotBeenMade(action.payload),
        browserWaitTranslated: checkIfBrowserWaitTranslationMade(action.payload),
        noInputProvided: action.payload.length === 0,
      },
    }),
    setError: (state, action: PayloadAction<IError>) => {
      state.error = action.payload
    },
    setCopiedNotification: (state, action: PayloadAction<boolean>) => ({
      ...state,
      notifications: {
        ...initialState.notifications,
        copied: action.payload,
      },
    }),
    setNoTranslationsMade: (state, action: PayloadAction<boolean>) => ({
      ...state,
      notifications: {
        ...initialState.notifications,
        noTranslationsMade: action.payload,
      },
    }),
    setBrowserWaitTranslated: (state, action: PayloadAction<boolean>) => ({
      ...state,
      notifications: {
        ...initialState.notifications,
        browserWaitTranslated: action.payload,
      },
    }),
    setNoInputProvided: (state, action: PayloadAction<boolean>) => ({
      ...state,
      notifications: {
        ...initialState.notifications,
        noInputProvided: action.payload,
      },
    }),
    setDisplayDiff: (state, action: PayloadAction<boolean>) => {
      state.displayDiff = action.payload
    },
  },
})

export const {
  setLanguage,
  setOriginal,
  setModified,
  setDiff,
  setError,
  setCopiedNotification,
  setNoTranslationsMade,
  setBrowserWaitTranslated,
  setDisplayDiff,
  setNoInputProvided,
} = translatorSlice.actions

export const selectLanguage = (state: AppState): AvailableLanguages => state.translator.language
export const selectAvailableLanguages = (state: AppState): AvailableLanguages[] => state.translator.availableLanguages
export const selectOriginal = (state: AppState): string => state.translator.original
export const selectModified = (state: AppState): string => state.translator.modified
export const selectDiff = (state: AppState): IDiffArrayItem[] => state.translator.diffArray
export const selectError = (state: AppState): IError => state.translator.error
export const selectNotifications = (state: AppState): INotifications => state.translator.notifications
export const selectCopiedNotification = (state: AppState): boolean => state.translator.notifications.copied
export const selectNoTranslationsMade = (state: AppState): boolean => state.translator.notifications.noTranslationsMade
export const selectBrowserWaitTranslated = (state: AppState): boolean =>
  state.translator.notifications.browserWaitTranslated
export const selectNoInputProvided = (state: AppState): boolean => state.translator.notifications.noInputProvided
export const selectDisplayDiff = (state: AppState): boolean => state.translator.displayDiff
export const selectDiffEditorThemeColors = (state: AppState): IColors => setThemeColors(state.translator.displayDiff)
export const selectDiffApiItems = (state: AppState): IDiffArrayApiItem[] => [
  ...new Map(
    []
      .concat(
        ...state.translator.diffArray
          .filter((diff: IDiffArrayItem) => diff.api?.length > 0)
          .map((item: IDiffArrayItem) => item.api),
      )
      .map((x) => [x['command'], x]),
  ).values(),
]

export default translatorSlice.reducer

export const checkIfTranslationsHaveNotBeenMade = (diffArray: IDiffArrayItem[]): boolean =>
  diffArray.length > 0 && diffArray.every((diff) => diff.original === diff.modified)

export const checkIfBrowserWaitTranslationMade = (diffArray: IDiffArrayItem[]): boolean =>
  diffArray.filter((diff) => diff.api.filter((api) => api.command === 'wait').length > 0).length > 0

const format = (value: string): string =>
  prettier.format(value, { semi: false, singleQuote: true, parser: 'typescript', plugins: [typescriptParser] })
