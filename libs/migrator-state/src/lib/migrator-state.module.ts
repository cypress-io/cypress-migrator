import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'
import { EditorStateModule } from './editor-state/editor-state.module'
import { NgCodemodsModule } from '@cypress-dx/ng-codemods'

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([]),
    EditorStateModule,
    NgCodemodsModule,
  ],
})
export class MigratorStateModule {}
