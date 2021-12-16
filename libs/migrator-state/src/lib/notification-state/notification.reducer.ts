import { Action, createReducer, on } from '@ngrx/store'
import {
  turnOffAddMigrationNotification,
  turnOffCopiedNotification,
  turnOnAddMigrationNotification,
  turnOnCopiedNotification,
} from './notification.actions'

export const NOTIFICATION_FEATURE = 'notification'

export interface NotificationState {
  copied: boolean
  sentAddMigrationRequestion: boolean
}

const initialState: NotificationState = {
  copied: false,
  sentAddMigrationRequestion: false,
}

const reducer = createReducer(
  initialState,
  on(turnOnCopiedNotification, (state) => ({
    ...state,
    copied: true,
  })),
  on(turnOffCopiedNotification, (state) => ({
    ...state,
    copied: false,
  })),
  on(turnOnAddMigrationNotification, (state) => ({
    ...state,
    sentAddMigrationRequestion: true,
  })),
  on(turnOffAddMigrationNotification, (state) => ({
    ...state,
    sentAddMigrationRequestion: false,
  })),
)

export function notificationReducer(state = initialState, action: Action): NotificationState {
  return reducer(state, action)
}