import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { ALERTS_FEATURE, alertsReducer } from './alerts.reducer'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(ALERTS_FEATURE, alertsReducer), EffectsModule.forFeature([])],
})
export class AlertsStateModule {}
