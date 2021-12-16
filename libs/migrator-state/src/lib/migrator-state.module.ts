import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { MigratorService } from './migrator.service'
import { EditorStateModule } from './editor-state/editor-state.module'
import { NotificationStateModule } from './notification-state/notification-state.module'
import { AlertsStateModule } from './alerts-state/alerts-state.module'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    EditorStateModule,
    NotificationStateModule,
    AlertsStateModule,
  ],
  providers: [MigratorService],
})
export class MigratorStateModule {}
