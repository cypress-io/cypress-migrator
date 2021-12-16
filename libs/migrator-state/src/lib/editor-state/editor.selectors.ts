import { createFeatureSelector, createSelector } from '@ngrx/store'
import { EditorState, EDITOR_FEATURE } from './editor.reducer'

const editorFeatureSelector = createFeatureSelector<EditorState>(EDITOR_FEATURE)

export const selectLanguage = createSelector(editorFeatureSelector, (state) => state.language)
export const selectAvailableLanguages = createSelector(editorFeatureSelector, (state) => state.availableLanguages)
