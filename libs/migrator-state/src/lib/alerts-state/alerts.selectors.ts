import { createFeatureSelector } from '@ngrx/store'
import { AlertsState, ALERTS_FEATURE } from './alerts.reducer'

export const alertsFeatureSelector = createFeatureSelector<AlertsState>(ALERTS_FEATURE)
