import { createAction } from '@ngrx/store'

export const turnOnCopiedNotification = createAction('[NOTIFICATIONS] Turn On Copied Notification')
export const turnOffCopiedNotification = createAction('[NOTIFICATIONS] Turn Off Copied Notification')
export const turnOffNotification = createAction('[NOTIFICATIONS] Turn Off Notifications')
export const addMigrationRequestSuccessOn = createAction(
  '[NOTIFICATIONS] Turn On Add Migration Request Success Notification',
)
export const addMigrationrequestSuccesssOff = createAction(
  '[NOTIFICATIONS] Turn Off Add MIgration Request Success Notification',
)
