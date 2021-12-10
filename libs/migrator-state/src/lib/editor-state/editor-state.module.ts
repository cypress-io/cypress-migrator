import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { EditorEffects } from './editor.effects'
import { EDITOR_FEATURE, reducer } from './editor.reducer'

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(EDITOR_FEATURE, reducer), EffectsModule.forFeature([EditorEffects])],
})
export class EditorStateModule {}
