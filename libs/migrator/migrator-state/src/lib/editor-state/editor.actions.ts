import { createAction, props } from '@ngrx/store'
import { AvailableLanguage, MigrateResult } from './models'

export const setLanguage = createAction('[EDITOR] Set Available Language', props<{ language: AvailableLanguage }>())
export const toggleDisplayDiff = createAction('[EDITOR] Toggle Display Diff')

export const migrate = createAction('[EDITOR] Do Migration', props<{ input: string }>())
export const migrateResult = createAction('[CODEMODS] Migratation Result', props<{ result: MigrateResult }>())

// NOTIFICATIONS
export const turnOnCopiedNotification = createAction('[NOTIFICATIONS] Turn On Copied Notification')
export const turnOffCopiedNotification = createAction('[NOTIFICATIONS] Turn Off Copied Notification')
export const turnOnAddMigrationNotification = createAction('[NOTIFICATIONS] Turn On Missing Migration Notification')
export const turnOffAddMigrationNotification = createAction('[NOTIFICATIONS] Turn Off Missing Migration Notification')

// ALERTS
export const turnOnMigrationNotFoundAlert = createAction('[ALERT] Turn On Migration Not Found Alert')
export const turnOffMigrationNotFoundAlert = createAction('[ALERT] Turn Off Migration Not Found Alert')
export const turnOnBrowserWaitMigrationFoundAlert = createAction('[ALERT] Turn On Browser Wait Migration Found Alert')
export const turnOffBrowserWaitMigrationFoundAlert = createAction('[ALERT] Turn Off Browser Wait Migration Found Alert')
export const turnOnXPathMigrationFoundAlert = createAction('[ALERT] Turn On XPath Migration Found Alert')
export const turnOffXPathMigrationFoundAlert = createAction('[ALERT] Turn Off XPath Migration Found Alert')
