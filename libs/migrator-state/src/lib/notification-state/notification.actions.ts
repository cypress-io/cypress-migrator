import { createAction } from '@ngrx/store'

export const turnOnCopiedNotification = createAction('[NOTIFICATIONS] Turn On Copied Notification')
export const turnOffCopiedNotification = createAction('[NOTIFICATIONS] Turn Off Copied Notification')
export const turnOnAddMigrationNotification = createAction('[NOTIFICATIONS] Turn On Missing Migration Notification')
export const turnOffAddMigrationNotification = createAction('[NOTIFICATIONS] Turn Off Missing Migration Notification')
