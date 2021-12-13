import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CodemodsService } from './codemods.service'

@NgModule({
  imports: [CommonModule],
  providers: [CodemodsService],
})
export class NgCodemodsModule {}
