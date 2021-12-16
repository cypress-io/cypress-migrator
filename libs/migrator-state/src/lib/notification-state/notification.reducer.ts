import { Action, createReducer, on } from '@ngrx/store'
import { turnOffCopiedNotification, turnOnCopiedNotification, turnOffNotification } from './notification.actions'

export const NOTIFICATION_FEATURE = 'notification'

export interface NotificationState {
  copied: boolean
  sentAddMigrationRequest: boolean
}

const initialState: NotificationState = {
  copied: false,
  sentAddMigrationRequest: false,
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
  on(turnOffNotification, (state) => ({
    ...initialState,
  })),
)

export function notificationReducer(state = initialState, action: Action): NotificationState {
  return reducer(state, action)
}
