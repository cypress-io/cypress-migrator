import { MigrateResult } from '@cypress-dx/codemods'
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

export type AvailableLanguages = 'protractor' | 'webdriver'

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
  sentAddMigrationRequest: boolean
}
export interface IErrorAlerts {
  noMigrationsMade: boolean
  browserWaitMigrated: boolean
  xPath: boolean
}
export interface IMigratorState {
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

export const initialState: IMigratorState = {
  language: 'webdriver',
  availableLanguages: ['protractor', 'webdriver'],
  diffArray: [],
  original: defaultText['protractor'],
  modified: null,
  error: undefined,
  notifications: {
    copied: false,
    sentAddMigrationRequest: false,
  },
  alerts: {
    noMigrationsMade: false,
    browserWaitMigrated: false,
    xPath: false,
  },
  displayDiff: true,
}

export const migratorSlice = createSlice({
  name: 'migrator',
  initialState,
  reducers: {
    setLanguage: (state: IMigratorState, action: PayloadAction<AvailableLanguages>): IMigratorState => ({
      ...state,
      language: action.payload,
    }),
    migrate: (
      state: IMigratorState,
      action: PayloadAction<{ input: string; result: MigrateResult }>,
    ): IMigratorState => ({
      ...state,
      diffArray: action.payload.result.diff,
      original: !action.payload.result.error ? format(action.payload.input) : action.payload.input,
      modified: format(action.payload.result.output),
      error: action.payload.result.error ? action.payload.result.error : initialState.error,
      alerts: {
        ...state.alerts,
        noMigrationsMade: checkIfMigrationsHaveNotBeenMade(action.payload.result.diff),
        browserWaitMigrated: checkIfBrowserWaitMigrationMade(action.payload.result.diff),
        xPath: checkIfXPathMigrationMade(action.payload.result.diff),
      },
    }),
    setCopiedNotification: (state: IMigratorState, action: PayloadAction<boolean>): IMigratorState => ({
      ...state,
      notifications: {
        ...initialState.notifications,
        copied: action.payload,
      },
    }),
    sentAddMigrationRequest: (state: IMigratorState, action: PayloadAction<boolean>): IMigratorState => ({
      ...state,
      notifications: {
        ...state.notifications,
        sentAddMigrationRequest: action.payload,
      },
    }),
    setNoMigrationsMade: (state: IMigratorState, action: PayloadAction<boolean>): IMigratorState => ({
      ...state,
      alerts: {
        ...initialState.alerts,
        noMigrationsMade: action.payload,
      },
    }),
    setBrowserWaitMigrated: (state: IMigratorState, action: PayloadAction<boolean>): IMigratorState => ({
      ...state,
      alerts: {
        ...initialState.alerts,
        browserWaitMigrated: action.payload,
      },
    }),
    setXPathMigrated: (state: IMigratorState, action: PayloadAction<boolean>): IMigratorState => ({
      ...state,
      alerts: {
        ...initialState.alerts,
        xPath: action.payload,
      },
    }),
    setDisplayDiff: (state: IMigratorState, action: PayloadAction<boolean>): IMigratorState => ({
      ...state,
      displayDiff: action.payload,
    }),
  },
})

export const {
  setLanguage,
  migrate,
  setCopiedNotification,
  setNoMigrationsMade,
  setBrowserWaitMigrated,
  setXPathMigrated,
  setDisplayDiff,
  sentAddMigrationRequest,
} = migratorSlice.actions

export const selectLanguage = (state: AppState): AvailableLanguages => state.migrator.language
export const selectAvailableLanguages = (state: AppState): AvailableLanguages[] => state.migrator.availableLanguages
export const selectDiff = (state: AppState): IDiffArrayItem[] => state.migrator.diffArray
export const selectOriginal = (state: AppState): string => state.migrator.original
export const selectModified = (state: AppState): string => state.migrator.modified
export const selectError = (state: AppState): IError => state.migrator.error
export const selectNotifications = (state: AppState): INotifications => state.migrator.notifications
export const selectCopiedNotification = (state: AppState): boolean => state.migrator.notifications.copied
export const selectSentAddMigrationRequest = (state: AppState): boolean =>
  state.migrator.notifications.sentAddMigrationRequest
export const selectNoMigrationsMade = (state: AppState): boolean => state.migrator.alerts.noMigrationsMade
export const selectBrowserWaitMigrated = (state: AppState): boolean => state.migrator.alerts.browserWaitMigrated
export const selectXPathMigrated = (state: AppState): boolean => state.migrator.alerts.xPath
export const selectDisplayDiff = (state: AppState): boolean => state.migrator.displayDiff
export const selectDiffEditorThemeColors = (state: AppState): IColors => setThemeColors(state.migrator.displayDiff)
export const selectDiffApiItems = (state: AppState): IDiffArrayApiItem[] => [
  ...new Map(
    []
      .concat(
        ...state.migrator.diffArray
          .filter((diff: IDiffArrayItem) => diff.api?.length > 0)
          .map((item: IDiffArrayItem) => item.api),
      )
      .map((x) => [x['command'], x]),
  ).values(),
]
export const selectErrorAlert = (state: AppState): IErrorAlerts => state.migrator.alerts
export const shouldShowDetails = (state: AppState): boolean =>
  state.migrator.diffArray.length > 0 ||
  !!state.migrator.error ||
  state.migrator.alerts.browserWaitMigrated ||
  state.migrator.alerts.noMigrationsMade ||
  state.migrator.alerts.xPath

export default migratorSlice.reducer

export const checkIfMigrationsHaveNotBeenMade = (diffArray: IDiffArrayItem[]): boolean =>
  diffArray.length > 0 && diffArray.every((diff) => diff.original === diff.modified)

export const checkIfBrowserWaitMigrationMade = (diffArray: IDiffArrayItem[]): boolean =>
  diffArray.filter((diff) => diff.api.filter((api) => api.command === 'wait').length > 0).length > 0

export const checkIfXPathMigrationMade = (diffArray: IDiffArrayItem[]): boolean =>
  diffArray.filter((diff) => diff.api.filter((api) => api.command === 'xpath').length > 0).length > 0

const format = (value: string): string =>
  value
    ? prettier.format(value, { semi: false, singleQuote: true, parser: 'typescript', plugins: [typescriptParser] })
    : null
