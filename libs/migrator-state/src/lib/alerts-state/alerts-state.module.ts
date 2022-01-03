import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { ALERTS_FEATURE, alertsReducer } from './alerts.reducer'
import { EffectsModule } from '@ngrx/effects'
import { AlertsEffects } from './alerts.effects'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(ALERTS_FEATURE, alertsReducer),
    EffectsModule.forFeature([AlertsEffects]),
  ],
})
export class AlertsStateModule {}
