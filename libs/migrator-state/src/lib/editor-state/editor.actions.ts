import { MigrateResult } from '@cypress-dx/migrate-protractor'
import { createAction, props } from '@ngrx/store'
import { AvailableLanguage } from './editor.reducer'

export const setLanguage = createAction('[EDITOR] Set Available Language', props<{ language: AvailableLanguage }>())
export const toggleDisplayDiff = createAction('[EDITOR] Toggle Display Diff')

export const migrate = createAction('[EDITOR] Do Migration', props<{ input: string }>())
export const formatInput = createAction('[EDITOR] Format Codemods Input', props<{ input: string }>())
export const formatedResult = createAction('[EDITOR] Format Codemods Results', props<{ result: string }>())
export const migrateResult = createAction('[CODEMODS] Migratation Result', props<{ result: MigrateResult }>())
export const copyMigration = createAction('[EDITOR] Copy Migrations')

export const addMigration = createAction('[EDITOR] Add Migration')
export const addMigrationSuccess = createAction('[EDITOR] Add Migration Request Succeeded')
export const addMigrationFailed = createAction('[EDITOR] Add Migration Request Failed')
