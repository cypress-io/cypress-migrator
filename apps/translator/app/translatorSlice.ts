import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState } from './store'

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
export interface ITranslatorState {
  language: string
  availableLanguages: AvailableLanguages[]
  original: string
  modified: string
  diffArray: IDiffArrayItem[]
  error?: IError
}

export const initialState: ITranslatorState = {
  language: 'protractor',
  availableLanguages: ['Protractor'],
  original: null,
  modified: null,
  diffArray: [],
  error: undefined,
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
  },
})

export const { setLanguage, setOriginal, setModified, setDiff, setError } = translatorSlice.actions

export const selectLanguage = (state: AppState) => state.translator.language
export const selectAvailableLanguages = (state: AppState) => state.translator.availableLanguages
export const selectOriginal = (state: AppState) => state.translator.original
export const selectModified = (state: AppState) => state.translator.modified
export const selectDiff = (state: AppState) => state.translator.diffArray
export const selectError = (state: AppState) => state.translator.error

export default translatorSlice.reducer
