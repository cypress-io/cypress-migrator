import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EDITOR_FEATURE, editorRducer } from './editor.reducer'
import { EffectsModule } from '@ngrx/effects'

@NgModule({
  declarations: [],
  imports: [CommonModule, StoreModule.forFeature(EDITOR_FEATURE, editorRducer), EffectsModule.forFeature([])],
})
export class EditorStateModule {}
