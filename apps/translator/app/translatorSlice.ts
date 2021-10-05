import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from '.'
import { defaultText } from '../constants'

export interface IError {
  message: string
  level: 'warning' | 'error' | 'info'
}
export interface IDiffArrayItem {
  original: string
  modified: string
  api?: {
    command: string
    url: string
  }[]
}

export type AvailableLanguages = 'Protractor'

export type IColors = {
  [colorId: string]: string;
};
const diffColors = { 'diffEditor.insertedTextBackground': "#a3e7cb", 'diffEditor.removedTextBackground': "#f8c4cd" }
const noDiffColors = {'diffEditor.insertedTextBackground': "#ffffff", 'diffEditor.removedTextBackground': "#ffffff"}
const themeDefaultColors = {
  'editor.background': '#fff',
  'editor.lineHighlightBackground': '#e1e3ed',
  'scrollbarSlider.background': '#c2f1de',
  'scrollbarSlider.hoverBackground': '#a3e7cb',
  'editorLineNumber.foreground': '#747994',
  'editorLineNumber.activeForeground': '#747994',
}
const setThemeColors = (showDiff: boolean) => showDiff ? { ...themeDefaultColors, ...diffColors } : { ...themeDefaultColors, ...noDiffColors }
export interface INotifications {
  copied: boolean
  noTranslationsMade: boolean
  browserWaitTranslated: boolean
}
export interface ITranslatorState {
  language: AvailableLanguages
  availableLanguages: AvailableLanguages[]
  original: string
  modified: string
  diffArray: IDiffArrayItem[]
  error?: IError
  notifications: INotifications
  displayDiff: boolean;
  fontSize: number;
}

export const initialState: ITranslatorState = {
  language: 'Protractor',
  availableLanguages: ['Protractor'],
  original: defaultText['protractor'],
  modified: null,
  diffArray: [],
  error: undefined,
  notifications: {
    copied: false,
    noTranslationsMade: false,
    browserWaitTranslated: false
  },
  displayDiff: true,
  fontSize: 12
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
    setModified: (state, action: PayloadAction<string>) => {
      state.modified = action.payload
    },
    setDiff: (state, action: PayloadAction<IDiffArrayItem[]>) => ({
      ...state,
      diffArray: action.payload,
      notifications: {
        ...state.notifications,
        noTranslationsMade: !checkIfTranslationsHaveBeenMade(action.payload),
        browserWaitTranslated: checkIfBrowserWaitTranslationMade(action.payload)
      }
    }),
    setError: (state, action: PayloadAction<IError>) => {
      state.error = action.payload
    },
    setCopiedNotification: (state, action: PayloadAction<boolean>) => ({
      ...state,
      notifications: {
        ...initialState.notifications,
        copied: action.payload
      }
    }),
    setNoTranslationsMade: (state, action: PayloadAction<boolean>) => ({
      ...state,
      notifications: {
        ...initialState.notifications,
        noTranslationsMade: action.payload
      }
    }),
    setBrowserWaitTranslated: (state, action: PayloadAction<boolean>) => ({
      ...state,
      notifications: {
        ...initialState.notifications,
        browserWaitTranslated: action.payload
      }
    }),
    setDisplayDiff: (state, action: PayloadAction<boolean>) => {
      state.displayDiff = action.payload
    },
    increaseFontSize: (state) => {
      state.fontSize = state.fontSize + 1;
    },
    decreaseFontSize: (state) => {
      state.fontSize = state.fontSize - 1;
    }
  },
})

export const { setLanguage, setOriginal, setModified, setDiff, setError, setCopiedNotification, setNoTranslationsMade, setBrowserWaitTranslated, setDisplayDiff, increaseFontSize, decreaseFontSize } =
  translatorSlice.actions

export const selectLanguage = (state: AppState): AvailableLanguages => state.translator.language
export const selectAvailableLanguages = (state: AppState): AvailableLanguages[] => state.translator.availableLanguages
export const selectOriginal = (state: AppState): string => state.translator.original
export const selectModified = (state: AppState): string => state.translator.modified
export const selectDiff = (state: AppState): IDiffArrayItem[] => state.translator.diffArray
export const selectError = (state: AppState): IError => state.translator.error
export const selectNotifications = (state: AppState): INotifications => state.translator.notifications
export const selectCopiedNotification = (state: AppState): boolean => state.translator.notifications.copied
export const selectNoTranslationsMade = (state: AppState): boolean => state.translator.notifications.noTranslationsMade
export const selectBrowserWaitTranslated = (state: AppState): boolean => state.translator.notifications.browserWaitTranslated
export const selectDisplayDiff = (state: AppState): boolean => state.translator.displayDiff
export const selectDiffEditorThemeColors = (state: AppState): IColors => setThemeColors(state.translator.displayDiff)
export const selectFontSize = (state: AppState): number => state.translator.fontSize

export default translatorSlice.reducer


export const checkIfTranslationsHaveBeenMade = (diffArray: IDiffArrayItem[]): boolean => 
  diffArray.length > 0 && diffArray.some(diff => diff.api.length > 0)

export const checkIfBrowserWaitTranslationMade = (diffArray: IDiffArrayItem[]): boolean => diffArray.filter(diff => diff.api.filter(api => api.command === 'wait').length > 0).length > 0
