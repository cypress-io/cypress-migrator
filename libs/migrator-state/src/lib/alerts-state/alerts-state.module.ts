import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { ALERTS_FEATURE, reducer } from './alerts.reducer'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(ALERTS_FEATURE, reducer), EffectsModule.forFeature([])],
})
export class AlertsStateModule {}
