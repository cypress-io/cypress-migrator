import { createSelector } from '@ngrx/store'
import { editorFeatureSelector } from './editor-state'
import { alertsFeatureSelector } from './alerts-state'

export const selectShouldShowDetails = createSelector(
  editorFeatureSelector,
  alertsFeatureSelector,
  (editor, alerts) =>
    editor.diffArray.length > 0 ||
    !!editor.error ||
    alerts.browserWaitMigrated ||
    alerts.noMigrationsMade ||
    alerts.xPathFound,
)
