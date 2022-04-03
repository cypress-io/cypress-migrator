import { configureStore } from '@reduxjs/toolkit'

import migratorReducer from './migratorSlice'

export const getStore = () =>
  configureStore({
    reducer: { migrator: migratorReducer },
  })

const store = getStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
