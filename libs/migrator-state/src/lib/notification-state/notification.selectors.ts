import { createFeatureSelector, createSelector } from '@ngrx/store'
import { NotificationState, NOTIFICATION_FEATURE } from './notification.reducer'

export const notificationFeatureSelector = createFeatureSelector<NotificationState>(NOTIFICATION_FEATURE)

export const selectNotificationTitle = createSelector(notificationFeatureSelector, (state) =>
  state.copied ? 'Sucessfully copied!' : state.sentAddMigrationRequest ? 'Sent Successfully!' : null,
)

export const selectNotificationMessage = createSelector(notificationFeatureSelector, (state) =>
  state.copied
    ? 'You sucessfully copied the Cypress migration to clipboard'
    : state.sentAddMigrationRequest
    ? 'We successfully received your request to add your migration. We appreciate your feedback!'
    : null,
)

export const selectNotification = createSelector(selectNotificationTitle, selectNotificationMessage, (title, message) =>
  !!title || !!message
    ? {
        title,
        message,
      }
    : null,
)
