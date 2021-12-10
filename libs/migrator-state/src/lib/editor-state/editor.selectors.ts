import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'
import { EditorState, EDITOR_FEATURE } from './editor.reducer'
import { DiffArrayApiItem, DiffArrayItem } from './models'

const editorFeatureSelector = createFeatureSelector<EditorState>(EDITOR_FEATURE)

const diffColors = { 'diffEditor.insertedTextBackground': '#a3e7cb70', 'diffEditor.removedTextBackground': '#f8c4cd70' }
const noDiffColors = {
  'diffEditor.insertedTextBackground': '#ffffff70',
  'diffEditor.removedTextBackground': '#ffffff70',
}
const themeDefaultColors = {
  'editor.background': '#fff',
  'editor.lineHighlightBackground': '#e1e3ed',
  'scrollbarSlider.background': '#c2f1de',
  'scrollbarSlider.hoverBackground': '#a3e7cb',
  'editorLineNumber.foreground': '#747994',
  'editorLineNumber.activeForeground': '#747994',
}

export const selectLangauge = createSelector(editorFeatureSelector, (state) => state.language)
export const selectAvailableLanguages = createSelector(editorFeatureSelector, (state) => state.availableLanguages)
export const selectDiff: MemoizedSelector<EditorState, DiffArrayItem[]> = createSelector(
  editorFeatureSelector,
  (state) => state.diffArray,
)
export const selectOriginal = createSelector(editorFeatureSelector, (state) => state.original)
export const selectModified = createSelector(editorFeatureSelector, (state) => state.modified)
export const selectError = createSelector(editorFeatureSelector, (state) => state.error)
export const selectDisplayDiff = createSelector(editorFeatureSelector, (state) => state.displayDiff)
export const selectDiffEditorThemeColors = createSelector(selectDisplayDiff, (displayDiff) =>
  displayDiff ? { ...themeDefaultColors, ...diffColors } : { ...themeDefaultColors, ...noDiffColors },
)
export const selectOriginalModel = createSelector(selectOriginal, (original) => ({
  code: original,
  language: 'javascript',
}))

export const selectModifiedModel = createSelector(selectModified, (modified) => ({
  code: modified,
  language: 'javascript',
}))

export const selectEditorViewModel = createSelector(selectOriginalModel, selectModifiedModel, (original, modified) => ({
  original,
  modified,
}))

export const selectNotifications = createSelector(editorFeatureSelector, (state) => state.notifications)
export const selectCopiedNotification = createSelector(selectNotifications, (notifications) => notifications.copied)
export const selectSentAddMigrationNotification = createSelector(
  selectNotifications,
  (notifications) => notifications.sentAddMigrationRequest,
)

export const selectAlerts = createSelector(editorFeatureSelector, (state) => state.alerts)
export const selectNoMigrationsMadeAlert = createSelector(selectAlerts, (alerts) => alerts.noMigrationsMade)
export const selectBrowserWaitMigratedAlert = createSelector(selectAlerts, (alerts) => alerts.browserWaitMigrated)
export const selectXpathMigratedAlert = createSelector(selectAlerts, (alerts) => alerts.xPathFound)

export const selectShouldShowDetails = createSelector(
  editorFeatureSelector,
  (state) =>
    state.diffArray.length > 0 ||
    !!state.error ||
    state.alerts.browserWaitMigrated ||
    state.alerts.noMigrationsMade ||
    state.alerts.xPathFound,
)

export const selectDiffApiItems = createSelector(
  editorFeatureSelector,
  (state) => [{ url: 'https://docs.cypress.io/get', command: 'get' }] as DiffArrayApiItem[],
)

// export const selectApiItems: MemoizedSelector<EditorState, DiffArrayApiItem[]> = createSelector(selectDiff, diff => {
//     // diff.filter((item: DiffArrayItem) => item?.api && item?.api?.length > 0)?.map((item: DiffArrayItem) => item.api)
//     const items: DiffArrayApiItem[] = diff.filter(x => !!x.api).map(item => item.api)
// })

// export const selectDiffApiItems: MemoizedSelector<EditorState, DiffArrayApiItem[]> = createSelector(selectApiItems, items => [
//     ...new Map(
//         items.map(x => [x['command'], x])
//     ).values()
// ]

// export const selectDiffApiItems = (state: AppState): IDiffArrayApiItem[] => [
//   ...new Map(
//     []
//       .concat(
//         ...state.migrator.diffArray
//           .filter((diff: IDiffArrayItem) => diff.api?.length > 0)
//           .map((item: IDiffArrayItem) => item.api),
//       )
//       .map((x) => [x['command'], x]),
//   ).values(),
// ]
