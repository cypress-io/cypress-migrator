import { createAction } from '@ngrx/store'

export const turnOnMigrationNotFoundAlert = createAction('[ALERT] Turn On Migration Not Found Alert')
export const turnOffMigrationNotFoundAlert = createAction('[ALERT] Turn Off Migration Not Found Alert')
export const turnOnBrowserWaitMigrationFoundAlert = createAction('[ALERT] Turn On Browser Wait Migration Found Alert')
export const turnOffBrowserWaitMigrationFoundAlert = createAction('[ALERT] Turn Off Browser Wait Migration Found Alert')
export const turnOnXPathMigrationFoundAlert = createAction('[ALERT] Turn On XPath Migration Found Alert')
export const turnOffXPathMigrationFoundAlert = createAction('[ALERT] Turn Off XPath Migration Found Alert')
