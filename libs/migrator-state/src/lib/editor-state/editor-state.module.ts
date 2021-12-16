import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EDITOR_FEATURE, editorRducer } from './editor.reducer'
import { EffectsModule } from '@ngrx/effects'
import { MigratorService } from './migrator.service'
import { EditorEffects } from './editor.effects'
import { FormatEffects } from './format.effects'
import { FormatService } from './format.service'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(EDITOR_FEATURE, editorRducer),
    EffectsModule.forFeature([EditorEffects, FormatEffects]),
  ],
  providers: [MigratorService, FormatService],
})
export class EditorStateModule {}
