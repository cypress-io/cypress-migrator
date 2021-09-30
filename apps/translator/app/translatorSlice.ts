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
}
export interface ITranslatorState {
  language: string
  availableLanguages: AvailableLanguages[]
  original: string
  modified: string
  diffArray: IDiffArrayItem[]
  error?: IError
  notifications: INotifications
}

export const initialState: ITranslatorState = {
  language: 'protractor',
  availableLanguages: ['Protractor'],
  original: defaultText['protractor'],
  modified: null,
  diffArray: [],
  error: undefined,
  notifications: {
    copied: false,
  },
}

export const translatorSlice = createSlice({
  name: 'translator',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    setOriginal: (state, action: PayloadAction<string>) => {
      state.original = action.payload
    },
    setModified: (state, action: PayloadAction<string>) => {
      state.modified = action.payload
    },
    setDiff: (state, action: PayloadAction<IDiffArrayItem[]>) => {
      state.diffArray = action.payload
    },
    setError: (state, action: PayloadAction<IError>) => {
      state.error = action.payload
    },
    setCopiedNotification: (state, action: PayloadAction<boolean>) => {
      state.notifications.copied = action.payload
    },
  },
})

export const { setLanguage, setOriginal, setModified, setDiff, setError, setCopiedNotification } =
  translatorSlice.actions

export const selectLanguage = (state: AppState) => state.translator.language
export const selectAvailableLanguages = (state: AppState) => state.translator.availableLanguages
export const selectOriginal = (state: AppState) => state.translator.original
export const selectModified = (state: AppState) => state.translator.modified
export const selectDiff = (state: AppState) => state.translator.diffArray
export const selectError = (state: AppState) => state.translator.error
export const selectNotifications = (state: AppState) => state.translator.notifications
export const selectCopiedNotification = (state: AppState) => state.translator.notifications.copied

export default translatorSlice.reducer
