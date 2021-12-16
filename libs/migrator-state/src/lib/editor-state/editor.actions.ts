import { MigrateResult } from '@cypress-dx/codemods'
import { createAction, props } from '@ngrx/store'
import { AvailableLanguage } from './editor.reducer'

export const setLanguage = createAction('[EDITOR] Set Available Language', props<{ language: AvailableLanguage }>())
export const toggleDisplayDiff = createAction('[EDITOR] Toggle Display Diff')

export const migrate = createAction('[EDITOR] Do Migration', props<{ input: string }>())
export const migrateResult = createAction('[CODEMODS] Migratation Result', props<{ result: MigrateResult }>())
export const copyMigration = createAction('[EDITOR] Copy Migrations')
