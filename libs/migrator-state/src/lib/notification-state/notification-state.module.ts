import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { NOTIFICATION_FEATURE, notificationReducer } from './notification.reducer'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(NOTIFICATION_FEATURE, notificationReducer),
    EffectsModule.forFeature([]),
  ],
})
export class NotificationStateModule {}
