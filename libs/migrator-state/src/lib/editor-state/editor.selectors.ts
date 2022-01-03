import { APIItem, DiffArrayItem } from '@cypress-dx/codemods'
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store'
import { EditorState, EDITOR_FEATURE } from './editor.reducer'

export const editorFeatureSelector = createFeatureSelector<EditorState>(EDITOR_FEATURE)

export const selectLanguage = createSelector(editorFeatureSelector, (state) => state.language)
export const selectAvailableLanguages = createSelector(editorFeatureSelector, (state) => state.availableLanguages)
export const selectDisplayDiff = createSelector(editorFeatureSelector, (state) => state.displayDiff)
export const selectOriginal = createSelector(editorFeatureSelector, (state) => state.original)
export const selectModified = createSelector(editorFeatureSelector, (state) => state.modified)
export const selectOriginalAndModified = createSelector(selectOriginal, selectModified, (original, modified) => ({
  original,
  modified,
}))
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

const flatten = (array: DiffArrayItem[]): APIItem[] => {
  const items: APIItem[] = []
  array.map((x) => x?.api?.map((api) => items.push(api)))
  return items
}

export const selectDiffApiItems: MemoizedSelector<EditorState, APIItem[]> = createSelector(
  editorFeatureSelector,
  (state) => flatten(state.diffArray),
)

export const selectUniqueDiffApiItems: MemoizedSelector<EditorState, APIItem[]> = createSelector(
  selectDiffApiItems,
  (items) => [...new Map(items.map((item: APIItem) => [item.command, item])).values()],
)

export const selectThemeOptions = createSelector(selectDisplayDiff, (displayDiff) => ({
  theme: displayDiff ? 'cypress-diff' : 'cypress-no-diff',
  language: 'javascript',
  lineNumbers: 'on',
  originalEditable: true,
  fontSize: 14,
  codeLens: true,
  wordWrap: 'on',
  scrollbar: {
    vertical: 'hidden',
  },
  colorDecorators: false,
  minimap: { enabled: false },
  renderIndicators: false,
  renderLineHighlight: 'none',
  renderOverviewRuler: false,
  readOnly: true,
  overviewRulerLanes: 0,
}))
