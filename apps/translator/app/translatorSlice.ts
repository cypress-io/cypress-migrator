import { TransformResult } from '@cypress-dx/codemods'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { defaultText } from '../constants'
import { AppState } from './store'
import typescriptParser from 'prettier/parser-typescript'
import prettier from 'prettier/standalone'

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
const diffColors = { 'diffEditor.insertedTextBackground': '#a3e7cb70', 'diffEditor.removedTextBackground': '#f8c4cd70' }
const noDiffColors = {
  'diffEditor.insertedTextBackground': '#ffffff70',
  'diffEditor.removedTextBackground': '#ffffff70',
}
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
  sentAddTranslationRequest: boolean
}
export interface IErrorAlerts {
  noTranslationsMade: boolean
  browserWaitTranslated: boolean
  xPath: boolean
}
export interface ITranslatorState {
  language: AvailableLanguages
  availableLanguages: AvailableLanguages[]
  diffArray: IDiffArrayItem[]
  original: string
  modified: string
  error?: IError
  notifications: INotifications
  alerts: IErrorAlerts
  displayDiff: boolean
}

export const initialState: ITranslatorState = {
  language: 'protractor',
  availableLanguages: ['protractor'],
  diffArray: [],
  original: defaultText['protractor'],
  modified: null,
  error: undefined,
  notifications: {
    copied: false,
    sentAddTranslationRequest: false,
  },
  alerts: {
    noTranslationsMade: false,
    browserWaitTranslated: false,
    xPath: false,
  },
  displayDiff: true,
}

export const translatorSlice = createSlice({
  name: 'translator',
  initialState,
  reducers: {
    setLanguage: (state: ITranslatorState, action: PayloadAction<AvailableLanguages>): ITranslatorState => ({
      ...state,
      language: action.payload,
    }),
    translate: (
      state: ITranslatorState,
      action: PayloadAction<{ input: string; result: TransformResult }>,
    ): ITranslatorState => ({
      ...state,
      diffArray: action.payload.result.diff,
      original: format(action.payload.input),
      modified: format(action.payload.result.output),
      error: action.payload.result.error ? action.payload.result.error : state.error,
      alerts: {
        ...state.alerts,
        noTranslationsMade: checkIfTranslationsHaveNotBeenMade(action.payload.result.diff),
        browserWaitTranslated: checkIfBrowserWaitTranslationMade(action.payload.result.diff),
        xPath: checkIfXPathTranslationMade(action.payload.result.diff),
      },
    }),
    setCopiedNotification: (state: ITranslatorState, action: PayloadAction<boolean>): ITranslatorState => ({
      ...state,
      notifications: {
        ...initialState.notifications,
        copied: action.payload,
      },
    }),
    sentAddTranslationRequest: (state: ITranslatorState, action: PayloadAction<boolean>): ITranslatorState => ({
      ...state,
      alerts: {
        ...state.alerts,
        noTranslationsMade: action.payload ? false : state.alerts.noTranslationsMade,
      },
      notifications: {
        ...state.notifications,
        sentAddTranslationRequest: action.payload,
      },
    }),
    setNoTranslationsMade: (state: ITranslatorState, action: PayloadAction<boolean>): ITranslatorState => ({
      ...state,
      alerts: {
        ...initialState.alerts,
        noTranslationsMade: action.payload,
      },
    }),
    setBrowserWaitTranslated: (state: ITranslatorState, action: PayloadAction<boolean>): ITranslatorState => ({
      ...state,
      alerts: {
        ...initialState.alerts,
        browserWaitTranslated: action.payload,
      },
    }),
    setXPathTranslated: (state: ITranslatorState, action: PayloadAction<boolean>): ITranslatorState => ({
      ...state,
      alerts: {
        ...initialState.alerts,
        xPath: action.payload,
      },
    }),
    setDisplayDiff: (state: ITranslatorState, action: PayloadAction<boolean>): ITranslatorState => ({
      ...state,
      displayDiff: action.payload,
    }),
  },
})

export const {
  setLanguage,
  translate,
  setCopiedNotification,
  setNoTranslationsMade,
  setBrowserWaitTranslated,
  setXPathTranslated,
  setDisplayDiff,
  sentAddTranslationRequest,
} = translatorSlice.actions

export const selectLanguage = (state: AppState): AvailableLanguages => state.translator.language
export const selectAvailableLanguages = (state: AppState): AvailableLanguages[] => state.translator.availableLanguages
export const selectDiff = (state: AppState): IDiffArrayItem[] => state.translator.diffArray
export const selectOriginal = (state: AppState): string => state.translator.original
export const selectModified = (state: AppState): string => state.translator.modified
export const selectError = (state: AppState): IError => state.translator.error
export const selectNotifications = (state: AppState): INotifications => state.translator.notifications
export const selectCopiedNotification = (state: AppState): boolean => state.translator.notifications.copied
export const selectSentAddTranslationRequest = (state: AppState): boolean =>
  state.translator.notifications.sentAddTranslationRequest
export const selectNoTranslationsMade = (state: AppState): boolean => state.translator.alerts.noTranslationsMade
export const selectBrowserWaitTranslated = (state: AppState): boolean => state.translator.alerts.browserWaitTranslated
export const selectXPathTranslated = (state: AppState): boolean => state.translator.alerts.xPath
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
export const selectErrorAlert = (state: AppState): IErrorAlerts => state.translator.alerts

export default translatorSlice.reducer

export const checkIfTranslationsHaveNotBeenMade = (diffArray: IDiffArrayItem[]): boolean =>
  diffArray.length > 0 && diffArray.every((diff) => diff.original === diff.modified)

export const checkIfBrowserWaitTranslationMade = (diffArray: IDiffArrayItem[]): boolean =>
  diffArray.filter((diff) => diff.api.filter((api) => api.command === 'wait').length > 0).length > 0

export const checkIfXPathTranslationMade = (diffArray: IDiffArrayItem[]): boolean =>
  diffArray.filter((diff) => diff.api.filter((api) => api.command === 'xpath').length > 0).length > 0

const format = (value: string): string =>
  value
    ? prettier.format(value, { semi: false, singleQuote: true, parser: 'typescript', plugins: [typescriptParser] })
    : null
