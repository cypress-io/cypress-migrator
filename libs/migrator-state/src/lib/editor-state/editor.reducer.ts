import { Action, createReducer, on } from '@ngrx/store'
import {
  setLanguage,
  toggleDisplayDiff,
  turnOffAddMigrationNotification,
  turnOffBrowserWaitMigrationFoundAlert,
  turnOffCopiedNotification,
  turnOffMigrationNotFoundAlert,
  turnOffXPathMigrationFoundAlert,
  turnOnAddMigrationNotification,
  turnOnBrowserWaitMigrationFoundAlert,
  turnOnCopiedNotification,
  turnOnMigrationNotFoundAlert,
  turnOnXPathMigrationFoundAlert,
  migrateResult,
} from './editor.actions'
import { AvailableLanguage, CodemodError, defaultText, DiffArrayItem, ErrorAlerts, Notifications } from './models'

export const EDITOR_FEATURE = 'editor'

export interface EditorState {
  language: AvailableLanguage
  availableLanguages: AvailableLanguage[]
  diffArray: DiffArrayItem[]
  original: string
  modified: string
  error?: CodemodError
  notifications: Notifications
  alerts: ErrorAlerts
  displayDiff: boolean
}

const initialState: EditorState = {
  language: 'protractor',
  availableLanguages: ['protractor'],
  displayDiff: true,
  diffArray: [],
  original: defaultText['protractor'],
  modified: '',
  error: undefined,
  notifications: {
    copied: false,
    sentAddMigrationRequest: false,
  },
  alerts: {
    noMigrationsMade: false,
    browserWaitMigrated: false,
    xPathFound: false,
  },
}

const editorRducer = createReducer(
  initialState,
  on(setLanguage, (state, { language }) => ({
    ...state,
    language,
  })),
  on(toggleDisplayDiff, (state) => ({
    ...state,
    displayDiff: !state.displayDiff,
  })),
  on(turnOnCopiedNotification, (state) => ({
    ...state,
    notifications: {
      ...state.notifications,
      copied: true,
    },
  })),
  on(turnOffCopiedNotification, (state) => ({
    ...state,
    notifications: {
      ...state.notifications,
      copied: false,
    },
  })),
  on(turnOnAddMigrationNotification, (state) => ({
    ...state,
    notifications: {
      ...state.notifications,
      sentAddMigrationRequest: true,
    },
  })),
  on(turnOffAddMigrationNotification, (state) => ({
    ...state,
    notifications: {
      ...state.notifications,
      sentAddMigrationRequest: false,
    },
  })),
  on(turnOnMigrationNotFoundAlert, (state) => ({
    ...state,
    alerts: {
      ...state.alerts,
      noMigrationsMade: true,
    },
  })),
  on(turnOffMigrationNotFoundAlert, (state) => ({
    ...state,
    alerts: {
      ...state.alerts,
      noMigrationsMade: false,
    },
  })),
  on(turnOnBrowserWaitMigrationFoundAlert, (state) => ({
    ...state,
    alerts: {
      ...state.alerts,
      browserWaitMigrated: true,
    },
  })),
  on(turnOffBrowserWaitMigrationFoundAlert, (state) => ({
    ...state,
    alerts: {
      ...state.alerts,
      browserWaitMigrated: false,
    },
  })),
  on(turnOnXPathMigrationFoundAlert, (state) => ({
    ...state,
    alerts: {
      ...state.alerts,
      xPathFound: true,
    },
  })),
  on(turnOffXPathMigrationFoundAlert, (state) => ({
    ...state,
    alerts: {
      ...state.alerts,
      xPathFound: false,
    },
  })),
  on(migrateResult, (state, { result }) => ({
    ...state,
    modified: !!result?.output ? result.output : '',
    diffArray: result?.diff,
    error: result?.error,
  })),
)

export function reducer(state = initialState, action: Action): EditorState {
  return editorRducer(state, action)
}
