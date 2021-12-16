import { Action, createReducer, on } from '@ngrx/store'
import {
  turnOnMigrationNotFoundAlert,
  turnOffMigrationNotFoundAlert,
  turnOnBrowserWaitMigrationFoundAlert,
  turnOffBrowserWaitMigrationFoundAlert,
  turnOnXPathMigrationFoundAlert,
  turnOffXPathMigrationFoundAlert,
} from './alerts.actions'

export const ALERTS_FEATURE = 'alerts'

export interface AlertsState {
  noMigrationsMade: boolean
  browserWaitMigrated: boolean
  xPathFound: boolean
}

const initialState: AlertsState = {
  noMigrationsMade: false,
  browserWaitMigrated: false,
  xPathFound: false,
}

const alertsReducer = createReducer(
  initialState,
  on(turnOnMigrationNotFoundAlert, (state) => ({
    ...state,
    noMigrationsMade: true,
  })),
  on(turnOffMigrationNotFoundAlert, (state) => ({
    ...state,
    noMigrationsMade: false,
  })),
  on(turnOnBrowserWaitMigrationFoundAlert, (state) => ({
    ...state,
    browserWaitMigrated: true,
  })),
  on(turnOffBrowserWaitMigrationFoundAlert, (state) => ({
    ...state,
    browserWaitMigrated: false,
  })),
  on(turnOnXPathMigrationFoundAlert, (state) => ({
    ...state,
    xPathFound: true,
  })),
  on(turnOffXPathMigrationFoundAlert, (state) => ({
    ...state,
    xPathFound: false,
  })),
)

export function reducer(state = initialState, action: Action): AlertsState {
  return alertsReducer(state, action)
}
