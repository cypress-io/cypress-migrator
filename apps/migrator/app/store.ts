import { configureStore } from '@reduxjs/toolkit'

import migratorReducer from './migratorSlice'

export function makeStore() {
  return configureStore({
    reducer: { migrator: migratorReducer },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
