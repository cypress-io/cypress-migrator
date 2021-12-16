import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EditorState, EDITOR_FEATURE } from './editor.reducer'
import { APIItem } from '@cypress-dx/codemods'

export const editorFeatureSelector = createFeatureSelector<EditorState>(EDITOR_FEATURE)

export const selectLanguage = createSelector(editorFeatureSelector, (state) => state.language)
export const selectAvailableLanguages = createSelector(editorFeatureSelector, (state) => state.availableLanguages)
export const selectDisplayDiff = createSelector(editorFeatureSelector, (state) => state.displayDiff)
export const selectOriginal = createSelector(editorFeatureSelector, (state) => state.original)
export const selectModified = createSelector(editorFeatureSelector, (state) => state.modified)
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

export const selectDiffApiItems = createSelector(
  editorFeatureSelector,
  (state) => [{ url: 'https://docs.cypress.io/get', command: 'get' }] as APIItem[],
)
