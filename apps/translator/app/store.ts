import { configureStore } from "@reduxjs/toolkit"

import translatorReducer from "./translatorSlice"

export function makeStore() {
  return configureStore({
    reducer: { translator: translatorReducer },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
