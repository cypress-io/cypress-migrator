import { createAction } from '@ngrx/store'

export const turnOnCopiedNotification = createAction('[NOTIFICATIONS] Turn On Copied Notification')
export const turnOffCopiedNotification = createAction('[NOTIFICATIONS] Turn Off Copied Notification')
export const turnOffNotification = createAction('[NOTIFICATIONS] Turn Off Notifications')
