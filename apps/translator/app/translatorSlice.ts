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

export interface INotifications {
  copied: boolean
  noTranslationsMade: boolean
}
export interface ITranslatorState {
  language: AvailableLanguages
  availableLanguages: AvailableLanguages[]
  original: string
  modified: string
  diffArray: IDiffArrayItem[]
  error?: IError
  notifications: INotifications
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
    noTranslationsMade: false
  },
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
        noTranslationsMade: !checkIfTranslationsHaveBeenMade(action.payload)
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
    })
  },
})

export const { setLanguage, setOriginal, setModified, setDiff, setError, setCopiedNotification, setNoTranslationsMade } =
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

export default translatorSlice.reducer


export const checkIfTranslationsHaveBeenMade = (diffArray: IDiffArrayItem[]): boolean => 
  diffArray.length > 0 && diffArray.some(diff => diff.api.length > 0)
